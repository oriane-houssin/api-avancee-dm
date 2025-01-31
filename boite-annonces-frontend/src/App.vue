<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Boite Annonces</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/announcements">Announcements</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create-announcement">Create Announcement</router-link>
          </li>
        </ul>
        <div class="dropdown ml-auto">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Account
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <router-link v-if="!isLoggedIn" class="dropdown-item" to="/signup">Signup</router-link>
            <router-link v-if="!isLoggedIn" class="dropdown-item" to="/signin">Signin</router-link>
            <button v-if="isLoggedIn" class="dropdown-item" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);

    const checkAuth = () => {
      const token = Cookies.get('accessToken');
      isLoggedIn.value = !!token;
    };

    const logout = async () => {
      try {
        await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
        Cookies.remove('accessToken');
        alert('Logout successful');
        isLoggedIn.value = false;
        router.push('/signin');
      } catch (error) {
        console.error('Error logging out:', error);
        alert('Error logging out');
      }
    };

    onMounted(() => {
      checkAuth();
    });

    watch(isLoggedIn, (newVal) => {
      if (!newVal) {
        router.push('/signin');
      }
    });

    return {
      isLoggedIn,
      logout,
    };
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  flex: 1;
  padding: 20px;
}
</style>