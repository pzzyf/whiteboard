<script setup>
import { onMounted, ref } from 'vue'

const canvas = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, 100, 100)
})
</script>

<template>
  <canvas ref="canvas" width="100" height="100" />
</template>

<style scoped>

</style>
