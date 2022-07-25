<template>
  <div>
    <van-pull-refresh
      v-model="refloading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPage"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了~~~"
        :error.sync="error"
        error-text="请重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
          :id="item.art_id"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refloading: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        console.log(data)
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    async loadNextPage () {
      try {
        if (Math.random() < 0.7) {
          throw new Error('错误了')
        }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        // 将第N页的数据，放在articles数组里
        if (this.refloading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
        // loading设置为false
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refloading = false
      }
    }
  }
}
</script>

<style></style>
