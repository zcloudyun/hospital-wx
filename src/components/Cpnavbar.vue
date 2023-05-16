<template>
  <van-nav-bar
    left-arrow
    @click-left="onClickLeft"
    fixed
    :title="title"
  >
  </van-nav-bar>
</template>

<script>
export default{
 props:['title'],
 methods:{
    onClickLeft(){
        this.$router.go(-1)
    }
 },
 mounted() {
  console.log(this.props)
 },
}
</script>
<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }

    &__text {
      font-size: 15px;
    }
  }
}
</style>
