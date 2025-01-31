import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies';

const app = createApp(App);
app.use(router);
app.use(VueCookies, { expire: '1d' }); // Configurer vue-cookies avec une expiration par défaut de 1 jour
app.mount('#app');