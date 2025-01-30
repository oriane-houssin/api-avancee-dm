// filepath: /Users/mateoburnichon/boite-annonces-frontend/src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Signup from '../components/Signup.vue';
import Signin from '../components/Signin.vue';
import Announcements from '../components/Announcements.vue';
import CreateAnnouncement from '../components/CreateAnnouncement.vue';
import EditAnnouncement from '../components/EditAnnouncement.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/signup', component: Signup },
    { path: '/signin', component: Signin },
    { path: '/announcements', component: Announcements },
    { path: '/create-announcement', component: CreateAnnouncement },
    { path: '/edit-announcement/:id', component: EditAnnouncement },
  ],
});