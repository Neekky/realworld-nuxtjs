<template>
  <div class="load_more" v-if="!has_more">没有更多数据</div>
  <div class="load_more" v-else>加载中...</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
let tIo: IntersectionObserver | null = null;
export default defineComponent({
  props: {
    has_more: {
      type: Boolean,
      require: true,
    },
  },
  mounted() {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        this.$emit("loadMore");
      }
    });
    tIo = io;
    io.observe(document.querySelector(".load_more") as Element);
  },
  unmounted() {
    console.log("执行了吗")
    tIo?.disconnect();
  }
});
</script>

<style scoped>
.load_more {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
  font-size: 16px;
}
</style>