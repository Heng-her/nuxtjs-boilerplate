// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  content: {
    // Content module configuration (optional)
  },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss',],
  devServer:{
    port: 3005,
    host: '0.0.0.0',
  }
});