import { createRouter, createWebHistory } from 'vue-router';
import UserSignup from '../components/UserSignup.vue';
import UserSignin from '../components/UserSignin.vue';
import UserAnnouncements from '../components/UserAnnouncements.vue';
import CreateAnnouncement from '../components/CreateAnnouncement.vue';
import EditAnnouncement from '../components/EditAnnouncement.vue';

const routes = [
  { path: '/signup', component: UserSignup },
  { path: '/signin', component: UserSignin },
  { path: '/announcements', component: UserAnnouncements },
  { path: '/create-announcement', component: CreateAnnouncement },
  { path: '/edit-announcement/:id', component: EditAnnouncement },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;