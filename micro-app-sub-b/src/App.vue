<template>
  <router-view />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
// 监听函数
const dataListener = (data: never) => {
  console.log('来自主应用的数据', data)
  router.push(data.path)
}

// 监听数据变化
window.microApp.addDataListener(dataListener)
</script>

<style scoped>

</style>
