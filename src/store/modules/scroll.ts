// stores/scroll.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useScrollStore = defineStore("scroll", () => {
  const top = ref(0);
  function setTop(val: number) {
    top.value = val;
  }

  return {
    top,
    setTop,
  };
});
