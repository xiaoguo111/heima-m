<template>
  <div>
    <div class="big">
      <div class="top">{{ wenzi.title }}</div>
      <div class="bottom">
        <div class="left">
          <van-image round width="1rem" height="1rem" :src="wenzi.aut_photo" />
          <div class="zhong">
            <span>{{ wenzi.aut_name }}</span>
            <span>{{ wenzi.pubdate }}</span>
          </div>
        </div>
        <div class="right">
          <van-button
            :color="wenzi.is_followed ? 'pink' : '#3296fa'"
            round
            size="mini"
            @click="add"
            >{{ wenzi.is_followed ? '取消关注' : '+ 关注' }}</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api'
export default {
  data () {
    return {}
  },
  props: {
    wenzi: {
      type: Object,
      required: true
    }
  },
  created () {
    // this.getArticleInfo()
    // this.$emit('shuaxin')
  },
  methods: {
    async add () {
      try {
        const id = this.wenzi.art_id
        const bl = this.wenzi.is_followed
        //   console.log(id, bl)
        if (bl) {
          // this.isFollowLoading = true
          await deleteFollow(id)
          // this.$parent.getArticleInfo()
          // this.$emit('onshuaxin')
          // this.getArticleInfo()
          // this.$emit('shuaxin')
        } else {
          // this.isFollowLoading = true
          await addFollow(id)
          // this.$parent.getArticleInfo()
          // this.$emit('onshuaxin')
          // this.isShow = true
          // this.$emit('shuaxin')
        }
        this.$parent.atricleInfo.is_followed =
          !this.$parent.atricleInfo.is_followed
        // this.$parent.getArticleInfo()
      } catch (error) {}
    }
  }
}
</script>

<style lang="less" scoped>
.big {
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  height: 300px;
  .top {
    width: 100%;
    height: 200px;
    // background-color: red;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 200px;
    // background-color: green;
    .left {
      display: flex;
      .zhong {
        margin-left: 15px;
        span {
          display: block;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
