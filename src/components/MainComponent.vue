<!-- HeaderComponent.vue -->
<script setup>
import { NLayout, NLayoutHeader, NMenu, NButton, NSpace } from 'naive-ui'
import { useWebInfoStore } from '../stores/webInfoStore'
import { useThemeStore } from '../stores/themeStore'

const webInfoStore = useWebInfoStore()
const themeStore = useThemeStore()

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  activeKey: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['navigate', 'toggleTheme'])

const handleMenuClick = (key) => {
  emit('navigate', key)
}

// Keep emitting the event to App.vue, which will call the store method
const handleThemeToggle = () => {
  emit('toggleTheme')
}
</script>

<template>
  <n-layout-header bordered class="header">
    <div class="header-content">
      <div class="logo-section">
        <h1>{{ webInfoStore.webInfo.name }}</h1>
      </div>
      <div class="nav-section">
        <n-menu
          mode="horizontal"
          :options="props.menuItems"
          :value="props.activeKey"
          @update:value="handleMenuClick"
        />
      </div>
      <div class="actions-section">
        <n-space>
          <n-button @click="handleThemeToggle">
            Toggle Theme
          </n-button>
          <div>
            Visitors: {{ webInfoStore.users }}
            <n-button size="small" @click="webInfoStore.usersAdd">+</n-button>
          </div>
        </n-space>
      </div>
    </div>
  </n-layout-header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  background-color: #9e9e9e;
  border-bottom: none
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 64px;
}
.logo-section h1 {
  margin: 0;
  font-size: 1.5rem;
}
.nav-section {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
.actions-section {
  display: flex;
  align-items: center;
}
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
  .nav-section {
    margin: 10px 0;
  }
}
</style>