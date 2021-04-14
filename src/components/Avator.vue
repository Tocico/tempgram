<template>
  <div>
    <v-avatar :style="{ background: color }" class="avator" size="38">
      <span v-if="name" class="white--text headline">{{ name }}</span>
      <v-icon v-if="icon" class="icon"> {{ icon }} </v-icon>
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: "Avator",
  props: {
    name: String,
    icon: String,
    color: String
  },
  created() {
    console.log(this.icon);
  },
};
</script>

<style scoped lang="scss">
.avator, .icon::before {
  color: white;
}
.headline {
  font-size: 1.5em;
}
</style>