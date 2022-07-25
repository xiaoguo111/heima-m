<template>
  <div>
    <Toubu2></Toubu2>
    <Dibu
      v-if="atricleInfo.art_id"
      :Color="atricleInfo.is_collected"
      :id="atricleInfo.art_id"
      @input="Oninput"
      :atage="Age"
      :Wzid="wzid"
    ></Dibu>
    <Wenzi
      v-if="atricleInfo.art_id"
      :wenzi="atricleInfo"
      @shuaxin="onshuaxin"
    ></Wenzi>
    <div
      class="article-content markdown-body"
      v-html="atricleInfo.content"
    ></div>
    <Meiyou></Meiyou>
    <Pinglist
      v-if="atricleInfo.art_id"
      :source="atricleInfo.art_id"
      @age="onage"
      @wzid="onwzid"
    ></Pinglist>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api'
import Toubu2 from './compoents/Toubu2.vue'
import Dibu from './compoents/Dibu.vue'
import Wenzi from './compoents/Wenzi.vue'
import Meiyou from './compoents/Meiyou.vue'
import Pinglist from './compoents/Pinglist.vue'
import 'github-markdown-css/github-markdown.css'
export default {
  data () {
    return {
      atricleInfo: {},
      Age: '',
      wzid: []
    }
  },
  created () {
    this.getArticleInfo()
  },
  methods: {
    async getArticleInfo () {
      const id = this.$route.params.id
      // console.log(id, this.$route)
      const res = await getArticleInfo(id)
      this.atricleInfo = res.data.data
      // console.log(res.data.data)
    },
    Oninput () {
      // this.getArticleInfo()
    },
    onshuaxin () {
      // this.getArticleInfo()
    },
    onage (val) {
      this.Age = val
      console.log(this.Age)
    },
    onwzid (el) {
      this.wzid = el
      console.log('abc', this.wzid)
    }
  },
  components: {
    Toubu2,
    Dibu,
    Wenzi,
    Meiyou,
    Pinglist
  }
}
</script>

<style lang="less" scoped>
.article-content {
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
}
</style>
