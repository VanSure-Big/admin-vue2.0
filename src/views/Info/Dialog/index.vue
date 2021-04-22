<template>
    <el-dialog title="添加" :visible.sync="dialog_info" @close="dialog" width="576px">
      <el-form :model="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-input v-model="form.name"  placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="概况:" :label-width="formLabelWidth">
          <el-input  type="textarea" v-model="form.name" placeholder="请输入概况"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog">取 消</el-button>
        <el-button type="danger" @click="dialog">确 定</el-button>
      </div>
      <!-- 1 -->
    </el-dialog>
</template>

<script>
export default {
  name: "dialogInfo",
  props: {
    dialogSwitch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog_info: false, //false
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '70px'
    }
  },
  methods: {
    dialog() {
      // this.$emit('close', false)
      //父组件加.sync 可以用修饰器 不能处理逻辑关系
      this.$emit("update:dialogSwitch", false)
    }
  },
  watch:{
    dialogSwitch: {
      handler(newValue, oldValue) {
        this.dialog_info = newValue
      }
    }
  }
}
</script>

<style>

</style>