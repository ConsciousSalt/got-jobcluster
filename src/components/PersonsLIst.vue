<template>
  <h3>Persons</h3>

  <div>
    <input/>
    <button>search</button>
  </div>

  <div>
    <ul>
      <li v-for="item in list" ref="itemRefs">
        <button
                :class="{active: currentPerson === item.slug}"
                @click="itemClickHandler(item.slug)">
          {{item.name}}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, onMounted, ref} from "vue";
import {getAllCharacters} from "@/api.ts";
import {PersonsResponse} from "@/types.ts";

export default defineComponent({
  name: "Persons List",
  props:{
    currentPerson:{
      type: String,
      default: '',
    }
  },
  setup(props){
    const setActivePerson = inject<(slug: string)=>void>('setActivePerson');
    const list = ref<PersonsResponse[]>([]);
    const itemClickHandler = (slug: string) => {
      setActivePerson?.(slug);
    }

    const itemRefs = ref<HTMLElement[]>([]);

    onMounted(async ()=>{
      list.value = await getAllCharacters();

      setTimeout(()=>{
        if (props.currentPerson) {
          const currentRefIndex = list.value.findIndex(ref=>ref.slug === props.currentPerson);
          if (currentRefIndex >= 0) {
            const el = itemRefs.value[currentRefIndex];
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
      }, 300);
    });

    return {
      list,
      itemRefs,
      itemClickHandler
    }
  }
})
</script>

<style scoped lang="scss">
  .active {
    color: #6366f1;
  }
</style>