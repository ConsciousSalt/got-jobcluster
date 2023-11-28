<template>
  <div class="top-panel"></div>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Main Content Panel",
  setup() {


  }
})
</script>

<style scoped lang="scss">
  .top-panel {
    height: 60px;
    position: static;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    padding-left: 2rem;
    padding-right: 2rem;
    align-items: center;
    justify-content: space-between;
    display: flex;
    border-color: #dfe7ef;
    background-color: #dfe7ef;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 2rem;
    .content {
      border-radius: 6px;
      border-style: dashed;
      border-width: 2px;
      flex: 1 1 auto;
      border-color: #dfe7ef;
      background-color: #ffffff;
    }
  }
</style>