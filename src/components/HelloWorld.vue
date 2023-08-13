<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{ msg: string }>()

const serverMsg = ref('')

async function fetchData() {
    serverMsg.value = 'Fetching...'
    let baseUrl = ''
    if (import.meta.env.VITE_NODE_ENV === 'dev') {
        baseUrl = import.meta.env.VITE_BASE_URL
    }
    const response = await fetch(baseUrl + '/api/v1/health')
    const { message } = await response.json()
    if (message) {
        serverMsg.value = message
    }
}

onMounted(async () => {
    await fetchData()
})
</script>

<template>
    <h1>{{ msg }}</h1>
    <p>Message from server: {{ serverMsg }}</p>

    <div class="card">
        <button type="button" @click="fetchData">Fetch server data</button>
    </div>
</template>

<style scoped></style>
