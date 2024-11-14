<template>
  <p class="product-price">{{ price }}</p>
</template>

<script setup>
defineProps({
  price: String,
});
</script>

<style scoped>
.product-price {
  font-size: 16px;
  color: #007BFF;
  text-align: center;
  margin-bottom: 16px;
}
</style>
