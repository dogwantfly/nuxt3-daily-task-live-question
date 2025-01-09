<script setup>
import { useAuth } from '@/composables/useAuth';
import dayjs from 'dayjs';
const route = useRoute();
const bookingStore = useBookingStore();
const {data, error} = useFetch(`https://nuxr3.zeabur.app/api/v1/rooms/${route.params.roomId}`);
console.log(route.params.roomId, data.value);
const { checkLoginStatus } = useAuth();

const roomInfo = ref({});
if (data.value) {
  roomInfo.value = data.value.result;
}
const { bookingInfo } = storeToRefs(bookingStore);
const { setBookingInfo } = bookingStore;


const discountPrice = 1000;

const createOrder = async (userInfo) => {
  try {
    setBookingInfo({...bookingInfo.value, userInfo});
    const response = await $fetch(`https://nuxr3.zeabur.app/api/v1/orders`, {
      method: 'POST',
      body: {
        roomId: route.params.roomId,
        ...bookingInfo.value,
        checkInDate: dayjs(bookingInfo.value.bookingDate.start).format('YYYY/MM/DD'),
        checkOutDate: dayjs(bookingInfo.value.bookingDate.end).format('YYYY/MM/DD'),
        peopleNum: bookingInfo.value.bookingPeople,
        userInfo: {
          ...bookingInfo.value.userInfo,
          address: {
            detail: bookingInfo.value.userInfo.detail,
            zipcode: 802
          }
        }
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    console.log(response);
    navigateTo(`/booking/${response.result._id}`);
  } catch (error) {
    console.error('Error creating order:', error);
    // 可以在這裡加入更多的錯誤處理邏輯，例如顯示錯誤訊息給用戶
  }
};

const submitButtonRef = ref(null);
onMounted(() => {
  checkLoginStatus();
});
</script>

<template>
  <main>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <section>
            <h2 class="mb-4 fw-bold">訂房人資訊</h2>
            <Form @submit="createOrder" v-slot="{ errors }">
              <div class="mb-4">
                <label for="name" class="form-label fw-bold">姓名</label>
                <Field
                  id="name"
                  name="name"
                  rules="required|min:2"
                  type="text"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors['name'] }"
                  placeholder="請輸入姓名"
                />
                <ErrorMessage name="name" class="invalid-feedback" />
              </div>

              <div class="mb-4">
                <label for="phone" class="form-label fw-bold">手機號碼</label>
                <Field
                  id="phone"
                  name="phone"
                  rules="required|isPhone"
                  type="tel"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors['phone'] }"
                  placeholder="請輸入手機號碼"
                />
                <ErrorMessage name="phone" class="invalid-feedback" />
              </div>

              <div class="mb-4">
                <label for="email" class="form-label fw-bold">電子信箱</label>
                <Field
                  id="email"
                  name="email"
                  rules="required|email"
                  type="email"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入電子信箱"
                />
                <ErrorMessage name="email" class="invalid-feedback" />
              </div>

              <div class="mb-4">
                <label for="road" class="form-label fw-bold">地址</label>
                <div className="d-flex gap-2 mb-4">
                  <Field
                    as="select"
                    name="縣市"
                    rules="required"
                    class="form-select w-50 p-3 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors['縣市'] }"
                  >
                    <option selected disabled value="">請選擇縣市</option>
                    <option value="高雄市">高雄市</option>
                  </Field>
                  <Field
                    as="select"
                    name="行政區"
                    rules="required"
                    class="form-select w-50 p-3 fw-medium rounded-3"
                    :class="{ 'is-invalid': errors['行政區'] }"
                  >
                    <option selected disabled value="">請選擇行政區</option>
                    <option value="前金區">前金區</option>
                    <option value="鹽埕區">鹽埕區</option>
                    <option value="新興區">新興區</option>
                  </Field>
                </div>
                <Field
                  id="road"
                  name="detail"
                  rules="required"
                  type="text"
                  class="form-control p-3 rounded-3"
                  :class="{ 'is-invalid': errors['detail'] }"
                  placeholder="請輸入詳細地址"
                />
                <ErrorMessage name="detail" class="invalid-feedback" />
              </div>
              <button
                ref="submitButtonRef"
                type="submit"
                class="d-none"
              ></button>
            </Form>
          </section>
        </div>
        <div class="col-md-5">
          <img
            class="img-fluid rounded-3"
            :src="roomInfo.imageUrl"
            :alt="roomInfo.name"
          />
          <div class="my-5">
            <h2 className="mb-3 fw-bold">價格詳情</h2>
            <div
              class="d-flex justify-content-between align-items-center mb-3 fw-medium"
            >
              <span
                >NT$ {{ roomInfo.price }} X {{ dayjs(bookingInfo.bookingDate?.end).diff(dayjs(bookingInfo.bookingDate?.start), 'day') }}晚
              </span>
              <span>NT$ {{ roomInfo.price * dayjs(bookingInfo.bookingDate?.end).diff(dayjs(bookingInfo.bookingDate?.start), 'day') }}</span>
            </div>
            <div
              class="d-flex justify-content-between align-items-center fw-medium"
            >
              <p class="mb-0">住宿折扣</p>
              <span class="text-info">-NT$ {{ discountPrice }}</span>
            </div>
            <hr class="my-3" />
            <div
              class="d-flex justify-content-between align-items-center fw-bold"
            >
              <p class="mb-0">總價</p>
              <span
                >NT$
                {{
                  roomInfo.price * dayjs(bookingInfo.bookingDate?.end).diff(dayjs(bookingInfo.bookingDate?.start), 'day') - discountPrice
                }}</span
              >
            </div>
          </div>

          <button
            class="btn btn-lg btn-primary w-100 fw-bold rounded-3"
            type="button"
            @click="submitButtonRef.click()"
          >
            確認訂房
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
