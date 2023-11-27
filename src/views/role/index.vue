<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理内容 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true"
          >添加角色</el-button
        >
      </div>
      <!-- 放置table组件 -->
      <el-table :data="list">
        <!-- 放置列 -->
        <el-table-column prop="name" align="center" width="200" label="角色">
          <template v-slot="{ row }">
            <!-- 条件判断 -->
            <el-input
              v-if="row.isEdit"
              v-model="row.editRow.name"
              size="mini"
            />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200" label="启用">
          <!-- 自定义列结构 -->
          <template v-slot="{ row }">
            <!-- 开 1 关 0 -->
            <el-switch
              v-if="row.isEdit"
              v-model="row.editRow.state"
              :active-value="1"
              :inactive-value="0"
            />
            <span v-else>
              {{
                row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无"
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" size="mini" type="textarea"  />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <!-- 编辑状态 -->
              <el-button type="primary" size="mini">确定</el-button>
              <el-button size="mini">取消</el-button>
            </template>
            <template v-else>
              <!-- 非编辑状态 -->
              <!-- text 表示为链接 -->
              <el-button size="mini" type="text">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)"
                >编辑</el-button
              >
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" style="height: 60px" align="middle" justify="end">
        <!-- 放置分页组件 -->
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <el-dialog
      @close="btnCancel"
      width="500px"
      title="新增角色"
      :visible.sync="showDialog"
    >
      <!-- 表单内容 -->
      <el-form
        label-width="120px"
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" style="width: 300px" size="mini" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <!-- 2.重置表单数据，需要绑定 prop属性 -->
          <!-- 1.如果不需要校验 就不需要写 prop属性 -->
          <!-- :active-value="1" 启用为 数字1  加:表示数字  不加表示字符串 active-value="1" （值为字符串1）-->
          <!-- :inactive-value="0" 未启用为 数字0 -->
          <el-switch
            v-model="roleForm.state"
            :active-value="1"
            :inactive-value="0"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="roleForm.description"
            type="textarea"
            :rows="3"
            style="width: 300px"
            size="mini"
          />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOK"
                >确定</el-button
              >
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, addRole } from "@/api/role";
import role from "@/router/modules/role";
export default {
  name: "Role",
  data() {
    return {
      showDialog: false, //控制弹出层的显示和隐藏
      list: [],
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页多少条
        total: 0,
      },
      roleForm: {
        name: "",
        description: "",
        state: 0, // 默认未启用0   关闭 0 打开1
      },
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "角色描述不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 1.角色管理-获取数据
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams);
      this.list = rows; // 赋值数据
      this.pageParams.total = total;
      // 针对每一行数据添加一个编辑标记
      this.list.forEach((item) => {
        // 数据响应式的问题  响应式就是：数据变化，视图更新
        // 1.这样添加的动态属性 不具备响应式特点
        // item.isEdit = false; // 添加一个属性 初始值为false

        // this.$set(目标对象, 属性名称, 初始值) 可以针对目标对象 添加的属性 添加响应式
        this.$set(item, "isEdit", false);
        // 初始化时，添加一个缓存数据，做编辑用
        this.$set(item, "editRow", {
          name: item.name,
          state: item.state,
          description: item.description,
        });
      });
    },
    // 切换分页时 请求新的数据
    changePage(newPage) {
      this.pageParams.page = newPage; // 赋值当前页码
      this.getRoleList();
    },

    btnOK() {
      this.$refs.roleForm.validate(async (isOK) => {
        if (isOK) {
          await addRole(this.roleForm);
          this.$message.success("新增角色成功");
          this.getRoleList();
          this.btnCancel();
        }
      });
    },
    btnCancel() {
      this.$refs.roleForm.resetFields(); // 重置表单数据
      this.showDialog = false; // 关闭弹层
    },
    // 点击编辑行
    btnEditRow(row) {
      row.isEdit = true; // 改变行的编辑状态
      // 点击编辑，需要更新缓存数据
      row.editRow.name = row.name;
      row.editRow.state = row.state;
      row.editRow.description = row.description;
    },
  },
};
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
