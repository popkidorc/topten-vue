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
          <a-card hoverable @click="detail(item)">
            <template #cover>
              <div class="img-div">
                <img class="img" alt="dessert" :src="item.imageUrl" />
              </div>
            </template>
            <a-card-meta :title="item.name"> </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
  import ajax from '../../utils/axios';

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

      .arco-card {
        background: transparent;
      }

      .arco-card-bordered {
        border: 0;
        border-radius: var(--border-radius-large);
      }

      .arco-card-bordered .arco-card-cover {
        border-radius: var(--border-radius-large) var(--border-radius-large) 0 0;
      }

      .arco-card-cover {
        width: 210px;
        height: 140px;
        overflow: hidden;
      }

      .arco-card-body {
        position: relative;
        flex: 1 1;
        padding: 12px 20px 12px;
        overflow: hidden;
        text-shadow: 0 0 4px rgb(0 0 0 / 10%);
        background: #252632;
        border-radius: 0 0 var(--border-radius-large) var(--border-radius-large);
      }

      .arco-card-meta-title {
        display: -webkit-box;
        height: 46px;
        overflow: hidden;
        color: #fff;
        font-size: 15px;
        line-height: 23px;
        white-space: normal;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .img-div {
        height: 100%;
        overflow: hidden;
        transition-duration: 0.4s;

        .img {
          height: 100%;
          overflow: hidden;
          transition-duration: 0.4s;
        }
      }

      .arco-card-hoverable {
        box-shadow: 0 0 0 rgb(var(--gray-2));
        cursor: pointer;

        &:hover .img {
          height: 105%;
          transition-duration: 0.4s;
        }
      }
    }
  }
</style>
