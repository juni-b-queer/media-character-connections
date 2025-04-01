// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css'],
  nitro: {
    experimental: {
      tasks: true
    }
  },
  ignore: ['postgresql'],
  watch: {
    ignored: ['postgresql/**'],
  },

})