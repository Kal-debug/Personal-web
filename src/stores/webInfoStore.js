// stores/webInfoStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebInfoStore = defineStore('webInfo', () => {
  // State
  const webInfo = ref({
    name: 'Kaleab Abebe - Portfolio',
    url: 'https://kaleab-portfolio.com',
    email: 'contact@kaleab-portfolio.com',
    socialLinks: {
      github: 'https://github.com/kaleab',
      linkedin: 'https://linkedin.com/in/kaleab',
      twitter: 'https://twitter.com/kaleab'
    }
  })
  
  const users = ref(0)
  
  // Actions
  function updateWebInfo(newInfo) {
    webInfo.value = { ...webInfo.value, ...newInfo }
  }
  
  function usersAdd() {
    users.value++
  }
  
  function usersReset() {
    users.value = 0
  }
  
  return { 
    webInfo, 
    users, 
    updateWebInfo, 
    usersAdd, 
    usersReset 
  }
}, {
  persist: {
    storage: localStorage,
    paths: ['webInfo', 'users']
  }
})