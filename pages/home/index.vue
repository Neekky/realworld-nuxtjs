<template>
  <div class="home-page">
    <div class="banner app-header" style="">
      <div class="container">
        <h1 class="logo-font">知乎</h1>
        <p>一个分享知识的地方</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div
          style="overflow: auto"
          class="col-md-9"
        >
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">你的问题</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">推荐</a>
              </li>
            </ul>
          </div>

          <div v-for="item in list" :key="item._id" class="article-preview">
            <router-link
              :to="{ name: 'Profile', params: { userId: item.questioner._id } }"
            >
              <div class="queser-icon">
                <el-avatar
                  :size="30"
                  :src="item.avatar_url || '/defaultUserIcon.jpeg'"
                />
                <div class="queser-icon-name">
                  <p>{{ item.questioner.name }}</p>
                  <p>{{ dayjs(item.updatedAt).format("YYYY-MM-DD") }}</p>
                </div>
              </div>
            </router-link>
            <router-link
              :to="{ name: 'Article', params: { quesId: item._id } }"
              class="preview-link"
            >
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>查看更多...</span>
            </router-link>
          </div>
          <!-- 因为服务端渲染的缘故，只能这样处理loadmore了 -->
          <LoadMore v-if="isBrowser" @loadMore="handleInfiniteOnLoad" :has_more="hasMore" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs"
import LoadMore from '@/components/loadmore.vue';
import { ref, onUpdated } from "vue";
const { homeApi } = useApi();

// 数据源
const list = ref([]);

// 每页数据size
const perPage = 2;

// 当前页码
const page = ref(1);

const loading = ref(false);

const hasMore = ref(true);

const isBrowser = ref(process.browser);

onUpdated(() => {
  console.log(11312312312, process.server)
  isBrowser.value = !process.browser
})

// 获取数据
const getList = async () => {
  if (!hasMore.value || loading.value) {
    return;
  }
  loading.value = true;
  console.log(page, "执行了吗");
  const res = await homeApi.getQuestionList({
    per_page: perPage,
    page: page,
  });
  if (res.code !== 200) {
    loading.value = false;
    return;
  }
  if (res.data.length < perPage) {
    hasMore.value = false;
  }
  list.value = [...list.value, ...res.data];
  loading.value = false;
};

// 触底加载
const handleInfiniteOnLoad = () => {
  page.value += 1;
  getList();
};

// Nuxt异步加载
await useAsyncData((...rest) => {
  getList();
});

</script>

<style>
.app-header {
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
  background: rgb(5, 109, 232) !important;
  min-width: 1000px;
  overflow: hidden;
  position: relative;
  z-index: 100;
  background-clip: content-box;
  background-color: #ffffff;
  -webkit-transition-property: background-color, box-shadow;
  transition-property: background-color, box-shadow;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}
.queser-icon {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.queser-icon-name p {
  margin-bottom: 0;
  margin-left: 5px;
}
</style>
