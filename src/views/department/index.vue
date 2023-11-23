<template>
  <div class="container">
    <div class="app-container">
      <!-- 组织架构   -->
      <!-- 展示树形结构 default-expand-all 默认展开 -->
      <!-- :expand-on-click-node="false"  点击 节点行 不能关闭，必须点击折叠图标才行 -->
      <el-tree :expand-on-click-node="false" default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <template v-slot="{ node, data }">
          <el-row
            style="width: 100%; height: 40px"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <el-col>{{ data.name }} </el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="operateDept">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!--  -->
    <add-dept  :show-dialog.sync="showDialog"  />
  </div>
</template>

<script>
import { getDepartment } from "@/api/department";
import { transListToTreeData } from "@/utils";
import AddDept from "./components/add-dept.vue";

export default {
  name: "Department",
  components: { AddDept },
  data() {
    return {
      depts: [],
      // depts: [
      //   {
      //     name: "传智教育",
      //     managerName: "管理员",
      //     children: [
      //       { name: "总裁办", managerName: "张三" },
      //       { name: "行政部", managerName: "李四" },
      //       { name: "财务部", managerName: "王五" },
      //     ],
      //   },
      // ],
      defaultProps: {
        children: "children", //读取子节点的字段名
        label: "name", //要显示的字段的名字
      },
      showDialog: false, //控制弹出层的显示与隐藏
      
    };
  },
  created() {
    this.getDepartment();
  },
  methods: {
    // 1.获取部门信息
    async getDepartment() {
      const result = await getDepartment();
      this.depts = transListToTreeData(result, 0);
    },
    // 2.点击部门节点 下拉项
    operateDept(type) {
      if(type === 'add') {
        this.showDialog = true
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}

.tree-manager {
  width: 50px;
  display: inline-block;
  margin-right: 35px;
}
</style>
