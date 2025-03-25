Below is a sample README.md you can adapt for your personal website project. It explains how each major file ties into the overall application, highlights the Vue features you used, and documents libraries like Pinia and Naive UI. Feel free to adjust the wording and structure as needed.

---

# Personal Website (Vue 3)

This project is a personal website built with **Vue 3**, featuring multiple sections (Home, Projects, Contact), interactive elements, and global state management using **Pinia**. It serves as a showcase of Vue fundamentals—including reactivity, two-way data binding, conditional rendering, list rendering, computed properties, watchers, and component-based architecture. Styling is handled with both standard CSS (`style.css`) and **Naive UI** components.

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Key Features and Requirements](#key-features-and-requirements)  
3. [Libraries Used](#libraries-used)  
4. [File Structure](#file-structure)  
   - [App.vue](#appvue)  
   - [MainComponent.vue](#maincomponentvue)  
   - [main.js](#mainjs)  
   - [themeStore.js](#themestorejs)  
   - [webInfoStore.js](#webinfostorejs)  
   - [style.css](#stylecss)  
   - [vite.config.js](#viteconfigjs)  
5. [Setup & Installation](#setup--installation)  
6. [Usage Notes](#usage-notes)  
7. [Future Enhancements](#future-enhancements)  

---

## 1. Project Overview

**Goal:** Create a single-page personal website with at least three sections (Home, Projects, and Contact), plus additional interactive elements such as a counter, toggles, and form submission. The project demonstrates the following Vue concepts:

- **Reactivity** with `ref()`
- **Two-way data binding** with `v-model`
- **List rendering** with `v-for`
- **Conditional rendering** with `v-if` and `v-show`
- **Event handling** with `v-on`
- **Computed properties** with `computed()`
- **Watchers** with `watch()`
- **Component-based structure**
- **Pinia** for state management
- **Naive UI** for UI styling and components

---

## 2. Key Features and Requirements

1. **Website Sections**  
   - **Home:** Displays a welcome message (uses `v-if` for conditional display).  
   - **Projects:** Displays a list of projects with `v-for`.  
   - **Contact:** Contains a form with `v-model` bindings for user input.

2. **Interactivity & State**  
   - A reactive counter that increments on a button click (uses `ref()` and `v-on`).  
   - A toggle button to show/hide extra information (uses `v-show`).  
   - A summary of data in computed properties (e.g., total number of projects).  
   - A watcher to track form input changes and log them to the console.

3. **Styling & Documentation**  
   - `v-if` to show "No projects available" if the list is empty.  
   - `v-show` to hide/display additional details.  
   - A `README.md` that explains setup steps, file structure, and usage.

4. **Extra**  
   - Storing form submissions in `localStorage`.  
   - Adding basic animations or transitions for a smooth user experience.  

---

## 3. Libraries Used

### Pinia
Pinia is used for state management across the application. By using **Pinia**, you can keep data (such as theme preferences, user info, or other global states) in a centralized store, making it easier to share state between components.

### Naive UI
Naive UI is a Vue 3 UI components library. It provides ready-made styled components (e.g., buttons, forms, modals), allowing you to maintain consistent styling throughout your website.

---

## 4. File Structure

Below is an overview of the primary files in this project and how they work together:

### App.vue
- **Role:** The root component that wraps the entire website.  
- **Key Points:**  
  - Often contains the main layout or navigation.  
  - May import `MainComponent.vue` or other child components.  
  - Could hold global elements like headers, footers, or theme toggles.  

### MainComponent.vue
- **Role:** The core component that includes the Home, Projects, and Contact sections (or references them as child components).  
- **Key Points:**  
  - **Home Section:** Displays a welcome message using `v-if`.  
  - **Projects Section:** Renders a list with `v-for`.  
    - Uses `computed()` to calculate the total number of projects.  
    - Uses `v-if` to display a "No projects available" message if empty.  
  - **Contact Section:** A form with `v-model` on input fields.  
    - A `watch()` may log changes to form data.  
    - Possibly stores data in `localStorage`.  
  - Includes interactive elements:
    - **Counter:** A `ref()` variable that increments on button clicks (`v-on`).  
    - **Toggle:** A boolean for showing/hiding extra info with `v-show`.

### main.js
- **Role:** The application’s entry point.  
- **Key Points:**  
  - Initializes the Vue app with `createApp()`.  
  - Sets up **Pinia** as the store plugin:  
    ```js
    import { createPinia } from 'pinia'
    const pinia = createPinia()
    app.use(pinia)
    ```
  - Optionally configures **Naive UI** plugins or components globally.  
  - Mounts the root component (usually `App.vue`) to `#app`.

### themeStore.js
- **Role:** Pinia store that manages theme-related data (e.g., light or dark mode).  
- **Key Points:**  
  - Contains state, getters (computed-like), and actions (methods) to update the theme.  
  - Exposes a reactive store used across components to detect and switch themes.  

### webInfoStore.js
- **Role:** Pinia store that manages additional website data such as user info, project data, or form submissions.  
- **Key Points:**  
  - Could hold the list of projects displayed in `MainComponent.vue`.  
  - Could store user input from the Contact form.  
  - May contain watchers, computed properties, or persistence logic (e.g., localStorage).  

### style.css
- **Role:** Global stylesheet for customizing the look and feel of the application.  
- **Key Points:**  
  - Defines global CSS variables, body styles, and resets.  
  - Uses media queries for light/dark color schemes.  
  - Provides a base for consistent typography and spacing across your components.

### vite.config.js
- **Role:** Configuration file for the Vite bundler.  
- **Key Points:**  
  - You can customize build options, alias paths, and dev server settings here.  
  - Often minimal for straightforward Vue 3 projects, but easily extended as needed.

---

## 5. Setup & Installation

Follow these steps to get the project running locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Open the app** in your browser at the URL provided in your terminal (typically `http://localhost:5173/` or similar).

---

## 6. Usage Notes

- **Reactivity:** All reactive data is defined via `ref()` or `reactive()` either inside components or within Pinia stores.  
- **Form Handling:** The `Contact` form uses `v-model` to sync user input with reactive variables. A watcher may log changes or store data in localStorage for persistence.  
- **Counter & Toggle:** Demonstrates event handling with `v-on` for incrementing the counter and toggling extra information display with `v-show`.  
- **Conditional Rendering:** `v-if` checks if there are any projects to show; if none exist, a “No projects available” message appears.  
- **Computed & Watch:**  
  - A computed property calculates the total number of projects.  
  - A watcher triggers whenever user input changes to log or process data.  

---

## 7. Future Enhancements

- **Expand Pinia Stores:** Add more stores or modules for complex data (e.g., user profiles, analytics).  
- **Enhanced UI with Naive UI Components:** Utilize Naive UI’s forms, modals, and more advanced components.  
- **Routing:** Integrate Vue Router for deeper navigation if you want multiple pages or dynamic routes.  
- **Server-Side Storage:** Replace localStorage with an actual backend or database to store form submissions securely.  
- **Animations & Transitions:** Increase UI polish with transitions (Vue’s `<transition>`), or CSS animations to highlight state changes.  

---

**Enjoy building and extending your personal website!** If you have any questions about the architecture or features, feel free to reach out.
