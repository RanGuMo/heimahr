import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

//require.context(目标目录，是否扫描子目录，正则表达式)扫描目录中的文件
const req = require.context('./svg', false, /\.svg$/)
console.log(req); //1.得到一个req函数
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req) //2.创建requireAll函数，传入req这个函数

//数组方法map
//map是循环每一项svg图片map(()=>{})
//req函数能够引用图片到项目中
//将所有的sVg都引用到项目中

// 3.webpack loader 中处理
