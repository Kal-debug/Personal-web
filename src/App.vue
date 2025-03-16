<script setup>
import { ref, computed, watch } from 'vue'
import { NConfigProvider, NMessageProvider, NButton, NInput, NForm, NFormItem, NCard, NSpace, NSwitch } from 'naive-ui'
import { useThemeStore } from './stores/themeStore'
import { useWebInfoStore } from './stores/webInfoStore'
import HeaderComponent from './components/MainComponent.vue'

const themeStore = useThemeStore()
const webInfoStore = useWebInfoStore()

const currentPage = ref('home')
const showMessage = ref(false)
const showWelcomeMessage = ref(true)

const menuItems = [
  { label: 'Home', key: 'home' },
  { label: 'About', key: 'about' },
  { label: 'Projects', key: 'projects' },
  { label: 'Contact', key: 'contact' }
]

// Projects section data
const projects = ref([
  { id: 1, name: 'Personal Website', description: 'A personal website built with Vue 3 and Naive UI' },
  { id: 2, name: 'Purchase Predicter', description: 'A predictive model using LLMs and supervised learning to forecast customer purchases.' },
  { id: 3, name: 'College app tracker', description: 'A simple university application tracker to see all the colleges you applied to.' }
])

// Contact form data
const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

// Contact form submissions
const contactSubmissions = ref(JSON.parse(localStorage.getItem('contactSubmissions')) || [])

// Computed property - project count
const projectCount = computed(() => {
  return projects.value.length
})

// Watch for changes in the form
watch(() => contactForm.value, (newValue) => {
  console.log('Form updated:', newValue)
}, { deep: true })

const handleNavigate = (key) => {
  currentPage.value = key
  console.log(`Navigating to: ${key}`)
}

// Toggle theme
const handleToggleTheme = () => {
  themeStore.toggleTheme()
}

// Toggle extra message
const toggleMessage = () => {
  showMessage.value = !showMessage.value
}

// Toggle welcome message
const toggleWelcomeMessage = () => {
  showWelcomeMessage.value = !showWelcomeMessage.value
}

// Submit contact form
const submitContactForm = () => {
  if (contactForm.value.name && contactForm.value.email) {
    // Add submission with timestamp
    const submission = {
      ...contactForm.value,
      id: Date.now(),
      date: new Date().toLocaleString()
    }
    
    contactSubmissions.value.push(submission)
    
    // Save to localStorage
    localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions.value))
    
    // Reset form
    contactForm.value = {
      name: '',
      email: '',
      message: ''
    }
    
    alert('Thank you for your submission!')
  } else {
    alert('Please fill in all required fields')
  }
}

// Delete a submission
const deleteSubmission = (id) => {
  contactSubmissions.value = contactSubmissions.value.filter(sub => sub.id !== id)
  localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions.value))
}

// Increment visitor count when app loads (only once)
if (webInfoStore.users === 0) {
  webInfoStore.usersAdd()
}
</script>

<template>
  <n-config-provider :theme="themeStore.currentTheme">
    <n-message-provider>
      <div class="app-container" :class="{ 'dark-mode': themeStore.isDarkMode }">
        <HeaderComponent
          :menuItems="menuItems"
          :activeKey="currentPage"
          @navigate="handleNavigate"
          @toggleTheme="handleToggleTheme"
        />
        
        <main class="content">
          <!-- Home Section -->
          <div v-if="currentPage === 'home'" class="section">
            <h2>Home Page</h2>
            
            <div class="welcome-toggle">
              <n-switch v-model:value="showWelcomeMessage" />
              <span>Toggle Welcome Message</span>
            </div>
            
            <div v-if="showWelcomeMessage" class="welcome-message">
              <p>Welcome to my personal website! This site was built using Vue 3 and demonstrates various Vue concepts.</p>
            </div>
            
            <n-button @click="toggleMessage" class="toggle-btn">
              {{ showMessage ? 'Hide' : 'Show' }} Extra Info
            </n-button>
            
            <transition name="fade">
              <div v-show="showMessage" class="extra-info">
                <p>This website is a work in progress and will continue to be improved throughout the semester. 
                  Look out for interesting features, more interactive elements, and a refined user experience as development progresses.</p>
              </div>
            </transition>
          </div>
          
          <!-- About Section -->
          <div v-else-if="currentPage === 'about'" class="section">
            <h2>About Me</h2>
            <p>I am a computer science student learning web developement specialized in Vue.js and modern frontend technologies.</p>
            
            <div class="stats">
              <p>Website Statistics:</p>
              <p>Visitors: {{ webInfoStore.users }}</p>
              <n-button @click="webInfoStore.usersAdd" class="counter-btn">Increment Counter</n-button>
            </div>
          </div>
          
          <!-- Projects Section -->
          <div v-else-if="currentPage === 'projects'" class="section">
            <h2>My Projects</h2>
            <p>Completed and ongoing {{ projectCount }} projects.</p>
            
            <div v-if="projects.length === 0" class="no-projects">
              <p>No projects available</p>
            </div>
            
            <div v-else class="projects-list">
              <n-card v-for="project in projects" :key="project.id" class="project-card">
                <h3>{{ project.name }}</h3>
                <p>{{ project.description }}</p>
              </n-card>
            </div>
          </div>
          
          <!-- Contact Section -->
          <div v-else-if="currentPage === 'contact'" class="section">
            <h2>Contact Me</h2>
            
            <n-form class="contact-form">
              <n-form-item label="Name" required>
                <n-input v-model:value="contactForm.name" placeholder="Enter your name" />
              </n-form-item>
              
              <n-form-item label="Email" required>
                <n-input v-model:value="contactForm.email" placeholder="Enter your email" />
              </n-form-item>
              
              <n-form-item label="Message">
                <n-input
                  v-model:value="contactForm.message"
                  type="textarea"
                  placeholder="Enter your message"
                  :rows="4"
                />
              </n-form-item>
              
              <n-button type="primary" @click="submitContactForm">Submit</n-button>
            </n-form>
            
            <div v-if="contactSubmissions.length > 0" class="submissions">
              <h3>Previous Submissions</h3>
              <n-card v-for="submission in contactSubmissions" :key="submission.id" class="submission-card">
                <n-space justify="space-between">
                  <div>
                    <p><strong>Name:</strong> {{ submission.name }}</p>
                    <p><strong>Email:</strong> {{ submission.email }}</p>
                    <p><strong>Message:</strong> {{ submission.message }}</p>
                    <p><strong>Date:</strong> {{ submission.date }}</p>
                  </div>
                  <n-button @click="deleteSubmission(submission.id)" size="small">Delete</n-button>
                </n-space>
              </n-card>
            </div>
          </div>
        </main>
        
        <!-- Footer Section -->
        <footer class="footer">
          <div class="footer-content">
            <p>© 2025 Personal Website. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  padding-top: 120px; /* Height of the header */
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  color: #333;
}

