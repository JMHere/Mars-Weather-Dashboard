<script setup>
import { onMounted, ref } from 'vue';
import {
    Chart,
    registerables
} from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
    weatherData: {
        type: Array,
        required: true
    }
})

const chartCanvas = ref(null)

onMounted(() => {
    new Chart(chartCanvas.value, {
        type: 'line',
        data: {
            labels: props.weatherData.map(item => item.sol),
            datasets: [
                {
                    label: 'High Temp(°C)',
                    data: props.weatherData.map(item => item.high_temp.celsius),
                    borderColor: 'red',
                    tension: 0.3,
                    fill: false
                },{
                    label: 'Low Temp(°C)',
                    data: props.weatherData.map(item => item.low_temp.celsius),
                    borderColor: 'blue',
                    tension: 0.3,
                    fill: false
                }
                
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Latest Week Mars Weather'
                }
            }
        }
    })
})

</script>

<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>