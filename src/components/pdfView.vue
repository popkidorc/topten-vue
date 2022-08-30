<template>
  <div>
    <!-- 加 :page="pageNum" 实现翻页功能  pageNum 不合理就全部展示了-->
    <vue-pdf-embed :source="source" class="vue-pdf-embed" :page="pageNum" />

    <!-- <div class="optbar">
        <div>当前页面{{pageNum}}</div>
        <div class="btn" @click="prevPage">切换上一页</div>
        <div class="btn" @click="nextPage">切换下一页</div>
      </div> -->
  </div>
</template>

<script>
  import VuePdfEmbed from 'vue-pdf-embed';
  import { createLoadingTask } from 'vue3-pdfjs/esm'; // 获得总页数

  export default {
    components: {
      VuePdfEmbed,
    },
    props: {
      source: {
        type: String, // 类型
        default: '', // 设置默认值
        required: true, // 是否必须传递
      },
    },
    data() {
      return {
        // source: 'https://kid-topten.oss-cn-hangzhou.aliyuncs.com/report/%E2%80%9D%E8%B6%85%E8%B6%8A%E5%A2%9E%E9%95%BF%E2%80%9C--2020%E6%99%BA%E6%85%A7%E5%B1%8F%E8%A1%8C%E4%B8%9A%E5%8F%91%E5%B1%95%E7%99%BD%E7%9A%AE%E4%B9%A6.pdf?Expires=1661593488&OSSAccessKeyId=TMP.3KiMicb46uWuj3ARQCHrbZymgXpB22tbRJyXG8WJgoqxKuxSJZ5KWE5ukfRZbmWdK27WWVL6Hsv5fVVRjfEghVLNJvezs9&Signature=TC%2FDf438XkSDOnYLwwc%2BHU22RU0%3D', // 预览pdf文件地址
        pageNum: 1, // 当前页面
        scale: 1, // 缩放比例
        numPages: 3, // 总页数
      };
    },
    watch: {
      // 如果路由发生变化，再次执行该方法
      // '$route.query.id': ['loadDetail','loadRecommendReportList']
    },
    mounted() {
      console.log('this.source', this.source);
      const loadingTask = createLoadingTask(this.source);
      loadingTask.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
    },
    // methods: {
    //   nextPage() {
    //     // 判断一下总页数 numPages

    //     this.pageNum = this.pageNum + 1;
    //   },
    //   prevPage() {
    //     // 判断一下总页数 numPages
    //     this.pageNum = this.pageNum - 1;
    //   },
    // }
  };
</script>

<style lang="less" scoped>
  .optbar {
    display: flex;
    justify-content: space-around;

    .btn {
      width: 60px;
      margin: 0 12px;
      padding: 4px 6px;
      background: #abc;
    }
  }
</style>
