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
        <div class="col-md-9">
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

          <div v-for="item in questionList.data" :key="item._id" class="article-preview">
            <a href="" class="preview-link">
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>查看更多...</span>
            </a>
          </div>
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
const { homeApi } = useApi()

const { data: questionList, refresh } = await useAsyncData("questionList", () => homeApi.getQuestionList());

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
</style>

export { };

export { };
