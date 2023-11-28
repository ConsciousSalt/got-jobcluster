<template>
  <h3>Persons</h3>

  <div>
    <input/>
    <button>search</button>
  </div>

  <div>
    <ul>
      <li v-for="item in list">
        <button @click="itemClickHandler(item.slug)">{{item.name}}</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {getAllCharacters} from "@/api.ts";
import {PersonsResponse} from "@/types.ts";

export default defineComponent({
  name: "Persons List",
  setup(){
    const list = ref<PersonsResponse[]>([]);
    const currentCharacter = ref<PersonsResponse|undefined>(undefined);

    const itemClickHandler = (slug: string) => {
      currentCharacter.value = list.value.find(el=>el.slug===slug);
    }

    onMounted(async ()=>{
      list.value = await getAllCharacters();
    });

    return {
      list,
      itemClickHandler
    }
  }
})
</script>

<style scoped lang="scss">

</style>