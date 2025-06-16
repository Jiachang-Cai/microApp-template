<template>
  <t-layout>
    <t-header>
      <t-head-menu :value="active" height="120px">
        <template #logo>
          <img width="136" class="logo" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
        </template>
        <t-menu-item
          v-for="app in apps"
          :key="app.path"
          :value="app.path"
          :to="app.path"
        >
          {{ app.name }}
        </t-menu-item>

        <template #operations>
          <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
          <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="notification-filled" /></a>
          <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="home" /></a>
        </template>
      </t-head-menu>
    </t-header>
    <t-layout class="app-layout-content">
      <t-aside style="border-top: 1px solid var(--component-border)">
        <t-menu theme="light" :value="route.path" height="550px" style="margin-right: 50px">
          <t-menu-item
            v-for="item in currentSideMenu"
            :key="item.path"
            :value="item.path"
            :to="item.path"
          >
            <template #icon>
              <t-icon :name="item.icon" />
            </template>
            {{ item.label }}
          </t-menu-item>
        </t-menu>
      </t-aside>
      <t-layout>
        <t-content>
          <router-view  />
        </t-content>
      </t-layout>
    </t-layout>
  </t-layout>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {useRoute} from 'vue-router'

const active = ref('/')
const route = useRoute()

const apps = [
  { name: '主应用', path: '/'},
  { name: '子应用a', path: '/micro/sub-app-a' },
  { name: '子应用b', path: '/micro/sub-app-b' },
]

const sideMenus = {
  main: [
    { label: '仪表盘', path: '/', icon: 'dashboard' },
    { label: '资源列表', path: '/page-a', icon: 'server' },
    { label: '根目录', path: '/page-b', icon: 'root-list' },
  ],
  'sub-app-a': [
    { label: '首页', path: '/micro/sub-app-a', icon: 'home' },
    { label: '调度平台', path: '/micro/sub-app-a/page-a', icon: 'control-platform' },
    { label: '精确监控', path: '/micro/sub-app-a/page-b', icon: 'precise-monitor' },
  ],
  'sub-app-b': [
    { label: '首页', path: '/micro/sub-app-b', icon: 'home' },
    { label: '消息区', path: '/micro/sub-app-b/page-a', icon: 'mail'},
    { label: '个人中心', path: '/micro/sub-app-b/page-b', icon: 'user-circle'},
  ]
}
const currentSideMenu = ref(sideMenus.main)

const extractAppName = (path: string) => {
  const match = path.match(/^\/micro\/([^/]+)/)
  return match?.[1] ?? ''
}

watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/micro')) {
      const appName = extractAppName(path)
      active.value = `/micro/${appName}`
      currentSideMenu.value = sideMenus[appName as keyof typeof sideMenus]
    } else {
      active.value = '/'
      currentSideMenu.value = sideMenus.main
    }
  },
  { immediate: true }
)

</script>

<style scoped>

</style>
