<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Boite Annonces</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/signup">Signup</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signin">Signin</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/announcements">Announcements</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create-announcement">Create Announcement</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-danger" @click="logout">Logout</button>
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
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();

    const logout = async () => {
      try {
        await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
        Cookies.remove('accessToken');
        alert('Logout successful');
        router.push('/signin');
      } catch (error) {
        console.error('Error logging out:', error);
        alert('Error logging out');
      }
    };

    return {
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