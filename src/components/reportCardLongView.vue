<template>
  <div class="reportCardLongView">
    <a-card hoverable @click="detail(item)">
      <template #cover>
        <div class="img-div">
          <img class="img" :src="item.imageResourceVo.downloadUrl" />
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
  </div>
</template>

<script>

  export default {
    props: {
      item: {},
    },
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
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
.reportCardLongView {
  .arco-card {
    display: flex;
    background: transparent;
    height: 135px;

    .arco-card-cover {
      width: 40%;
      overflow: hidden;

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
</style>