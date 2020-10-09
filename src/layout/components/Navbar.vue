<template>
  <div class="navbar">
    <div class="left-menu" @click="gotoMainIndex">
      <img :src="$store.getters.choseLogo.logo">
      <!--<span>{{ $store.getters.choseLogo.sysName }}</span>-->
      <span>智慧军营综合服务管理平台</span>
    </div>
    <ul class="menu-list">
      <li v-for="item in headMenu" :key="item.id" :class="nowmenu==item.id?'isSelect':''" @click="changemenu(item)">
        <i :class="item.icon" style="font-size: 26px;vertical-align:middle;margin-left: 10px;margin-right: 10px;color:#fff" />
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <span>{{ name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <a href="javascript:;" @click="handleInformation">
            <el-dropdown-item>{{ $t('navbar.information') }}</el-dropdown-item>
          </a>
          <a href="javascript:;" @click="handleResetPass">
            <el-dropdown-item>{{ $t('navbar.resetpass') }}</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--修改密码弹窗 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" left width="500px">
      <div class="dialogBox">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="form"
          label-position="right"
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="原密码" prop="oldPass">
                <el-input v-model="form.oldPass" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="新密码" prop="newPass">
                <el-input v-model="form.newPass" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="确认密码" prop="againPass">
                <el-input v-model="form.againPass" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updatePassword">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!--个人信息弹窗 -->
    <el-dialog :title="informationTitle" :visible.sync="informationFormVisible" left width="750px">
      <div class="dialogBox">
        <el-form
          ref="informationForm"
          :model="informationForm"
          label-position="right"
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="工号">{{ informationForm.employeeNo }}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="姓名">{{ informationForm.employeeName }}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="部门">{{ informationForm.orgName+'-'+ informationForm.deptName }}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="手机号" prop="againPass">{{ informationForm.phone }}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { resetPass } from '@/api/base/user'
import configurationAPI from '@/api/base/configuration'

export default {
  components: {

  },
  data() {
    const checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        id: '',
        oldPass: '',
        newPass: '',
        againPass: ''
      },
      dialogFormVisible: false,
      rules: {
        oldPass: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPass: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        againPass: [{ validator: checkPass, trigger: 'blur' }]
      },
      informationFormVisible: false,
      informationTitle: '',
      informationForm: {
        employeeName: '',
        deptName: '',
        employeeNo: '',
        orgName: '',
        phone: '',
        gender: ''
      },
      nowmenu: '1',
      headMenu: []
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'device'])
  },
  created() {
    if (!this.$store.getters.choseLogo.sysName) {
      this.getLogo()
    }
    this.headMenu = JSON.parse(sessionStorage.getItem('headMenu'))
    const menu = JSON.parse(sessionStorage.getItem('menu'))
    const nowpath = this.$route.path
    //
    const nowitem = menu.find((item) => {
      return nowpath === item.url
    })
    // console.log(nowitem)
    const vm = this
    if (nowitem.pid) getfatherid(nowitem.pid)

    function getfatherid(e) {
      const father = menu.find((item) => {
        return e === item.id
      })
      // console.log(father)
      if (father === undefined) {
        const pid = vm.headMenu.find((item) => {
          return e === item.id
        })
        vm.changemenu(pid)
      } else {
        getfatherid(father.pid)
      }
    }

    // 默认选中第一个
    // this.changemenu(this.headMenu[0].id)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      location.reload()
    },
    gotoMainIndex() {
      window.location.href = '#/'
    },
    handleInformation() {
      this.informationForm = this.$store.getters.userInfo
      this.informationTitle =
          '查看' + this.informationForm.employeeName + '个人信息'
      this.informationFormVisible = true
    },
    handleResetPass() {
      this.dialogFormVisible = true
    },
    updatePassword() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          resetPass(this.form)
            .then((res) => {
              this.$notify.success({
                title: '成功',
                message: '修改密码成功，请重新登录',
                duration: 2000,
                onClose: () => {
                  this.logout()
                }
              })
            })
            .catch((res) => {
              this.$notify.error({
                title: '失败',
                message: res.message
              })
            })
        }
      })
    },
    getLogo() {
      configurationAPI.getLogo().then((res) => {
        const logoDetail = {
          loginLogo: res.data.find((item) => {
            return item.code === 'login_logo'
          }).value,
          sysName: res.data.find((item) => {
            return item.code === 'sys_name'
          }).value,
          sysCopyright: res.data.find((item) => {
            return item.code === 'sys_copyright'
          }).value,
          logo: res.data.find((item) => {
            return item.code === 'logo'
          }).value
        }
        this.$store.commit('logo/setLogoDetail', logoDetail)
      })
    },
    changemenu(n) {
      this.$parent.changeMenu(n.url)
      this.nowmenu = n.id
      this.$store.commit('user/SET_NOW_MENU', n.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/element-variables.scss";
  .navbar {
    height: 90px;
    overflow: hidden;
    // position: relative;
    background: $--color-primary;
    display: flex;

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

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .left-menu {
      height: 100%;
      line-height: 90px;
      width: 20%;
      cursor: pointer;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      img{
        width: 40px;
        vertical-align:middle;
        margin-left: 20px;
        margin-right: 10px;
      }
    }
    .menu-list {
      // display: flex;
      // flex-direction: column;
      margin: 0;
      padding: 0;
      width: 60%;
      li {
        float: left;
        list-style: none;
        width: 11.11%;
        text-align: center;
        padding-top: 20px;
        cursor: pointer;
        height: 100%;
        span {
          display: block;
          color: #fff;
          font-size: 14px;
        }
      }
      li.isSelect{
        background:linear-gradient(0deg,rgba(72,225,233,1) 0%,rgba(72,223,230,0) 100%);
        border-bottom: 3px solid #fff;
      }
    }
    .right-menu {
      // float: right;
      height: 100%;
      line-height: 90px;
      width: 20%;
      text-align: right;
      color: #fff;
      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding-right: 20px;
        height: 100%;
        font-size: 18px;
        /*color: #5a5e66;*/
        color: #c8def9;
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
        // margin-right: 30px;

        .avatar-wrapper {
          // margin-top: 5px;
          // position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            vertical-align: middle;
            // border-radius: 10px;
            // margin-top: 20px;
          }

          // .el-icon-caret-bottom {
          //   cursor: pointer;
          //   position: absolute;
          //   right: -20px;
          //   top: 30px;
          //   font-size: 12px;
          // }
        }
      }
    }
  }
</style>
