<template>
  <van-nav-bar
    :title="title"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script>
export default {
  props: ["title"],
  methods: {
    onClickLeft() {
      history.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.van-nav-bar{
  border-bottom: 1px solid #eee;
}
</style>
