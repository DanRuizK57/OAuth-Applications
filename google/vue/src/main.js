import { createApp } from 'vue';
import router from "./router/router.js";
import App from './App.vue';
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);

app.use(router);

app.use(vue3GoogleLogin, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
});

app.mount("#app");