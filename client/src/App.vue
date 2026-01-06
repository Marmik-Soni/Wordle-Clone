<script setup lang="ts">
import { ref } from 'vue';

const appName = ref('Wordle Clone');
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>{{ appName }}</h1>
      <p class="subtitle">Guess the word in 6 tries!</p>
    </header>
    <main class="main">
      <div class="game-container">
        <p class="coming-soon">Game board coming soon...</p>
        <p class="description">A classic word guessing game built with Vue.js and Hono</p>
      </div>
    </main>
    <footer class="footer">
      <p>Made with ❤️ using Vue.js & TypeScript</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header {
  text-align: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.header h1 {
  font-size: 3rem;
  margin: 0;
  font-weight: bold;
  letter-spacing: 0.1em;
}

.subtitle {
  margin-top: 0.5rem;
  font-size: 1.2rem;
  opacity: 0.9;
}

.main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.game-container {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.coming-soon {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.description {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 500px;
  margin: 0 auto;
}

.footer {
  text-align: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.footer p {
  margin: 0;
  opacity: 0.8;
}
</style>
