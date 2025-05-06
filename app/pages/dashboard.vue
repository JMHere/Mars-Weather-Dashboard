
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
    <!-- <div>
        <BarChart />
    </div> -->
    <div>
        <SevenDayChart v-if="weeklyWeather" :weather-data="weeklyWeather" />
    </div>
</template>

<script setup>
import BarChart from '~/components/BarChart.vue';

const {data: weather, pending, error} = await useFetch('http://127.0.0.1:8000/weather/sol/4504', {
    server: false,
    key: 'dash-data'
})

const {data: weeklyWeather, pending: weeklyPending, error: weeklyError} = await useFetch('http://127.0.0.1:8000/weather/latestWeek', {
    server: false,
    key: 'weekly-data'
})
</script>

<script>
import WeatherCard from '@/components/WeatherCard.vue'
import SevenDayChart from '~/components/SevenDayChart.vue';

export default {
    components: { WeatherCard, SevenDayChart }
}
</script>