<template>
  <div class="backdrop" @click="onToggleClick">
    <v-card class="card" max-width="600">
      <v-img
        height="250"
        :src="image.url"
        :lazy-src="`${image.url * 5 + 16}`"
      ></v-img>

      <v-card-title>
        <v-avatar class="avator">
          <v-icon dark> mdi-account </v-icon>
        </v-avatar>
        {{ image.userName }}
        <v-icon @click="handleLike" class="likeBtn">{{
          isLiked ? "mdi-heart" : "mdi-heart-outline"
        }}</v-icon>
        <!-- <span class="likeCount">{{ isLikedUser && isLikedUser }}</span> -->
        <span class="likeCount">{{ likedCount && likedCount }}</span>
      </v-card-title>

      <v-card-text>
        <div v-if="isDeletebtnShow" class="delete-btn">
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
import { projectFirebase } from "../firebase/config";
import { getLikedCount } from "../server/api";

export default {
  name: "Modal",
  props: {
    image: Object,
  },
  data() {
    return {
      isDeletebtnShow: Boolean,
      isLiked: false,
    };
  },
  computed: {
    currentUser() {
      return (
        this.$store.getters.user.loggedIn && this.$store.getters.user.data.id
      );
    },
    likedCount() {
      return (
        this.$store.getters.images.data.liked &&
        this.$store.getters.images.data.liked.length
      );
    },
    islikedUser() {
      return (
        this.$store.getters.images.data.liked &&
        this.currentUser &&
        this.$store.getters.images.data.liked.includes(this.currentUser)
      );
    },
  },
  methods: {
    handleDelete() {
      this.$emit("deletebtn-click", this.image);
      this.$emit("toggle-click");
    },
    onToggleClick(e) {
      if (
        e.target.classList.contains("backdrop") ||
        e.target.classList.contains("delete")
      )
        this.$emit("toggle-click");
    },
    handleLike() {
      const key = this.image.key;

      if (this.currentUser) {
        projectFirebase
          .ref("images")
          .child(key)
          .once("value", (snap) => {
            if (!snap.val().liked) {
              this.addFirstLike(key);
            } else if (!snap.val().liked.includes(this.currentUser)) {
              this.addLike(snap.val().liked, key);
            }
            this.isLiked = true;
          })
          .then(async () => {
            const imageFromDB = await getLikedCount(key);
            this.$store.dispatch("fetchImages", imageFromDB);
          });
      }
    },
    addFirstLike(key) {
      console.log(this.currentUser)
      projectFirebase
        .ref("images")
        .child(key)
        .update({
          liked: [this.currentUser],
        });
    },
    addLike(prevLikedValue, key) {
      projectFirebase
        .ref("images")
        .child(key)
        .update({
          liked: [...prevLikedValue, this.currentUser],
        });
    },
  },
  created() {
    this.isDeletebtnShow =
      this.$route.path !== "/" && this.currentUser === this.image.userId;

    this.isLiked = this.islikedUser;
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
  .likeBtn {
    color: rgb(170, 79, 99) !important;
    margin: 0 8px;
  }
  .likeCount {
    font-size: 0.7em;
  }
}
</style>