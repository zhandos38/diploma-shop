import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import { setupAxiosInterceptors } from "@/store/config";

setupAxiosInterceptors(() => console.log("Un"));

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);
app.use(PrimeVue);

app.component("Button", Button);
app.component("Card", Card);
app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("Dropdown", Dropdown);
app.component("Checkbox", Checkbox);

app.mount("#app");
