<template>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <router-link class="navbar-brand" to="/">TravelPlanner</router-link>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Главная</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/create">Создать маршрут</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/my-trips">Мои маршруты</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container mt-4">
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App'
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
  }
  </style>
  