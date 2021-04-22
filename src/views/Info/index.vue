<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="3">
        <div class="label-warp category">
          <label for>类型:</label>
          <div class="warp-content">
            <el-select v-model="type_value" placeholder="请选择" style="100%">
              <el-option
                v-for="item in options"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-warp data">
          <label for>日期:</label>
          <div class="warp-content">
            <el-date-picker
              style="width:100%"
              v-model="date_value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
              <!-- :picker-options="pickerOptions" -->
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-warp keyword">
          <label for>关键字:</label>
          <div class="warp-content">
            <el-select v-model="keyWord[0].value" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in keyWord"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="search-input">
          <el-input style="width:90%" placeholder="请输入内容" v-model="input_key" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="3">
        <div class="edit">
          <el-button type="danger" icon="el-icon-edit" id="add" @click="dialog_switch = true">添加</el-button>
        </div>
      </el-col>
      <!--  -->
    </el-row>
<!-- 表格 -->
    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="830" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="type" label="类型" width="130" align="center"></el-table-column>
        <el-table-column prop="date" label="日期" width="237" align="center"></el-table-column>
        <el-table-column prop="adminuser" label="管理员" width="115" align="center"></el-table-column>
        <el-table-column label="操作" width="" align="center">
          <template slot-scope="scope">
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
<!-- 分页 -->
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="handleDeleteAll()">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          :page-sizes="[10, 20, 30, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100">
        </el-pagination>
      </el-col>
    </el-row>
<!-- 添加弹窗 -->
    <DialogInfo :dialogSwitch.sync="dialog_switch"/>  
<!-- @close="revert" -->
  </div>
</template>
<script>
//vue3.0里watchEffect 代替 watch
import { reactive, ref, watchEffect } from "@vue/composition-api";
import DialogInfo from "./Dialog/index"
import { global } from "@/utils/global_vue3.0"
export default {
  name: "infoIndex",
  components: { DialogInfo },
  setup(props, { root }) {
    const { str, confirm} = global();
    //监听
    watchEffect( ()=> console.log(str.value));
    /**数据 */
    const type_value = ref("");
    const date_value = ref("");
    const input_key = ref("");
    const dialog_switch = ref(false);

    const options = reactive([
      {
        value: 1,
        label: "黄金糕"
      },
      {
        value: 2,
        label: "双皮奶"
      }
    ]);
    const keyWord = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    const tableData = reactive([{
      title: '上海市普陀区金沙江路 1518 弄',
      type: '国内信息',
      date: '2019-05-03 19:31:31',
      adminuser: '管理员'
    },{
      title: '上海市普陀区金沙江路 1518 弄',
      type: '国内信息',
      date: '2019-05-03 19:31:31',
      adminuser: '管理员'
    },{
      title: '上海市普陀区金沙江路 1518 弄',
      type: '国内信息',
      date: '2019-05-03 19:31:31',
      adminuser: '管理员'
    },{
      title: '上海市普陀区金沙江路 1518 弄',
      type: '国内信息',
      date: '2019-05-03 19:31:31',
      adminuser: '管理员'
    },]);
    const multipleSelection =  reactive([]);

    const handleSelectionChange = (val)=> {
      root.multipleSelection = val;
    };

    /*编辑 */
    const handleEdit = (index, row)=> {
      console.log(index, row);
      }
    /*删除 */
    const handleDelete = (index, row)=> {
      confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        type: "warning",
        fn: message,
        id: "0"
      });
    }
    /*删除全部 */
    const handleDeleteAll = (index, row)=> {
      confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        type: "warning",
        fn: message,
        id: "1"
      });
    }
    //删除之后执行代码
    const message = (type, messages)=> {
      console.log(type, messages);
      root.$message({
        type: type,
        message: messages
      });
    }
    return {
      //ref
      type_value, date_value, input_key,  dialog_switch,
      //reactive
      options, keyWord, tableData, multipleSelection,
      //methdos
      handleSelectionChange, handleEdit, handleDelete, handleDeleteAll //revert
    };
  }
};
</script>
<style lang="scss">
.label-warp {
  &.category {
    @include labelCss(left, 40, left, 40);
  }
  &.data {
    @include labelCss(left, 73, right, 40);
    .el-date-editor .el-range-separator {
      line-height: 29px;
    }
  }
  &.keyword {
    @include labelCss(left, 55, right, 40);
  }
}
.el-button--danger, .el-button--success{
  &.el-button {
    @include elButton(none, 88, 40);
  }
  &#add {
    @include elButton(right, 88, 40);
  }
}
//初始化分页.el-input__inner
.el-pagination.is-background {
  .el-pagination__jump {
    .el-input {
      .el-input__inner {
        margin: 0;
      }
    }
  }
}
//每个板块间的距离
.el-row {
  padding-bottom: 30px;
}
</style>
