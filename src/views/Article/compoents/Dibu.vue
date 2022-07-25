<template>
  <div class="main">
    <div class="input">
      <van-cell is-link @click="showPopup"
        ><div class="pin">写评论</div></van-cell
      >
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <button @click="addping">发布</button>
      </van-popup>
    </div>
    <span><van-icon name="comment-o" /></span>
    <span
      ><van-icon
        :name="Color ? 'star' : 'star-o'"
        :color="Color ? '#ffa500' : ''"
        @click="onCollect"
    /></span>
    <span><van-icon name="good-job-o" /></span>
    <span><van-icon name="share-o" /></span>
    <div class="yuan">{{ atage }}</div>
  </div>
</template>

<script>
import { deleteCollect, addCollect, addComment } from '@/api'
export default {
  data () {
    return {
      show: false,
      message: ''
    }
  },
  props: {
    Color: {
      type: Boolean
    },
    id: {
      type: [Number, String]
    },
    atage: {
      type: [Number, String]
    }
  },

  methods: {
    async onCollect () {
      // 开始请求
      try {
        // 是否收藏
        if (this.Color) {
          // 父组件 传递articleId
          await deleteCollect(this.id)
        } else {
          await addCollect(this.id)
        }
        // 更新视图
        this.$parent.atricleInfo.is_collected =
          !this.$parent.atricleInfo.is_collected
        this.$toast.success(this.Color ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
    },
    showPopup () {
      this.show = true
    },
    async addping () {
      try {
        await addComment({
          target: this.$parent.atricleInfo.art_id,
          content: this.message
          // 评论内容
          // art_id
        })
        this.message = ''
        this.$toast.success('发布成功')
      } catch (err) {
        // console.log('===========', this.$parent.wzid.aut_id)
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  // margin-top:100px;
  display: flex;
  position: fixed;
  //    position: relative;
  bottom: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-right: 30px;
  padding-left: 30px;
  font-size: 40px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  width: 100%;
  height: 90px;
  color: #8b8d8f;
  background-color: #fff;
  z-index: 999;
  .input {
    position: relative;
    height: 30px;
    width: 200px;
    border-radius: 10px;
    border-color: unset;
    border: 1px solid #eeeeee;
    font-size: 12px;
    .pin {
      position: absolute;
      top: -4px;
      left: 28px;
    }
  }
  .yuan {
    position: absolute;
    top: 3px;
    left: 4.6rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: red;
    font-size: 14px;
    text-align: center;
    color: #fff;
  }
}
.van-cell {
  padding: unset;
}
.van-cell__right-icon {
  color: #fff;
}
</style>
