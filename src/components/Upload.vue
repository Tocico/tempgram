<template>
  <form class="add_img_container">
    <label>
      <input type="file" class="add_img" @change="(e) => onChange(e)" />
      <v-avatar class="add_img-avatar">
        <v-icon class="add_img-icon">mdi-plus-thick</v-icon>
      </v-avatar>
    </label>
  </form>
</template>


<script>
import imageCompression from "../plugins/ImageCompression";

export default {
  name: "Upload",
  data() {
    return {
      compressedImg: "",
    };
  },
  methods: {
    async onChange(e) {
      const selectedImg = e.target.files[0];
      this.compressedImg = await imageCompression.getCompressImageFile(
        selectedImg
      );
      this.$emit("upload-img", this.compressedImg);
    },
  },
};
</script>


<style lang="scss">
.add_img_container {
  margin: 20px auto;
  .add_img {
    height: 0;
    width: 0;
    opacity: 0;
    &-avatar {
      background-color: #f3cd46;
    }
  }
}
.mdi-plus-thick::before {
  color: white;
}
</style>