// stores/themeStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { darkTheme } from 'naive-ui'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDarkTheme = ref(false)
  
  // Getters
  const currentTheme = computed(() => 
    isDarkTheme.value ? darkTheme : null
  )
  
  // Actions
  function toggleTheme() {
    isDarkTheme.value = !isDarkTheme.value
  }
  
  function setDarkTheme(value) {
    isDarkTheme.value = value
  }
  
  return { 
    isDarkTheme, 
    currentTheme, 
    toggleTheme, 
    setDarkTheme 
  }
}, {
  persist: true // Persist the entire store
})