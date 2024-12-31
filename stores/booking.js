// 建立名稱為 useBookingStore 的 store 

export const useBookingStore = defineStore("booking", () => {
  const bookingResult = ref(null);
  const setBooking = (booking) => {
    bookingResult.value = booking;
  };
  return { bookingResult, setBooking };
});
