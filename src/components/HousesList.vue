<template>
  <h3>Houses</h3>
  <SearchBar v-model="search_str"/>
  <div class="list">
    <button
          v-for="item in filteredList"
          v-html="item.name"
            :class="{active: currentHouse === item.slug}"
            @click="itemClickHandler(item.slug)"

            >
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, onMounted, ref} from "vue";
import type {ItemInfo} from "@/types.ts";

import {getHousesList} from "@/api.ts";
import SearchBar from "@/components/SearchBar.vue";
import { housesMapFunction, useFilteredList} from "@/mixins/useFilteredList.ts";

export default defineComponent({
  name: "Houses List",
  components: {SearchBar},
  props: {
    currentHouse:{
      type: String
    }
  },
  setup(){
    const list = ref<ItemInfo[]>([]);
    const showHouseInfo = inject<(slug:string)=>void>('showHouseInfo');
    const search_str = ref('');


    const filteredList = useFilteredList(list, housesMapFunction, search_str);

    const itemClickHandler = (slug: string) => {
      if (showHouseInfo) showHouseInfo(slug);
    }

    onMounted(async ()=>{
      list.value = (await getHousesList()).map(({name, slug})=>({name, slug}));
    });

    return {
      filteredList,
      search_str,
      itemClickHandler
    }
  }
})
</script>

<style scoped lang="scss">
    .active, h3{
      color: #6366f1;
    }
  .list {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
</style>