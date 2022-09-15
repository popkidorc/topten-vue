<template>
  <div class="loginFormView">
    <a-tabs default-active-key="1" justify="true" header-padding="false" @tab-click="getWxQr">
    
      <a-tab-pane key="1" title="验证码登录">
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
              search-button
              class="verifycode"
              @search="sendSmsVerifyCode()"
              :loading="!userInfo.username || codeButton.codeDisable"
              :button-text="codeButton.codeText"
              >
            </a-input-search>
          </a-form-item>
          <a-space :size="16" direction="vertical">
            <!-- <div class="login-form-password-actions">
              <a-checkbox
                checked="rememberPassword"
                :model-value="userInfo.rememberPassword"
                @change="setRememberPassword"
              >
                记住密码
              </a-checkbox>
              <a-link>忘记密码</a-link>
            </div> -->
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
        <a-modal
          v-model:visible="slide.slideVisible"
          title="滑动解锁"
          modal-class="slide-modal"
          simple="true"
          hide-cancel="true"
          hide-ok="true"
          ok-text="暂不登录"
          @cancel="handleSlideCancel()"
        >
          <slide-verify
            ref="block"
            slider-text="向右滑动->"
            accuracy=5
            :imgs="slide.imgs"
            @success="slideSuccess"
            @fail="slideFail"
          ></slide-verify>
        </a-modal>
      </a-tab-pane>

      <a-tab-pane key="2" title="扫码登录" class="tab-pane-2">
        <div class="img-title">
          使用微信扫码登陆
        </div>
        <img
          show-loader
          class="qr-img"
          :src="wxQr.src"
        />
      </a-tab-pane>
      <!-- <a-tab-pane key="3" title="密码登录"> 密码登录 </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script>
import ajax from '../utils/axios';
import SlideVerify from "vue3-slide-verify";
import SlideImage from "../assets/images/slide.jpeg";
import BlankImage from "../assets/images/blank.png";

import "vue3-slide-verify/dist/style.css";
export default {
  data() {
    return {
      loading: false,
      codeButton:{
        codeText: "发送验证码",
        codeDisable: false,
      },
      timer: null,
      slide:{
        slideVisible:false,
        imgs:[SlideImage],
      },

      userInfo: {
        username: '',
        password: '',
      },
      wxQr: {
        validateId : "",
        src: BlankImage,
      }
    };
  },
  components: { 
    SlideVerify,
  },
  mounted() {
  },
  events(){
    
  },
  methods: {

    sendSmsVerifyCode(){
      this.slide.slideVisible = true;
    },
    countDown(val){
        //判断定时器是否存在
        if(this.timer){
          clearInterval(this.timer)
        }
        //setTiemOut 执行一次
        // setInterval 不断执行，需要条件才会停止
        let tim = val;
        this.codeButton.codeDisable = true;
        this.codeButton.codeText = `${tim}秒`;
        this.timer = setInterval(()=>{
            tim--;
            if(tim === 0){
              clearInterval(this.timer)
              this.codeButton.codeDisable = false;
              this.codeButton.codeText = "重新发送";
            }else{
              this.codeButton.codeDisable = true;
              this.codeButton.codeText = `${tim}秒`;
            }
        },1000)
    },
    handleSlideCancel(){
      this.slide.slideVisible = false;
    },
    slideSuccess(){
      this.slide.slideVisible = false;
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
          //倒计时
          setTimeout(()=>{
            this.countDown(60)
          },5)
        })
        .catch((error) => {
          this.$message.error(error)
        })
        .finally(() => {
        });
    },
    slideFail(){
      this.$message.error("验证失败，请重新滑动");
    },
    login() {
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

    getWxQr(key){
      console.info(key);
      if(key === 1 || key === 3){
        return;
      }
      ajax({
        url: '/auth/getWxQr.json',
        method: 'get',
        params: {},
        controller: new AbortController(),
      })
        .then((data) => {
          if (data.flag === false) {
            this.$message.error(data.message);
            return;
          }
          console.info(data);
          this.wxQr = data;
          console.info(this.wxQr.src);
          // let bytes = new Uint8Array(data.imageBuffer);
          // console.info(bytes);
          // let imageString = "";
          // for (let i = 0; i < bytes.byteLength; i++) {
          //   imageString += String.fromCharCode(bytes[i]);
          // }
          // this.wxQr.src = "data:image/png;base64," + window.btoa(imageString);
          // this.$message.success("获取验证码成功");
          
        })
        .catch((error) => {
          this.$message.error(error)
        })
        .finally(() => {
        });
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
    margin-top: 30px;


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

      .arco-btn-icon {
        display: none;
      }

      .arco-btn-loading {
        background-color: #fe2c55;
        border-color: transparent;
      }

      .arco-btn-primary {
        height: 36px;
        line-height: 0px;
        font-weight: 400;
        font-size: 14px;

        &:hover{
          background-color: #fe2c55;
          border-color: transparent;
        }
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

  .arco-btn-primary {
    width: 100%;
    height: 48px;
    color: #fff;
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

    &:hover{
      background-color: #fe2c55;
      border-color: transparent;
    }
  }

  .arco-form-item-message {
    margin-top: 10px;
  }

  .arco-icon {
    width: 1.5em;
    height: 1.5em;
  }

  .tab-pane-2{

    .img-title{
      text-align: center;
      margin-top: 15px;
      margin-bottom: 15px;
      font-weight: 500;
      font-size: 16px;
    }

   .qr-img {
    width: 200px;
    height: 200px;
    }
  }
  
}


.slide-modal {
  // padding: 24px 38px 40px;
  font-weight: 500;
  font-size: 24px;
  // background: #fff
  //   url(https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/image/login-resetpwd-bg.d8696d27.png)
  //   no-repeat;
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
</style>
