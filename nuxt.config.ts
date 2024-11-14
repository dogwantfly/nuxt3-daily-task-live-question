// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  components: {
    dirs: [
      {
        path: "~/components/global",  
        global: true,  // 全域註冊
      },
      "~/components",  // 區域註冊
    ],
  },
})
