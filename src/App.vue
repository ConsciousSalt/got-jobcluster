<script setup lang="ts">
import MainMenu from '@/components/MainMenu.vue'
</script>

<template>
  <MainMenu/>
</template>

<style lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}


body {
  background-image: url("@/assets/Download-1920x1080-wallpaper-dragon-and-night-king-artwork-.jpg");
  background-origin: content-box;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(4px);
}
</style>
