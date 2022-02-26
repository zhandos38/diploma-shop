<template>
  <ui-top-app-bar class="app-top-bar" :type="0" content-selector="#content-main" title="Меню">
    <template #default>
      <ui-button raised>Главная</ui-button>
      <ui-button raised>Категорий</ui-button>
    </template>
    <template #toolbar="{ toolbarItemClass }">
      <ui-icon-button
        :class="toolbarItemClass"
        icon="shopping_cart"
      ></ui-icon-button>
    </template>
  </ui-top-app-bar>
  <div class="container pt-5">
    <router-view />
  </div>
</template>

<style scoped>
@import "assets/css/bootstrap.min.css";
@import "assets/css/bootstrap-utilities.min.css";

.app-top-bar {
  top: 0;
  left: 0;
}
</style>
