<template>
  <footer class="footer">
    <p>
      © {{ currentYear }} <span class="brand">SlotSwapper</span> | Made with
      <span class="heart">❤</span> by <strong>Kushal Dubey</strong>
    </p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: linear-gradient(90deg, #0b0c10, #1f2833);
  color: #c5c6c7;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.4);
  animation: fadeUp 1s ease;
}

.brand {
  color: #66fcf1;
  font-weight: bold;
  text-shadow: 0px 0px 6px #0078ff;
}

.heart {
  color: #ff2e63;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
