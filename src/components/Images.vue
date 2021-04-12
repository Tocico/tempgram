<template>
  <div>
    <span class="errorMsg" v-if="error"
      >削除できませんでした。再度お試しください</span
    >
    <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        class="d-flex child-flex"
        cols="3"
      >
        <v-img
          :src="image.url"
          :lazy-src="`${image.url * 5 + 10}`"
          aspect-ratio="1"
          class="img"
          @click="onClick(image)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
            </v-row>
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </template>
        </v-img>
      </v-col>
    </v-row>

    <Modal
      :image="image && image"
      v-if="image && isModalShow"
      @toggle-click="toggleModal"
      @deletebtn-click="$emit('toggle-deleteImg', image)"
    />
  </div>
</template>

<script>
import Modal from "./Modal";
// import { projectStorage, projectFirestore } from "../firebase/config";

export default {
  name: "Images",
  components: {
    Modal,
  },
  props: {
    images: Array,
  },
  emits: "toggle-deleteImg",
  data() {
    return {
      isModalShow: false,
      image: null,
      error: false,
    };
  },
  methods: {
    onClick(image) {
      this.image = image;
      this.isModalShow = !this.isModalShow;
    },
    toggleModal() {
        this.isModalShow = !this.isModalShow
    }
  }
};
</script>

<style lang="scss" scoped>
.img-grid {
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
}
.img-wrap {
  overflow: hidden;
  height: 0;
  padding: 50% 0;
  /* padding controls height, will always be perfectly square regardless of width */
  position: relative;
  opacity: 0.8;
}
.img-wrap img {
  min-width: 100%;
  min-height: 100%;
  max-width: 150%;
  position: absolute;
  top: 0;
  left: 0;
}
.v-progress-circular {
  position: absolute;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  color: #d8bb27;
}
</style>