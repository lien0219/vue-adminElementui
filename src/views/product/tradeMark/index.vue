<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column
      ><el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 60px" />
        </template> </el-table-column
      ><el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器    可以简写@current-change="handleCurrentChange"-->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper,->,sizes,total"
    >
    </el-pagination>
    <!-- 添加按钮弹窗 -->
    <el-dialog
      :title="this.tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- 表单 -->
      <el-form style="80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 上传图片    :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" -->
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 分页器第几页
      page: 1,
      // 展示数据条数
      limit: 3,
      // 总条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 弹窗显示/隐藏
      dialogFormVisible: false,
      // 上传图片
      // imageUrl: "",
      // 表单
      tmForm: {
        logoUrl: "",
        tmName: "",
      },
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" },
        ],
        logoUrl: [
          { required: true, message: "请选择品牌图片", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$API);
    // 获取列表数据
    this.getPageList();
  },
  methods: {
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构参数
      const { page, limit } = this;
      // 品牌列表接口 初始化两个字段， 传参
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      // console.log(result.data);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 分页
    // handleCurrentChange(pager) {
    //   console.log(pager);
    //   // 修改参数
    //   this.page = pager;
    //   this.getPageList();
    // },
    handleSizeChange(limit) {
      console.log(limit);
      this.limit = limit;
      this.getPageList();
    },
    // 添加按钮
    showDialog() {
      this.dialogFormVisible = true;
      // 清空内容
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    // 修改品牌
    updateTradeMark(row) {
      // console.log(row);
      this.dialogFormVisible = true;
      this.tmForm = row;
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      console.log(res);
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加&&修改品牌
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            // 列表刷新
            this.getPageList(this.tmForm ? this.page : 1);
          }
        } else {
          return false;
          console.log("error submit!!");
        }
      });
    },
    // 删除
    deleteTradeMark(row) {
      this.$confirm(`确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          // 刷新列表
          this.getPageList(this.list.length ? this.page : this.page - 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
