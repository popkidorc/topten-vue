<template>
  <div class="indexView">
    <a-layout style="height: 800px">
      <a-layout-sider
        class="layout-sider"
        theme="dark"
        breakpoint="lg"
        hide-trigger="true"
        :width="172"
        collapsible
        :collapsed="collapsed"
        @collapse="onCollapse"
      >
        <img src="@/assets/images/logo.png" class="logo" />

        <a-menu  @menuItemClick="onClickMenuItem">
          <a-menu-item key="main">
            <icon-thumb-up-fill :size="22" />
            推荐
          </a-menu-item>
          <a-menu-item key="class-C001">
            <icon-skin :size="22" />
            快销品
          </a-menu-item>
          <a-menu-item key="class-C002">
            <icon-bar-chart :size="22" />
            食品
          </a-menu-item>
          <a-menu-item key="class-C003">
            <icon-send :size="22" />
            金融
          </a-menu-item>
          <a-menu-item key="class-C004">
            <icon-robot :size="22" />
            科技
          </a-menu-item>
          <a-menu-item key="class-C000">
            <icon-more :size="22" />
            其他
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <a-affix :offset-top="1">
          <a-layout-header class="layout-header">
            <HeaderView/>
          </a-layout-header>
        </a-affix>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import ajax from '../../utils/axios';
import HeaderView from '../../components/headerView.vue';


export default {
  components: {
    HeaderView,
  },
  data() {
    return {
      loginVisible: false,
      isLogin: false,
    };
  },
  mounted() {
    // this.checkLogin();
  },
  methods: {
    onClickMenuItem(key) {
      this.$router.push({
        path: `/${key.split('-')[0]}`,
        query: {
          reportClass: key.split('-')[1],
        },
      });
    }
  },
};
</script>

<style lang="less">
  .indexView {
    background-color: #161722;

    .layout-sider {
      color: var(--color-text-4);
      background: linear-gradient(180deg, #060716 80%, #06071600);

      .arco-row,
      .arco-menu {
        color: var(--color-text-4);
        background: linear-gradient(180deg, #060716 80%, #06071600);
      }

      .arco-menu-item {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 16px;
        color: var(--color-text-4);
        font-size: 16px;
        font-family: PingFang SC, DFPKingGothicGB-Medium, sans-serif;
        font-stretch: condensed;
        background: linear-gradient(180deg, #060716 80%, #06071600);
      }

      .logo {
        margin-top: 16px;
        margin-left: 16px;
        background-size: 52px 52px;
      }

      .arco-menu-item:hover,
      .arco-menu-item:hover .arco-icon,
      .arco-menu-item.arco-menu-selected {
        color: #fff;
        font-weight: 500;
        background: linear-gradient(180deg, #060716 80%, #06071600);
      }

      .arco-icon {
        width: 22px;
        height: 22px;
        margin-right: 0;
        vertical-align: -6px;
      }

      .arco-row {
        position: absolute;
        bottom: -400px;
        z-index: 1;
        display: block;
        width: 100%;
        height: 540px;
      }
    }
}
</style>
