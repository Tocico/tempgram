<template>
  <div class="container">
    <span>Please add your favorite images</span>
    <UploadForm :user="user" @upload-img="uploadImg" />
    <Images :images="images && images" @toggle-deleteImg="toggleDeleteImg"  />
  </div>
</template>

<script>
import UploadForm from "../components/UploadForm";
import Images from "../components/Images";
import { getUserImages } from "../server/api";
import { projectStorage, projectFirestore, projectFirebase } from "../firebase/config";


export default {
  name: "MyGallery",
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
    user() {
         return this.$store.getters.user.data;
    },
    img() {
      return this.$store.getters.images.data;
    }
  },
  methods: {
    async getImages() {
      this.images = await getUserImages(this.user.id);
    },
    async uploadImg() {
      await this.getImages();
    },
    toggleDeleteImg(image) {
       //Delete liked image data in realtime db
      projectFirebase.ref('images').child(image.key).remove()
      //Delete image in storage
      projectStorage.ref(image.storageId).delete();
      // //Delete recipe in firestore
     projectFirestore
        .collection("users")
        .doc(this.user.id)
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