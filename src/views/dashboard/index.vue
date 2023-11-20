<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- 使用svg-icon组件 -->
    <!-- 设置icon-class 属性="文件名称（没有后缀）" -->
    <svg-icon icon-class="dashboard"></svg-icon>
    <svg-icon icon-class="example"></svg-icon>
    <svg-icon icon-class="password"></svg-icon>
    <svg-icon icon-class="skill"></svg-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.$store.dispatch('user/getUserInfo')
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
