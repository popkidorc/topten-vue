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
          <ReportCardStandardView :item="item"/>
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
          <ReportCardLongView :item="item"/>
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
          <ReportCardSmallView :item="item"/>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import ajax from '../../utils/axios';
import ReportCardStandardView from '../../components/reportCardStandardView.vue';
import ReportCardLongView from '../../components/reportCardLongView.vue';
import ReportCardSmallView from '../../components/reportCardSmallView.vue';


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
    components: {
      ReportCardStandardView,
      ReportCardLongView,
      ReportCardSmallView,
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
            if (data.flag === false) {
              this.$message.error(data.message);
              return;
            }
            this.gridOneList = data;
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
            if (data.flag === false) {
              this.$message.error(data.message);
              return;
            }
            this.gridTwoList = data;
          })
          .catch((error) => {
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
            if (data.flag === false) {
              this.$message.error(data.message);
              return;
            }
            this.gridThreeList = data;
          })
          .catch((error) => {
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
    }

    .grid-two {
      margin-top: 30px;
      margin-right: 30px;
      margin-left: 30px;
      background-color: #161722;
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
      }
    }
  }
</style>
