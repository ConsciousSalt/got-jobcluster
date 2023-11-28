<template>
  <div class="wrapper">
    <button>
      <span class="material-symbols-outlined">menu</span>
    </button>

    <div class="commands-list">
      <button @click="setHousesPage">
        <span class="material-symbols-outlined">foundation</span>
      </button>
      <button @click="setPersonsPage">
        <span class="material-symbols-outlined">taunt</span>
      </button>
      <button @click="setQuotesPage">
        <span class="material-symbols-outlined">tooltip</span>
      </button>
    </div>
    <div style="margin-top: auto">
      <p>?</p>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, inject} from "vue";
  import {PAGES} from "@/types.ts";

  export default defineComponent({
    name: "Main Menu",
    setup() {
      const setPage = inject<(page: PAGES)=>void>('setPage');
      const setHousesPage = () => {
        setPage?.(PAGES.houses);
      };
      const setPersonsPage = () => {
        setPage?.(PAGES.persons);
      };
      const setQuotesPage = () => {
        setPage?.(PAGES.quotes);
      };

      return {
        setHousesPage,
        setPersonsPage,
        setQuotesPage
      }
    }
  })
</script>

<style scoped lang="scss">
  .wrapper {
    user-select: none;
    height: 100%;
    flex-shrink: 0;
    flex-direction: column;
    display: flex;
    background-color: #6366f1;
  }

  .commands-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 10rem;
  }
</style>