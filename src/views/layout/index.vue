<template>
  <div class="h-screen">
    <header-view class="h-header"></header-view>
    <div class="h-main">
      <main-view></main-view>
    </div>
    <floating-view></floating-view>
  </div>
</template>

<script setup>
import headerView from './components/header/index.vue'
import mainView from './components/main/index.vue'
import floatingView from './components/floating/index.vue'
</script>
