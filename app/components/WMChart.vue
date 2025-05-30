<template>
    <div class="relative">
        <div class="flex justify-center my-4">
            <Dropdown
                :options="['Weekly', 'Monthly']"
                v-model="selectedChart"
            />
            <Dropdown 
                :options="['Line Graph', 'Bar Graph']"
                v-model="selectedChartType"
            />
            <Dropdown 
                :options="['Temperature', 'Wind Speed', 'Presure', 'UV Radiation', 'Atmospheric Opacity', 'Air & Ground Temp']"
                v-model="selectedData"
            />
        </div>
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup>
import { ref, watch, onMounted} from 'vue';
import { Chart, registerables } from 'chart.js';
import Dropdown from './Dropdown.vue';

// Registring all the components from Chart
Chart.register(...registerables)

// Mutable variables
const selectedChart = ref('Weekly')
const selectedChartType = ref('Line Graph')
const selectedData = ref('Temperature')
const chartInstance = ref(null)
const canvasRef = ref(null)

const props = defineProps({
    weeklyData: {
        type: Object,
        required: true
    },
    monthlyData: {
        type: Object,
        required: true
    }
})

// Setting filler data for charts
const chartDataSets = {
    Weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [12, 14, 10, 11, 13, 15, 9]
    },
    Monthly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [50, 60, 45, 70]
    }
}

const pressureDataset = (weatherData) => [
    {
        label: 'Pressure',
        data: weatherData.map(item => item.pressure),
        fill: false,
        borderColor: 'red',
        backgroundColor: 'pink',
        borderWidth: 2,
        borderRadius: 5,
        tension: 0.1
    }
]

const temperatureDataset = (weatherData) => [
    {
        label: 'High Temp(°C)',
        data: weatherData.map(item => item.high_temp.celsius),
        fill: false,
        borderColor: 'red',
        backgroundColor: 'pink',
        borderWidth: 2,
        borderRadius: 5,
        tension: 0.1
    },
    {
        label: 'Low Temp(°C)',
        data: weatherData.map(item => item.low_temp.celsius),
        fill: false,
        borderColor: 'blue',
        backgroundColor: 'lightBlue',
        borderWidth: 2,
        borderRadius: 5,
        tension: 0.1
    }
]

// Rendering charts based on the new selected Value
function renderChart() {
    let weatherData = {}
    let chartType = ''

    if (selectedChart.value === 'Weekly') {
        weatherData = props.weeklyData
    } else if (selectedChart.value === 'Monthly') {
        weatherData = props.monthlyData
    }

    if (selectedChartType.value === 'Line Graph') {
        chartType = 'line'
    } else if (selectedChartType.value === 'Bar Graph') {
        chartType = 'bar'
    }



    if (chartInstance.value) {
        chartInstance.value.destroy()
    }

    const data = chartDataSets[selectedChart.value]
    if (!data) {
        console.error(`Invalid selectedChart: ${selectedChart.value}`)
        return
    }
    chartInstance.value = new Chart(canvasRef.value, {
        type: chartType,
        data: {
            labels: weatherData.map(item => item.sol),
            datasets: [
                {
                    label: 'High Temp(°C)',
                    data: weatherData.map(item => item.high_temp.celsius),
                    fill: false,
                    borderColor: 'red',
                    backgroundColor: 'pink',
                    borderWidth: 2,
                    borderRadius: 5,
                    tension: 0.1
                },
                {
                    label: 'Low Temp(°C)',
                    data: weatherData.map(item => item.low_temp.celsius),
                    fill: false,
                    borderColor: 'blue',
                    backgroundColor: 'lightBlue',
                    borderWidth: 2,
                    borderRadius: 5,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                
                title: {
                    display: true,
                    text: `${selectedChart.value} Weather`
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Sol (Martian Day)',
                        font: {
                            size: 14
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    })
}

// Initial Render
onMounted(() =>{
    renderChart()
})
// Trigger for when a new selction on the dropdown has been made
watch([selectedChart, selectedChartType], () => {
    renderChart()
})

</script>