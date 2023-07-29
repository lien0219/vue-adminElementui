<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border>
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column prop="prop" label="名称" width="width"></el-table-column>
      <el-table-column prop="prop" label="描述" width="width"></el-table-column>
      <el-table-column label="默认图片" width="110"> </el-table-column>
      <el-table-column prop="prop" label="重量" width="80"></el-table-column>
      <el-table-column prop="prop" label="价格" width="80"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {};
  },
  //组件挂载完毕
  mounted() {},
  methods: {},
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}

>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>
