<template>
  <a-menu
    :style="{ width: '12.5rem', height: '100vh' }"
    class="shadow-lg"
  >
    <div class="px-3 py-4 text-xl">
      SyeSya
    </div>

    <RouterLink to="/write">
      <a-menu-item>Write</a-menu-item>
    </RouterLink>

    <a-sub-menu title="Character">
      <RouterLink to="/character">
        <a-menu-item>View</a-menu-item>
      </RouterLink>

      <RouterLink to="/character/create">
        <a-menu-item>Create</a-menu-item>
      </RouterLink>
    </a-sub-menu>

    <a href="https://github.com/kecrily/syesya" target="_blank">
      <a-menu-item>Source Code</a-menu-item>
    </a>
  </a-menu>
</template>
