<template>
  <div>
    <div class="progres-bar" :style="{ width: percentage + '%' }">
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    percentage: Number
  },
};
</script>

<style lang="scss" scoped>
.progres-bar {
  height: 5px;
  background-color: #7b9a7d;
  margin: 40px 0;
}
</style>