// filepath: /Users/mateoburnichon/api-avancee-dm/boite-annonces-frontend/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(router);
app.mount('#app');