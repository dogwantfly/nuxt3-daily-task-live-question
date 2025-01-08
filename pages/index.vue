<script setup>
/*
起始日期 => 當前日期
結束日期 => 下一天
日期格式需要是  YYYY-MM-DD

const date = ref({
  start: ..., 
  end: ...,
});
*/

/*
調整日期的格式
const masks = {
 ...
};
*/

/*
  使用  vue-screen-utils 套件調整響應式設定

  const rows = mapCurrent( ... );
*/
import { useScreens } from "vue-screen-utils";

const today = new Date();
const date = ref({
  start: today.toLocaleDateString().replaceAll("/", "-"),
  end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toLocaleDateString().replaceAll("/", "-"),
});



const { mapCurrent } = useScreens({
  md: "768px", // 等同於 (min-width: 768px)
  lg: "1024px", // 等同於 (min-width: 1024px)
});

const isExpand = mapCurrent({ md: true, lg: false }, true);
const columns = mapCurrent({ md: 2, lg: 2 }, 1);
const rows = mapCurrent({ md: 1, lg: 1 }, 1);
const titlePosition = mapCurrent({ md: 'center', lg: 'left' }, 'center');
const mask = mapCurrent({ md: 'YYYY-MM-DD', lg: 'YYYY-MM-DD' }, 'YYYY-MM-DD');
const minDate = ref(new Date('2024-12-01'));
const maxDate = ref(new Date('2025-12-01'));
const selectedColor = ref('primary');
</script>

<template>
  <div class="container mt-5 date-picker">
    <ClientOnly>
      <!-- 加入 DatePicker 實作日期選取的功能  -->
      <DatePicker v-model.range.string="date"  :expand="isExpand" :columns="columns" :rows="rows" :title-position="titlePosition" :mask="mask" :min-date="minDate" :max-date="maxDate" :color="selectedColor"/>
    </ClientOnly>
  </div>  
</template>

<style lang="scss" scoped>
.date-picker {
  // 使用 CSS 變數覆蓋 VCalendar 套件的預設樣式
  :deep(.vc-primary) {
    --vc-accent-200: #f9f9f9;
    --vc-accent-600: #000000;
    --vc-accent-700: #000000;
  }

  :deep(.vc-title) {
    background: none;
  }
  :deep(.vc-arrow) {
    background: none;
  }
  :deep(.vc-pane-layout) {
    gap: 60px;
  }
}
</style>
