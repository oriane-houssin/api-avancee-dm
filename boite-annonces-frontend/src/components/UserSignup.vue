<template>
  <div class="container">
    <h2 class="text-center">Signup</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input type="text" class="form-control" id="firstname" v-model="firstname" required />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input type="text" class="form-control" id="lastname" v-model="lastname" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserSignup',
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