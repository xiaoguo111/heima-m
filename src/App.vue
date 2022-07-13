<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  data () {
    return {}
  },
  created () {
    console.dir(request)
  }
}
</script>

<style scoped>
.login {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
</style>
