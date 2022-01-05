<template>
  <div id="app">
    <router-view class="all-view"></router-view>
  </div>

</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  destroyed() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
</script>
<style>
html{
  height: 100%;
  margin: 0;
  padding: 0;
}
body{
  height: 100%;
  margin: 0;
  padding: 0;
}
#app{
  height: 100%;
}
.all-view{
  height: 100%;
}
</style>
