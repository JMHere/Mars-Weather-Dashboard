<template>
    <div class="relative inline-block text-left">
        <button @click="toggle" class="inline-flex justify-between w-40 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            {{ selected || 'Select Chart' }}
        </button>
        <ul v-if="open" class="absolute left-0 top-full z-10 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
            <!-- click.stop prevents the list from closing if the user clicks on the main div -->
            <li
                v-for="option in options"
                :key="option"
                @click.stop="select(option)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer" 
            >
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
    options: Array,
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

// Using ref for creating mutable variables and update the UI
const open = ref(false)
const selected = ref(props.modelValue)

function toggle() {
    open.value = !open.value
}

// update modelValue with option and change open to close dropdown
function select(option) {
    selected.value = option
    emit('update:modelValue', option)
    open.value = false
}

// watches for changes in modelvue if change selected is now val
watch(() => props.modelValue, (val) => {
    selected.value = val
})

</script>