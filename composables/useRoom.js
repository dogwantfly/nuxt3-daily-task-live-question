export default function useRoom() {
  const roomDetail = ref(null);
  const roomsList = ref([]);
  const getRoomDetail = async (roomId) => {
    const { data } = await useFetch(`/rooms/${roomId}`, {
      method: "GET",
      baseURL: "https://nuxr3.zeabur.app/api/v1",
      transform: (data) => data.result,
      onResponseError({ response }) {
        const { message } = response._data;
        console.error('getRoomDetailError:', message);
        return Promise.reject(message);
      },
    });
    roomDetail.value = data.value;
  }
  const getRoomsList = async () => {
    const { data } = await useFetch("/rooms", {
        method: "GET",
        baseURL: "https://nuxr3.zeabur.app/api/v1",
        transform: (data) => data.result,
        onResponseError({ response }) {
          const { message } = response._data;
          console.error('getRoomsListError:', message);
          return Promise.reject(message);
        },
      });
    roomsList.value = data.value;
  }

  return {
    roomDetail,
    roomsList,
    getRoomDetail,
    getRoomsList,
  };
}   
