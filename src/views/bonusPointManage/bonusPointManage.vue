<template>
  <!-- 路径导航 面包屑 -->
  <ol class="breadcrumb">
    <span
      class="glyphicon glyphicon-chevron-left"
      aria-hidden="true"
      @click="routerBack"
    ></span>
    <li><a href="/index">主页</a></li>
    <li class="active">加分管理</li>
  </ol>

  <!-- search 搜索栏 -->
  <div class="form-group form-group-lg form-horizontal searchBarWrap">
    <label
      class="col-sm-1 control-label"
      style="font-size: 18px; margin-left: 4vw"
      >加分管理</label
    >
    <!-- 搜索框 -->
    <div class="form-group searchBar">
      <input type="text" class="form-control" placeholder="请输入关键字" />
      <button type="text" class="btn btn-default btn-lg">搜索</button>
    </div>
  </div>

  <!-- table 表格 -->
  <div class="table-responsive tb" style="margin-top: -30px; height: 33%">
    <span class="tipSpan">点击申请理由，可查看详情</span>
    <table class="table table-bordered">
      <tr>
        <td>姓名</td>
        <td>学号</td>
        <td>申请理由</td>
        <td>通过</td>
        <td>退回</td>
      </tr>
      <!-- 表格数据 -->
      <!-- 循环表行，根据json拿到的数据 -->
      <tr v-for="item in data.userList" :key="item.studentId">
        <td>{{ item.name }}</td>
        <td>{{ item.studentId }}</td>
        <!-- 申请理由 -->
        <td
          @click="eveApplyReasonShow(item.studentId)"
          class="applyReason"
          style="cursor: pointer"
        >
          {{ item.applyReason }}
        </td>
        <td>
          <a href="javascript:;" @click="evePass(item.studentId)">通过</a>
        </td>
        <td>
          <a href="javascript:;" @click="eveReturn(item.studentId)">退回</a>
        </td>
      </tr>
    </table>
  </div>

  <!-- console 控制台 -->
  <div class="consoleBottom">
    <!-- 分割线 -->
    <hr style="border: 1px grey solid" />

    <!-- 查询区域，左侧 -->
    <div class="consoleLeft">
      <div class="mainForm">
        <form class="form-horizontal">
          <!-- 姓名 -->
          <div class="form-group">
            <label class="col-sm-2 control-label">姓名</label>
            <div class="col-sm-5">
              <input
                type="text"
                v-model="data.searchParams.searchName"
                class="form-control"
                placeholder="姓名"
              />
            </div>
          </div>

          <!-- 学号 -->
          <div class="form-group">
            <label class="col-sm-2 control-label">学号</label>
            <div class="col-sm-5">
              <input
                type="text"
                v-model="data.searchParams.searchID"
                class="form-control"
                placeholder="学号"
              />
            </div>
            <div class="col-sm-4" style="margin-top: 2px">
              <button
                type="button"
                @click="eveSearchStudent"
                style="padding: 3px 12px"
              >
                查询
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- 查询结果，左下角 -->
      <div style="margin-top: 1vh; height: 100%">
        <span class="tipSpan">请选择学生</span>
        <div class="searchResult">
          <!-- 搜索结果的数组，length大于0则正常显示，否则显示查无此人 -->
          <div
            v-if="data.searchResult.searchResultList.length > 0"
            class="table-responsive tb"
          >
            <table class="table table-bordered">
              <tr>
                <td>姓名</td>
                <td>学号</td>
                <td>班级</td>
                <td></td>
              </tr>
              <tr
                v-for="item in data.searchResult.searchResultList"
                :key="item.resultID"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.studentId }}</td>
                <td>{{ item.class }}</td>
                <td>
                  <a href="javascript:;" @click="eveResultSelect(item)">选择</a>
                </td>
              </tr>
            </table>
          </div>

          <!-- 查无此人 -->
          <div v-else class="searchNull">查无此人，请重新查询</div>
        </div>
      </div>
    </div>

    <!-- 数据操作，右侧 -->
    <div class="consoleRight">
      <div class="mainForm">
        <form ref="formResultChange" class="form-horizontal">
          <div class="consoleFormWrap">
            <!-- 第一行 -->
            <div class="form-group">
              <!-- 姓名 -->
              <label class="col-sm-2 control-label">姓名</label>
              <div class="col-sm-2">
                <input
                  type="text"
                  v-model="data.searchResultChange.resultName"
                  class="form-control"
                  placeholder="未选中学生"
                  readonly
                />
              </div>

              <!-- 分数 -->
              <label class="col-sm-1 control-label">分数</label>
              <div class="col-sm-2">
                <input
                  type="text"
                  v-model.number="data.searchResultChange.resultPoint"
                  class="form-control"
                  placeholder="未选中学生"
                />
              </div>
            </div>

            <!-- 第二行 -->
            <div class="form-group">
              <!-- 学号 -->
              <label class="col-sm-2 control-label">学号</label>
              <div class="col-sm-2">
                <input
                  type="text"
                  v-model="data.searchResultChange.resultID"
                  class="form-control"
                  placeholder="未选中学生"
                  readonly
                />
              </div>

              <!-- 加减分 -->
              <div class="col-sm-offset-1 col-sm-3 radioGroup">
                <input
                  type="radio"
                  id="pointAdd"
                  name="point"
                  :checked="
                    data.searchResultChange.resultPointAddFlag == 1
                      ? true
                      : false
                  "
                />
                <label for="pointAdd">加分</label>

                <input
                  type="radio"
                  id="pointMinus"
                  name="point"
                  :checked="
                    data.searchResultChange.resultPointAddFlag == 0
                      ? true
                      : false
                  "
                />
                <label for="pointMinus">减分</label>
              </div>
            </div>

            <!-- 第三行 -->
            <div class="form-group">
              <!-- 班级 -->
              <label class="col-sm-2 control-label">班级</label>
              <div class="col-sm-2">
                <input
                  type="text"
                  v-model="data.searchResultChange.resultClass"
                  class="form-control"
                  placeholder="未选中学生"
                  readonly
                />
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="form-group form-group-lg" style="margin-top: 3vh">
              <div class="col-sm-offset-3 col-sm-1">
                <button
                  type="button"
                  @click="eveSubmit"
                  class="btn btn-success"
                  style="padding: 5px 30px"
                >
                  确认
                </button>
              </div>
              <div class="col-sm-1" style="margin-left: 3vw">
                <button
                  type="reset"
                  @click="eveCancel"
                  class="btn btn-info"
                  style="padding: 5px 30px"
                >
                  重置
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- 模态框 -->
  <div class="modalWrap" v-show="data.modalShowFlag" @blur="eveModalBlur">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- 关闭按钮 -->
          <button type="button" @click="eveCloseModal" class="close">
            <span>&times;</span>
          </button>
          <!-- 标题 -->
          <h4 class="modal-title">申请理由</h4>
        </div>
        <!-- 内容 -->
        <div class="modal-body modalData">{{ data.modalData }}</div>
        <!-- 关闭按钮 -->
        <div class="modal-footer">
          <button type="button" @click="eveCloseModal" class="btn btn-default">
            关闭
          </button>
          <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
        </div>
      </div>
    </div>
  </div>

  <!-- 警告框 -->
  <div
    class="alert alert-success alert-dismissible alert-box"
    ref="alertBoxRef"
    v-show="data.alertBoxFlag"
    role="alert"
  >
    操作成功，
    <strong>{{ data.alertBoxText }}</strong>
  </div>
