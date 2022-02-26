import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);

app.component("Button", Button);
app.component("Card", Card);

app.mount("#app");
