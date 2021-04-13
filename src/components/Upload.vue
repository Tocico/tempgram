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

export default {
  name: "Upload",
  methods: {
    onChange(e) {
      const selectedImg = e.target.files[0];
      this.$emit("upload-img", selectedImg);
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