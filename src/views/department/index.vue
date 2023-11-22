<template>
  <div class="container">
    <div class="app-container">
      <!-- 组织架构   default-expand-all 默认展开-->
      <el-tree default-expand-all :data="depts" :props="defaultProps"></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "Department",
  data() {
    return {
      depts: [
        {
          name: "传智教育",
          children: [
            { name: "总裁办" },
            { name: "行政部" },
            { name: "财务部" },
          ],
        },
      ],
      defaultProps: {
        children: "children", //读取子节点的字段名
        label: "name", //要显示的字段的名字
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container{
  padding: 30px 140px;
}
</style>
