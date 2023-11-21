<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar" />
          <!--  name.chartAt(0) 表示取第一个字 -->
          <span v-else class="username">{{ name?.chartAt(0) }}</span>
          <!-- 用户名称 -->
          <span class="name">{{ name }}</span>
          <!-- ”设置“ 图标 -->
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- prevent 阻止默认事件 阻止a标签的默认跳转行为-->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- divided 表示一条分割线 -->
          <!-- native 事件修饰符，注册组件的根元素的原生事件 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 放置dialog    sync 可以接收子组件传过来的事件和值 -->
    <el-dialog
      width="500px"
      title="修改密码"
      :visible.sync="showDialog"
      @close="btnCancel"
    >
      <!-- 放置表单 -->
      <el-form
        label-width="120px"
        ref="passForm"
        :model="passForm"
        :rules="rules"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            show-password
            size="small"
            v-model="passForm.oldPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            show-password
            size="small"
            v-model="passForm.newPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="confirmPassword">
          <el-input
            show-password
            size="small"
            v-model="passForm.confirmPassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="btnOK"
            >确认修改</el-button
          >
          <el-button size="mini" @click="btnCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { updatePassword } from "@/api/user";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      showDialog: false, // 控制弹出层的显示和隐藏
      passForm: {
        oldPassword: "", // 旧密码
        newPassword: "", // 新密码
        confirmPassword: "", // 确认密码字段
      },
      rules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
        ], // 旧密码
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            trigger: "blur",
            min: 6,
            max: 16,
            message: "新密码的长度为6-16位之间",
          },
        ], // 新密码
        confirmPassword: [
          { required: true, message: "重复密码不能为空", trigger: "blur" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              //！！！注意：必须使用箭头函数才能取到this
              // value
              if (this.passForm.newPassword === value) {
                callback();
              } else {
                callback(new Error("重复密码和新密码输入不一致"));
              }
            },
          },
        ], // 确认密码字段
      },
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    // 1.退出登录
    async logout() {
      // 调用退出登录的action
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`); // 跳转到登录页
    },
    // 2.修改密码
    updatePassword() {
      this.showDialog = true; //显示弹出层
    },
    // 3.确认修改密码 按钮
    btnOK() {
      this.$refs.passForm.validate(async (isOK) => {
        if (isOK) {
          // 调用修改密码的接口
          await updatePassword(this.passForm);
          this.$message.success("修改密码成功");
          this.btnCancel();
        }
      });
    },
    // 4.取消 按钮
    btnCancel() {
      this.$refs.passForm.resetFields(); //重置表单
      this.showDialog = false; //关闭弹出层
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center; //居中
        .name {
          margin-left: 10px;
          margin-right: 15px; //用户名距离右侧的距离
          font-size: 16px;
        }
        .username {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #04c9be;
          color: #fff;
          border-radius: 50%;
        }
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .el-icon-setting {
          font-size: 20px; //设置图标大小
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
