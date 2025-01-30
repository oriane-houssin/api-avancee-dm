<template>
  <div class="container">
    <h2 class="text-center">Create Announcement</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="text" class="form-control" id="image" v-model="image" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      title: '',
      description: '',
      image: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const token = Cookies.get('accessToken');
        if (!token) {
          alert('No access token found. Please sign in.');
          return;
        }
        const response = await axios.post(
          'http://localhost:3000/api/announcements',
          { title: this.title, description: this.description, image: this.image },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(response.data.message);
      } catch (error) {
        console.error('Error creating announcement:', error);
        alert('Error creating announcement');
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