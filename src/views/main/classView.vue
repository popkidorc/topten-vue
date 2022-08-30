<template>
  <div class="classView">
    <a-list
      :grid-props="{ gutter: 0, span: 4 }"
      :bordered="false"
      class="grid"
      :data="gridList"
    >
      <template #item="{ item }">
        <a-list-item class="item">
          <ReportCardSmallView :item="item"/>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import ajax from '../../utils/axios';
import ReportCardSmallView from '../../components/reportCardSmallView.vue';

  export default {
    data() {
      return {
        gridList: [],
      };
    },
    watch: {
      // 如果路由发生变化，再次执行该方法
      '$route.query.reportClass': 'loadGrid',
    },
    components: {
      ReportCardSmallView,
    },
    mounted() {
      this.loadGrid();
    },
    methods: {
      async loadGrid() {
        this.loading = true;
        this.gridList = [];
        console.info(this.$route.query.reportClass);
        ajax({
          url: '/report/getReportList.json',
          method: 'get',
          params: {
            curPage: 1,
            reportClass: this.$route.query.reportClass,
          },
          controller: new AbortController(),
        })
          .then((data) => {
            this.gridList = data;
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
            this.loading = false;
          });
      },
      detail(item) {
        this.$router.push({
          path: '/detail',
          query: {
            id: item.id,
          },
        });
      },
    },
  };
</script>

<style lang="less">
  .classView {
    .grid {
      margin-top: 30px;
      margin-right: 30px;
      margin-bottom: 30px;
      margin-left: 30px;
      background-color: #161722;

      .arco-col-4 {
        flex: 0 0 20%;
        width: 20%;
      }
    }
  }
</style>
