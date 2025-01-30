<template>
  <div>
    <h2>Edit Announcement</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="title" placeholder="Title" />
      <textarea v-model="description" placeholder="Description"></textarea>
      <input type="text" v-model="image" placeholder="Image URL" />
      <button type="submit">Update</button>
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
  async created() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/announcements/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { title, description, image } = response.data;
      this.title = title;
      this.description = description;
      this.image = image;
    } catch (error) {
      console.error('Error fetching announcement:', error);
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `http://localhost:3000/api/announcements/${this.$route.params.id}`,
          { title: this.title, description: this.description, image: this.image },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(response.data.message);
      } catch (error) {
        console.error('Error updating announcement:', error);
        alert('Error updating announcement');
      }
    },
  },
};
</script>