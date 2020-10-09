<template>
  <div class="login-container">
    <div class="login-title">
      <img :src="$store.getters.choseLogo.loginLogo" class="login-logo">
      <span class="loginName">
        {{ $store.getters.choseLogo.sysName }}
      </span>
    </div>
    <div class="login-content">
      <!--<div ref="animate" class="animation" />-->

      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >

        <el-form-item prop="username" class="formItem" style="margin-top: 110px;">
          <el-input
            ref="username"
            v-model="loginForm.username"
            tabindex="1"
            placeholder="请输入账户"
            name="username"
            type="text"
            auto-complete="on"
            style="margin-left: 5%;"
            @change="aaa"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" :content="$t('login.capsLock')" placement="right" manual>
          <el-form-item prop="password" class="formItem">
            <el-input
              ref="password"
              v-model="loginForm.password"
              tabindex="2"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              auto-complete="false"
              style="margin-left: 5%;"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
            />
          </el-form-item>
        </el-tooltip>

        <el-form-item v-if="codeShow" prop="vcCode" class="code">
          <el-input
            ref="code"
            v-model="loginForm.vcCode"
            tabindex="3"
            placeholder="请输入验证码"
            type="text"
            class="formItem"
            style="width: 170px;"
            @keyup.enter.native="handleLogin"
          />
          <span style="">
            <img :src="loginForm.img" alt="暂缺" @click="getCode">
            <span style="color:#ffffff;font-size: 22px;" @click="getCode"><i class="el-icon-refresh"/></span>
          </span>
        </el-form-item>

        <el-form-item style="margin-left:20%;width: 60%;" class="login-state">
          <el-checkbox @change="rememberLogin">记住登录状态</el-checkbox>
          <el-link type="primary" :underline="false" style="float:right;left:0px;color: #ffffff;">忘记密码？</el-link>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          @click.native.prevent="handleLogin"
        >{{ $t('login.logIn') }}</el-button>
      </el-form>
    </div>
    <!--<div class="footer">COPYRIGHT 新图科技 2019版权所有</div>-->
    <div class="footer">{{ $store.getters.choseLogo.sysCopyright }}</div>
  </div>
</template>

