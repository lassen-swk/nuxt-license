export default defineNuxtRouteMiddleware(async (to, from) => {

    const router = useRouter();
    const {currentUser, authCookie, refreshUser} = useUser();
    console.log("middleware starting", authCookie.value)
    if (to.path === "/login") {
        currentUser.value = undefined
        return;
    }

    if (authCookie.value) {
        try {
            await refreshUser();
        } catch {
            currentUser.value = undefined;
            authCookie.value = undefined;
            return navigateTo("/login");
        }
    } else {
        currentUser.value = undefined;
        return navigateTo("/login");
    }
});