<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">你的信息</h1>
          <form @submit.prevent="updateUserById">
            <fieldset>
              <fieldset class="form-group avatar-wrap">
                <img
                  class="avatar"
                  :src="userInfo.avatar_url || '/defaultUserIcon.jpeg'"
                />
                <!-- <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                /> -->
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userInfo.name"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="你的昵称"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userInfo.age"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="你的年龄"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  v-model="userInfo.headline"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="一句话介绍你"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="userInfo.introduction"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="个人详细介绍"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userInfo.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <!-- <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset> -->
              <button class="btn btn-lg btn-primary pull-xs-right">更新</button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger">或者点击这里退出账号.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores";
import { ElLoading } from "element-plus";

const userStore = useUserStore();

const { userApi } = useApi();

const userInfo = ref({});

const error = ref(null);

const findUserById = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "加载中...",
    background: "rgba(0, 0, 0, 0.3)",
  });
  try {
    const res = await userApi.findUserById(userStore.userInfo._id, {
      filed: "educations;following;followingTopics;password",
    });
    console.log(res, "21312331");
    userInfo.value = res.data;
    loading.close();
    return res;
  } catch (err) {
    loading.close();
    error.value = err.message;
  }
};

const updateUserById = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "加载中...",
    background: "rgba(0, 0, 0, 0.3)",
  });
  try {
    const res = await userApi.updateUserById(
      userStore.userInfo._id,
      userInfo.value
    );
    console.log(res, "21312331");
    loading.close();
    return res;
  } catch (err) {
    loading.close();
    error.value = err.message;
  }
};

findUserById();

onUnmounted(() => {
  userInfo.value = {};
  error.value = null;
});
</script>

<style>
.avatar-wrap {
  display: flex;
  justify-content: center;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}
</style>
