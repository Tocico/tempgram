<template>
  <div class="backdrop" @click="onToggleClick">
    <v-card class="card" max-width="600">
      <v-img height="250" :src="image.url"></v-img>

      <v-card-title>
        <v-avatar class="avator">
          <v-icon dark> mdi-account </v-icon>
        </v-avatar>
        {{ image.userName }}</v-card-title
      >

      <v-card-text>
          <div v-show="isDeletebtnShow" class="delete-btn" >
            <v-btn tile color="success" @click="handleDelete" class="delete">
              <v-icon left>mdi-trash-can-outline</v-icon>
              Delete image
            </v-btn>
          </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Modal",
  props: {
    image: Object,
  },
  data() {
    return {
      isDeletebtnShow: Boolean,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
      handleDelete() {
          this.$emit('deletebtn-click', this.image);
          this.$emit('toggle-click')
      },
      onToggleClick(e) {
          if(e.target.classList.contains('backdrop') || e.target.classList.contains('delete'))
          this.$emit('toggle-click')
      }
  },
  created() {
    this.isDeletebtnShow = this.$route.path !== "/" && this.user.data.id === this.image.userId ;
  },
};
</script>

<style lang="scss">
.avator {
  background-color: #557d55;
  margin-right: 10px;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    width: 100%;
  }
  .v-image {
    height: 380px !important;
  }
  .v-image__image--cover {
    background-size: contain;
  }
  .delete-btn {
      text-align: end;
  }
}
</style>