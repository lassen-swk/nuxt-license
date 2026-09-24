// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    devServer: {
    port: 3001
  },
  routeRules: {
'/**': { cors: true }
},
  
  modules: ['@nuxt/ui'],
  icon: {
    clientBundle: {
            icons: [
        'lucide:layout-dashboard',
        'lucide:bar-chart-3',
        'lucide:users',
        'lucide:settings',
        'lucide:key-round',
        'fluent-mdl2:status-circle-outer'
      ],
      scan: true, // auto-detects icon names used in your codebase
      sizeLimitKb: 256,
    },
  },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
  apiSecret: '', // Overridden by NUXT_API_SECRET
  public: {
  apiBase: '' // Overridden by NUXT_PUBLIC_API_BASE
}
},

 vite: {

    server: {

      host: true, // bindet an alle Interfaces

      port: 3001,

      strictPort: true,

      allowedHosts: ["swk-licenses", "swk-licenses.median-bk.de"],
// interne Hosts erlauben

    },

  },

})