# Vue 3 Personal Website

A responsive personal website built with Vue 3, Vite, and Naive UI. This project demonstrates various Vue 3 concepts including reactivity, component structure, conditional rendering, and state management with Pinia.

## Project Description

This is a single-page application (SPA) personal website with multiple sections:

- Home: Introduction with a togglable welcome message and extra information
- **About**: Personal information with visitor counter
- **Projects**: List of projects with conditional rendering
- **Contact**: Contact form with validation and localStorage persistence

## Features

- Reactive state management using `ref()` and Pinia stores
- Two-way data binding with `v-model` in the contact form
- List rendering with `v-for` in the projects section
- Conditional rendering using `v-if` and `v-show`
- Event handling with `v-on` (@click)
- Computed properties for derived data
- Watchers to track form changes
- Dark/light theme toggle
- Visitor counter
- Contact form submissions stored in localStorage
- Smooth transition animations

## Technology Stack

- Vue 3 with Composition API
- Vite as build tool
- Pinia for state management
- Naive UI component library
- localStorage for data persistence

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vue3-personal-website.git
   cd vue3-personal-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   └── MainComponent.vue
├── stores/
│   ├── themeStore.js
│   └── webInfoStore.js
├── App.vue
└── main.js
```

## Development Challenges

- Implementing persistent storage with Pinia required properly configuring the persistedstate plugin
- Managing state across components while keeping the code organized
- Implementing smooth transitions and animations
- Implementing theme toggle functionality caused unexpected styling issues, particularly with form controls becoming invisible in dark mode due to color inheritance problems
- Ensuring proper styling persistence between theme changes required careful CSS specificity management and overriding Naive UI's default component styles
- CSS transitions between pages and components where natural-feeling animations needed major css element adjustments to achieve
- State management for form submissions required careful synchronization between components and persistent storage
- Handling conditional rendering while maintaining smooth transitions between content sections proved challenging

## Future Enhancements

- Add more interactive elements
- Implement form validation with better user feedback
- Expand the projects section with filtering and sorting capabilities
- Add a blog section with dynamic content
- Implement routing for better URL management

## Credits

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Naive UI](https://www.naiveui.com/)
- [Pinia](https://pinia.vuejs.org/)
