<template>
  <div class="pdfView">
    <!-- 加 :page="pageNum" 实现翻页功能  pageNum 不合理就全部展示了-->
    <vue-pdf-embed :source="source" class="vue-pdf-embed" :page="pageNum" />

    <div class="optbar">
        <div v-if="numPages">当前页面{{pageNum}} / {{numPages}}</div>
        <div class="btn" @click="prevPage">切换上一页</div>
        <div class="btn" @click="nextPage">切换下一页</div>
      </div>
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
      src: {
        type: String, // 类型
        default: '', // 设置默认值
        required: true, // 是否必须传递
      },
    },
    data() {
      return {
        source: '', // 预览pdf文件地址
        pageNum: 1, // 当前页面
        scale: 1, // 缩放比例
        numPages: '', // 总页数
      };
    },
    watch: {
      'src':['init']
    },
    mounted() {
    },
    methods: {
      init(){
        console.log("=======");
        console.log(this.src);
        this.source=this.src;
        const loadingTask = createLoadingTask(this.source);
        loadingTask.promise.then((pdf) => {
          console.log("===222====");
          console.log(pdf.numPages);
          this.numPages = pdf.numPages;
        });
      },
      nextPage() {
        // 判断一下总页数 numPages

        this.pageNum = this.pageNum + 1;
      },
      prevPage() {
        // 判断一下总页数 numPages
        this.pageNum = this.pageNum - 1;
      },
    }
  };
</script>

<style lang="less">
.pdfView{
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
}
</style>
