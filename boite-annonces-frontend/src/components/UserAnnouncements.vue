<template>
  <div>
    <h2>Announcements</h2>
    <ul>
      <li v-for="announcement in announcements" :key="announcement._id">
        <h3>{{ announcement.title }}</h3>
        <p>{{ announcement.description }}</p>
        <img :src="announcement.image" :alt="announcement.title" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      announcements: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
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