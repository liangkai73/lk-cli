import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import routes from "./_pathConfig";
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
