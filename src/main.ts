import "primeicons/primeicons.css";
import "./style.css";
import "primevue/resources/themes/lara-light-blue/theme.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import PrimeVue from "primevue/config";
import { ImportComponent } from "./utils/importAllComponent";
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue);

ImportComponent(app);

app.mount("#app");
