<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link
          class="navbar-brand"
          style="color: rgb(5, 109, 232) !important"
          to="/"
          >知乎</router-link
        >
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <router-link class="nav-link" to="/" href=""
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/editor">
              <i class="ion-compose"></i>&nbsp;New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Sign up</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile/1">
              <img
                class="user-pic"
                src="https://s20.lgstatic.com/growth/activity/20210720/1626784734098.jpeg?x-oss-process=style/80"
              />
              瑯几
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- 子路由 -->
    <router-view />

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font" style="color: rgb(5, 109, 232) !important"
          >知乎</a
        >
        <span class="attribution">
          An interactive learning project from
          <a
            href="https://thinkster.io"
            style="color: rgb(5, 109, 232) !important"
            >Thinkster</a
          >. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup></script>

<style>
.router-link-exact-active {
  color: #333!important;
}
</style>
