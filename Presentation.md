# Personal Website (Vue 3) Presentation

This project is a personal website built with **Vue 3**, featuring multiple sections (Home, Projects, Contact), interactive elements, and global state management using **Pinia**. It serves as a showcase of Vue fundamentals—including reactivity, two-way data binding, conditional rendering, list rendering, computed properties, watchers, and component-based architecture. Styling is handled with both standard CSS (`style.css`) and **Naive UI** components.

## Table of Contents

- [1. Project Overview](#1-project-overview)  
- [2. Key Features and Requirements](#2-key-features-and-requirements)  
- [3. Libraries Used](#3-libraries-used)  
- [4. File Structure](#4-file-structure)  
  - [App.vue](#appvue)  
  - [MainComponent.vue](#maincomponentvue)  
  - [main.js](#mainjs)  
  - [themeStore.js](#themestorejs)  
  - [webInfoStore.js](#webinfostorejs)  
  - [style.css](#stylecss)  
  - [vite.config.js](#viteconfigjs)  
- [5. Setup & Installation](#5-setup--installation)  
- [6. Usage Notes](#6-usage-notes)  
  - [6.1. Counter Functionality](#61-counter-functionality)  
  - [6.2. Toggle Functions (Theme & Layout)](#62-toggle-functions-theme--layout)  
  - [6.3. Smooth Animations & Transitions](#63-smooth-animations--transitions)  
- [7. Deployment on GitHub Pages](#7-deployment-on-github-pages)

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
   - Uses `v-if` to show a "No projects available" message if the project list is empty.  
   - Uses `v-show` to display or hide additional details.  
   - Includes smooth transitions and animations for an enhanced user experience.

4. **Extra**  
   - Storing form submissions in `localStorage`.  
   - Basic animations and transitions to provide a polished UI.

---

## 3. Libraries Used

### Pinia
Pinia is used for state management across the application. It centralizes data (such as theme preferences, user counts, or form submissions) so that components can share state easily.

### Naive UI
Naive UI is a Vue 3 UI components library that offers ready-made styled components (e.g., buttons, forms, modals), ensuring consistent styling throughout the website.

---

## 4. File Structure

Below is an overview of the primary files in this project and how they work together:

### App.vue
- **Role:** The root component that wraps the entire website.  
- **Key Points:**  
  - Contains the main layout or navigation.  
  - Imports `MainComponent.vue` or other child components.  
  - May hold global elements like headers, footers, or theme toggles.

### MainComponent.vue
- **Role:** The core component that includes the Home, Projects, and Contact sections (or references them as child components).  
- **Key Points:**  
  - **Home Section:** Displays a welcome message using `v-if`.  
  - **Projects Section:**  
    - Renders a list with `v-for`.  
    - Uses `computed()` to calculate the total number of projects.  
    - Uses `v-if` to display a "No projects available" message if empty.  
  - **Contact Section:**  
    - A form with `v-model` on input fields.  
    - May log changes to form data via a `watch()` and persist data to `localStorage`.  
  - **Interactive Elements:**  
    - **Counter:** A `ref()` variable increments on button clicks (`v-on`).  
    - **Toggle:** A boolean toggles extra information visibility with `v-show`.

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
  - Contains state, getters, and actions to update the theme.  
  - Exposes a reactive store used across components to switch themes.

### webInfoStore.js
- **Role:** Pinia store that manages additional website data such as user info, project data, or form submissions.  
- **Key Points:**  
  - Stores the list of projects displayed in `MainComponent.vue`.  
  - Captures user input from the Contact form.  
  - May include watchers, computed properties, and persistence logic (e.g., localStorage).

### style.css
- **Role:** Global stylesheet for customizing the look and feel of the application.  
- **Key Points:**  
  - Defines global CSS variables, body styles, and resets.  
  - Uses media queries for light/dark color schemes.  
  - Provides base typography and spacing rules along with transitions for smooth animations.

### vite.config.js
- **Role:** Configuration file for the Vite bundler.  
- **Key Points:**  
  - Customizes build options, alias paths, and dev server settings.  
  - Includes the base path configuration for GitHub Pages:
    ```js
    export default defineConfig({
      base: '/your-repo-name/',
      plugins: [vue()],
    });
    ```

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
4. **Open the app** in your browser at the URL provided in your terminal (typically `http://localhost:5173/`).

---

## 6. Usage Notes

- **Reactivity:**  
  All reactive data is defined via `ref()` or `reactive()` either inside components or within Pinia stores.

- **Form Handling:**  
  The `Contact` form uses `v-model` to sync user input with reactive variables. A watcher may log changes or store data in localStorage for persistence.

- **Counter & Toggle:**  
  - **Counter Functionality:**  
    A `ref(0)` stores the user count. Each button click increments this counter, demonstrating real-time reactivity using `v-on`.
  
  - **Toggle Functions (Theme & Layout):**  
    - The **Theme Toggle** uses a boolean in `themeStore.js` to switch between light and dark modes, dynamically applying CSS classes.  
    - The **Layout Toggle** uses a similar boolean (e.g., `isWideLayout`) to switch between small and wide modes by adjusting container classes in `style.css`.

- **Smooth Animations & Transitions:**  
  Vue’s `<transition>` component wraps toggled elements (such as extra information or section changes) to provide fade/slide effects. Additionally, built-in transitions in Naive UI components further enhance the visual experience.

---

## 7. Deployment on GitHub Pages

This project is compiled and deployed on GitHub Pages. To ensure the site works correctly when hosted on GitHub, the `vite.config.js` file has been configured with the appropriate base path. For example, if your repository is named `your-repo-name`, the configuration includes:

```js
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [vue()],
});
```

After setting the base path, build the project with:

```bash
npm run build
```

Then deploy the generated build files using [gh-pages](https://www.npmjs.com/package/gh-pages):

```bash
npx gh-pages -d dist
```

This command publishes the contents of the `dist` folder to the `gh-pages` branch on GitHub, making the website accessible at `https://<your-username>.github.io/your-repo-name/`.
