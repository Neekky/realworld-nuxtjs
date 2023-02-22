module.exports = {
  apps: [
    {
      name: "NuxtZhihu",
      script: "./output/server/index.mjs",
      env: { NITRO_PORT: 3000, NITRO_HOST: "127.0.0.1" },
    },
  ],
};
s