<template>
  <h3>Houses</h3>
  <div class="list">
    <button v-for="item in list" @click="itemClickHandler(item.slug)">
      <span>{{item.name}}</span>
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, onMounted, ref} from "vue";
import type {ItemInfo} from "@/types.ts";

import {getHousesList} from "@/api.ts";

export default defineComponent({
  name: "Houses List",
  setup(){
    const list = ref<ItemInfo[]>([]);
    const showHouseInfo = inject<(slug:string)=>void>('showHouseInfo');
    const itemClickHandler = (slug: string) => {
      if (showHouseInfo) showHouseInfo(slug);
    }

    onMounted(async ()=>{
      list.value = (await getHousesList()).map(({name, slug})=>({name, slug}));
    });

    return {
      list,
      itemClickHandler
    }
  }
})
</script>

<style scoped lang="scss">
    h3{
      color: #6366f1;
    }
  .list {
    display: flex;
    flex-direction: column;
  }
</style>