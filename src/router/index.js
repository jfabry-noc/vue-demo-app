import { createRouter, createWebHistory } from "vue-router";
import QuizView from "@/views/QuizView.vue";
import QuizzesView from "@/views/QuizzesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "quizzes",
      component: QuizzesView,
    },
    { path: "/index", redirect: "/" },
    { path: "/home", redirect: "/" },
    { path: "/quiz/:id", name: "quiz", component: QuizView },
  ],
});

export default router;
