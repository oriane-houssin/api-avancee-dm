<template>
  <div>
    <h2>Signin</h2>
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Signin</button>
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
        const response = await axios.post('http://localhost:3000/api/auth/signin', {
          email: this.email,
          password: this.password,
        });
        alert('Signin successful');
        // Save the token in local storage or cookies
        localStorage.setItem('token', response.data.accessToken);
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Error signing in');
      }
    },
  },
};
</script>