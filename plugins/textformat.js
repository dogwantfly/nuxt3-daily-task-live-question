export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("textformat", {
        mounted(el, binding) {
            if (binding.arg === "uppercase") {
                el.textContent = binding.value.toUpperCase();
            } else if (binding.arg === "lowercase") {
                el.textContent = binding.value.toLowerCase();
            }
        }
    })
});
