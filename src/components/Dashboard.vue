<template>
  <div class="wrapper">
    <div class="content">
      <div class="header">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Dashboard",
  setup() {}
})
</script>

<style scoped lang="scss">
  .wrapper {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    padding: 1.5rem;
    overflow-y: auto;
    width: 250px;
    .content {
      border-color:#dfe7ef;
      flex: 1 1 auto;
      border-width: 2px;
      border-style: dashed;
      border-radius: 6px;
      .header {
        color:#111827;
        font-weight: 500;
        font-size: 1.25rem;
        padding: 1rem;
      }
    }
  }
</style>