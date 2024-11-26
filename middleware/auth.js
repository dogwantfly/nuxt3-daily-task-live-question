
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $swal } = useNuxtApp();
  const tokenCookie = useCookie("auth_token");
  if (!tokenCookie.value && to.path !== "/login") {
    return navigateTo("/login");
  }
  try {
    const response = await $fetch("https://nuxr3.zeabur.app/api/v1/user/check", {
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    });
    if (response.status === 401 || response.status === 403) {
      $swal.fire({
        position: "center",
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
      return navigateTo("/login");
    }
    navigateTo(to.path);
  } catch (error) {
    $swal.fire({
      position: "center",
      icon: "error",
      title: "請先登入",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
