<template>
  <div>
 <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        class="d-flex child-flex"
        cols="12"
        xs="8"
        sm="6"
        md="4"
        lg="3"
      >
        <v-img
          :src="image.url"
          :lazy-src="`${image.url * 5 + 5}`"
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
import { getLikedCount } from '../server/api';
import Modal from "./Modal";

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
    async onClick(image) {
      this.image = image;
      const imageFromDB = await getLikedCount(image.key)
      this.$store.dispatch("fetchImages", imageFromDB)
      this.isModalShow = !this.isModalShow;
    },
    toggleModal() {
        this.isModalShow = !this.isModalShow
    }
  }
};
</script>

<style lang="scss" scoped>
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