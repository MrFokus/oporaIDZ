export default defineNuxtRouteMiddleware(async (to, from) => {
    const exception = ['/login','/register']
    const user = useCookie('user')
    if(!exception.includes(to.path)){
        if(!user.value){
            return navigateTo("/login")
        }
    }
    // if (to.path ==='/login'&&clients.value){
    //     return navigateTo("/")
    // }

})