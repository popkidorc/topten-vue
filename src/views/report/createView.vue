<template>
  <a-layout class="createView">
    <a-layout-header>
      <a-page-header title="创建新的报告" class="page-header" @back="back">
        您可以通过上传任何合法合规的报告，报告被下载时将获得积分
      </a-page-header>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <a-form
        :model="reportDetail"
        :style="{ width: '600px' }"
        auto-label-width
        layout="vertical"
        @submit="handleSubmit"
      >
        <a-form-item
          field="name"
          label="报告名称"
          :rules="[{ required: true, message: '请填写报告名称' }]"
        >
        <a-input v-model="reportDetail.name" placeholder="请输入名称" />
        </a-form-item>

        <a-form-item field="describe" label="报告描述">
          <a-textarea
            v-model="reportDetail.describe"
            placeholder="请输入描述"
            allow-clear
          />
        </a-form-item>

        <a-form-item field="reportClass" label="报告描述">
          <a-checkbox-group :max="3" v-model="reportDetail.reportClass" :options="reportClasses" />
        </a-form-item>
            

        <a-form-item field="file" label="报告上传">
          <a-upload :action="uploadUrl" :file-list="fileList" :onSuccess="uploadSuccess" accept=".pdf" :limit="1"/>
        </a-form-item>

        <a-form-item field="publishType" label="" class="report-type">
          <a-radio-group v-model="reportDetail.publishType" direction="vertical">
            <a-radio value="0">
              <icon-arrow-fall />
              <div>
                <div class="radio-title">公开的</div>
                <div class="radio-text"
                  >您创建的报告将会公开到网络中，所有人均可以看到，被下载可获得积分</div
                >
              </div>
            </a-radio>
            <a-radio value="1">
              <icon-arrow-left />
              <div>
                <div class="radio-title">私有的</div>
                <div class="radio-text"
                  >您创建的排行榜无法被任何人看到，除非您主动分享</div
                >
              </div>
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item>
          <a-button html-type="submit" @click="createReport">Submit</a-button>
        </a-form-item>

      </a-form>
    </a-layout-content>
  </a-layout>
</template>

<script>
  import ajax, {baseURL} from '../../utils/axios';

  export default {
    data() {
      return {
        loading: false,
        reportDetail: {},
        reportClasses: [],
        uploadUrl: baseURL+"/report/uploadReport.json",
        fileList: []
      };
    },
    mounted() {
      this.initReportClasses();
    },
    methods: {
      back() {
        this.$router.back();
      },
      initReportClasses(){
        ajax({
          url: '/report/getReportClasses.json',
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
            data.forEach(element => {
              console.info(element);
              this.reportClasses.push({
                label: element.value,
                value: element.key
              });
            });
          })
          .catch((error) => {
            this.$message.error(error);
          })
          .finally(() => {
          });
      },
      uploadSuccess(file,response){
        
        this.reportDetail.resourceId = file.response;
        ajax({
          url: '/report/getReportUrl.json',
          method: 'get',
          params: {
            resourceId: file.response,
          },
          controller: new AbortController(),
        })
          .then((data) => {

            if (data.flag === false) {
              this.$message.error(data.message);
              return;
            }

            console.info(data);
            // if (data.flag === 1) {
            //   this.queryResult = data.data
            // } else {
            //   this.$message({
            //     message: data.msg,
            //     type: 'warning'
            //   })
            // }
          })
          .catch((error) => {
            
            this.$message.error(error);
          })
          .finally(() => {
          });
      },
      createReport() {
        console.info(this.reportDetail.reportClass);
        ajax({
          url: '/report/create.json',
          method: 'get',
          params: {
            name: this.reportDetail.name,
            describe: this.reportDetail.describe,
            reportClasses: this.reportDetail.reportClass.join(),
            resourceId: this.reportDetail.resourceId,
            publishType: this.reportDetail.publishType,
          },
          controller: new AbortController(),
        })
          .then((data) => {

            if (data.flag === false) {
              this.$message.error(data.message);
              return;
            }
            console.info(data);
            // if (data.flag === 1) {
            //   this.queryResult = data.data
            // } else {
            //   this.$message({
            //     message: data.msg,
            //     type: 'warning'
            //   })
            // }
          })
          .catch((error) => {
            console.info(error);
            this.$message.error(error);
          })
          .finally(() => {
          });

        
      }
    },
  };
</script>

<style lang="less">
  .createView {
    align-items: center;

    .arco-layout-header,
    .arco-layout-content {
      width: 600px;
    }

    .page-header {
      .arco-page-header-wrapper {
        padding-left: 0;
      }

      .arco-page-header-content {
        padding-top: 0;
        padding-bottom: 20px;
        padding-left: 32px;
        color: #e2e2e3;
        font-weight: 400;
        font-size: 8px;
        border-top: none;
        border-bottom: 1px solid #272833;
      }

      .arco-page-header-title,
      .arco-page-header-back-btn {
        color: #e2e2e3;
        font-weight: 500;
        font-size: 20px;
        line-height: 22px;
      }
    }

    

    .arco-form-item-label {
      color: #e2e2e3;
      font-weight: 600;
      font-size: 14px;
    }

    .arco-checkbox-label{
      color: #e2e2e3;
    }

    .arco-radio-label {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: #e2e2e3;
    }

    .radio-title {
      color: #e2e2e3;
      font-weight: 600;
      font-size: 14px;
    }

    .radio-text {
      color: #e2e2e3;
      font-weight: 400;
      font-size: 10px;
    }

    .report-type {
      padding-top: 0;
      padding-bottom: 10px;
      border-top: 1px solid #272833;
      border-bottom: 1px solid #272833;

      .arco-icon {
        width: 2em;
        height: 2em;
        margin-right: 10px;
        margin-left: 10px;
      }
    }
  }
</style>