</template>

<script>
import { notApplyItemJson, studentInfo } from "../../static/json/json.js";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  // 管理员，加分管理
  name: "bonusPointManage",
  setup() {
    const route = useRoute();
    const router = useRouter();

    /**
     * data
     */
    const alertBoxRef = ref();
    const data = reactive({
      itemInfo: [], // 项目详情
      userList: [], // 用户列表
      currentCategoryID: null, // 当前项目ID
      // TODO 完成接口获取数据初始化后，把默认改为false
      searchParams: {
        searchName: "", // 搜索名称
        searchID: "", // 搜索ID
      },
      // 学生搜索结果
      searchResult: {
        searchResultList: [], // 搜索结果
        searchNullFlag: true, // 左下角搜索结果是否为空
      },
      // 学生数据操作
      searchResultChange: {
        resultName: "", // 搜索结果，姓名
        resultID: "", // 搜索结果，学号
        resultClass: "", // 搜索结果，班级
        resultPoint: "", // 搜索结果，分数
        resultPointAddFlag: 1, // 搜索结果，加减分，1 加分，0 减分
      },
      modalShowFlag: false, // 模态框显示
      modalData: "...", // 模态框数据
    });

    /**
     * function
     */
    // 显示申请理由详情，模态框
    const eveApplyReasonShow = (id) => {
      // 根据id从userList获取当前学生数据，把其中的applyReason赋值给modalData，实现在模态框中显示值
      // TODO 根据接口实际返回数据，调整属性名
      data.modalData = data.userList.find(
        (item) => item.studentId == id
      ).applyReason;
      // console.log(data.modalData);

      // 显示模态框
      data.modalShowFlag = true;
    };
    // 模态框失焦
    // TODO 未能成功触发
    const eveModalBlur = () => {
      console.log("blur");
      data.modalShowFlag = false;
    };

    // 关闭模态框
    const eveCloseModal = () => {
      data.modalShowFlag = false;
    };

    // 显示提示，警告框，传入 对象ref
    const alertBoxShow = (itemRef) => {
      itemRef.value.style.transition = "";
      itemRef.value.style.opacity = "1";
      itemRef.value.style.top = "155px";

      data.alertBoxFlag = true;

      setTimeout(() => {
        itemRef.value.style.transition = "linear .5s";
        itemRef.value.style.top = "140px";
        itemRef.value.style.opacity = "0";
      }, 500);
    };

    // 删除当前学生
    const handleOperation = (id) => {
      // 获取当前学生在数据数组中的下标
      const currentStudent = data.userList.findIndex(
        (item) => item.studentId === id
      );
      // 根据下标删除数据数组中元素
      data.userList.splice(currentStudent, 1);
    };

    // 通过事件
    const evePass = (id) => {
      // TODO: 用通过接口代替

      data.alertBoxText = "已通过";
      alertBoxShow(alertBoxRef);

      // 删除当前学生
      handleOperation(id);
    };

    // 退回事件
    const eveReturn = (id) => {
      // TODO: 用退回接口代替
      data.alertBoxText = "已退回";
      alertBoxShow(alertBoxRef);

      // 删除当前学生
      handleOperation(id);
    };

    // 查询此人，按钮
    const eveSearchStudent = () => {
      const params = {
        id: data.searchParams.searchID,
        name: data.searchParams.searchName,
      };
      // TODO 搜索学生，把搜索结果，替换成请求到的数据
      data.searchResult.searchResultList = studentInfo.data;

      if (data.searchResult > 0) {
        // 获取到的数据，数组项目大于0个，则正常显示表格，不显示 查无此人
        data.searchResult.searchNullFlag = 0;
      } else {
        // 否则显示 查无此人
        data.searchResult.searchNullFlag = 1;
      }
    };

    // 选择，选中学生，进行数据修改
    const eveResultSelect = (item) => {
      // 选择学生后，初始化右侧表单 v-model
      data.searchResultChange.resultName = item.name;
      data.searchResultChange.resultID = item.studentId;
      data.searchResultChange.resultClass = item.class;
      data.searchResultChange.resultPoint = item.point;
    };

    // 确认，按钮
    const eveSubmit = () => {
      const params = {
        id: data.searchResultChange.resultID,
        point: data.searchResultChange.resultPoint,
      };
      // console.log(params);

      // TODO 改用接口发送请求

      // console.log(Number.parseInt());
      if (confirm("是否确认")) {
        // TODO: 用接口发送数据，改变项目详情参数
        setTimeout(() => {
          // 确认
          alert("修改成功");
        }, 300);
      }
    };

    // 重置，按钮
    const eveReset = () => {
      // 重置表单
      this.$refs.formResultChange.resetFeilds();
      //TODO 初始化加减分状态，已被重置清空状态，未完成，重置后无法再次赋值，后续代码似乎不再执行
      data.searchResultChange.resultPointAddFlag = 1;
      // console.log(data.searchResultChange.resultPointAddFlag);
    };

    /**
     * 生命周期
     */
    onMounted(() => {
      // 从跳转传参获取，当前项目ID
      data.currentCategoryID = route.params.currentID;

      // for (let index = 0; index < notApplyItemJson.data.length; index++) {
      //   const element = notApplyItemJson.data[index];
      //   if (element.categoryId == data.currentCategoryID)
      //     data.itemInfo = element;
      // }

      // 现采用foreach代替实现
      // 获取当前项目数据，从数据列表，根据项目ID筛选
      // TODO: 用接口获取数据代替，后端按ID筛选？
      // console.log(notApplyItemJson.data);
      notApplyItemJson.data.forEach((item) => {
        if (item.categoryId == data.currentCategoryID) data.itemInfo = item;
      });

      // 获取学生报名列表信息
      // TODO: 用接口获取数据代替
      data.userList = studentInfo.data;
    });

    return {
      /* data */
      alertBoxRef,
      data,
      /* function */
      eveApplyReasonShow,
      eveModalBlur,
      eveCloseModal,
      evePass,
      eveReturn,
      eveSearchStudent,
      eveResultSelect,
      eveSubmit,
      eveReset,
    };
  },
};
</script>

