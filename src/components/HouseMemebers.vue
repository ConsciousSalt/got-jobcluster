<template>
  <div class="list-wrapper">
    <ul class="list" :class="{'list-single-item': list.length===1}">
      <li class="item" v-for="item in list">
        <button @click="itemClickHandler(item.slug)">
          {{item.name}}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch, inject} from "vue";
import {getHouseDetails} from "@/api.ts";
import {ItemInfo, PAGES} from "@/types.ts";

export default defineComponent({
  name: "House members",
  props:['houseSlug'],
  setup(props){
    const setPage = inject<(page: PAGES)=>void>('setPage');
    const setActivePerson = inject<(slug: string)=>void>('setActivePerson');

    const list = ref<ItemInfo[]>([]);
    const isLoading = ref(false);
    const itemClickHandler = (slug: string) => {
      setActivePerson?.(slug);
      setPage?.(PAGES.persons);
    }

    const loadHouseMembers = async () => {
      isLoading.value = true;
      list.value = await getHouseDetails(props["houseSlug"]);
      isLoading.value = false;
    }

    watch(()=>props['houseSlug'], loadHouseMembers, {immediate: true});

    return {
      list,
      itemClickHandler
    }
  }
})
</script>


<style scoped lang="scss">
  .list {
    height: 100%;
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    justify-items: center;
    align-items: center;
    justify-content: space-evenly;
    align-content: space-evenly;
    row-gap: 0.5rem;

    &-single-item {
      grid-template-columns: 1fr;
    }

    .item{
      width: 100%;
      height: 100%;
      padding: 0.1rem;

      button {
        width: 75%;
        height: 100%;
      }
    }

    &-wrapper {
      height: 100%
    }
  }
</style>