<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in list"
            :key="index"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="onClickMychannel(item, index)"
          >
            <template #icon
              ><van-icon v-show="isEdit && item.name !== '推荐'" name="cross" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addMyChannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onClickMychannel (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        return this.$emit('del-mychanel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    addMyChannel (myChannel) {
      this.$emit('add-mychannel', { ...myChannel })
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter((item) => {
        return !this.list.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.active-channel {
  :deep(.van-grid-item__text) {
    color: pink;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: o 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
}
.my-channel {
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
        line-height: 21px;
      }
    }
  }
  :deep(.van-grid-item__content) {
    background-color: #f2f3f5;
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
.my-channel[data-v-05d955c6]
  .van-grid-item__content
  .van-grid-item__icon-wrapper
  .van-icon-cross {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(34%, -37%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 22px;
  font-size: 22px;
}
</style>
