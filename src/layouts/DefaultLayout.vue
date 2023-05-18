<template>
  <div class="LayoutDefault">
    <MainHeader/>
    <main>
      <slot/>
    </main>
  </div>
</template>
<script setup>
import MainHeader from "../components/MainHeader.vue";
</script>