<script>
import { code } from '@/api/base/login'
import configurationAPI from '@/api/base/configuration'
export default {
  name: 'Login',
  data() {
    return {
      inner_animate: null,
      loginForm: {
        username: process.env.NODE_ENV === 'development' ? 'admin' : '',
        password: process.env.NODE_ENV === 'development' ? '123456' : '',
        vcCode: process.env.NODE_ENV === 'development' ? '' : '',
        vcToken: '',
        img: '',
        loginCount: 0
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', min: 6, message: '请输入密码' }
        ],
        vcCode: [
          { required: true, trigger: 'blur', message: '请输入验证码' },
          { len: 4, trigger: 'blur', message: '请输入正确的验证码' }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      codeShow: false
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getLogo()
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= 'a' && key <= 'z')) ||
          (!shiftKey && (key >= 'A' && key <= 'Z'))
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(response => {
              this.getOrgType()
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(response => {
              this.loading = false
              this.loginForm.loginCount++

              if (response.response.data.code === 10002) {
                this.codeShow = true
              }
              this.getCode()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCode() {
      code(this.loginForm.vcToken).then(res => {
        if (process.env.ENV === 'production') {
          this.loginForm.vcCode = ''
        }
        this.loginForm.vcToken = res.data.vcToken
        this.loginForm.img = res.data.vcImg
      })
    },
    rememberLogin(val) {
      console.log(val)
    },
    getOrgType() {
      this.$store.dispatch('user/getOrgType')
        .then(response => {
        })
        .catch(response => {
        })
    },
    getLogo() {
      configurationAPI.getLogo().then(res => {
        const logoDetail = {
          'loginLogo': res.data.find(item => { return item.code === 'login_logo' }).value,
          'sysName': res.data.find(item => { return item.code === 'sys_name' }).value,
          'sysCopyright': res.data.find(item => { return item.code === 'sys_copyright' }).value,
          'logo': res.data.find(item => { return item.code === 'logo' }).value
        }
        this.$store.commit('logo/setLogoDetail', logoDetail)
      })
    },
    aaa() {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #33333f;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form-item {
    margin: 24px 0px;

    .el-form-item__content {
      border-radius: 3px;
      line-height: unset;
    }

    .iconfont {
      font-size: 18px;
      color: #9B9B9B;
      margin-left: 15px;
    }

    .el-input {
      display: inline-block;
      height: 52px;
      width: 80%;

      input {
        background: transparent !important;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #fffff8;
        height: 52px;
        caret-color: #fffff8;

        &:-webkit-autofill {
          transition: background-color 5000000s ease-in-out 0s !important;
          -webkit-text-fill-color: #fff!important;
          // box-shadow: 0 0 0px 1000px rgba(255,255,255,0.6) inset !important;
        }
      }
      input::-webkit-input-placeholder {
        color: #fffff8;
      }
      input::-moz-input-placeholder {
        color: #fffff8;
      }
      input::-ms-input-placeholder {
        color: #fffff8;
      }
    }
  }

  .el-button {
    /*height: 48px;*/
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background: url("../../../assets/common/bg1.png") no-repeat;
  background-size:100% 100%;
  background-attachment:fixed;

  .earth-gif {
    width: 716px;
    height: 511px;
  }

  .login-content {
  }

  .login-form {
    position: absolute;
    top: 25vh;
    right: 250px;
    width: 550px;
    height: 570px;
    background: url("../../../assets/common/loginBorder.png") no-repeat;
    background-size:100% 100%;
    z-index: 3;
  }

  @media screen and (min-width: 1921px) {
    .login-form {
      right: 250px;
      // top: 200px;
    }
  }

  @media screen and (max-width: 1920px) {
    .login-form {
      right: 230px;
      // top: 180px;
    }
  }

  @media screen and (max-width: 1680px) {
    .login-form {
      right: 200px;
      // top: 150px;
    }
  }

  @media screen and (max-width: 1440px) {
    .login-form {
      right: 150px;
      // top: 120px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .abc {
    position: absolute;
    top: 12px;
    left: 55px;
    width: 2px;
    height: 26px;
    background-color: rgb(153,153,153);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    text-align: center;

    .highlighted {
      display: block;
      width: 336px;
      height: 13px;
      margin: -6px auto;
    }

    .login-logo {
      width: 36px;
      height: 36px;
      margin-top: 55px;
      margin-bottom: 19px;
    }

    .title {
      width: 342px;
      font-size: 18px;
      color: $light_gray;
      margin: 0px auto 52px auto;
      text-align: center;
      font-weight: 400;

      .txt {
        &.bold {
          /*font-weight: bold;*/
        }
      }

      .rectangle {
        display: inline-block;
        width: 58px;
        height: 20px;
        vertical-align: middle;
        margin-left: 6px;

        i {
          display: block;
          height: 3px;
          margin-bottom: 4px;
          background: linear-gradient(to right, #fff, #0f3662);

          &:last-of-type {
            width: 20px;
          }

          &:nth-child(2) {
            width: 30px;
          }
        }

        &.left {
          margin-left: 0;
          margin-right: 6px;
          transform: rotateY(180deg);
        }
      }
    }
  }
  .login-title{
    position: absolute;
    width:100%;
    text-align: center;
    top:11vh;
  }
  .login-logo{
    height: 50px;
    vertical-align:middle;
  }
  .loginName{
    margin-left: 10px;
    font-size: 45px;
    font-weight: 900;
    background: #E5FEFF;
    // color: #E5FEFF;
    -webkit-background-clip: text;
    -webkit-text-fill-color:transparent;
    vertical-align: middle;
  }

  .formItem{
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    width: 60%;
    margin-left: 20%;
  }

  .show-pwd {
    /*position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;*/
  }

  .footer {
    color: #fff;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-family: SourceHanSansCN-Normal;
  }

}
  .login-btn{
    width:60%;
    margin-left: 20%;
    height: 65px;
    margin-top:14px;
    background-color:#20EBF9;
    color:#FDFDEC;
    font-size: 26px;
    box-shadow: 1px 4px 5px 0px rgba(23, 154, 163, 0.24);
    border-radius: 8px;
    border-width: 0px;
  }
  .code {
    width: 60%;
    margin-left: 20%;
  }
</style>

<!--最后一样样式-->
<style lang="scss">
.code {
  .el-form-item__content {
    background: transparent !important;
    margin-bottom: 0px;

    .el-input {
      width: 230px;
      background-color: transparent;
      border-radius: 3px;
      margin: 0px;
      color: #fffff8;
      caret-color: #fffff8;
    }
    input::-webkit-input-placeholder {
      color: #fffff8;
    }
    input::-moz-input-placeholder {
      color: #fffff8;
    }
    input::-ms-input-placeholder {
      color: #fffff8;
    }

    img {
      cursor: pointer;
      display: inline-block;
      width: 90px;
      height: 48px;
      vertical-align: middle;
      margin-left: 15px;
    }

    span {
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      margin-left: 8px;
      font-family: SimSun;
      font-weight: bold;
      color: rgba(254, 254, 255, 1);
      line-height: 27px;
    }
  }
}
  .login-state .el-checkbox__label{
    color: #ffffff;
  }
</style>
