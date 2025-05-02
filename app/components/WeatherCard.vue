<template>
    <div class="max-w-sm mx-auto bg-white rounded-2x1 shadow-lg p-6 border border-gray-300">
        <h2 class="text-center text-5xl font-bold text-gray-800 mb-2">Sol {{ data.sol }}</h2>
        <p class="text-3xl text-gray-600">Earth Date: {{ data.earth_date }}</p>
        <hr class="mt-4"/>
        <div class="mt-4">
            <div class="flex justify-between">
                <span class="text-gray-700 text-3xl">High:</span>
                <span class="text-3xl font-meduim text-red-500">{{ data.high_temp.celsius }}°C / {{ data.high_temp.fahrenheit }}°F</span>
            </div>
            <div class="flex justify-between">
                <span class="text-3xl text-gray-700">Low:</span>
                <span class="text-3xl font-meduim text-blue-500">{{ data.low_temp.celsius }}°C / {{ data.low_temp.fahrenheit }}°F</span>
            </div>
        </div>
        <hr class="mt-4"/>
        <div class="mt-4 text-2xl text-gray-500">
            Week {{ data.week_number }} of {{ data.year }}       </div>
    </div>
</template>

<script setup>
defineProps({
    data: Object
})
</script>