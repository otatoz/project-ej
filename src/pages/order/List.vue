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
          >
            <template v-slot="slot">
              <div>{{ slot.row.orderTime | dateFormat }}</div>
            </template>
          </el-table-column>
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
        {{ ordersStatusFilter('待支付') }}
      </el-tab-pane>

      <el-tab-pane label="待派单" name="third">
        <el-table
          :data="ordersStatusFilter('待派单')"
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
          >
            <template v-slot="slot">
              <div>{{ slot.row.orderTime | dateFormat }}</div>
            </template>
          </el-table-column>
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
          <el-table-column label="操作">
            <template v-slot="slot">
              <el-button type="text" size="small" @click.prevent="sendOrderHandler(slot.row)">派单</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 派单模态框 -->
        <el-dialog title="派单" :visible.sync="sendOrder_visible">
          <el-form :model="sendOrder_form">
            <el-form-item label="员工姓名" :label-width="formLabelWidth">
              <el-select v-model="sendOrder_form.waiterId" placeholder="请选择员工">
                <el-option v-for="item in waiters" :key="item.id" :label="item.realname" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="sendOrder_visible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrderHandler">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>

      <el-tab-pane label="待接单" name="fourth">
        {{ ordersStatusFilter('待接单') }}
      </el-tab-pane>
      <el-tab-pane label="待服务" name="fiveth">
        {{ ordersStatusFilter('待服务') }}
      </el-tab-pane>
      <el-tab-pane label="已完成" name="sixth">
        {{ ordersStatusFilter('已完成') }}
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      sendOrder_visible: false,
      formLabelWidth: '120px',
      sendOrder_form: {},
      params: {
        page: 0,
        pageSize: 10
      },
      activeName: 'first'
    }
  },
  computed: {
    ...mapState('order', ['orders']),
    ...mapState('waiter', ['waiters']),
    ...mapGetters('order', ['ordersStatusFilter'])
  },
  created() {
    // 分页查询订单
    this.findAllOrder(this.params)
    // 查询所有订单
    this.findAll()
    // 查询所有员工
    this.findAllWaiter()
  },
  methods: {
    ...mapActions('order', ['findAllOrder', 'findAll','sendOrder']),
    ...mapActions('waiter', ['findAllWaiter']),
    // 派送订单
    saveOrderHandler() {
      this.sendOrder(this.sendOrder_form).then((res)=>{
        this.findAll()
        this.sendOrder_visible = false;
      })
    },
    // 派单-打开模态框
    sendOrderHandler(row) {
      this.sendOrder_form.orderId = row.id
      this.sendOrder_visible = true
    },
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
