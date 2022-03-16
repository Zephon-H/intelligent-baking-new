<template>
  <div style="width: 100%">
    <div class="card">
      <IntelligentLines></IntelligentLines>
    </div>
  </div>
</template>

<script>

import IntelligentLines from '@/components/IntelligentLines'

export default {
  name: "index",
  components: {
    // DeviceMonitoring,
    IntelligentLines
    // ,DeviceControl
  },
}
</script>

<style scoped>
.card {
  width: 88rem;
  border-radius: 1rem;
  margin: 0 auto;
  background: white;
}
</style>