<template>
  <div class="wrapper" style="height: auto; overflow: unset;">
    <button>
      <span class="material-symbols-outlined">menu</span>
    </button>

    <div class="commands-list">
      <button :class="{active: currentPage === PAGES.houses}" @click="setHousesPage">
        <span class="material-symbols-outlined">foundation</span>
      </button>
      <button :class="{active: currentPage === PAGES.persons}" @click="setPersonsPage">
        <span class="material-symbols-outlined">taunt</span>
      </button>
      <button :class="{active: currentPage === PAGES.quotes}"  @click="setQuotesPage">
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
  import type { PropType } from 'vue'
  import {PAGES} from "@/types.ts";

  export default defineComponent({
    name: "Main Menu",
    computed: {
      PAGES() {
        return PAGES
      }
    },
    props:{
      currentPage:{
        type: Object as PropType<PAGES>,
        required: true
      }
    },
    setup() {
      const setPage = inject<(page: PAGES)=>void>('setPage');
      const getRandomQuotes = inject<(count: number)=>void>('getRandomQuotes');
      const setHousesPage = () => {
        setPage?.(PAGES.houses);
      };
      const setPersonsPage = () => {
        setPage?.(PAGES.persons);
      };
      const setQuotesPage = () => {
        getRandomQuotes?.(5);
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

  .active {
    color: #6366f1;
  }
</style>