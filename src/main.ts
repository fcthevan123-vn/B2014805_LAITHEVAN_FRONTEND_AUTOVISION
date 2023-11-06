import "primeicons/primeicons.css";
import "./style.css";
import "primevue/resources/themes/lara-light-blue/theme.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

import DialogService from "primevue/dialogservice";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(ToastService);
app.use(DialogService);

app.use(PrimeVue);

app.component("Dialog", Dialog);
app.component("Button", Button);

app.mount("#app");
