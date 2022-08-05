import Vue from "vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "./styles/normalize.scss";
// import './static/bootstrap-3.4.1/dist/js/bootstrap.js'
import "./static/bootstrap-3.4.1/dist/css/bootstrap.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
