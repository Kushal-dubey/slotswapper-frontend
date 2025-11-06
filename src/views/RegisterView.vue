<template>
  <div class="page">
    <div class="form-card">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <input v-model="name" type="text" placeholder="Full Name" required />
        </div>
        <div class="input-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn-primary">Sign Up</button>
      </form>

      <p class="switch-text">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");

const handleRegister = () => {
  alert(`Registration successful for ${name.value}`);
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  background: linear-gradient(135deg, #0b0c10, #1f2833);
  animation: fadeIn 1s ease;
}

.form-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
  width: 340px;
  text-align: center;
  animation: slideIn 0.8s ease;
}

h2 {
  color: #66fcf1;
  margin-bottom: 1rem;
  text-shadow: 0px 0px 6px #0078ff;
}

.input-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #1f2833;
  color: #fff;
  outline: none;
  transition: 0.3s;
}

input:focus {
  box-shadow: 0px 0px 6px #66fcf1;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background: linear-gradient(90deg, #0078ff, #005ecb);
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #008cff, #0078ff);
  transform: scale(1.05);
  box-shadow: 0px 0px 10px #0078ff;
}

.switch-text {
  color: #ccc;
  margin-top: 15px;
}

.switch-text a {
  color: #66fcf1;
  text-decoration: none;
}

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
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
