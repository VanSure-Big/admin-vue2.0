<template>
  <div class="category">
    <el-button size="medium" type="danger" @click="addFirstcategory">添加一级分类</el-button>
    <hr style="margin:30px -30px; border:none; border-bottom:1px solid #e9e9e9;" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category_nav" v-for="item in category.item" :key="item.id">
            <h4>
              <svg-icon iconName="open"></svg-icon>
              {{item.category_name}}
              <div class="button_group">
                <el-button size="mini" type="danger" round>编辑</el-button>
                <el-button size="mini" type="success" round>添加子集</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul v-for="firstItem in item.children" :key="firstItem.id">
              <li>
                {{firstItem.category_name}}
                <div class="button_group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu_title">一级分类编辑</h4>
          <el-form :model="ruleForm" label-width="142px" class="form_wrap">
            <el-form-item label="一级分类名称:" prop="pass" v-if="categoryInput.firstInput">
              <el-input v-model="ruleForm.categoryName"></el-input>
            </el-form-item>

            <el-form-item label="二级分类名称:" prop="checkPass" v-if="categoryInput.secInput">
              <el-input v-model="ruleForm.secCategoryName"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="danger" @click="submit()" :loading ="submit_loading">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, set, ref } from "@vue/composition-api";
import { AddfristCategory, SelectCategory } from "@/api/news";
export default {
  name: "category",
  setup(props, { root }) {
    /**
     * data
     */
    const ruleForm = reactive({
      categoryName: "",
      secCategoryName: ""
    });
    const categoryInput = reactive({
      firstInput: true,
      secInput: true
    });
    const category = reactive({
      item: []
    });
    const submit_loading = ref(false)
    /**
     * 方法
     */
    const submit = () => {
      submit_loading.value = true;
      if (!ruleForm.categoryName) {
        root.$message.error("分类名称不能为空！");
        submit_loading.value = false;
        return false;
      }
      AddfristCategory({ categoryName: ruleForm.categoryName })
        .then(response => {
          let data =response.data
          if (response.data.resCode == 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
            // push进数据中减少接口请求 || SelectCategory()
            category.item.push(data.data)
            submit_loading.value = false;
          }
        })
        .catch(error => {
          submit_loading.value = false;
          console.log(error);
        });
    };
    const addFirstcategory = () => {
      categoryInput.firstInput = true;
      categoryInput.secInput = false;
    };
    SelectCategory()
      .then(res => {
        let data = res.data.data
        category.item = data;
      })
      .catch();
    return {
      //data
      ruleForm,
      categoryInput,
      category,
      submit_loading,
      //方法
      submit,
      addFirstcategory
    };
  }
};
</script>
<style lang="scss" scoped >
.category {
  .category_nav:first-child {
    &:before {
      top: 25px;
    }
  }
  .category_nav:last-child {
    &:before {
      bottom: 20px;
    }
  }
}
.menu_title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category_nav {
  cursor: pointer;
  line-height: 44px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    border-left: 1px dotted #000000 !important;
    top: 0px;
    bottom: 0px;
    left: 22px;
  }
  h4 {
    padding-left: 40px;
    position: relative;
    svg {
      position: absolute;
      left: 4px;
      top: 4px;
      font-size: 17px;
    }
  }
  li {
    padding-left: 36px;
    margin-left: 24px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 32px;
      left: 0px;
      top: 22px;
      border-bottom: 1px dotted #000000;
    }
  }
}
li,
h4 {
  @include webkit(transition, all 0.3s ease 0s);
  &:hover {
    background-color: #f3f3f3;
    .button_group {
      display: block;
    }
  }
}
.button_group {
  display: none;
  position: absolute;
  right: 11px;
  top: 0;
  z-index: 2;
  button {
    font-size: 12px !important;
  }
}
.form_wrap {
  width: 410px;
  padding-top: 26px;
}
</style>
