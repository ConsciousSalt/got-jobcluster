<template>
  <h1 class="quotes-header">Quotations:</h1>
  <div class="quotes-list">
    <div class="quotes-list-item" v-for="quote in quotesList">
      <div>
        <span class="material-symbols-outlined" style="font-size: 1.5rem; color:#6366f1; transform: translateY(-10px)">
          format_quote
        </span>
          <p class="quotes-list-item-content">{{quote.sentence}}</p>
          <span class="material-symbols-outlined" style="font-size: 1.5rem; color:#6366f1; transform: rotate(180deg) translateY(-10px)">
          format_quote
        </span>
      </div>
      <div class="quotes-list-item-character--link" v-if="showPersonName && !!quote.character">
        <a @click.prevent="selectPersonHandler(quote.character.slug)">{{quote.character.name}}</a>
      </div>
    </div>
  </div>

  <button class="quotes-button--refresh" @click="$emit('refreshList')">
    <span class="material-symbols-outlined">
      refresh
    </span>
    Refresh
  </button>
</template>

<script lang="ts">
import {defineComponent, inject, PropType} from "vue";
import {PAGES, QuoteType} from "@/types.ts";

export default defineComponent({
  name: "Quotes List",
  props: {
    quotesList:{
      type: Object as PropType<QuoteType[]>,
      required: true
    },
    showPersonName:{
      type: Boolean,
      default: false
    }
  },
  emits:["refreshList"],
  setup() {
    const setPage = inject<(page: PAGES)=>void>('setPage');
    const setActivePerson = inject<(slug: string)=>void>('setActivePerson');

    const selectPersonHandler = (slug: string) => {
      setActivePerson?.(slug);
      setPage?.(PAGES.persons);
    }

    return {
      selectPersonHandler
    }
  }
})
</script>

<style scoped lang="scss">
.quotes {
  &-header {
    color: #111827;
    font-weight: 700;
    font-size: 4rem;
    margin: 0;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;

    &-item{
      display: flex;
      flex-direction: column;
      gap: 1rem;

      & > div {
        display: flex;
        align-items: normal;
        gap: 0.5rem;
      }

      &-content{
        color: #374151;
        font-size: 1rem;
        line-height: 1.5;
        margin-top: 0;
        margin-bottom: 0;
      }

      &-character--link {
        padding: 0.8rem;
        align-self: flex-end;
        cursor: pointer;
      }
    }
  }

  &-button--refresh {
    background: #fff;
    font-size: 1.5rem;
    color: rgb(99, 102, 241);
    max-width: 150px;
    align-self: self-end;
    padding: 4.8px;
    margin-top: 5.5rem;
    margin-right: 2.5rem;
    border: 1px solid;
  }
}

</style>