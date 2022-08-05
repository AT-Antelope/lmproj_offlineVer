<template>
  <!-- 个人信息 -->
  <div class="information">
    <p>
      <span> 姓名: </span><strong>{{ data.name }}</strong>
    </p>
    <p>
      <!-- 0 管理员 显示工号，1 学生 显示学号 -->
      <span> {{ data.userPermission == 0 ? "工号" : "学号" }}: </span>
      <strong>{{ data.id }}</strong>
    </p>
  </div>

  <!-- 加分管理 -->
  <div class="item-group">
    <p>加分管理</p>
    <div class="list-group">
      <a
        v-for="(item, index) in data.pointPlusManageList"
        :key="index"
        href="#"
        class="list-group-item"
      >
        {{ item.title }}
      </a>
    </div>

    <!-- 评奖评优 -->
    <p>评奖评优</p>
    <table class="table table-striped">
      <tr class="table-top">
        <td>项目名称</td>
        <td>申请状态</td>
      </tr>
      <tr v-for="itemTable in data.ItemList" :key="itemTable.categoryId">
        <td>{{ itemTable.itemName }}</td>
        <td>{{ itemTable.applyState ? "申请中" : "未申请" }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { notApplyItemJson, userInfo } from "../../static/json/json.js";
import { AwardJudge } from "../../utils/api.js";
export default {
  // 主页
  name: "applyItem",
  setup(props, { root }) {
    /**
     * data
     */
    const data = reactive({
      name: "", // 姓名
      id: "", // 工号/学号
      pointPlusManageList: [
        {
          title: "暂无",
        },
      ],
      ItemList: [],
      userPermission: -1, // 用户权限，0 管理员，1 学生
    });

    /**
     * 生命周期
     */
    onMounted(() => {
      // 初始化个人信息
      if (localStorage.userPermission == 0) {
        data.name = userInfo.data.admin.username;
        data.id = userInfo.data.admin.jobNumber;
      } else {
        data.name = userInfo.data.student.username;
        data.id = userInfo.data.student.studentId;
      }

      // 模拟获取项目信息
      data.ItemList = notApplyItemJson.data;
      // TODO 接口完成后调整
      // AwardJudge().then((res) => {
      //   console.log(res);
      // });

      // 提取用户权限，从localStorage
      data.userPermission = localStorage.userPermission;
    });

    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
/* 个人信息 */
.information {
  width: 60vw;
  margin: 0 100px;
  padding: 50px 100px;
  border: double black 3px;
  p {
    font-size: 32px;
  }
}

/* 加分管理，评奖评优 */
.item-group {
  > p {
    margin-top: 50px;
    font-size: 24px;
  }
  table tr {
    td {
      padding-left: 50px;
      font-size: 18px;
      height: 50px;
      border: solid 1px rgba($color: black, $alpha: 0.3);
    }
  }
}
.table-top {
  td {
    font-weight: bold;
    background-color: #e8e8e8;
    border-top: dashed 1px rgba($color: black, $alpha: 0.3) !important;
  }
}
</style>
