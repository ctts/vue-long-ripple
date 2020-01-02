# vue-long-ripple

> 仿知乎、掘金点击动画效果插件, 支持所有 block 标签(或将 display 设为 block )，响应式wapper大小，可自定义波纹，开箱即用。 ***支持长按特效***

## 介绍

### 前言

> 看到知乎和掘金上的tabbar有低调奢华的波纹特效，增强了和用户交互的效果，忍不住自己也想用，但是市面上好像没有什么不错的类似特效和完整的封装（发布包的时候才发现都是几年前的东西），所以自己花了一周的时间做了一个。大小约15k。

### 特色

1. 自适应外层包装，只需要把插件放到需要的盒子中即可，自适应外层容器大小，无需其他操作，完全黑盒，开箱即用。
2. 可定制波纹的颜色，控制波纹时间。
3. 支持媒体查询，pc和移动端皆可使用
4. 支持长按特效！（花了不少时间）长按时间默认为 500ms 
5. 无第三方依赖

## 1.0.5 更新

1. 适配了PC端长按效果
2. 修改了长按回调的调用方法
3. 删除了sourceMap，减小体积

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

> 直接使用

![PC图片使用](https://github.com/ctts/vue-long-ripple/raw/master/static/img/6.gif)

![PC文章使用](https://github.com/ctts/vue-long-ripple/raw/master/static/img/7.gif)

![PC直接使用](https://github.com/ctts/vue-long-ripple/raw/master/static/img/1.gif)

![移动端直接使用](https://github.com/ctts/vue-long-ripple/raw/master/static/img/2.gif)

> 自定义颜色

![自定义颜色](https://github.com/ctts/vue-long-ripple/raw/master/static/img/3.gif)

> 自定义时间

![自定义颜色](https://github.com/ctts/vue-long-ripple/raw/master/static/img/4.gif)

> 综合

![综合](https://github.com/ctts/vue-long-ripple/raw/master/static/img/5.gif)

## API

用户可定制化波纹时间和颜色，用props传入对应参数即可

### 颜色

默认为 rgba(0, 0, 0, 0.25) 建议使用 rgba 字符串形式。

``` 
<vue-ripple :backgroundColor:"'rgba(10,20,120,0.3)'"></vue-ripple>
```

### ripple时间

默认为 0.6s 为保证效果，请不要超出1.5s（当然你觉得时间长好看我也无所谓啦），请使用 Number 类型。



``` 
<vue-ripple :enterTime="1"></vue-ripple>
```
### 长按时间
请注意，切勿将长按时间超出 enterTime 或过小！

长按时间默认为 0.5s ，可以通过 longPressTime 设置想要的长按触发时间。
若只设置了 enterTime ，则longPressTime默认为 enterTime - 0.1。
若 enterTime 大于了 longPressTime，则变成 enterTime-0.1。

长按可以添加回调函数，有两种回调函数，分别是：
1. 长按时间到达时触发：timeup
2. 手势抬起时触发：mouseup

使用v-on监听（或使用@）

例子：
```
<vue-long-ripple @timeup="timeup" @mouseup="mouseup" :longPressTime="0.2"></vue-long-ripple>

methods: {
  click(){
    console.log('click');
  },
  timeup(){
    console.log('timeup')
  },
  mouseup(){
    console.log('mouseup')
  }
},
```

### 绝对定位

因为插件使用的是block，所以肯定会占用空间，如遇到偏移的情况，请确定外层wapper的padding或margin，或在外层添加一层 div 使用绝对定位即可。
```
<div class="ripple-wapper">
  <vue-long-ripple></vue-long-ripple>
</div>
```
```
.ripple-wapper{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
}
```

### 最后

终于完成了…… 这一周也遇到不少问题，也学到不少东西，希望这个插件可以帮到大家。
