<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="logo">
         <img data-v-b0621214="" src="/assets/brand_logo_navbar-WPFS41QN.png" alt="PREPICO">
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Blogs</router-link>
          <router-link to="/admin" class="nav-link admin-link">Create Blog</router-link>
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #012987;
  --secondary: #0149c0;
  --accent: #0ea5e9;
  --text: #0f172a;
  --text-light: #4b5563;
  --bg: #ffffff;
  --bg-secondary: #f7f8fb;
  --border: #e5e7eb;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--text);
  background: var(--bg-secondary);
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

.navbar {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.logo h1 {
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  color: var(--primary);
  font-weight: 700;
}

.logo span {
  color: var(--secondary);
}

.logo {
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--text-light);
  font-weight: 500;
  transition: color 0.2s;
  padding: 0.5rem 0.9rem;
  border-radius: 0.5rem;
}

.nav-link:hover {
  color: var(--primary);
  background: var(--bg-secondary);
}

.nav-link.router-link-active {
  color: var(--primary);
  background: var(--bg-secondary);
}

.admin-link {
  background: var(--primary);
  color: #fff;
  border: none;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 999px;
}

.admin-link:hover {
  background: var(--secondary);
  color: #fff;
}

main {
  min-height: calc(100vh - 80px);
  padding-bottom: 2rem;
}

button {
  cursor: pointer;
  border: none;
  font-family: inherit;
  background: var(--primary);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 999px;
}

input, textarea, select {
  font-family: inherit;
}

@media (max-width: 820px) {
  .container {
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 1rem;
  }

  .nav-links {
    flex: 1 1 100%;
    justify-content: center;
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.45rem 0.8rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 540px) {
  .nav-links {
    flex-wrap: wrap;
  }

  .container {
    padding: 0 0.75rem;
  }

  .navbar {
    padding: 0.6rem 0;
  }
}
</style>