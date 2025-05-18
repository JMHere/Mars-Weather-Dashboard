<template>
    <div>
        <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" class="w-80 mb-4 border border-black p-2">
            <option value="">Select a country</option>
            <option 
                v-for="country in mappedCountries" 
                :key="country.code"
                :value="country.name"
            >
                {{ country.name }}
            </option>
        </select>
    </div>
</template>

<script setup>
import countries from 'world-countries/countries.json' with { type: 'json'}

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const mappedCountries = countries.map(c => ({
    name: c.name.common,
    code: c.cca2,
}))

</script>