<style lang="scss" scoped>
/* 清除bootstrap默认样式 */
.form-group {
  margin-bottom: 0;
}

/* span 提示性 */
.tipSpan {
  color: rgba($color: black, $alpha: 0.6);
}

/* 路径导航 面包屑 */
ol {
  background-color: rgba($color: #dbf3de, $alpha: 0.5);
  span {
    font-size: 18px;
    margin-right: 20px;
    cursor: pointer;
  }
}

// 搜索框
.searchBarWrap {
  // margin-top: 5vh;
  label {
    margin-top: 0.5vh;
  }
  .searchBar {
    margin-left: 15%;
    width: 25vw;
    button {
      position: relative;
      left: 26vw;
      top: -4.8vh;
    }
  }
}

/* table 表格 */
.tb {
  height: 100%;
  overflow-y: auto;
  table tr {
    background-color: rgba($color: #d9edf7, $alpha: 0.5);
    &:first-child {
      background-color: #e8e8e8;
    }
    td {
      padding: 15px;
      font-size: 18px;
      text-align: center;
      border-right: solid 1px rgba($color: black, $alpha: 0.3);
      border-bottom: solid 1px rgba($color: black, $alpha: 0.3);
      &:last-child {
        border-right: none;
      }
    }
  }
}
// 申请理由
.applyReason {
  max-width: 300px;
  /*强制文字在一行文本框内*/
  white-space: nowrap;
  /*溢出部分文字隐藏*/
  overflow: hidden;
  /*溢出部分省略号处理*/
  text-overflow: ellipsis;
}

/* 控制台 */
.consoleBottom {
  position: fixed;
  width: 100%;
  height: 45vh;
  bottom: 0;
  /* DANGER 笔记本默认放大125%或以上时，布局会出现问题，表格容器会超过区域 */
  background: #f5f5f7;
  .form-group {
    margin-bottom: 10px;
  }

  /* 查询，左侧 */
  .consoleLeft {
    position: fixed;
    width: 30%;
    height: 100%;
    .searchResult {
      width: 100%;
      height: 25%;
      border: 1px black solid;
      .searchNull {
        position: absolute;
        top: 23%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px gray solid;
        padding: 5px;
      }
    }
  }

  /* 数据操作，右侧 */
  .consoleRight {
    margin-left: 35%;
    width: 60%;
    height: 100%;
    .consoleFormWrap {
      margin-top: 6%;
      .form-group {
        margin-top: 20px;
        .radioGroup {
          margin-left: 4%;
          font-size: 17px;
          margin-top: 6px;
          input {
            margin-left: 14%;
          }
          label {
            margin-left: 3px;
          }
        }
      }
    }
  }
}

/* 模态框 */
.modalWrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  overflow: hidden;
  outline: 0;
  transition: opacity 0.15s linear;
}
/* 模态框内容换行显示，否则溢出内容区div */
.modalData {
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
}

// 操作成功提示框
.alert-box {
  position: absolute;
  width: 250px;
  top: 130px;
  right: 40px;
  padding-left: 30px;
}
</style>
