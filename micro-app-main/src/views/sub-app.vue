<template>
  <div>
    <micro-app
      style="height: 100%"
      v-if="appInfo"
      :name="appInfo.name"
      :url="appInfo.baseUrl"
      iframe
      clear-data
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import microApp from '@micro-zoe/micro-app'

const route = useRoute()

const appsMap: Record<string, { name: string; baseUrl: string }> = {
  'sub-app-a': {
    name: 'sub-app-a',
    baseUrl: 'http://localhost:7100',
  },
  'sub-app-b': {
    name: 'sub-app-b',
    baseUrl: 'http://localhost:7200',
  },
}

const appInfo = ref<{ name: string; baseUrl: string } | null>(null)

const extractAppName = (path: string) => {
  const match = path.match(/^\/micro\/([^/]+)/)
  return match?.[1] ?? ''
}

const extractSubPath = (path: string) => {
  const match = path.match(/^\/micro\/[^/]+(\/.*)?$/)
  return match?.[1] ?? '/'
}

watch(
  () => route.path,
  (path) => {
    const name = extractAppName(path)
    const subPath = extractSubPath(path)
    const info = appsMap[name]
    if (info) {
      appInfo.value = info
      // 通知子应用切换路由
      microApp.setData(info.name, { path: subPath })
    } else {
      appInfo.value = null
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
