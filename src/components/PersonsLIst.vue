<template>
  <h3>Persons</h3>
  <SearchBar v-model="search_str"/>
   <div>
    <ul class="list">
      <li :id="item.slug" v-for="item in filteredList" ref="itemRefs">
        <button
            v-html="item.name"
                :class="{active: currentPerson === item.slug}"
                @click="itemClickHandler(item.slug)">
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, onMounted, ref} from "vue";

import SearchBar from "@/components/SearchBar.vue";
import {useFilteredList, personsMapFunction} from "@/mixins/useFilteredList.ts";

import {getAllCharacters} from "@/api.ts";
import {PersonType} from "@/types.ts";

export default defineComponent({
  name: "Persons List",
  components:{
    SearchBar,
  },
  props:{
    currentPerson:{
      type: String,
      default: '',
    }
  },
  setup(props){
    const scrollIntoView = inject<(slug: string)=>void>("scrollIntoView");
    const setActivePerson = inject<(slug: string)=>void>('setActivePerson');

    const itemRefs = ref<HTMLElement[]>([]);
    const list = ref<PersonType[]>([]);
    const search_str = ref('');

    const filteredList = useFilteredList(list, personsMapFunction, search_str);

    const itemClickHandler = (slug: string) => {
      setActivePerson?.(slug);
    }

    onMounted(async ()=>{
      list.value = await getAllCharacters();

      setTimeout(()=>{
        if (props.currentPerson) scrollIntoView?.(props.currentPerson);
      }, 300);
    });

    return {
      list,
      filteredList,
      itemRefs,
      search_str,
      itemClickHandler
    }
  }
})
</script>

<style scoped lang="scss">
  .active, h3 {
    color: #6366f1;
  }

  .list {
    list-style-type: none; /* Remove bullets */
    padding: 0; /* Remove padding */
    margin: 3rem 0 ; /* Remove margins */
    li{
      width: 100%;
      margin: 0.3rem 0;
      padding: 0.1rem;
      button {
        width: 100%;
      }
    }
  }
</style>