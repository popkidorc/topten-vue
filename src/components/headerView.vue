<template>
  <div class="headerView">
    <a-row>
      <a-col :span="8">
        <a-input-search
          class="input-search"
          placeholder="搜索你感兴趣的报告"
          search-button
          @search="searchReport"
        >
          <template #button-icon>
            <icon-search />
          </template>
          <template #button-default> 搜索 </template>
        </a-input-search>
      </a-col>
      <a-col :span="8"> </a-col>
      <a-col :span="8">
        <!-- <div class="right-button"> -->
        <a-space size="mini" class="right-button">
          <!-- <a-button type="primary" shape="circle" class="button-one">
            <icon-plus />
          </a-button> -->
          <a-button
            type="primary"
            class="button-main"
            @click="uploadReport"
          >
            上传报告
            <div>
              <a-modal
                v-model:visible="loginVisible"
                title="登录后更懂你"
                modal-class="login-modal"
                body-class="login-modal-body"
                simple="true"
                hide-cancel="true"
                hide-ok="true"
                ok-text="暂不登录"
                @cancel="handleLoginCancel"
              >
                <LoginFormView @loginSuccess="loginSuccess"/>
              </a-modal>
            </div>
          </a-button>
          <a-dropdown trigger="hover" class="my-dropdown" >
            <a-avatar class="my-avatar" v-show="isLogin">
              <img
                  alt="avatar"
                  src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                />
            </a-avatar>   
            <template #content>
              <a-doption @click="loginOut">退出登陆</a-doption>
            </template>
          </a-dropdown>  
        </a-space>             
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ajax from '../utils/axios';
import LoginFormView from '../components/loginFormView.vue';

export default {
  data() {
    return {
      loginVisible: false,
      isLogin: false,
    };
  },
  components: {
    LoginFormView,
  },
  mounted() {
    this.checkLogin();
  },
  events(){
    
  },
  methods: {
    checkLogin() {
      // 是否登录
      var toptenauth = this.$cookies.get("toptenauth");
      // 未登录
      if (toptenauth === null || toptenauth === "") {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    uploadReport() {
      // 是否登录
      var toptenauth = this.$cookies.get("toptenauth");
      // 未登录
      if (toptenauth === null) {
        this.loginVisible = true;
      } else {
        this.$router.push({
          path: '/create',
          query: {},
        });
      }
    },
    handleLoginCancel() {
      this.loginVisible = false;
    },
    loginSuccess(token){
      this.$message.success("登陆成功");
      this.loginVisible = false;
      this.checkLogin();
    },
    loginOut(){
      ajax({
        url: '/auth/loginOut.json',
        method: 'post',
        params: {},
        controller: new AbortController(),
      })
        .then((data) => {
          this.$message.success("退出成功");
          this.checkLogin();
        })
        .catch((error) => {
          this.$message.error(error)
        })
        .finally(() => {
        });
    },

    searchReport(value){
      console.info(value);
      this.$message.success(value);

      const routeData = this.$router.resolve({
          path: '/searchResult',
          query:{
            searchKey: value
          }
        });
      // window.open(routeData.href, '_blank');
    },
  },
};
</script>

<style lang="less">
.headerView {
    box-sizing: content-box;
    height: 60px;
    background-color: #161722;
    border-bottom: 1px solid rgba(54, 55, 65, 0.4);

    .input-search {
      max-width: 530px;
      height: 40px;
      margin-top: 10px;
      margin-left: 30px;
      border: 2px solid hsla(0, 0%, 100%, 0.7);
      border-radius: 6px;

      &:hover {
        border: 2px solid hsla(0, 0%, 100%, 1);

        .arco-input-append {
          background: #fff;
        }

        .arco-input-search-btn {
          color: #000;
        }
      }

      .arco-input-wrapper,
      .arco-input-append {
        height: 100%;
        color: #fff;
        font-size: 14px;
        background: transparent;
        border: 1px solid transparent;
      }

      .arco-input-search-btn {
        height: 100%;
        font-weight: 500;
        font-size: 16px;
        font-family: PingFang SC, DFPKingGothicGB-Medium, sans-serif;
        line-height: 24px;
        background: transparent;
      }
    }

    .right-button {
      float: right;

      .button-one {
        width: 32px;
        height: 32px;
        margin-top: 14px;
        margin-right: 32px;
        text-align: center;
        background-color: #363741;
        border-radius: var(--border-radius-circle);

        &:hover {
          width: 56px;
          background-color: #363741;
          border-color: transparent;
          border-radius: 28px;
        }
      }

      .button-main {
        width: 104px;
        height: 38px;
        margin-top: 10px;
        margin-right: 32px;
        color: #fff;
        font-weight: 500;
        font-size: 15px;
        background: #fe2c55;
        border-radius: 5px;

        &:hover {
          background: #f22a51;
        }
      }

      .my-avatar{
        width: 36px;
        height: 36px;
        margin-top: 10px;
        margin-right: 32px;
        cursor: pointer;

        &:hover {
          width: 38px;
          height: 38px;
          margin-left: -1px;
          margin-right: 31px;
        }
      }
  }
}
.login-modal {
  width: 480px;
  height: 480px;
  padding: 24px 38px 40px;
  font-weight: 500;
  font-size: 24px;
  background: #fff
    url(https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/image/login-resetpwd-bg.d8696d27.png)
    no-repeat;
  background-size: 190% auto;
  border-radius: 8px;

  .arco-modal-header {
    margin-bottom: 12px;
  }

  .arco-modal-title {
    font-weight: 500;
    font-size: 24px;
  }

  .arco-modal-footer {
    display: none;
  }
}

.login-modal-body {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 404px;
  height: 370px;
  padding-bottom: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 30px rgb(0 0 0 / 5%);
}
.my-dropdown{
  top: 62px;
  
  .arco-dropdown {
    box-sizing: border-box;
    padding: 4px 0;
    border: none;
    border-radius: var(--border-radius-medium);
    box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
    background: #252632;

    .arco-dropdown-option-content{
      font-weight: 400;
      font-size: 14px;
      color: #fff;
    }
    
    
  }
}

</style>
