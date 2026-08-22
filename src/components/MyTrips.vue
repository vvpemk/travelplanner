<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      trips: []
    };
  },
  async mounted() {
    this.fetchTrips();
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('DD.MM.YYYY');
    },
    async fetchTrips() {
      try {
        const response = await axios.get('http://localhost:3005/trips'); 
        this.trips = response.data;
      } catch (error) {
        console.error('Ошибка при получении маршрутов:', error);
      }
    },
    async deleteTrip(id) {
      try {
        await axios.delete(`http://localhost:3005/trips/${id}`)
        this.fetchTrips();
      } catch (error) {
        console.error('Ошибка при удалении маршрута:', error);
      }
    }
  }
};
</script>

<template>
  <div>
    <h2>Мои маршруты</h2>
    <div v-if="trips.length === 0">
      <p>У вас пока нет сохраненных маршрутов.</p>
    </div>
    <div class="list-group">
      <div class="trip-card" v-for="trip in trips" :key="trip._id" >
        <h3>{{ trip.title }}</h3> 
        <p>С {{ formatDate(trip.startDate) }} по {{ formatDate(trip.endDate) }}</p>
        <ul>
          <li li v-for="(place, index) in trip.places" :key="index"> {{ place }}</li>
        </ul>
        <button class="btn btn-danger btn-sm" @click="deleteTrip(trip._id)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trip-card {
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
}
</style>
