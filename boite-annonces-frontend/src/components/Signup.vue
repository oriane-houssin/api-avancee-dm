ichon/boite-annonces-frontend/src/components/Signup.vue
<template>
  <div>
    <h2>Signup</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="firstname" placeholder="First Name" />
      <input type="text" v-model="lastname" placeholder="Last Name" />
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        });
        alert(response.data.message);
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Error signing up');
      }
    },
  },
};
</script>