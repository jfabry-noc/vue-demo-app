<script setup>
import Question from "@/components/Question.vue";
import QuizHeader from "@/components/QuizHeader.vue";
import Result from "@/components/Result.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import quizzes from "@/data/quizes.json";

const route = useRoute();

const quizId = parseInt(route.params.id);
const currentQuestionIndex = ref(0);
const numberOfCorrectAnswers = ref(0);
const quiz = quizzes.find((q) => q.id === quizId);
// const questionStatus = ref(
//   `${currentQuestionIndex.value}/${quiz.questions.length}`
// );
// watch(
//   () => currentQuestionIndex.value,
//   () => {
//     questionStatus.value = `${currentQuestionIndex.value}/${quiz.questions.length}`;
//   }
// );
const questionStatus = computed(() => {
  return `${currentQuestionIndex.value}/${quiz.questions.length}`;
});
const barPercentage = computed(
  () => `${(currentQuestionIndex.value / quiz.questions.length) * 100}%`
);
const showResults = ref(false);

function onOptionSelected(isCorrect) {
  if (isCorrect) {
    numberOfCorrectAnswers.value++;
  }

  if (quiz.questions.length === currentQuestionIndex.value + 1) {
    showResults.value = true;
  }

  currentQuestionIndex.value++;
}
</script>

<template>
  <div class="quiz-container">
    <QuizHeader
      :questionStatus="questionStatus"
      :barPercentage="barPercentage"
    />
    <div>
      <Question
        v-if="!showResults"
        :question="quiz.questions[currentQuestionIndex]"
        @selectOption="onOptionSelected"
      />
      <Result
        v-else
        :quizQuestionLength="quiz.questions.length"
        :numberOfCorrectAnswers="numberOfCorrectAnswers"
      />
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  padding-left: 20px;
}
</style>
