<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            title: '',
            startDate: '',
            endDate: '',
            newPlace: '',
            places: [],
        };
    },
    methods: {
        addPlace() {
            let place = this.newPlace;
            this.places.push(place);
            this.newPlace = ''
        },
        removePlace(index) {
            this.places.splice(index, 1);
        },
        async createTrip() {
            try {
                let trip = {
                    title: this.title,
                    startDate: dayjs(this.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    endDate: dayjs(this.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD'), 
                    places: this.places,
                };
                await axios.post('http://localhost:3005/trips', trip);
                this.$router.push('/my-trips');
            } catch (error) {
                console.error('Ошибка при создании маршрута:', error);
            }
        }
    },
};
</script>
<template>
    <div class="container">
        <h2>Создать новый маршрут</h2>
        <form @submit.prevent="createTrip">
            <div class="form-group mb-3">
                <label for="title">Название поездки</label>
                <input type="text" id="title" v-model="title" class="form-control">
            </div>
            <div class="form-group mb-3">
                <label for="startDate">Дата начала</label>
                <input type="date" id="startDate" v-model="startDate" class="form-control">
            </div>
            <div class="form-group mb-3">
                <label for="endDate">Дата окончания</label>
                <input type="date" id="endDate" v-model="endDate" class="form-control">
            </div>
            <div class="form-group mb-3">
                <label for="place">Место</label>
                <div class="input-group">
                    <input type="text" id="place" v-model="newPlace" class="form-control" placeholder="Введите место">
                    <button type="button" class="btn btn-secondary" @click="addPlace">Добавить</button>
                </div>
                <ul class="list-group mt-2">
                    <li class="list-group-item d-flex justify-content-between align-items-center"
                        v-for="(place, index) in places" :key="index">
                        {{ place }}
                        <button type="button" class="btn btn-danger btn-sm" @click="removePlace(index)">Удалить</button>
                    </li>
                </ul>
            </div>
            <button type="submit" class="btn btn-primary">Сохранить маршрут</button>
        </form>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
    margin-top: 50px;
}
</style>