<script setup>
const { $loading } = useNuxtApp();
function openLoading() {
  const loader = $loading.show();
  setTimeout(() => {
    loader.hide();
  }, 1000);
}
</script>

<template>
  <button type="button" @click="openLoading">開啟 Loading 效果</button>
</template>

<style scoped></style>
