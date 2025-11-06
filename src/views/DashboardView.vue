<template>
  <div class="dashboard">
    <h2>Welcome, {{ userName }}</h2>
    <p class="subtitle">Manage your events and swap requests here</p>

    <!-- Loader -->
    <div v-if="loading" class="loader">Loading your data...</div>

    <!-- Error -->
    <div v-if="error" class="error">{{ error }}</div>

    <div v-else class="card-container">
      <!-- My Events -->
      <div class="card">
        <h3>My Events</h3>
        <p v-if="events.length === 0">No events found. Create one to begin.</p>
        <ul v-else class="event-list">
          <li v-for="event in events" :key="event._id">
            <strong>{{ event.title }}</strong>
            <br />
            <small>{{ formatDate(event.startTime) }} → {{ formatDate(event.endTime) }}</small>
            <br />
            <span class="status" :class="event.status.toLowerCase()">{{ event.status }}</span>
          </li>
        </ul>
        <button class="btn-glow" @click="fetchEvents">🔄 Refresh Events</button>
      </div>

      <!-- Swap Requests -->
      <div class="card">
        <h3>Swap Requests</h3>
        <p v-if="swapRequests.length === 0">No pending swap requests.</p>
        <ul v-else class="swap-list">
          <li v-for="req in swapRequests" :key="req._id">
            <strong>{{ req.requester.name }}</strong> wants to swap:
            <br />
            <small>{{ req.mySlotTitle }} ↔ {{ req.theirSlotTitle }}</small>
            <br />
            <span class="status" :class="req.status.toLowerCase()">{{ req.status }}</span>
          </li>
        </ul>
        <button class="btn-glow" @click="fetchRequests">🔄 Refresh Requests</button>
      </div>

      <!-- Activity Log -->
      <div class="card">
        <h3>Activity Log</h3>
        <p v-if="logs.length === 0">No recent activities.</p>
        <ul v-else class="log-list">
          <li v-for="log in logs" :key="log._id">{{ log }}</li>
        </ul>
        <button class="btn-glow" @click="generateDummyLog">📝 Add Test Log</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// ✅ Live backend base URL
const BASE_URL = "import.meta.env.VITE_API_BASE_URL;";

const userName = ref("Kushal Dubey");
const events = ref([]);
const swapRequests = ref([]);
const logs = ref([]);
const loading = ref(false);
const error = ref(null);

// ✅ Format date helper
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
};

// ✅ Fetch Events
const fetchEvents = async () => {
  loading.value = true;
  error.value = null;
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token missing");

    console.log("📡 Fetching events from live backend...");
    const response = await axios.get(`${BASE_URL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Events fetched:", response.data);
    events.value = response.data || [];
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    error.value = "Error fetching events.";
  } finally {
    loading.value = false;
  }
};

// ✅ Fetch Swap Requests
const fetchRequests = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token missing");

    console.log("📡 Fetching swap requests...");
    const response = await axios.get(`${BASE_URL}/swaps/requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    swapRequests.value = [
      ...(response.data.incoming || []),
      ...(response.data.outgoing || []),
    ];
  } catch (err) {
    console.error("❌ Error fetching requests:", err.message);
  }
};

// ✅ Dummy Log
const generateDummyLog = () => {
  logs.value.unshift(`Event refreshed at ${new Date().toLocaleTimeString()}`);
};

// ✅ Auto-load on mount
onMounted(async () => {
  console.log("🚀 Dashboard mounted, loading data...");
  await fetchEvents();
  await fetchRequests();
});
</script>

<style scoped>
.dashboard {
  text-align: center;
  color: #ffffff;
  padding: 2rem;
  animation: fadeIn 1s ease;
}

.subtitle {
  color: #aaa;
  margin-bottom: 2rem;
}

/* Loader & Error */
.loader {
  color: #66fcf1;
  font-size: 1rem;
  animation: pulse 1s infinite;
}

.error {
  color: #ff5252;
  margin-bottom: 1rem;
}

/* Cards */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.card {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  width: 300px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: 0.4s;
  animation: slideIn 0.8s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 15px #0078ff;
}

h3 {
  color: #66fcf1;
  margin-bottom: 1rem;
}

p {
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

/* Buttons */
.btn-glow {
  padding: 0.6rem 1rem;
  background: linear-gradient(90deg, #0078ff, #005ecb);
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-glow:hover {
  background: linear-gradient(90deg, #008cff, #0078ff);
  transform: scale(1.05);
  box-shadow: 0px 0px 15px #0078ff;
}

/* Lists */
.event-list,
.swap-list,
.log-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
  text-align: left;
}

.event-list li,
.swap-list li,
.log-list li {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.6rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  transition: 0.3s;
}

.event-list li:hover,
.swap-list li:hover,
.log-list li:hover {
  background: rgba(102, 252, 241, 0.15);
  transform: translateX(4px);
}

/* Status styling */
.status {
  display: inline-block;
  margin-top: 5px;
  padding: 3px 6px;
  border-radius: 5px;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
}

.status.busy {
  background: #ff5252;
  color: white;
}

.status.swappable {
  background: #00b894;
  color: white;
}

.status.swap_pending {
  background: #f39c12;
  color: white;
}

/* Animations */
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
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive Layout */
@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
