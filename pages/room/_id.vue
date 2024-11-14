<script setup>
const route = useRoute();
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <h1>房型詳細頁面</h1>
  <h2>{{ route.fullPath }}</h2>
  <button class="btn" @click="goBack">回上一頁</button>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
}

.btn {
  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
</style>
