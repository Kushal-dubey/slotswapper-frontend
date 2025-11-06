<template>
  <div id="app">
    <!-- 🌟 Navbar -->
    <header class="navbar">
      <div class="logo">
        <span class="highlight">Slot</span>Swapper
      </div>

      <nav class="nav-links">
        <router-link to="/login" class="nav-item">Login</router-link>
        <router-link to="/register" class="nav-item">Register</router-link>
        <router-link to="/dashboard" class="nav-item">Dashboard</router-link>
      </nav>
    </header>

    <!-- 💡 Page Content -->
    <main>
      <router-view></router-view>
    </main>

    <!-- 🌙 Footer -->
    <footer class="footer">
      <p>
        © 2025 <span class="highlight">SlotSwapper</span> | Made with
        <span class="heart">❤</span> by <span class="author">Kushal</span>
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* ✅ Global layout */
body {
  margin: 0;
  background: #0b0c10;
  font-family: 'Poppins', Arial, sans-serif;
  color: white;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 🌟 Navbar */
.navbar {
  background: linear-gradient(90deg, #0078ff, #005fe0);
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 0.8s ease;
}

.logo {
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  cursor: default;
}

.highlight {
  color: #66fcf1;
}

/* 💫 Navbar links */
.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  position: relative;
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: color 0.3s ease;
}

/* Hover underline animation */
.nav-item::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #66fcf1;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-item:hover {
  color: #66fcf1;
}

/* Active link styling */
.router-link-active {
  font-weight: 600;
  color: #ffffff;
}

/* 💡 Main section */
main {
  flex: 1;
  padding: 2rem;
  animation: fadeInUp 0.8s ease;
}

/* 🌙 Footer */
.footer {
  background: #101010;
  color: #aaa;
  text-align: center;
  padding: 0.8rem;
  font-size: 0.9rem;
  border-top: 1px solid #1f1f1f;
}

.footer .highlight {
  color: #66fcf1;
}

.footer .heart {
  color: red;
  animation: heartbeat 1.5s infinite;
}

.footer .author {
  color: white;
  font-weight: 500;
}

/* ✨ Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

/* 🌐 Responsive Design */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 0.6rem;
    text-align: center;
  }

  .nav-links {
    flex-direction: column;
  }
}
</style>
