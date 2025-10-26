<script setup lang="ts">
import type { VNodeRef } from "vue";

const length = ref(3);
const roundLength = ref(5);

const numbers = ref<null | number[]>(null);
const result = ref([] as boolean[]);

const answer = ref("");

function initialize() {
  generateQuestion();
}

function generateQuestion() {
  numbers.value = [];

  for (let i = 0; i < length.value; i++) {
    numbers.value.push(Math.floor(Math.random() * 8) + 2);
  }
}

function acceptAnswer() {
  if (typeof answer.value !== "number") return;
  const isCorrect =
    answer.value === (numbers.value?.reduce((a, b) => a * b) ?? 0);
  generateQuestion();
  answer.value = "";
  result.value.push(isCorrect);
}

</script>

<template>
  <div>
    <div class="flex gap-1 mb-1">
      <div
        v-for="i in range(roundLength)"
        class="w-5 h-5"
        :class="{
          'bg-gray-400': result[i] === undefined,
          'bg-red-500': result[i] !== undefined && result[i] !== true,
          'bg-green-500': result[i] !== undefined && result[i] === true,
        }"
      />
    </div>
    <UButton @click="initialize" v-if="!numbers">Start</UButton>
    <div v-if="numbers">
      <div>
        <template v-for="(q, i) in numbers"
          ><span v-if="i !== 0"> * </span>{{ q }}</template
        >
      </div>
      <UInput v-model="answer" type="number" @keypress.enter="acceptAnswer" />
    </div>
  </div>
</template>
