<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="navbar">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/seasons">Seasons</NuxtLink></li>
        <li><NuxtLink to="/episodes">Episodes</NuxtLink></li>

      </ul>
    </nav>

    <main>
      <NuxtPage />

    </main>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar a:hover {
  text-decoration: underline;
}

main {
  padding: 2rem;
}
</style>
<script setup lang="ts">
</script>