<template>
	<el-dialog :title="dialogTitle" :append-to-body="appendToBody" :visible.sync="dialogFormVisible" :width="dialogWidth" top="58px" @open="openReset" @close="openClose"
	:custom-class="dialogSize ? 'el-dialog--' + dialogSize : '' " >
			<slot>
			</slot>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancle" v-waves size="mini" icon="el-icon-circle-close-outline" v-if="showCancel">{{$t('table.cancel')}}</el-button>
				<el-button type="primary" v-if="showConfirm" v-waves size="mini" icon="el-icon-third-baocun" @click="saveData">{{$t('table.confirm')}}</el-button>
				<el-button type="primary" v-if="showPrint" v-waves size="mini" icon="el-icon-printer" @click="printData">打印</el-button>
        <el-button type="primary" v-if="showReject" v-waves size="mini" icon="el-icon-third-baocun" @click="rejectData">驳回</el-button>
        <el-button type="primary" v-if="showStop" v-waves size="mini" icon="el-icon-third-baocun" @click="stopData">终止流程</el-button>
        <el-button type="primary" v-if="showSave" v-waves size="mini" icon="el-icon-third-baocun" @click="saveData">保存</el-button>
        <el-button type="primary" v-if="showSubmit" v-waves size="mini" icon="el-icon-third-baocun" @click="submitData">提交</el-button>
			</div>
	</el-dialog>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令

export default {
  name: "dialogDetail",
  directives: {
    waves
  },
  props: {
    dialogTitle: {
      type: String
    },
    showCancel: {
      type: Boolean
    },
    showConfirm: {
      type: Boolean
    },
    dialogWidth: {
      type: String,
      default: "900px"
    },
    showPrint: {
      type: Boolean,
      default: false
	  },
    showSave: {
      type: Boolean
    },
    showSubmit: {
      type: Boolean
    },
    showReject:{
      type: Boolean
    },
    showStop:{
      type: Boolean
    },
    size: {
      type: String
    },
    appendToBody: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      dialogFormVisible: false
    };
  },
  computed: {
      dialogSize() {
        return this.size || ''
      }
  },
  methods: {
    // 打开dialog
    show() {
      if (this.$parent.$refs["dataForm"]) {
        this.$parent.$refs["dataForm"].clearValidate();
      }
      this.dialogFormVisible = true;
    },
    // 关闭dialog
    close() {
      this.dialogFormVisible = false;
    },

    cancle(){
      this.$emit("cancle");
      this.dialogFormVisible = false;
    },
    // 操作数据
    saveData() {
      this.$emit("save-data");
    },

    // 重置数据
    openReset(){
      this.$emit("open-reset");
    },

    // 关闭窗口
    openClose(){
      this.$emit("open-close");
    },

    // 打印
    printData() {
      this.$emit("print-data");
    },
    rejectData(){
      this.$emit("reject-data");
    },
    submitData(){
      this.$emit("submit-data");
    },
    stopData(){
      this.$emit("stop-data");
    }
  }
};
</script>
<style>
.el-dialog__header {
  border-bottom: 1px solid #ebeef5;
}
.el-dialog__footer {
  border-top: 1px solid #ebeef5;
}
.el-dialog--mini {
	width: 400px!important;
}
.el-dialog--small {
	width: 600px!important;
}
.el-dialog--medium {
	width: 900px!important;
}
.el-dialog--large {
	width: 1000px!important;
}
.el-dialog--largeX {
	width: 1200px!important;
}
</style>
