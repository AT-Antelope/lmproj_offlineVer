<template>
  <!-- 路径导航 面包屑 -->
  <ol class="breadcrumb">
    <span
      class="glyphicon glyphicon-chevron-left"
      aria-hidden="true"
      @click="routerBack"
    ></span>
    <li><a href="/index">主页</a></li>
    <li><a href="/applyItemDetail">评奖列表</a></li>
    <li class="active">
      {{ data.pageFromAddItem == "true" ? "添加项目" : "项目详情" }}
    </li>
  </ol>

  <!-- 表单 main -->
  <div class="mainWrap">
    <div class="mainForm">
      <form class="form-horizontal">
        <!-- 项目名称 -->
        <div class="form-group form-group-lg">
          <label for="itemName" class="col-sm-3 control-label">项目名称</label>
          <div class="col-sm-5">
            <input
              type="text"
              v-model="data.form.itemName"
              class="form-control"
              placeholder="项目名称"
            />
          </div>
        </div>

        <!-- 项目类别 -->
        <div class="form-group form-group-lg">
          <label for="itemCategory" class="col-sm-3 control-label"
            >项目类别</label
          >
          <div class="col-sm-5">
            <input
              type="text"
              v-model="data.form.itemCategory"
              class="form-control"
              placeholder="项目类别"
            />
          </div>
        </div>

        <!-- 金额 -->
        <div class="form-group form-group-lg">
          <label for="money" class="col-sm-3 control-label">金额</label>
          <div class="col-sm-5">
            <input
              type="text"
              v-model="data.form.money"
              class="form-control"
              placeholder="金额"
            />
          </div>
        </div>

        <!-- 限制条件 -->
        <div class="form-group form-group-lg">
          <label for="limitCondition" class="col-sm-3 control-label"
            >限制条件</label
          >
          <div class="col-sm-9 limitCondition">
            <!-- 无违纪情况 -->
            <div class="radio">
              <label>
                <input
                  type="radio"
                  name="optionsRadios"
                  id="optionsRadios1"
                  checked
                />
                <span>无违纪情况</span>
              </label>
            </div>

            <!-- 在校期间 -->
            <div class="radio">
              <label>
                <input type="radio" name="optionsRadios" id="optionsRadios2" />
                <span>在校期间</span>
              </label>
              &nbsp;

              <!-- 学年，下拉框 -->
              <select>
                <option
                  v-for="item in data.limitConditionDatas.limitTime"
                  :key="item.id"
                >
                  {{ item.time }}
                </option>
              </select>
              &nbsp;

              <!-- 科目，下拉框 -->
              <select style="padding-bottom: 3px">
                <option
                  v-for="item in data.limitConditionDatas.limitCategory"
                  :key="item.id"
                >
                  {{ item.categoryName }}
                </option>
              </select>

              &nbsp;
              <span>大于等于</span>

              &nbsp;
              <input type="text" style="width: 50px" />
              &nbsp;
              <span>分</span>
            </div>
          </div>
        </div>

        <!-- 开关状态 -->
        <div class="form-group form-group-lg">
          <label for="switchState" class="col-sm-3 control-label"
            >开关状态</label
          >
          <div class="col-sm-5 switchStateWrap">
            <input
              type="checkbox"
              v-model="data.form.switchState"
              id="radioOpen"
            />
            <label for="radioOpen">开启申请</label>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-group form-group-lg">
          <!-- 确认修改，按钮 -->
          <div class="col-sm-offset-4 col-sm-1">
            <button
              type="button"
              @click="eveSubmit"
              class="btn btn-success btn-lg"
            >
              {{ data.pageFromAddItem == "true" ? "添加项目" : "确认修改" }}
            </button>
          </div>
          <!-- 取消修改，按钮 -->
          <div class="col-sm-1">
            <button
              type="button"
              @click="eveCancel"
              class="btn btn-info btn-lg"
            >
              {{ data.pageFromAddItem == "true" ? "取消添加" : "取消修改" }}
            </button>
          </div>
          <!-- 删除项目，按钮 -->
          <!-- ! TIP 转成字符串后正常实现值对比，否则被进行 判断data下是否有pageFromAddItem这个属性，无论怎样都返回false -->
          <div v-if="data.pageFromAddItem == 'false'" class="col-sm-1">
            <button
              type="button"
              @click="eveDeleteItem"
              class="btn btn-danger btn-lg"
            >
              删除项目
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  notApplyItemJson,
  limitConditionData,
} from "../../static/json/json.js";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  // 管理员，项目详情
  name: "itemDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();

    /**
     * data
     */
    const data = reactive({
      form: {
        itemName: "", // 项目名称
        itemCategory: "", // 项目类别
        money: "", // 金额
        limitCondition: {}, // 限制条件
        switchState: true, // 开关状态
      },
      limitConditionDatas: {},
      // 当前项目信息
      itemInfo: [],
      // 当前项目ID
      currentCategoryID: null,
      // 入口来源，从什么页面进来的
      pageFromAddItem: null,
    });

    /**
     * function
     */
    // 路由跳转，退回到路由栈里上一个页面
    const routerBack = () => {
      router.back(-1);
    };

    // 确认修改，按钮
    const eveSubmit = () => {
      // 请求用的参数
      const params = {
        itemName: data.form.itemName,
        itemCategory: data.form.category,
        money: data.form.money,
        // limitCondition: data.form.limitCondition.split("\r\n"),
      };
      // console.log(params);

      if (confirm("是否确认")) {
        // TODO: 用接口发送数据，改变项目详情参数
        setTimeout(() => {
          // 确认
          alert("修改成功");
          router.push("/applyItemDetail");
        }, 300);
      }
    };

    // 取消修改，按钮
    const eveCancel = () => {
      routerBack();
    };

    // 删除项目，按钮
    const eveDeleteItem = () => {
      // TODO: 用接口发送数据，根据当前项目ID，删除项目详情参数
      if (confirm("是否删除项目")) {
        // TODO: 用接口发送数据，改变项目详情参数
        setTimeout(() => {
          // 确认
          alert("修改成功");
          router.push("/applyItemDetail");
        }, 300);
      }
    };

    /**
     * 生命周期
     */
    onMounted(() => {
      // 从跳转传参获取，当前项目ID
      data.currentCategoryID = route.params.currentId;

      // 获取当前项目数据，从列表根据项目ID筛选
      // TODO: 用接口获取数据代替，后端按ID筛选？
      for (let index = 0; index < notApplyItemJson.data.length; index++) {
        const element = notApplyItemJson.data[index];
        if (element.categoryId == data.currentCategoryID) {
          data.itemInfo = element;
        }
      }

      data.pageFromAddItem = route.params.fromAddItem;
      // console.log(data.pageFromAddItem == "false");

      // 获取限制条件参数，下拉框数据
      // TODO 接口出来后换成从接口获取
      data.limitConditionDatas = limitConditionData.data;
      // console.log(data.limitConditionDatas);

      // 从 添加项目 进来时中断初始化实现空白页面
      if (data.pageFromAddItem == true) return;

      // 数据初始化到v-model，从当前项目信息获取
      if (data.itemInfo.categoryId >= 0) {
        data.form.itemName = data.itemInfo.itemName;
        data.form.itemCategory = data.itemInfo.category;
        data.form.money = data.itemInfo.money;
        // 把 限制条件数组 每项组件加入换行符，转成字符串
        data.form.limitCondition = data.itemInfo.limitCondition;
        data.form.switchState = data.itemInfo.switchState;
      }
      // console.log(data.form);
    });

    return {
      /* data */
      data,
      /* function */
      routerBack,
      eveSubmit,
      eveCancel,
      eveDeleteItem,
    };
  },
};
</script>

<style lang="scss" scoped>
/* 路径导航 面包屑 */
ol {
  background-color: rgba($color: #dbf3de, $alpha: 0.5);
  span {
    font-size: 18px;
    margin-right: 20px;
    cursor: pointer;
  }
}

.mainWrap {
  margin-top: 5vh;
}

.limitCondition {
  span {
    font-size: 18px;
  }
}

.switchStateWrap {
  font-size: 18px;
  line-height: 47px;
  input {
    width: 16px;
    height: 16px;
    /* 圆形 radio */
    // appearance: radio;
  }
  label {
    padding-left: 5px;
  }
}
</style>
