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
        <div style="overflow: auto" class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <div @click="handleMuQuesClick" :class="{active: tabIndex === 0}" class="nav-link">
                  你的问题
                </div>
              </li>
              <li class="nav-item">
                <div @click="handleHomeClick" :class="{active: tabIndex === 1}" class="nav-link">推荐</div>
              </li>
              <li v-if="cTopic.name" class="nav-item">
                <div :class="{active: tabIndex === 2}" class="nav-link">{{ cTopic.name }}</div>
              </li>
            </ul>
          </div>

          <div v-for="item in list" :key="item?._id" class="article-preview">
            <router-link
              :to="{
                name: 'Profile',
                params: { userId: item.questioner?._id },
              }"
            >
              <div class="queser-icon">
                <el-avatar
                  :size="30"
                  :src="item.avatar_url || '/defaultUserIcon.jpeg'"
                />
                <div class="queser-icon-name">
                  <p>
                    {{ item.questioner.name }}
                    {{ dayjs(item.updatedAt).format("YYYY-MM-DD") }}
                  </p>
                </div>
              </div>
            </router-link>
            <router-link
              :to="{ name: 'Article', params: { quesId: item?._id } }"
              class="preview-link"
            >
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>查看更多...</span>
            </router-link>
          </div>
          <!-- 因为服务端渲染的缘故，只能这样处理loadmore了，并且有数据时才能显示，不然两次接口同时请求，会有问题 -->
          <LoadMore
            :key="cTopic._id + tabIndex"
            v-if="isBrowser"
            @loadMore="handleInfiniteOnLoad"
            :has_more="hasMore"
          />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>热门话题</p>
            <div class="tag-list">
              <div
                v-for="item in topicList"
                :key="item?.id"
                @click="handleTopicClick(item)"
                class="tag-pill tag-default tag-item"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import LoadMore from "@/components/loadmore.vue";
import { ref, onUpdated, onUnmounted } from "vue";
const { homeApi, topicApi } = useApi();

// 数据源
const list = ref([]);

const topicList = ref([]);

// 每页数据size
const perPage = 2;

// 当前页码
const page = ref(1);

const loading = ref(false);

const hasMore = ref(true);

const isBrowser = ref(process.browser);

// 当前选择topic
const cTopic = ref({});

// 当前tab
const tabIndex = ref(1);

onUpdated(() => {
  isBrowser.value = !process.browser;
});

// 获取列表数据
const getList = async () => {
  if (!hasMore.value || loading.value) {
    return;
  }
  loading.value = true;
  const res = await homeApi.getQuestionList({
    per_page: perPage,
    page: page,
    topic_id: cTopic.value._id,
  });
  if (res.code !== 200) {
    loading.value = false;
    return;
  }
  // 返回数据小于页数size
  if (res.data.length < perPage) {
    hasMore.value = false;
  }
  // 设置列表的值
  console.log(list.value, res.data);
  list.value = [...list.value, ...res.data];
  loading.value = false;
};

// 获取话题列表
const getTopicList = async () => {
  console.log(4);
  const res = await topicApi.getTopicList({
    per_page: 20,
    page: 1,
  });

  if (res.code !== 200) {
    return;
  }

  topicList.value = [...topicList.value, ...res.data];
};

// 触底加载
const handleInfiniteOnLoad = () => {
  console.log("执行了", list.value.length)
  if (list.value.length > 0) {
    page.value += 1;
    getList();
  }
};

// 处理话题item点击
const handleTopicClick = async (data) => {
  if (data._id === cTopic.value._id) return;
  const res = await topicApi.getTopicQuestionList(data._id);
  if (res.code === 200) {
    clear();
    cTopic.value = data;
    getList();
    tabIndex.value = 2;
  }
};

// 处理推荐点击，请求首页
const handleHomeClick = () => {
  if (tabIndex.value === 1) return;
  tabIndex.value = 1;
  clear();
  getList();
};

// 请求我的问题
const handleMuQuesClick = () => {
  if (tabIndex.value === 0) return;
  tabIndex.value = 0;
  clear();
  getList();
}

const clear = () => {
  list.value = [];
  cTopic.value = {};
  page.value = 1;
  loading.value = false;
  hasMore.value = true;
};

// Nuxt异步加载
await useAsyncData(async (...rest) => {
  // 并发执行
  await Promise.all([getList(), getTopicList()]);
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

.tag-item:hover {
  cursor: pointer;
}
</style>
