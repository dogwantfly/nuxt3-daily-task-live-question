export const useHome = () => {
  const newsList = ref([]);
  const isLoading = ref(false);

  const getNewsList = async () => {
    const url = 'https://nuxr3.zeabur.app/api/v1/home/news/';
    isLoading.value = true;
    try {
      const response = await fetch(url);
      
      const data = await response.json();
      newsList.value = data.result;
      
      if (!response.ok) {
        throw new Error(response.status);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      isLoading.value = false;
    }
  };
  return { newsList, getNewsList, isLoading };
};
