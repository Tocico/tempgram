<template>
  <div>
    <Upload @upload-img="updateImg" />
    <p :showErrorMsg="showErrorMsg" class="errorMsg">{{ errorMsg }}</p>
    <Loading v-if="file" :percentage="percentage" />
  </div>
</template>

<script>
import Upload from "./Upload";
import Loading from "./Loading";
import {
  projectStorage,
  projectFirestore,
  timestamp,
  projectFirebase,
} from "../firebase/config";
import { uuid } from "vue-uuid";
import imageCompression from "../plugins/ImageCompression";

export default {
  name: "Uploadform",
  components: {
    Upload,
    Loading,
  },
  props: {
    user: Object,
  },
  data: () => {
    return {
      file: null,
      types: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/JPG",
        "image/JPEG",
        "image/PNG",
      ],
      errorMsg: null,
      showErrorMsg: false,
      percentage: 0,
      url: null,
    };
  },
  methods: {
    async updateImg(selectedImg) {
      this.errorMsg = "";
      if (selectedImg && this.types.includes(selectedImg.type)) {
        //Compress image before to sore it in db
        const compressedImg = await imageCompression.getCompressImageFile(
          selectedImg
        );
        this.file = compressedImg;

        this.storage();
      } else {
        this.file = null;
        this.errorMsg = "jpeg か pngの画像をアップロードしてください";
        this.showErrorMsg = !this.showErrorMsg;
      }
    },
    progresPercentage(snap) {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      this.percentage = percentage;
    },
    storage() {
      const filename = this.file.name;
      const ext = filename.slice(filename.lastIndexOf(".")); //Get image format name ex(.jpg, .png)
      const storageId = uuid.v1() + ext;
      const storageRef = projectStorage.ref(storageId);
      const collectionRef = projectFirestore
        .collection("users")
        .doc(this.user.id)
        .collection("images");

      storageRef.put(this.file).on(
        "state_changed",
        (snap) => {
          this.progresPercentage(snap);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = timestamp();
          const userId = this.user.id;
          const userName = this.$store.state.user.data.displayName;
          const imagesRef = projectFirebase.ref().child("images");
          const { key } = imagesRef.push({
            storageId: storageId,
          });

          await collectionRef.add({
            url,
            createdAt,
            userId,
            storageId,
            userName,
            key
          });

          this.url = url;
          this.percentage = 0;
          this.file = null;
          this.$emit("upload-img");
        }
      );
    },
  },
};
</script>


<style lang="scss">
</style>