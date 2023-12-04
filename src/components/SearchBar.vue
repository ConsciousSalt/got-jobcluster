<template>
  <div class="search-box">
    <label for="search_inpt">Search:</label>
    <input id="search_inpt" v-model="searchStr"/>
    <button @click="searchStr=''">
      <span class="material-symbols-outlined">
        close_small
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';

export default defineComponent({
  name: 'Search',
  props:{
    modelValue: {
      type: String,
      required: true,

    }
  },
  emits:['update:modelValue'],
  setup(props, {emit}) {
    const searchStr = computed({
      get() {
        return props.modelValue?.toLowerCase();
      },
      set(val) {
        emit('update:modelValue', val);
      }
    });

    return {
      searchStr
    }
  }
});
</script>

<style scoped lang="scss">
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
      label {
        color: #6366f1;
      }
  }
</style>