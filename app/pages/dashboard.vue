
<template>
    <div class="text-center">
        <h1 class=" text-4xl text-red-400 font-bold mb-4">DashBoard</h1>
    </div>
    <!-- <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
        <pre>{{ weather }}</pre>
    </div> -->
    <div>
        <WeatherCard v-if="weather" :data="weather" />
    </div>
</template>

<script setup>
const {data: weather, pending, error} = await useFetch('http://127.0.0.1:8000/weather/sol/4504', {
    server: false,
    key: 'dash-data'
})
</script>

<script>
import WeatherCard from '@/components/WeatherCard.vue'
export default {
    components: { WeatherCard }
}
</script>