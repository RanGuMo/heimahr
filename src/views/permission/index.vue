<template>
  <div class="container">
    <div class="app-container">
      <el-button class="btn-add" size="mini" type="primary">添加权限</el-button>
      <!-- 设置row-key 并且数据存在children字段，就会渲染成树形结构 -->
      <!-- default-expand-all 默认展开 -->
      <el-table default-expand-all :data="list" row-key="id">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <!-- type为1 才有添加按钮 -->
            <el-button v-if="row.type === 1" size="mini" type="text">添加</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), 0) // 将列表数据转化成树形结构
    }
  }
}
</script>
<style>
.btn-add {
  margin: 10px;
}
</style>
