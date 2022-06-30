<template>
  <h1 class="text-4xl font-bold mb-6">
    Are you lost?
  </h1>

  <a-space class="wrapper" direction="vertical">
    <a-button type="primary" @click="$router.back()">
      The way back home
    </a-button>

    <a-button href="https://github.com/kecrily/syesya/issues">
      A issue? Report!
    </a-button>
  </a-space>
</template>
