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
            <el-input
              v-if="row.isEdit"
              v-model="row.editRow.description"
              size="mini"
              type="textarea"
            />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <!-- 编辑状态 -->
              <el-button type="primary" size="mini" @click="btnEditOK(row)"
                >确定</el-button
              >
              <el-button size="mini" @click="row.isEdit = false"
                >取消</el-button
              >
            </template>
            <template v-else>
              <!-- 非编辑状态 -->
              <!-- text 表示为链接 -->
              <el-button size="mini" type="text" @click="btnPermission(row.id)"
                >分配权限</el-button
              >
              <el-button size="mini" type="text" @click="btnEditRow(row)"
                >编辑</el-button
              >
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="confirmDel(row.id)"
              >
                <el-button
                  slot="reference"
                  style="margin-left: 10px"
                  size="mini"
                  type="text"
                  >删除</el-button
                >
              </el-popconfirm>
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

    <!-- 放置权限弹层 -->
    <el-dialog :visible.sync="showPermissionDialog" title="分配权限">
      <!-- 放置权限数据  check-strictly 父子不关联-->
      <el-tree
        ref="permTree"
        check-strictly
        node-key="id"
        :data="permissionData"
        :props="{ label: 'name' }"
        show-checkbox
        default-expand-all
        :default-checked-keys="permIds"
      />
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="btnPermissionOK"
            >确定</el-button
          >
          <el-button size="mini" @click="showPermissionDialog = false"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRoleList,
  addRole,
  updateRole,
  delRole,
  getRoleDetail,
  assignPerm,
} from "@/api/role";
import role from "@/router/modules/role";
import { getPermissionList } from "@/api/permission";
import { transListToTreeData } from "@/utils";
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
      showPermissionDialog: false, //控制权限弹出层的显示和隐藏
      permissionData: [], //接收权限数的数据
      currentRoleId: null, //记录当前点击的角色id
      permIds: [], //角色所拥有的权限数据
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
    // 点击确定时触发
    async btnEditOK(row) {
      if (row.editRow.name && row.editRow.description) {
        // 下一步操作
        await updateRole({ ...row.editRow, id: row.id });
        // 更新成功
        this.$message.success("更新角色成功");
        // 更新显示数据  退出编辑状态
        // row.name = row.editRow.name // eslint的校验 误判
        // Object.assign(target, source)
        Object.assign(row, {
          ...row.editRow,
          isEdit: false, // 退出编辑模式
        }); // 规避eslint的误判
      } else {
        this.$message.warning("角色或者角色描述不能为空");
      }
    },
    // 删除角色
    async confirmDel(id) {
      await delRole(id); // 后端删除
      this.$message.success("删除角色成功");
      // 删除的如果是最后一个，让当前页码减一(注意！！！，list指的是当前页面的数据，不是所有的数据)
      // 并且当前页数要大于1
      if (this.list.length === 1 && this.pageParams.page > 1)
        this.pageParams.page--;
      this.getRoleList(); // 重新获取数据
    },
    async btnPermission(id) {
      this.currentRoleId = id;
      const { permIds } = await getRoleDetail(id);
      this.permIds = permIds;
      this.permissionData = transListToTreeData(await getPermissionList(), 0);
      this.showPermissionDialog = true;
    },
    // 点击确定时触发
    async btnPermissionOK() {
      await assignPerm({
        id: this.currentRoleId,
        permIds: this.$refs.permTree.getCheckedKeys(),
      });
      this.$message.success("角色分配权限成功");
      this.showPermissionDialog = false;
    },
  },
};
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
