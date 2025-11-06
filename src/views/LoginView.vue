<template>
  <div class="page">
    <div class="form-card">
      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="input-group">
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="btn-primary">Login</button>
      </form>

      <p class="switch-text">
        Don’t have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const API_BASE = "http://localhost:5000/api/auth"; // ✅ Adjust if your backend route differs

const handleLogin = async () => {
  try {
    const res = await axios.post(`${API_BASE}/login`, {
      email: email.value,
      password: password.value,
    });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token); // ✅ Save token permanently
      alert(`Welcome back, ${email.value}! 🚀`);
      router.push("/dashboard"); // Redirect after login
    } else {
      alert("Login failed. No token received.");
    }
  } catch (err) {
    console.error("❌ Login error:", err.response?.data || err.message);
    alert("Invalid email or password.");
  }
};
</script>

<style scoped>
/* ✅ Page Background & Layout */
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  background: linear-gradient(135deg, #0b0c10, #1f2833);
  animation: fadeIn 1s ease-in-out;
  padding: 1rem;
}

/* ✅ Login Card */
.form-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2.5rem;
  border-radius: 14px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
  width: 340px;
  text-align: center;
  animation: slideIn 0.9s ease;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* ✅ Title */
h2 {
  color: #66fcf1;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 6px #0078ff;
  letter-spacing: 1px;
}

/* ✅ Input Styles */
.input-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #1f2833;
  color: #ffffff;
  font-size: 0.95rem;
  outline: none;
  transition: 0.3s ease;
}

input:focus {
  box-shadow: 0px 0px 10px #66fcf1;
  transform: scale(1.02);
}

/* ✅ Login Button */
.btn-primary {
  width: 100%;
  padding: 10px;
  background: linear-gradient(90deg, #0078ff, #005ecb);
  border: none;
  color: #ffffff;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #008cff, #0078ff);
  transform: scale(1.05);
  box-shadow: 0 0 15px #0078ff;
}

/* ✅ Switch text */
.switch-text {
  color: #ccc;
  margin-top: 15px;
  font-size: 0.9rem;
}

.switch-text a {
  color: #66fcf1;
  text-decoration: none;
  transition: 0.3s;
}

.switch-text a:hover {
  text-shadow: 0px 0px 8px #66fcf1;
}

/* ✅ Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ✅ Responsive Design */
@media (max-width: 500px) {
  .form-card {
    width: 90%;
    padding: 2rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  .btn-primary {
    font-size: 0.9rem;
  }
}
</style>
