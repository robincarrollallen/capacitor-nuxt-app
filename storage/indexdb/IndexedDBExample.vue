<script setup>
import { useIndexedDB } from "./useIndexedDB"
import { useIndexedDBCleanup } from "./useIndexedDBCleanup"

// Use IndexedDB
const { set, get, remove, clear, size } = useIndexedDB()

// Use cleanup functionality
const { startCleanup, stopCleanup } = useIndexedDBCleanup()

// Reactive data
const dataStatus = ref("Not loaded")
const storageSize = ref(0)

// Start cleanup when component mounts
onMounted(() => {
  startCleanup()
  updateStorageSize()
})

// Stop cleanup when component unmounts
onUnmounted(() => {
  stopCleanup()
})

// Save data (expires in 1 hour)
async function saveData() {
  try {
    const testData = {
      message: "This is test data",
      timestamp: new Date().toISOString(),
      user: {
        name: "Test User",
        id: 123,
      },
    }

    await set("test:data", testData, 60 * 60 * 1000) // Save data, expires in 1 hour
    dataStatus.value = "Data saved (expires in 1 hour)"
    updateStorageSize()
  }
  catch (error) {
    console.error("Failed to save data:", error)
    dataStatus.value = "Save failed"
  }
}

// Load data
async function loadData() {
  try {
    const data = await get("test:data")
    if (data) {
      dataStatus.value = `Data loaded: ${JSON.stringify(data)}`
    }
    else {
      dataStatus.value = "Data does not exist or has expired"
    }
  }
  catch (error) {
    console.error("Failed to load data:", error)
    dataStatus.value = "Load failed"
  }
}

// Delete data
async function deleteData() {
  try {
    await remove("test:data")
    dataStatus.value = "Data deleted"
    updateStorageSize()
  }
  catch (error) {
    console.error("Failed to delete data:", error)
    dataStatus.value = "Delete failed"
  }
}

// Clear all data
async function clearAll() {
  try {
    await clear()
    dataStatus.value = "All data cleared"
    updateStorageSize()
  }
  catch (error) {
    console.error("Failed to clear data:", error)
    dataStatus.value = "Clear failed"
  }
}

// Update storage size
async function updateStorageSize() {
  try {
    storageSize.value = await size()
  }
  catch (error) {
    console.error("Failed to get storage size:", error)
    storageSize.value = 0
  }
}
</script>

<template>
  <div class="indexed-db-example">
    <h3>IndexedDB Example</h3>
    <div class="controls">
      <button @click="saveData">
        Save Data
      </button>
      <button @click="loadData">
        Load Data
      </button>
      <button @click="deleteData">
        Delete Data
      </button>
      <button @click="clearAll">
        Clear All
      </button>
    </div>
    <div class="status">
      <p>Data Status: {{ dataStatus }}</p>
      <p>Storage Size: {{ storageSize }}</p>
    </div>
  </div>
</template>

<style scoped>
.indexed-db-example {
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 8px;
	margin: 20px 0;
}

.controls {
	margin: 15px 0;
}

.controls button {
	margin-right: 10px;
	padding: 8px 16px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.controls button:hover {
	background-color: #0056b3;
}

.status {
	margin-top: 15px;
	padding: 10px;
	background-color: #f8f9fa;
	border-radius: 4px;
}

.status p {
	color: black;
	margin: 5px 0;
	font-family: monospace;
	font-size: 14px;
}
</style>
