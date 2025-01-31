<template>
  <div class="container">
    <h2 class="text-center">Signin</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Signin</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserSignin',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await axios.post('http://localhost:3000/api/auth/signin', {
          email: this.email,
          password: this.password,
        }, { withCredentials: true });
        alert('Signin successful');
        // Pas besoin de récupérer le token ici, il est stocké dans les cookies par le backend
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Error signing in');
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

button {
  margin-top: 20px;
}
</style>