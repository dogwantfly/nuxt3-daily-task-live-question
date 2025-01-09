export const useAuth = () => {
  const isLoggedIn = ref(false);

  const checkLoginStatus = async () => {
    try {
      const data = await $fetch('https://nuxr3.zeabur.app/api/v1/user/check', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (data.status) {
        isLoggedIn.value = true;
        localStorage.setItem('auth_token', data.token);
      } else {
        isLoggedIn.value = false;
        localStorage.removeItem('auth_token');
        navigateTo('/login');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      isLoggedIn.value = false;
      localStorage.removeItem('auth_token');
      navigateTo('/login');
    }
  };

  return { isLoggedIn, checkLoginStatus };
};
