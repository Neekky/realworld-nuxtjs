<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "登录" : "注册" }}</h1>
          <p class="text-xs-center">
            <router-link v-if="!isLogin" to="/login">已经有账户?</router-link>
            <router-link v-else to="/register">注册新账户?</router-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              style="background-color: #056de8; border: none"
            >
              {{ isLogin ? "登录" : "注册" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isLogin = computed({
  get: () => route.name === "Login",
});

onMounted(() => {
  console.log(isLogin, route, "this");
});
</script>

<style></style>
