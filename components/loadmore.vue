<template>
  <div v-if="!has_more">暂无更多数据</div>
  <div class="load_more" v-else>加载中</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
const loadmore = ref();
export default defineComponent({
  props: {
    has_more: {
      type: Boolean,
      require: true,
    },
  },
  setup() {},
  mounted() {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        this.$emit("loadMore");
      }
    });
    io.observe(document.querySelector(".load_more") as Element);
  },
});
</script>
