<template>
    <div>{{ passwordStrength }}</div>
    <div class="flex flex-row justify-between mb-2">
        <div :class="barOne"></div>
        <div :class="barTwo"></div>
        <div :class="barThree"></div>
        <div :class="barFour"></div>
    </div>
</template>

<script setup>
import zxcvbn from 'zxcvbn';

const props = defineProps({
    username: String,
    email: String,
    password: String,
})

const zeroValueClass = 'bg-gray-200 flex-1 rounded-full h-2';
const oneValueClass = 'bg-red-600 flex-1 rounded-full h-2';
const twoValueClass = 'bg-yellow-400 flex-1 rounded-full h-2';
const threeValueClass = 'bg-green-400 flex-1 rounded-full h-2';
const fourValueClass = 'bg-green-600 flex-1 rounded-full h-2';
const barOne = ref(zeroValueClass);
const barTwo = ref(zeroValueClass);
const barThree = ref(zeroValueClass);
const barFour = ref(zeroValueClass);
const passwordStrength = ref('Very weak')


const passValue = computed(() => zxcvbn(props.password));

watch(() => passValue.value.score, (newScore) => {
    if (newScore == 1) {
        barOne.value = oneValueClass;
        barTwo.value = zeroValueClass;
        barThree.value = zeroValueClass;
        barFour.value = zeroValueClass;
        passwordStrength.value = 'Weak';
    } else if (newScore == 2) {
        barOne.value = twoValueClass;
        barTwo.value = twoValueClass;
        barThree.value = zeroValueClass;
        barFour.value = zeroValueClass;
        passwordStrength.value = 'Fair';
    } else if (newScore == 3) {
        barOne.value = threeValueClass;
        barTwo.value = threeValueClass;
        barThree.value = threeValueClass;
        barFour.value = zeroValueClass;
        passwordStrength.value = 'Good';
    } else if (newScore == 4) {
        barOne.value = fourValueClass;
        barTwo.value = fourValueClass;
        barThree.value = fourValueClass;
        barFour.value = fourValueClass;
        passwordStrength.value = 'Strong';
    } else {
        barOne.value = zeroValueClass;
        barTwo.value = zeroValueClass;
        barThree.value = zeroValueClass;
        barFour.value = zeroValueClass;
        passwordStrength.value = 'Very weak';
    }
})





</script>