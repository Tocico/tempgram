<template>
  <div class="container">
    <Images :images="images && images"  />
  </div>
</template>

<script>
import Images from "../components/Images";
import { getAllUserImages } from "../server/api";

export default {
  name: "AllImages",
  data() {
    return {
      images: [],
    };
  },
  components: {
    Images,
  },
  methods: {
      async getAllImages() {
          return await getAllUserImages()
      }
  },
  async created() {
      console.log("image INNN")
      this.images = await this.getAllImages()
  }
};
</script>

<style lang="sass" scoped>
</style>