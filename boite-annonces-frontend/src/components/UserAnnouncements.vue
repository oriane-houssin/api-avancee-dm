<template>
  <div class="container">
    <h2 class="text-center">Announcements</h2>
    <ul class="list-group">
      <li v-for="announcement in announcements" :key="announcement._id" class="list-group-item">
        <h3>{{ announcement.title }}</h3>
        <p>{{ announcement.description }}</p>
        <img :src="announcement.image" :alt="announcement.title" class="img-fluid" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserAnnouncements',
  data() {
    return {
      announcements: [],
    };
  },
  async created() {
    try {
      const token = response.data.accessToken;
        Cookies.set('accessToken', token, { expires: 1 });
        console.log('Token:', token); 
      const response = await axios.get('http://localhost:3000/api/announcements', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.announcements = response.data;
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

.list-group-item {
  margin-bottom: 20px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>