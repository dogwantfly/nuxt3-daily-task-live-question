export const useBookingStore = defineStore("booking", () => {
  const bookingResult = ref(null);
  const setBooking = (booking) => {
    bookingResult.value = booking;
  };
  return { bookingResult, setBooking };
});
