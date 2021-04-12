<template>
  <v-btn
    class="ma-2 btn"
    small
    v-on:click="onClick()"
    :style="{ background: color }"
  >
    <v-icon left v-show="isLoggedIn"> {{ logo }} </v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
    logo: String,
    isLoggedIn: Boolean,
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
  },
};
</script>

<style lang="scss">
 .btn {
     border: 1px solid white;
 }
    
</style>