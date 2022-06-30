<template>
  <div id="app">
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- Footer只在Home组件和Search组件中显示 -->
    <!-- <Footer v-show="$route.path==='/home'||$route.path==='/search'"/> -->

    <!-- 这里是根据路由原信息来显示与隐藏 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知Vuex发请求,获取数据,存储于仓库(派发action||获取商品分类的三级列表数据)
    //这里应该在TypeNav组件中的，放这里就是为了优化(因为子组件切换就会挂载销毁,影响性能了)，因为App组件只执行一次
    this.$store.dispatch("categoryList");

  },
};
</script>

<style>
</style>
