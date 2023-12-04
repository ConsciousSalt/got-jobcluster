<template>
  <h3>Persons</h3>

  <div class="search-box">
    <label for="search_inpt">Search:</label>
    <input id="search_inpt" v-model="search_str"/>
    <button @click="search_str=''">
      <span class="material-symbols-outlined">
        close_small
      </span>
    </button>
  </div>

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
import {computed, defineComponent, inject, onMounted, ref} from "vue";
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
    const scrollIntoView = inject<(slug: string)=>void>("scrollIntoView");
    const setActivePerson = inject<(slug: string)=>void>('setActivePerson');

    const itemRefs = ref<HTMLElement[]>([]);
    const list = ref<PersonsResponse[]>([]);
    const search_str = ref('');

    const filteredList = computed(()=>{
      if (!Array.isArray(list.value) || !list.value.length) return [];
      const inputValue = search_str.value.trim();
      if (inputValue.length) {
        const regexp = new RegExp(inputValue, 'ig');
        return list.value.filter(el=>regexp.test(el.name) || regexp.test(el.house?.name||'')).map(el=>{
          let highlightedText;
          if (regexp.test(el.name)) {
            const index = el.name.toLowerCase().indexOf(inputValue.toLowerCase());
            highlightedText =
                el.name.substring(0, index) +
                `<span style="background-color: #637087; font-weight: bold;">${el.name.substring(index, index + inputValue.length)}</span>` +
                el.name.substring(index + inputValue.length);
          } else {
            highlightedText =
                el.name +
                `<span style="background-color: #637087; font-weight: bold;"> of ${el.house?.name}</span>`;
          }

          return {...el,
            name: highlightedText
          };
        });
      }

      return list.value;
    })

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
  .active, h3, label {
    color: #6366f1;
  }

  .search-box {
    display: flex;
    flex-direction: row;

    input {
      flex-grow: 1;
      flex-basis: 8rem;
      max-width: 8rem;
    }
    button {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
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