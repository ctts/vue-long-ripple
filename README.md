# vue-long-ripple

> 仿知乎、掘金点击动画效果插件,支持div、btn等标签，响应式wapper大小，可自定义波纹，开箱即用。 ***支持移动端长按特效***

## 安装

```
## 下载安装包
npm install vue-long-ripple

# 在vue中引用
import Vue from 'vue'
import App from './App.vue'
import VueRipple from './lib/index.js'

Vue.use(VueRipple)

# 在组件中引用
<template>
  <div>
    <div class="btn">
      <vue-ripple></vue-ripple>
    </div>
  </div>
</template>
<style>
.btn {
  width: 30%;
  height: 300px;
  background: #eeeeee;
  margin: 0 auto;
}
</style>
```
## 效果展示
