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
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);

    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/token', { withCredentials: true });
        const token = response.data.token;
        console.log('Token reçu :', token); // Ajouter un message de journalisation pour le token
        isLoggedIn.value = !!token;
        console.log('isLoggedIn :', isLoggedIn.value); // Ajouter un message de journalisation pour l'état de connexion
      } catch (error) {
        console.error('Erreur lors de la récupération du token :', error);
      }
    };

    const logout = async () => {
      try {
        await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
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
      console.log('isLoggedIn changed :', newVal); // Ajouter un message de journalisation pour le changement d'état de connexion
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