<script setup lang="ts">
const length = ref(3);
const roundLength = ref(5);

const numbers = ref<null | number[]>(null);
const result = ref([] as { answer: number; correct: number[] }[]);

const answer = ref("");

function initialize() {
  generateQuestion();
  result.value = []
}

function generateQuestion() {
  numbers.value = [];

  for (let i = 0; i < length.value; i++) {
    numbers.value.push(Math.floor(Math.random() * 8) + 2);
  }
}

function acceptAnswer() {
  if (typeof answer.value !== "number") return;
  result.value.push({
    answer: +answer.value,
    correct: JSON.parse(JSON.stringify(numbers.value)),
  });
  generateQuestion();
  answer.value = "";
}

function mul(a: number, b: number) {
  return a * b
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
          'bg-red-500':
            result[i] && result[i].answer !== result[i].correct.reduce(mul),
          'bg-green-500':
            result[i] && result[i].answer === result[i].correct.reduce(mul),
        }"
      ></div>
    </div>
    <div v-if="numbers && result.length < roundLength">
      <div>
        <template v-for="(q, i) in numbers"
          ><span v-if="i !== 0"> * </span>{{ q }}</template
        >
      </div>
      <UInput v-model="answer" type="number" @keypress.enter="acceptAnswer" />
    </div>
    <UButton @click="initialize" v-else>Start</UButton>
  </div>
</template>
