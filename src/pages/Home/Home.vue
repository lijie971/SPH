<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>
<script>
import ListContainer from "@/pages/Home/ListContainer/ListContainer.vue";
import Recommend from "@/pages/Home/Recommend/Recommend.vue";
import Rank from "@/pages/Home/Rank/Rank.vue";
import Like from "@/pages/Home/Like/Like.vue";
import Floor from "@/pages/Home/Floor/Floor.vue";
import Brand from "@/pages/Home/Brand/Brand.vue";

import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("getFloorList");
  },
  computed: {
    // ...mapState({
    //   floorList:(state)=>{
    //       return state.home.floorList
    //   }
    // })

    floorList() {
      return this.$store.state.home.floorList;
    },
  },
};
</script>

<style>
</style>