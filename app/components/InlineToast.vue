<template>
    <div v-if="showToast" :class="toastClass" class="relative p-2 shadow-lg">
        <strong class="font-bold"> {{ toastTitle }} </strong>
        <span>{{ message }}</span>
        <button @click="show" class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <Icon name="heroicons:x-mark-16-solid"/>
        </button>
        
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showToast = ref(true);

const props = defineProps({
    message: String,
    type: {type: String, default: 'error'}
})

const show = () => {
    showToast.value = !showToast.value
}

const toastTitle = computed(() => {
    switch(props.type) {
        case 'error':
            return 'Error: '
    }
})

const toastClass = computed(() => {
    switch(props.type) {
        case 'error':
            return 'border-l-4 border-l-red-500 bg-red-100'
    }
})

</script>