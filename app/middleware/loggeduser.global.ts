export default defineNuxtRouteMiddleware(async (to, from) => {

    const router = useRouter();
    const {currentUser, authCookie, refreshUser} = useUser();
    console.log("middleware starting", authCookie.value)
    if (to.path === "/login") {
        currentUser.value = undefined
        console.log("Already at login")
        return;
    }

    if (authCookie.value) {
        try {
            await refreshUser();
        } catch {
            // currentUser.value = undefined;
            // authCookie.value = undefined;
            console.log("Refresh failed")
            return navigateTo("/login");
        }
    } else {
        console.log("cookie never found")
        currentUser.value = undefined;
        return navigateTo("/login");
    }
});