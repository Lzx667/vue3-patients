<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <RoomStatus></RoomStatus>
    <RoomMessage></RoomMessage>
    <RoomAction></RoomAction>
  </div>
</template>

<style lang="scss" scoped></style>
