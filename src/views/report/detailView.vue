<template>
  <a-layout class="detailView">
    <a-layout-header>
      <a-page-header
        :title="reportDetail.name"
        class="page-header"
        @back="back"
      />
    </a-layout-header>
    <a-layout>
      <a-layout-content style="width: 668px" class="layout-left">
        <div class="img-container">
          <img height="400" :src="reportDetail.imageResourceVo.downloadUrl" />
          <div v-show="show" class="img-mask" @click="openPdf">
            <div class="prev-btn">点击预览</div>
          </div>
        </div>
        <div>
          <a-modal
            v-model:visible="pdfVisible"
            modal-class="pdf-modal"
            body-class="pdf-modal-body"
            @cancel="handleLoginCancel"
          >
            <PdfView :src="reportDetail.resourceVo.downloadUrl"/>
          </a-modal>
        </div>

        <div class="grid">
          <div class="grid-left">
            <div class="grid-item">
              <icon-thumb-up-fill />
              <span>{{ reportDetail.likeNum }}</span>
            </div>
            <div class="grid-item">
              <icon-thumb-down-fill />
              <span>{{ reportDetail.nolikeNum }}</span>
            </div>
            <div class="grid-item">
              <icon-star-fill />
              <span>{{ reportDetail.collectNum }}</span>
            </div>
          </div>
          <div class="grid-right">
            <div class="grid-item">
              <icon-share-alt />
              <span>分享给朋友</span>
            </div>
          </div>
        </div>


        <div class="comment">
          <a-comment
            author="张三"
            avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            content="据央视新闻，我国正在论证载人登月方案，不远的将来，中国航天员将有望登陆月球，后续还将建造国际月球科研站，而为了满足未来航天任务的需求，新一代载人火箭和重型火箭也正在研制当中。"
            datetime="1 hour"
          >
            <template #actions>
              <span class="action"> <IconMessage /> 回复 </span>
            </template>
            <a-comment
              author="Balzac"
              avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
              content="为了满足未来航天任务的需求"
              datetime="1 hour"
            >
              <template #actions>
                <span class="action"> <IconMessage /> 回复 </span>
              </template>
              <a-comment
                author="Austen"
                avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
                content="Reply content"
                datetime="1 hour"
              >
                <template #actions>
                  <span class="action"> <IconMessage /> Reply </span>
                </template>
              </a-comment>
              <a-comment
                author="Plato"
                avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                content="Reply content"
                datetime="1 hour"
              >
                <template #actions>
                  <span class="action"> <IconMessage /> Reply </span>
                </template>
              </a-comment>
            </a-comment>
          </a-comment>
        </div>
      </a-layout-content>

      <a-layout-sider style="width: 400px" class="layout-right">
        <a-list
          :grid-props="{ gutter: 0, span: 24 }"
          :bordered="false"
          :data="recommendReportList"
        >
          <template #item="{ item }">
            <a-list-item>
              <ReportCardSmallView :item="item"/>
            </a-list-item>
          </template>
        </a-list>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script>
import ajax from '../../utils/axios';
import PdfView from '../../components/pdfView.vue';
import ReportCardSmallView from '../../components/reportCardSmallView.vue';

