// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@/assets/stylesheets/all.scss', 
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "bootstrap/scss/functions";
            @import "@/assets/stylesheets/_variables.scss";
            @import "bootstrap/scss/variables";
            @import "bootstrap/scss/variables-dark";
          `,
        },
      },
    },
  }
})
