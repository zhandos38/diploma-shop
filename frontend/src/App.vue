<template>
  <Menubar :model="items">
    <template #start>
      <img
        alt="logo"
        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
        height="40"
        class="mr-2"
      />
    </template>
    <template #end>
      <InputText placeholder="Search" type="text" />
    </template>
  </Menubar>
  <div class="mt-3">
    <div class="container">
      <router-view />
    </div>
  </div>
  <Toast position="top-right" />
</template>
<script setup>
import Menubar from "primevue/menubar";
import { ref } from "vue";
import { useStore } from "vuex";
import { AuthActions, AuthGetters } from "@/store/auth";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const items = ref([
  {
    label: "Войти",
    icon: "pi pi-fw pi-sign-in",
    to: "/login",
    visible: () => {
      const isAuthenticated = store.getters[AuthGetters.GET_IS_AUTHENTICATED];
      return !isAuthenticated;
    },
  },
  {
    label: "Выйти",
    icon: "pi pi-fw pi-sign-out",
    command: async () => {
      await store.dispatch(AuthActions.LOGOUT);
      await router.push("/login");
    },
    visible: () => {
      const isAuthenticated = store.getters[AuthGetters.GET_IS_AUTHENTICATED];
      return isAuthenticated;
    },
  },
  {
    label: "Товары",
    icon: "pi pi-fw pi-box",
    to: "/product",
  },
  {
    label: "Категорий",
    icon: "pi pi-fw pi-list",
    to: "/category",
  },
  {
    label: "Заказы",
    icon: "pi pi-fw pi-list",
    to: "/order",
  },
]);
</script>
<style scoped>
@import "~primevue/resources/themes/saga-blue/theme.css";
@import "~primevue/resources/primevue.min.css";
@import "~primeicons/primeicons.css";
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "main.css";

.app-top-bar {
  position: relative;
  top: 0;
  left: 0;
}
</style>
