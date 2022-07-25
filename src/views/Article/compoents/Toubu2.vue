<template>
  <div class="toubu2">
    <!-- 导航栏 -->
    <van-nav-bar
      title="黑马头条"
      left-text
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.toubu2 {
  box-sizing: border-box;
  // padding-top: 100px;
  margin-bottom: 150px;
  .van-nav-bar {
    background-color: #3296fa;
    :deep(.van-icon) {
      color: #fff;
    }
    :deep(.van-nav-bar__title) {
      color: #fff;
    }
  }
}
</style>
