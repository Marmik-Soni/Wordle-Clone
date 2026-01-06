<script setup lang="ts">
import { ref } from 'vue';

const appName = ref('Wordle Clone');
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
  >
    <!-- Header -->
    <header class="text-center py-6 md:py-8 bg-black/20 backdrop-blur-md">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest mb-2">
        {{ appName }}
      </h1>
      <p class="text-base md:text-lg lg:text-xl opacity-90">Guess the word in 6 tries!</p>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center px-4 py-8">
      <div
        class="text-center bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-2xl max-w-2xl w-full"
      >
        <p class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Game board coming soon...</p>
        <p class="text-base md:text-lg lg:text-xl opacity-90">
          A classic word guessing game built with Vue.js and Hono
        </p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="text-center py-4 md:py-6 bg-black/20 backdrop-blur-md">
      <p class="text-sm md:text-base opacity-80">Made with ❤️ using Vue.js & TypeScript</p>
    </footer>
  </div>
</template>
