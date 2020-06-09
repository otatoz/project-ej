<template>
  <div class="order" style="margin:1em">
    <!-- 切换 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="所有订单" name="first">
        <!-- 表格 -->
        <el-table
          :data="orders.list"
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="订单编号"
            width="180"
          />
          <el-table-column
            prop="orderTime"
            label="下单时间"
            width="180"
          />
          <el-table-column
            prop="total"
            label="总价"
          />
          <el-table-column
            prop="status"
            label="状态"
          />
          <el-table-column
            prop="customerId"
            label="顾客ID"
          />
          <!-- <el-table-column label="操作">
                <template v-slot="slot">
                <el-button @click.prevent="deleteHandler(slot.row)" type="text" size="small">删除</el-button>
                <el-button @click.prevent="detailHandler(slot.row.id)" type="text" size="small">查看详情</el-button>
                <el-button @click.prevent="editHandler(slot.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="orders.total"
          :page-size="orders.pageSize"
          :current-page="orders.page + 1"
          @current-change="pageChage"
        />
      </el-tab-pane>

      <el-tab-pane label="待支付" name="second">
        {{ orderUnPay }}
      </el-tab-pane>
      <el-tab-pane label="待派单" name="third">
        {{ orderUnSend }}
      </el-tab-pane>
      <el-tab-pane label="待接单" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="待服务" name="fiveth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="已完成" name="sixth">定时任务补偿</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      params: {
        page: 0,
        pageSize: 10
      },
      activeName: 'first'
    }
  },
  computed: {
    ...mapState('order', ['orders']),
    ...mapGetters('order', ['orderUnPay', 'orderUnSend'])
  },
  created() {
    this.findAllOrder(this.params)
    this.findAll()
  },
  methods: {
    ...mapActions('order', ['findAllOrder', 'findAll']),
    pageChage(page) {
      this.params.page = page - 1
    }
  },
  watch: {
    params: {
      handler: function() {
        this.findAllOrder(this.params)
      },
      deep: true
    }
  }
}
</script>
