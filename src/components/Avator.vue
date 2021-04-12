<template>
  <div>
    <v-avatar class="avator" size="38">
      <span class="white--text headline">{{ name }}</span>
    </v-avatar>
  </div>
</template>

<script>
export default {
    name: "Avator",
    props: {
        name: String,

    }
};
</script>

<style scoped lang="scss">
.avator {
    background: #e6bf64;
    color: white;
}
.headline {
    font-size: 1.5em;
}


</style>