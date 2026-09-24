
export const useUser = () => {
  const currentUser = useState<any>("user");
  const authCookie = useCookie<string | undefined>("auth", {
    expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 
  });
  const router = useRouter();

  const login = async (username : string, password: string) => {
    const payload = {username, password};
    const response = await useAppFetch("/auth/login", {body : payload, method: "POST"}) as any;
    if (response.user) {
    currentUser.value = response.user;
    authCookie.value = response.access_token;
    }
    router.push('/')
    return response;
  };

  const logout = () => {
    console.log("performing logout")
    authCookie.value = undefined;
    currentUser.value = undefined;
    router.push('/login')
  }

  const refreshUser = async () => {
    console.log("start of refresh")
    const response = await fetch('https://swk-licenses/user/me',
      {
        headers : {Authorization: authCookie.value ? `Bearer ${authCookie.value}` : "",
                  "Content-Type": 'application/json'
      }
      }

    )


    // const response = await useAppFetch("/user/me");
    console.log("respons:", response.json())
    currentUser.value = response.json();
    console.log("finished refresh")
  }

  const fetchAllUsers = async () => {
    const res = await useAppFetch("/user");
    return res;
  }

  const updateUser = async (uuid : string, updateData : any) => {
    const res = await useAppFetch(`/user/${uuid}`, {method: "PUT", body : updateData}    )
    return res;
  }

  return {authCookie,
  currentUser,
  login,
  logout,
  refreshUser,
  fetchAllUsers,
  updateUser
}

};