<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { Toast, type FormInstance } from 'vant'
import { useUserStore } from '@/stores/index'
import { useRoute, useRouter } from 'vue-router'
// 导入表单校验规则
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
// 导入接口
import { loginByPassword, sendMobileCode, loginByCode } from '@/services/user'
//变量
const mobile = ref('13230000001') //手机号
const password = ref('abc12345') //密码
const code = ref('') //验证码
const agree = ref(false) //同意
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const isPass = ref(true) //切换数据
const time = ref(0) //验证码倒计时
let timeId: number //定时器id
const form = ref<FormInstance | null>(null)
const show = ref(false) //显示密码
//函数
//登录事件处理函数
const login = async () => {
  if (!agree.value) return Toast('请勾选我已同意')

  // 校验通过调用登录接口
  const res = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByCode(mobile.value, code.value)
  // 登录成功将用户信息存入到pinia中
  store.setUser(res.data)
  // 如果有回跳地址就进行回跳，没有跳转到个人中心
  router.push((route.query.returnUrl as string) || '/user')
  Toast.success('登录成功')
}

// 发送验证码事件处理函数
const sendBtn = async () => {
  //验证码倒计时大于0 ,此时不能发送验证码
  if (time.value > 0) return
  //进行单项表单校验
  await form.value?.validate('mobile')
  //调用发送验证码接口
  await sendMobileCode(mobile.value, 'login')
  Toast.success('发送成功')
  time.value = 6
  //倒计时
  clearInterval(timeId)
  setInterval(() => {
    time.value--
    if (time.value <= 0) window.clearInterval(timeId)
  }, 1000)
}
onUnmounted(() => {
  // 组件卸载的时候关闭定时器
  window.clearInterval(timeId)
})
</script>

<template>
  <div class="login-page">
    <cp-nav-bar title="登录" rightText="注册"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单区域 -->
    <van-form autocomplete="off" @submit="login" ref="form">
      <van-field
        placeholder="请输入手机号"
        type="tel"
        v-model="mobile"
        name="mobile"
        :rules="mobileRules"
      ></van-field>
      <van-field
        v-if="isPass"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
        v-model="password"
        :rules="passwordRules"
      >
        <!-- 使用插槽 -->
        <template #button>
          <cp-icon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          ></cp-icon
        ></template>
      </van-field>
      <van-field
        v-else
        placeholder="请输入验证码"
        type="text"
        v-model="code"
        :rules="codeRules"
      >
        <!-- 使用插槽 -->
        <template #button>
          <span class="btn-send" @click="sendBtn" :class="{ active: time > 0 }">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}</span
          >
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button native-type="submit" type="primary" block round
          >登录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码?</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  padding-top: 46px;
  .login-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  .login-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
  .van-form {
    padding: 0 14px;
    .cp-cell {
      height: 52px;
      line-height: 24px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .van-checkbox {
        a {
          color: var(--cp-primary);
          padding: 0 5px;
        }
      }
    }
    .btn-send {
      color: var(--cp-primary);
      &.active {
        color: rgba(22, 194, 163, 0.5);
      }
    }
  }
}
</style>
