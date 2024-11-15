export default function useRoom() {
  const roomDetail = ref(null);

  const getRoomDetail = async (roomId) => {
    try {
      const response = await fetch(`https://nuxr3.zeabur.app/api/v1/rooms/${roomId}`);
      const data = await response.json();
      roomDetail.value = data.result;
    } catch (error) {
      console.error(error.message);
    }
  }

  return {
    roomDetail,
    getRoomDetail,
  };
}   
