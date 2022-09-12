<template>
  <div class="loginFormView">
    <a-tabs default-active-key="1" justify="true" header-padding="false">
      <a-tab-pane key="1" title="扫码登录"> 扫码登录 </a-tab-pane>
      
      <a-tab-pane key="2" title="验证码登录">
        <a-form
          ref="userInfo"
          :model="userInfo"
          class="login-form"
          layout="vertical"
          @submit="handleSubmit"
        >
          <a-form-item
            field="username"
            :rules="[{ required: true, message: '请输入手机号' }]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input v-model="userInfo.username" placeholder="请输入手机号">
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            field="vertifyCode"
            :rules="[{ required: true, message: '请输入验证码' }]"
            :validate-trigger="['change']"
            hide-label
          >
            <a-input-search 
              v-model="userInfo.vertifyCode" 
              placeholder="请输入6位验证码" 
              button-text="发送验证码" 
              search-button
              class="verifycode"
              @search="sendSmsVerifyCode()"
              :loading="sendSmsVerifyCodeLoading"
              />
          </a-form-item>
          <a-space :size="16" direction="vertical">
            <div class="login-form-password-actions">
              <a-checkbox
                checked="rememberPassword"
                :model-value="userInfo.rememberPassword"
                @change="setRememberPassword"
              >
                记住密码
              </a-checkbox>
              <a-link>忘记密码</a-link>
            </div>
            <a-button
              type="primary"
              html-type="submit"
              long
              :loading="loading"
              @click="login"
            >
              登录
            </a-button>
          </a-space>
        </a-form>
      </a-tab-pane>

      <a-tab-pane key="3" title="密码登录"> 密码登录 </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import ajax from '../utils/axios';

  export default {
    data() {
      return {
        sendSmsVerifyCodeLoading: false,

        loading: false,
        userInfo: {
          username: '',
          password: '',
          rememberPassword: true,
        },
      };
    },
    mounted() {
      // this.sendSmsVerifyCode();
    },
    events(){
      
    },
    methods: {

      sendSmsVerifyCode(){
        this.sendSmsVerifyCodeLoading = true;
        ajax({
          url: '/auth/sendSmsVerifyCode.json',
          method: 'post',
          params: {
            phone: this.userInfo.username,
            source: "1",
            codeType: 3,
          },
          controller: new AbortController(),
        })
          .then((data) => {
            if (data.flag === false) {
              this.$message.error(data.message);
              return;
            }
            this.$message.success("获取验证码成功");
          })
          .catch((error) => {
            this.$message.error(error)
          })
          .finally(() => {
            this.sendSmsVerifyCodeLoading = false;
          });
      },
      login() {
        console.info(this.$message);
        this.loading = true;
        ajax({
          url: '/auth/fastlogin.json',
          method: 'post',
          params: {
            phone: this.userInfo.username,
            vertifyCode: this.userInfo.vertifyCode,
            loginRole: 1,
            source: "1",
          },
          controller: new AbortController(),
        })
          .then((data) => {
            if (data.flag === false) {
              this.$message.error(data.message);
              return;
            }
            if (data !== null && data.token !== '') {
                this.$emit('loginSuccess', data.token);
            }
          })
          .catch((error) => {
            this.$message.error(error)
          })
          .finally(() => {
            this.loading = false;
          });
      },
      setRememberPassword(value) {
        this.userInfo.rememberPassword = value;
      },
    },
  };
</script>

<style lang="less">
.loginFormView {
  justify-content: center;
  width: 404px;
  height: 90%;

  .login-form {
    .arco-form-item-wrapper-col {
      padding: 8px;
    }
    .login-form-error-msg {
      height: 52px;
      color: rgb(var(--red-6));
      line-height: 52px;
    }

    .login-form-password-actions {
      display: flex;
      justify-content: space-between;
    }

    .login-form-register-btn {
      color: var(--color-text-3) !important;
    }

    .verifycode{

      .arco-btn-primary {
        height: 36px;
        line-height: 0px;
        font-weight: 400;
        font-size: 14px;
      }
    }

  }

  .arco-tabs-nav-ink {
    height: 3px;
    background-color: #fe2c55;
  }

  .arco-form-item-wrapper-col {
    height: 52px;
    padding: 10px 20px 8px 10px;
    color: rgba(47, 48, 53, 0.4);
    line-height: 24px;
    background: #eff0f3;
    border: none;
    border-radius: 4px;
  }

  .arco-input-error {
    background-color: transparent;
    border-color: transparent;
  }

  .arco-input-wrapper {

    
    &:hover,
    &:focus,
    &:focus-within,
    &:focus-visible {
      background-color: transparent;
      border-color: transparent;
    }
  }

  .arco-input-wrapper {

    
    &:hover,
    &:focus,
    &:focus-within,
    &:focus-visible {
      background-color: transparent;
      border-color: transparent;
    }

    &:not(.arco-input-disabled).arco-input-focus {
      background-color: transparent;
      border-color: transparent;
    }
  }

  .arco-form-item-error {
    margin-bottom: 20px;
  }

  .arco-tabs-content-item-active {
    display: flex;
    justify-content: center;
  }

  .arco-tabs-nav-tab {
    justify-content: center;
  }

  .arco-tabs-tab {
    margin-right: 25px;
    margin-left: 25px;
    font-weight: 500;
    font-size: 18px;
  }

  .arco-tabs-pane {
    width: 320px;
    height: 250px;
  }

  .arco-btn-primary {
    width: 100%;
    height: 48px;
    color: #fff;
    font-weight: 500;
    font-weight: 500;
    font-size: 16px;
    line-height: 48px;
    text-align: center;
    vertical-align: middle;
    // background: rgba(254,44,85,.4);
    background: #fe2c55;
    border: none;
    border-radius: 4px;
    outline: none;
  }

  .arco-form-item-message {
    margin-top: 10px;
  }

  .arco-icon {
    width: 1.5em;
    height: 1.5em;
  }
}
</style>
