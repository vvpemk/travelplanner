<script>
export default {
  name: 'Home',

  methods: {
    goCreate() {
      this.$router.push({
        name: 'createTrip'
      })
    }
  }
};
</script>

<template>
  <div class="container text-center">
    <h1>Добро пожаловать в TravelPlanner!</h1>
    <p>Планируйте свои путешествия легко и удобно.</p>
    <button class="btn btn-primary" @click="goCreate" :class="{'active': $route.name == 'profile'}">
      Начать планирование
    </button>
  </div>
</template>


<style scoped>
.container {
  margin-top: 50px;
}
</style>