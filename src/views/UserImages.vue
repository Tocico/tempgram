<template>
  <div class="container">
    <UploadForm :user="user.data" @upload-img="uploadImg" />
    <Images :images="images && images" @toggle-deleteImg="toggleDeleteImg"  />
  </div>
</template>

<script>
import UploadForm from "../components/UploadForm";
import Images from "../components/Images";
import { mapGetters } from "vuex";
import { getUserImages } from "../server/api";
import { projectStorage, projectFirestore } from "../firebase/config";


export default {
  name: "UserImages",
  data() {
    return {
      images: [],
    };
  },
  components: {
    UploadForm,
    Images,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    async getImages() {
      this.images = await getUserImages(this.user.data.id);
    },
    async uploadImg() {
      await this.getImages();
    },
    toggleDeleteImg(image) {
      console.log(image);
      console.log(this.user.data.id)
      //Delete image in storage
      projectStorage.ref(image.storageId).delete();
      // //Delete recipe in firestore
     projectFirestore
        .collection("users")
        .doc(this.user.data.id)
        .collection("images")
        .doc(image.id)
        .delete()
        .then(async() => {
            await this.uploadImg()
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async created() {
    await this.getImages();
  },
};
</script>

<style lang="sass" scoped>
</style>