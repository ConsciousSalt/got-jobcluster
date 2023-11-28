<template>
  <div>
    <ul>
      <li v-for="item in list">
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

</style>