<template>
    <div class="relative mb-4">
        <input 
            v-model="password"
            :type="show ? 'text': 'password'"
            :placeholder="placeholder"
            class="border border-black w-80 pl-2 h-10"
        />
        <button
            type="button"
            @click="toggleShow"
            class="absolute inset-y-0 right-0 flex items-center px-3"
        >
            <Icon :name="show ? 'heroicons:eye' : 'heroicons:eye-slash'"/>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false)

const password = defineModel()
const props = defineProps({
    placeholder: String
})

const toggleShow = () => {
    show.value = !show.value
}

</script>