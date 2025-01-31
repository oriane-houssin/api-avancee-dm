<template>
  <div class="container">
    <h2 class="text-center">Edit Announcement</h2>
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
      <button type="submit" class="btn btn-primary btn-block">Update</button>
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
      const response = await axios.get('http://localhost:3000/api/token', { withCredentials: true });
      const token = response.data.token;
      const announcementResponse = await axios.get(`http://localhost:3000/api/announcements/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { title, description, image } = announcementResponse.data;
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
        const response = await axios.get('http://localhost:3000/api/token', { withCredentials: true });
        const token = response.data.token;
        const updateResponse = await axios.put(
          `http://localhost:3000/api/announcements/${this.$route.params.id}`,
          { title: this.title, description: this.description, image: this.image },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(updateResponse.data.message);
      } catch (error) {
        console.error('Error updating announcement:', error);
        alert('Error updating announcement');
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