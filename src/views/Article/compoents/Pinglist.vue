<template>
  <div>
    <div class="big" v-for="item in list" :key="item.art_id">
      <van-icon
        :name="item.like_count == 0 ? 'good-job-o' : 'good-job'"
        class="good"
        @click="changec(item.com_id, item.is_liking, item.like_count)"
      />
      <div class="good2">
        {{ item.like_count == 0 ? '' : item.like_count }}
      </div>
      <div class="left">
        <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
      </div>
      <div class="right">
        <span class="shuzi">{{ item.aut_name }}</span>
        <span>{{ item.content }}</span>
        <div class="mini">
          <span>{{ item.pubdate }}</span>
          <span class="hui">回复0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getComments,
  addCommentLike,
  deleteCommentLike
} from '@/api'
export default {
  data () {
    return {
      list: [],
      offset: null,
      limit: 40,
      totalCount: 0
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      require: true
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const res = await getComments({
        type: 'a',
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })
      this.list = res.data.data.results
      console.log(this.list)
      //   console.log('++++++++', this.list.aut_id)
      this.$emit('age', this.list.length)
      this.$emit('wzid', this.list)
    },
    async changec (id, val, age) {
      try {
        // 如果已经赞了则取消点赞
        if (val) {
          await deleteCommentLike(id)
          age--
        } else {
          // 如果没有赞，则点赞
          await addCommentLike(id)
          age++
        }
        // 更新视图状态
        val = !val
        this.$toast('操作成功')
      } catch (err) {
        console.log(err)
        this.$toast('失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.big {
  position: relative;
  display: flex;
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  height: 250px;
  border-bottom: 1px solid rgb(248, 241, 241);
  //   background-color: pink;
  margin-bottom: 150px;
  .good2 {
    position: absolute;
    top: 12px;
    right: 50px;
    font-size: 12px;
  }
  .good {
    position: absolute;
    top: 11px;
    right: 66px;
    font-size: 30px;
  }
  .left {
    width: 100px;
    height: 100%;
    // background-color: red;
  }
  .right {
    display: flex;
    flex-direction: column;
    //    justify-content: center;
    //    justify-content: space-between;
    font-size: 16px;
    width: 100%;
    height: 100%;
    .shuzi {
      color: #6784ae;
    }
    .hui {
      margin-left: 20px;
      width: 30px;
      height: 10px;
      border: 1px solid rgb(173, 171, 171);
      border-radius: 20px;
    }
    // background-color: blue;
    span {
      margin-top: 10px;
    }
  }
}
</style>