export default {
  data() {
    return {
      loading: false,
      title: this.$route.query.name,
      reportDetail: {
        imageResourceVo:{},
        resourceVo:{}
      },
      recommendReportList: [],
      pdfVisible: false,
      show: true,
    };
  },
  components: {
    PdfView,
    ReportCardSmallView,
  },
  watch: {
    // 如果路由发生变化，再次执行该方法
    '$route.query.id': ['loadDetail', 'loadRecommendReportList'],
  },
  mounted() {
    this.loadDetail();
    this.loadRecommendReportList();
  },
  methods: {
    async loadDetail() {
      if(this.$route.query.id === undefined){
        return;
      }
      this.loading = true;
      ajax({
        url: '/report/detail.json',
        method: 'get',
        params: {
          id: this.$route.query.id,
        },
        controller: new AbortController(),
      })
        .then((data) => {
          if (data.flag === false) {
            this.$message.error(data.message);
            return;
          }
          this.reportDetail = data;
          console.info(this.reportDetail.resourceVo.downloadUrl);
        })
        .catch((error) => {
          this.$message.error(error)
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async loadRecommendReportList() {
      if(this.$route.query.id === undefined){
        return;
      }
      this.loading = true;
      ajax({
        url: '/main/getRecommendReportList.json',
        method: 'get',
        params: {
          curPage: 1,
        },
        controller: new AbortController(),
      })
        .then((data) => {
          if (data.flag === false) {
            this.$message.error(data.message);
            return;
          }
          this.recommendReportList = data;
        })
        .catch((error) => {
          this.$message.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    back() {
      this.$router.back();
    },
    detail(item) {
      this.$router.push({
        path: '/detail',
        query: {
          id: item.id,
        },
      });
    },

    openPdf() {
      this.pdfVisible = true;
    },
  },
};
</script>

<style lang="less">
  .page-header {
    .arco-page-header-title {
      color: #fff;
      font-size: 20px;
    }

    .arco-page-header-back-btn {
      color: #fff;
      font-size: 20px;
    }
  }

  .detailView {
    .layout-left {
      color: #fff;
      text-align: center;
      background-color: #161722;

      .img-container {
        position: relative;
        cursor: pointer;

        .img-mask {
          position: absolute;
          top: 0;
          left: 0;
          // 隐藏
          display: none;
          width: 100%;
          height: 100%;

          .prev-btn {
            padding: 12px 16px;
            // 基本样式
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            border: 2px solid #fff;
            border-radius: 4px;
          }
        }

        &:hover {
          // 展示
          .img-mask {
            // display: block;
            display: flex;
            align-items: center;
            justify-content: center;
            // background-color: rgba(160, 160, 160, 0.4);
            background-color: rgba(54, 55, 65, 0.4);
          }
        }
      }

      .grid {
        height: 28px;
        margin-top: 25px;
        margin-left: 30px;
        padding-bottom: 50px;
        border-bottom: 1px solid rgba(54, 55, 65, 0.4);

        .arco-icon {
          width: 2em;
          height: 2em;
          margin-right: 10px;
          margin-bottom: 2px;
        }

        .grid-right {
          display: flex;
          float: right;
        }

        .grid-left {
          display: flex;
          float: left;
        }
      }

      .grid-item {
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 15px;
        margin-left: 15px;
        text-align: center;
        cursor: pointer;
      }

      .comment {
        margin-top: 25px;
        margin-left: 40px;
        text-align: left;
        background-color: #161722;

        .action {
          display: inline-block;
          padding: 0 4px;
          color: #aeaeb1;
          font-weight: 500;
          font-size: 12px;
          line-height: 24px;
          background: transparent;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.1s ease;

          &:hover {
            color: #fff;
          }
        }

        .arco-comment-author {
          margin-right: 20px;
          color: #aeaeb1;
          font-weight: 500;
          font-size: 14px;
        }

        .arco-comment-avatar {
          img {
            width: 40px;
            height: 40px;
          }
        }

        .arco-comment-datetime {
          color: #6b6c72;
          font-weight: 500;
          font-size: 12px;
        }

        .arco-comment-content {
          color: #d3d3d6;
          font-weight: 500;
          font-size: 14px;
        }

        .arco-icon {
          width: 1em;
          height: 1em;
          margin-bottom: 0;
        }
      }
    }

    .layout-right {
      margin-top: 30px;
      margin-right: 30px;
      margin-bottom: 30px;
      margin-left: 30px;
      background-color: #161722;

      .arco-list {
        align-items: center;
        color: #fff;

        .arco-card {
          background: transparent;

          .arco-card-cover {
            width: 240px;
            height: 140px;
            overflow: hidden;
            border-radius: var(--border-radius-large) var(--border-radius-large)
              0 0;

            .img-div,
            .img {
              height: 100%;
              overflow: hidden;
              transition-duration: 0.4s;
            }
          }

          .arco-card-body {
            position: relative;
            flex: 1 1;
            width: 240px;
            padding: 12px 20px 12px;
            overflow: hidden;
            text-shadow: 0 0 4px rgb(0 0 0 / 10%);
            background: #252632;
            border-radius: 0 0 var(--border-radius-large)
              var(--border-radius-large);

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
          }
        }

        .arco-card-bordered {
          border: 0;
          border-radius: var(--border-radius-large);
        }

        .arco-card-hoverable {
          box-shadow: 0 0 0 rgb(var(--gray-2));
          cursor: pointer;

          &:hover {
            .img {
              height: 105%;
              transition-duration: 0.4s;
            }
          }
        }
      }
    }
  }

.pdf-modal {
  width: 80%;
  height: 80%;
  padding: 0 0 0;
  font-weight: 500;
  font-size: 24px;
  background-color: transparent;
  // border-radius: 8px;

  .arco-modal-header {
    display: block;
    padding: 0px;
    margin-bottom: 0;
    border-bottom: none;
    background: rgba(54, 55, 65, 0.8);
    border-radius: 8px 8px 0px 0px;
    float: right;

    .arco-modal-close-btn {
      margin-left: 0px;
      color: #fff;
    }
  }

  .arco-modal-title {
    font-weight: 500;
    font-size: 24px;
  }

  .arco-modal-footer {
    display: none;
  }
}

.pdf-modal-body {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  // box-sizing: border-box;
  padding: 0px;
  width: 100%;
  height: 100%;
  background: rgba(54, 55, 65, 0.8);
  border-radius: 0px 0px 8px 8px;
}
</style>