.app-container.dark-mode {
  background-color: #2c2c2c;
  color: #f5f5f5;
}

.content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease-in-out;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.dark-mode .section {
  background-color: #3a3a3a;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
}

.welcome-toggle {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 10px;
}

.welcome-message {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

/* Improve text visibility in contact cards (dark mode) */
.dark-mode .submission-card .n-card__content {
  color: #f5f5f5;
  background-color: #444;
}

/* Make form inputs more visible in dark mode */
.dark-mode .n-input {
  color: #f5f5f5;
}

/* Ensure form labels are visible in dark mode */
.dark-mode .n-form-item-label {
  color: #f5f5f5 !important;
}

.dark-mode .welcome-message {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Button styling for better visibility in both themes */
.toggle-btn {
  margin-bottom: 1rem;
  background-color: #4a7bff !important;
  color: white !important;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.toggle-btn:hover {
  background-color: #3a6be0 !important;
  transform: scale(1.05);
}

.toggle-btn {
  margin-bottom: 1rem;
}

/* Fade transition for toggled content */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.extra-info {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  animation: fadeIn 0.3s ease-in-out;
}

.dark-mode .extra-info {
  background-color: rgba(255, 255, 255, 0.1);
}

.stats {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #9e9e9ee5;
  border-radius: 8px;
}

.dark-mode .stats {
  background-color: rgba(255, 255, 255, 0.1);
}

.counter-btn {
  margin-top: 0.5rem;
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.project-card {
  height: 100%;
}

.contact-form {
  width: 100%;
  margin-bottom: 2rem;
  color: rebeccapurple;
}

/* For form labels in dark mode */
.n-form-item-label {
  color: #1a202c !important;
}

.n-input__input-el::placeholder {
  color: #718096 !important;
}

.dark-mode .n-form-item-label {
  color: #f7fafc !important;
}

.dark-mode .n-input__input-el::placeholder {
  color: #a0aec0 !important;
}

.dark-mode .n-input__input-el {
  color: #f7fafc !important;
}

.dark-mode .n-input {
  background-color: #2d3748 !important;
  border-color: #4a5568 !important;
}

.submissions {
  width: 100%;
  margin-top: 2rem;
}

.submissions h3 {
  margin-bottom: 1rem;
}

.submission-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.375rem;
}

/* Fix for form labels in dark mode */
.dark-mode .n-form-item-label {
  color: #f5f5f5 !important;
}
.submissions {
  width: 100%;
  margin-top: 2rem;
}

.submissions h3 {
  margin-bottom: 1rem;
}

.submission-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.375rem;
}

/* Base input styling - removing the !important where not necessary */
.contact-form input,
.contact-form textarea,
.n-input {
  border: 1px solid #cbd5e0;
  color: #1a202c;
  background-color: #ffffff;
}

/* Add these specific rules to fix the text color in dark mode */
.dark-mode input[type="text"],
.dark-mode input[type="email"],
.dark-mode textarea {
  color: #f7fafc !important; /* Force light text in dark mode */
}

/* This ensures the text is always visible regardless of mode */
input, textarea {
  color: inherit !important;
}

/* Placeholder text styling */
.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #718096;
}

/* Dark mode overrides - fixing the double border issue and text visibility */
.dark-mode .contact-form input,
.dark-mode .contact-form textarea,
.dark-mode .n-input {
  border: 1px solid #4a5568; /* Removed !important to prevent double border */
  color: #f7fafc;
  background-color: #2d3748;
}

/* Placeholder text in dark mode */
.dark-mode .contact-form input::placeholder,
.dark-mode .contact-form textarea::placeholder {
  color: #a0aec0;
}

/* Ensuring input text is visible in both modes */
.contact-form input,
.contact-form textarea {
  color: #1a202c;
}

.dark-mode .contact-form input,
.dark-mode .contact-form textarea {
  color: #f7fafc;
}


/* Footer styling */
.footer {
  width: 100%;
  background-color: #222;
  color: #fff;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* For mobile use (test phase) */
@media (max-width: 768px) {
  .app-container {
    padding-top: 120px; /* Adjusted for mobile header height */
  }
  
  .projects-list {
    grid-template-columns: 1fr;
  }
  
  .section {
    padding: 1.5rem;
  }
}
</style>