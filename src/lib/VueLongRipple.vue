<template>
  <div
    class="rippleBtn"
    :style="{width:width,height:height}"
    @click="clickStart"
    @touchstart="touchStart"
    @touchend="touchEnd"
    ref="ripp_container"
  >
    <transition
      name="ripple"
      v-for="(ripple,index) of ripples"
      @before-enter="leaveRipple()"
      @after-enter="fadeRipple(ripple)"
      :key="'ripple'+index"
    >
      <div
        :style="ripple.style"
        class="ripple-container"
        v-show="ripple.show"
      ></div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'VueLongRipple',
  props: {
    backgroundColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.25'
    },
    enterTime: {
      type: Number,
      default: 0.6
    },
    longPressTime: {
      type: Number,
      default: 0.5
    },
    timeup: Function,
    mouseup: Function
  },
  data () {
    return {
      ripples: [],
      clearTimer: null,
      pressTimer: null,
      rippleSideLength: 0,
      width: 0,
      height: 0
    }
  },
  mounted () {
    let container = this.$refs.ripp_container
    let parent = container.parentNode
    this.width = parent.clientWidth + 'px'
    this.height = parent.clientHeight + 'px'
    const that = this

    // 使用mutationObserver添加父组件大小监听
    const observer = new MutationObserver(function () {

      that.width = parent.clientWidth + 'px'
      that.height = parent.clientHeight + 'px'
      that.$nextTick(() => {
        that.rippleSideLength = container.offsetHeight > container.offsetWidth ? container.offsetHeight : container.offsetWidth
      })
    })
    observer.observe(parent, { attributeFilter: ["style"] })

    // 修改默认值
    this.changeProperty(container, '--ripple-color', this.backgroundColor)
    this.changeProperty(container, '--ripple-time', this.enterTime + 's')

    // 在下次渲染时改变
    this.$nextTick(() => {
      this.rippleSideLength = container.offsetHeight > container.offsetWidth ? container.offsetHeight : container.offsetWidth
    })
  },
  computed: {
    lastRipple () {
      return this.ripples[this.ripples.length - 1]
    }
  },
  methods: {
    showRipple (e) {
      let show = false
      let container = this.$refs.ripp_container
      let rippleSideLength = this.rippleSideLength
      let rippleX = 0
      let rippleY = 0
      let isClick = null

      if (this.mediaQueries()) {
        // pc端
        rippleX = e.clientX - container.getBoundingClientRect().left - rippleSideLength / 2.5
        rippleY = e.clientY - container.getBoundingClientRect().top - rippleSideLength / 2.5
        isClick = true
      } else {
        // 移动端
        rippleX = e.touches[0].clientX - container.getBoundingClientRect().left - rippleSideLength / 2.5
        rippleY = e.touches[0].clientY - container.getBoundingClientRect().top - rippleSideLength / 2.5
        isClick = false
      }

      let style = {
        width: rippleSideLength + 'px',
        height: rippleSideLength + 'px',
        top: rippleY + 'px',
        left: rippleX + 'px'
      }
      this.ripples.push({
        show,
        style,
        isClick
      })
      this.$nextTick(() => {
        this.$set(this.ripples[this.ripples.length - 1], 'show', true)
      })
    },
    clickStart (e) {
      if (this.mediaQueries()) {
        this.showRipple(e)
      }
    },
    // 清除失效的transition
    leaveRipple () {
      if (this.clearTimer !== null) {
        clearTimeout(this.clearTimer)
      }
      this.clearTimer = setTimeout(() => {
        this.ripples = []
      }, this.enterTime ? this.enterTime * 1000 + 400 : 1000)
    },
    fadeRipple (ripple) {
      if (ripple.isClick) {
        ripple.show = false
      }
    },
    // 媒体查询
    mediaQueries () {
      let userAgentInfo = navigator.userAgent
      let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod")
      let flag = true
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    },
    // 模拟长按
    touchStart (e) {
      let time = 0
      if (this.longPressTime !== 0.5) {
        if (this.enterTime > this.longPressTime) {
          time = this.longPressTime
        } else {
          time = this.enterTime - 0.1
          console.warn('longPressTime must less than enterTime');
        }
      } else {
        time = this.enterTime - 0.1
      }
      this.showRipple(e)
      // 模拟计时
      if (this.pressTimer) clearTimeout(this.pressTimer)
      this.pressTimer = setTimeout(() => {
        // 长按回调函数
        this.timeup()
        this.lastRipple.isClick = false
        this.pressTimer = null
        clearTimeout(this.clearTimer)
      }, time * 1000)
    },
    // 结束触摸
    touchEnd () {
      if (this.pressTimer) {
        // 若是点击事件
        this.lastRipple.isClick = true
      } else {
        // 长按结束时触发回调
        this.mouseup()
        this.lastRipple.show = false
        // 清除
        this.leaveRipple()
      }
      clearTimeout(this.pressTimer)
      this.pressTimer = null
    },
    // 修改css变量
    changeProperty (ref, proper_name, data) {
      ref.style.setProperty(proper_name, data)
    }
  },
  watch: {
    backgroundColor () {
      if (this.backgroundColor) {
        this.changeProperty(this.$refs.ripp_container, '--ripple-color', this.backgroundColor)
      }
    },
    enterTime () {
      if (this.enterTime) {
        this.changeProperty(this.$refs.ripp_container, '--ripple-time', this.enterTime + 's')
      }
    }
  }
}
</script>

<style scoped>
.rippleBtn {
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  --ripple-color: rgba(0, 0, 0, 0.25);
  --ripple-time: 0.6s;
}

.ripple-container {
  position: absolute;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.25);
  background: var(--ripple-color, rgba(0, 0, 0, 0.25));
  opacity: 0.6;
  transform: scale(2.5);
  border-radius: 100%;
}

.ripple-enter-active {
  animation: ripple-in 0.6s ease-out forwards;
  animation: ripple-in var(--ripple-time, 0.6s) ease-out forwards;
}

.ripple-leave-active {
  animation: ripple-out 0.3s linear;
}

@keyframes ripple-in {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0.6;
  }
}

@keyframes ripple-out {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
}
</style>
