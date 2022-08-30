<template>
  <div class="mainView">
    <a-menu mode="horizontal" :default-selected-keys="['1']">
      <a-menu-item key="1">近期更新</a-menu-item>
      <a-menu-item key="2">近期热榜</a-menu-item>
      <a-menu-item key="3">猜你喜欢</a-menu-item>
    </a-menu>

    <a-list
      :grid-props="{ gutter: 0, span: 6 }"
      :bordered="false"
      class="grid-one"
      :data="gridOneList"
    >
      <template #item="{ item }">
        <a-list-item class="item">
          <a-card hoverable @click="detail(item)">
            <template #cover>
              <div class="img-div">
                <img class="img" :src="item.imageUrl" />
              </div>
            </template>
            <a-card-meta :title="item.name">
              <template #description>
                <a-row>
                  <a-col :span="12">
                    <icon-heart-fill />
                    <div>{{ item.likeNum }}</div>
                  </a-col>
                  <a-col :span="12">
                    <icon-message />
                    <div>{{ item.evaluationNum }}</div>
                  </a-col>
                </a-row>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>

    <div id="vital1" class="content-title"> 近期热榜 </div>
    <a-list
      :grid-props="{ gutter: 0, span: 12 }"
      :bordered="false"
      class="grid-two"
      :data="gridTwoList"
    >
      <template #item="{ item }">
        <a-list-item class="item">
          <a-card hoverable @click="detail(item)">
            <template #cover>
              <div class="img-div">
                <img class="img" :src="item.imageUrl" />
              </div>
            </template>
            <a-card-meta :title="item.name">
              <template #description>
                <a-divider />
                <a-row>
                  <a-col :span="12">
                    <icon-heart-fill />
                    <div>{{ item.likeNum }}</div>
                  </a-col>
                  <a-col :span="12">
                    <icon-message />
                    <div>{{ item.evaluationNum }}</div>
                  </a-col>
                </a-row>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>

    <div id="vital3" class="content-title"> 猜你喜欢 </div>
    <a-list
      :grid-props="{ gutter: 0, span: 4 }"
      :bordered="false"
      class="grid-three"
      :data="gridThreeList"
    >
      <template #item="{ item }">
        <a-list-item class="item">
          <a-card hoverable @click="detail(item)">
            <template #cover>
              <div class="img-div">
                <img class="img" :src="item.imageUrl" />
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
        loading: false,
        queryCondition: {},
        queryResult: {},

        gridOneList: [],

        gridTwoList: [],

        gridThreeList: [],
      };
    },
    mounted() {
      this.loadGridOne();
      this.loadGridTwo();
      this.loadGridThree();
    },
    methods: {
      async loadGridOne() {
        this.loading = true;
        ajax({
          url: '/main/getRecentReportList.json',
          method: 'get',
          params: {
            curPage: 1,
          },
          controller: new AbortController(),
        })
          .then((data) => {
            this.gridOneList = data;
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
            // this.$message.error(error)
          })
          .finally(() => {
            this.loading = false;
          });
      },
      async loadGridTwo() {
        this.loading = true;
        ajax({
          url: '/main/getHotReportList.json',
          method: 'get',
          params: {},
          controller: new AbortController(),
        })
          .then((data) => {
            this.gridTwoList = data;
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
      async loadGridThree() {
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
            this.gridThreeList = data;
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
  .mainView {
    background-color: #161722;

    .arco-menu {
      background-color: #161722;

      .arco-menu-item {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 0;
        color: var(--color-text-4);
        font-size: 16px;
        font-family: PingFang SC, DFPKingGothicGB-Medium, sans-serif;
        font-stretch: condensed;
        background-color: #161722;

        &:hover {
          color: #fff;
          font-weight: 500;
          background-color: transparent;

          .arco-icon {
            color: #fff;
            font-weight: 500;
            background-color: transparent;
          }
        }

        &.arco-menu-selected {
          color: #fff;
          font-weight: 500;
          font-size: 18px;
          background-color: transparent;

          &:hover {
            color: #fff;
            font-weight: 500;
            background-color: transparent;
          }
        }
      }

      .arco-menu-selected-label {
        /* animation-name: mymove;
      animation-duration: .3s;
      animation-fill-mode: forwards;  */
        position: absolute;
        bottom: -6px;
        left: 38px;
        display: block;
        width: 18px;
        height: 3px;
        background-color: #fe2c55;
      }
    }

    .content-title {
      margin-top: 30px;
      margin-left: 30px;
      color: #fff;
      font-weight: 500;
      font-size: 18px;
      background-color: transparent;
    }

    .grid-one {
      margin-top: 30px;
      margin-right: 30px;
      margin-bottom: 30px;
      margin-left: 30px;
      background-color: #161722;

      .arco-card {
        background: transparent;

        .arco-card-cover {
          height: 160px;
          overflow: hidden;
          border-radius: var(--border-radius-large) var(--border-radius-large) 0
            0;

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
          padding: 12px 20px 12px;
          overflow: hidden;
          text-shadow: 0 0 4px rgb(0 0 0 / 10%);
          background: linear-gradient(
            to right bottom,
            rgb(51, 30, 17),
            rgb(203, 181, 149)
          );
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

          .arco-card-meta-description {
            margin-top: 12px;
            color: #fff;
            font-weight: 500;
            font-size: 12px;
            text-align: center;
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

      .arco-icon {
        width: 2em;
        height: 2em;
        margin-bottom: 2px;
      }
    }

    .grid-two {
      margin-top: 30px;
      margin-right: 30px;
      margin-left: 30px;
      background-color: #161722;

      .arco-card {
        display: flex;
        background: transparent;

        .arco-card-cover {
          /* position: absolute;
        justify-content: center; */
          width: 240px;
          height: 160px;
          overflow: hidden;

          .img-div,
          .img {
            width: 100%;
            overflow: hidden;
            transition-duration: 0.4s;
          }
        }

        .arco-card-body {
          position: relative;
          flex: 1 1;
          height: 160px;
          padding: 16px 20px 16px;
          overflow: hidden;
          text-shadow: 0 0 4px rgb(0 0 0 / 10%);
          background: #252632;
          border-radius: 0 var(--border-radius-large) var(--border-radius-large)
            0;

          .arco-card-meta-title {
            display: -webkit-box;
            height: 46px;
            overflow: hidden;
            color: #face15;
            font-size: 15px;
            line-height: 23px;
            white-space: normal;
            text-overflow: ellipsis;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          .arco-card-meta-description {
            margin-top: 12px;
            color: #fff;
            font-weight: 500;
            font-size: 12px;
            text-align: center;

            .arco-divider-horizontal {
              border: 1px solid rgba(54, 55, 65, 0.4);
            }
          }
        }
      }

      .arco-card-bordered {
        border: 0;
        border-radius: var(--border-radius-large);

        .arco-card-cover {
          border-radius: var(--border-radius-large) 0 0
            var(--border-radius-large);
        }
      }

      .arco-card-hoverable {
        box-shadow: 0 0 0 rgb(var(--gray-2));
        cursor: pointer;

        &:hover {
          .img {
            width: 105%;
            transition-duration: 0.4s;
          }
        }
      }

      .arco-icon {
        width: 2em;
        height: 2em;
        margin-bottom: 2px;
      }
    }

    .grid-three {
      margin-top: 30px;
      margin-right: 30px;
      margin-bottom: 30px;
      margin-left: 30px;
      background-color: #161722;

      .arco-col-4 {
        flex: 0 0 20%;
        width: 20%;

        .arco-card {
          background: transparent;

          .arco-card-cover {
            width: 210px;
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
</style>
