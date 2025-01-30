<template>
  <div>
    <h2>Create Announcement</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="title" placeholder="Title" />
      <textarea v-model="description" placeholder="Description"></textarea>
      <input type="text" v-model="image" placeholder="Image URL" />
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

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
        const token = localStorage.getItem('token');
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