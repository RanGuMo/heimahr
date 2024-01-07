# 黑马人资项目   
> 项目使用vue-admin-template模板，axios，element-ui，vue-router，vuex，vue-cli3.0，webpack，es6，eslint


## 1.项目启动

### 1.1.安装依赖
```sh
npm install
```

### 1.2.启动开发环境

```sh
npm run dev
```

### 1.3.打包项目

```sh
npm run build:prod
```

# 1.人力资源项目介绍

### 1.1 项目架构和解决方案

![image.png](../../source/images/README/1677638069702-b1d74f78-3c4d-4491-bbcb-5984cd6a2740.png)

### 1.2 课程安排

![image.png](../../source/images/README/1677638782885-2deeb032-d14b-414a-96c6-327f92556f19.png)

### 1.3 课程具备能力

![image.png](../../source/images/README/1677638817350-1233e8af-2c01-419d-ae0b-21fd71338458.png)

### 1.4 课程地址

 

- vue-element-admin文档地址：[链接](https://panjiachen.gitee.io/vue-element-admin-site/zh/)
- 演示地址：  [链接]()    
- 人力资源项目演示地址：  [链接]()


# 2. 拉取项目基础代码

- 拉取命令

```bash
$ git clone  https://github.com/PanJiaChen/vue-admin-template.git  heimahr
```

- 升级core-js版本到**3.25.5**

```bash
$ npm i core-js@3.25.5 # npm
$ yarn add core-js@3.25.5 # yarn
```

- 安装完整依赖

```bash
$ npm i # npm
$ yarn  # yarn
```

- 启动命令在package.json中查看

```bash
$ yarn dev
```

- 需要检查VsCode本身的插件ESLint 和 Vutur

![image.png](../../source/images/README/1659364299958-47e73c1f-2f5c-42e6-8fd2-bfbad780409e.png)

# 3.项目目录和入口文件介绍

- 项目目录

```bash
├── src                        # 源代码目录
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
│   └── settings.js            # 配置文件

```

- 入口文件

![image.png](../../source/images/README/1677639601650-458e85fc-929d-4283-8269-e0cfd126d7b3.png)

# 4.App.vue根组件解析

- App.vue组件

![image.png](../../source/images/README/1677639734533-f9c83c9d-9d5f-4ddd-8eff-b3c83db92c57.png)

- layout布局

![image.png](../../source/images/README/1677639748076-1d466f54-67c1-4b6e-8744-c53ec8e4b6b9.png)

# 5.基础设置settings.js和导航守卫permission.js

![image.png](../../source/images/README/1677639923771-14256f1c-309c-425e-89e9-66a22a593090.png)
settings.js导出网站基础配置，包括：网站标题、固定header、显示logo
permission.js(权限)，主要负责路由导航守卫

# 6.Vuex的结构

- 模板中的结构

![image.png](../../source/images/README/1677640092537-3312b3af-d04a-4dd5-bfff-5e6f2da4a49f.png)
![image.png](../../source/images/README/1677640123080-97dd11f7-ebe2-4120-a678-0894d444d1ce.png)
注意：人资资源项目主要针对**用户模块user **进行改造和重写

- Vuex的设计思想

1.页面交互状态（折叠侧边栏-固定头部）
![image.png](../../source/images/README/1677640312841-479deeea-caa9-4664-827c-df4288dc6a2f.png)
2.使用全局状态Vuex根据功能拆分成不同的模块（modules）
![image.png](../../source/images/README/1677640340361-8ee4e706-8834-49ae-bae8-58569f9b8492.png)
3.进行状态管理通过getters建立对于模块中属性的快捷访问
![image.png](../../source/images/README/1677640395635-1f821307-aa62-4c03-821b-b79b94a97798.png)

# 7.使用模板中的Icon图标

- src/icons/svg目录下的图标都可以使用

![image.png](../../source/images/README/1677640480400-583a63ef-d270-4893-93cc-3a6738249d07.png)

- 图标文件名直接设置为svg-icon组件的iconClass属性

![image.png](../../source/images/README/1677640547884-53a85baa-3a0e-4dc5-9d4f-c9ddb1364c34.png)

# 8.扩展-解析Icon图标的实现思路

- 引入目录所有的svg

![image.png](../../source/images/README/1677640698454-71b9b26a-20d7-4d51-82ae-fb674c33fa0c.png)

- 全局注册svg-icon组件

![image.png](../../source/images/README/1677640655098-0aceb937-dea6-468d-97a5-1451e41bfda3.png)

- loader插件打包svg

![image.png](../../source/images/README/1677640818980-5b7c4145-b023-4fb7-87a9-5f9c927696e5.png)

- svg-icon引用svg的链接

![image.png](../../source/images/README/1677640847037-8ecda371-e9ed-44e0-b333-6b5f0dac6f33.png)

- 知识扩展

1.了解：require.context(路径，是否扫描子目录， 正则匹配) 可以引入某个目录下的内容
2.了解：svg-sprite-loader打包了所有svg到一个svg标签上，将svg名称作为symbol标签的id属性
3.了解：svg-icon使用iconClass属性引用了symbol的id

# 9.导入样式资源并使用git管理

- 将教学资源中的初始化**图片-样式-svg **拷贝到src目录下

![image.png](../../source/images/README/1677658346411-2d854c54-1178-4f98-8410-d08eaabf267b.png)

> 因为项目是从github上拉取下来的，所以git记录了之前模版的信息，所以删除需要建立git

- 删除原有的.git文件
- 初始化仓库

```bash
$ git init # 初始化仓库
```

- 添加到暂存区

```bash
$ git add . # 添加到暂存区
```

- 提交本地仓库

```bash
$ git commit -m "初始化人力资源项目" # 提交本地仓库
```

> 接下来，同学们需要在gitee上新建一个自己的远程仓库，然后将本地的仓库推送到远程仓库托管

- 本地仓库配置远程仓库地址

```bash
$ git remote add origin <你的远程仓库地址>  # 本地仓库配置远程仓库地址
```

- 推送到远程仓库

```bash
$ git push -u origin master # 推送到远程仓库
```

# 10.登录页的结构和表单

> 接下来需要实现登录页的表单结构和表单内容

![image.png](../../source/images/README/1677658662771-f85ecb01-134c-4469-9de4-233a425e07cb.png)

- 拷贝登录页的基本结构布局-代码位置(**src/views/login/index.vue)**

```vue
<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name : "Login"
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>

```

- 实现登录表单的结构

```html
<div class="form">
  <h1>登录</h1>
  <el-card shadow="never" class="login-card">
    <!--登录表单-->
    <!-- el-form > el-form-item > el-input -->
    <el-form>
      <el-form-item>
        <el-input placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-checkbox>
          用户平台使用协议
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button style="width:350px" type="primary">登录</el-button>
   </el-form-item>
</el-form>
```

- 提交代码

# 11.登录表单校验-实现

1. 定义数据和校验规则

```vue
export default {
  name: 'Login'
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '',
        password: '',
        isAgree: false
      },
      loginRules: {
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式不正确',
          trigger: 'blur'

        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码长度应该为6-16位之间',
          trigger: 'blur'

        }],
        // required只能检查 null "" undefined
        isAgree: [{
          validator: (rule, value, callback) => {
            // rule规则
            // value检查的数据 true/false
            // callback 函数 执行这个函数
            // 成功执行callback 失败也执行callback(错误对象 new Error(错误信息))
            value ? callback() : callback(new Error('没有勾选用户平台协议'))
          }
        }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate((isOK) => {
        if (isOK) {
          alert('校验通过')
        }
      })
    }
  }
}
</script>
```

2. 绑定组件的对应属性

```vue
 <el-form ref="form" :model="loginForm" :rules="loginRules">
      <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password placeholder="请输入密码" />
      </el-form-item>
      <el-form-item prop="isAgree">
          <el-checkbox v-model="loginForm.isAgree">
              用户平台使用协议
          </el-checkbox>
      </el-form-item>
      <el-form-item>
          <el-button style="width:350px" type="primary" @click="login">登录</el-button>
      </el-form-item>
</el-form>
```
