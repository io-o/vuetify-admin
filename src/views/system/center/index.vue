<template>
  <div>
    <!-- table -->
    <v-data-table
      :headers="headers"
      :items="tableData"
      hide-default-footer
      :loading="tableLoading"
      loading-text="数据请求中..."
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="form.filter"
            label="请输入查询内容"
            single-line
            hide-details
            append-icon="search"
            @keyup.enter="initialize(true)"
            @click:append="initialize(true)"
          />

          <div class="flex-grow-1" />

          <!-- 弹出框 -->
          <v-dialog v-model="dialog" fullscreen>
            <template v-slot:activator="{ on }">
              <div>
                <v-btn v-permission="btnRole" color="primary" dark class="mb-2" v-on="on">新增中心</v-btn>
              </div>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                <div class="flex-grow-1" />
                <v-toolbar-items>
                  <v-btn dark text @click="dialog = false">取消</v-btn>
                </v-toolbar-items>
                <v-toolbar-items>
                  <v-btn dark text @click="save">保存</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-form
                    ref="userForm"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-row>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-autocomplete
                          v-model="editedItem.projectId"
                          :items="projectList"
                          item-text="projectName"
                          item-value="projectId"
                          clearable
                          :rules="[v => v !== null || '请选择']"
                          label="所属项目*"
                          multiple
                          no-data-text="无数据"
                          required
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-text-field
                          v-model="editedItem.centerName"
                          label="中心名称*"
                          required
                          :rules="[v => !!v || '请输入']"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-text-field
                          v-model="editedItem.centerNumber"
                          label="中心编号*"
                          required
                          :rules="[v => !!v || '请输入']"
                        />
                      </v-col>

                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-text-field v-model="editedItem.remark" label="备注" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-switch v-model="editedItem.status" color="primary" :label="`${editedItem.status ? '启用' :'禁用' }`" />
                      </v-col>
                    </v-row>

                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <!-- action -->
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="edit(item)"
        >
          mdi-border-color
        </v-icon>
      </template>

      <!-- 无数据展示 -->
      <template v-slot:no-data>
        <span>无数据</span>
      </template>
    </v-data-table>
    <!-- 分页 -->
    <div class="table-pagination">
      <v-pagination v-model="form.pageNum" :length="length" />
    </div>
  </div>

</template>

<script>
import mixin from '@/mixins/table'
import { selectCenterTable, addCenter, editCenter, editCenterMessage } from '@/api/system/center'
import { selectAllProject } from '@/api/select'
export default {
  mixins: [mixin],
  data: () => ({
    dialog: false,
    valid: true,
    editedIndex: -1,
    length: 0,
    headers: [
      { text: '中心名称', align: 'left', sortable: false, value: 'centerName' },
      { text: '中心编号', value: 'centerNumber', sortable: false },
      { text: '受试者入组数', value: 'patientCount', sortable: false },
      { text: '所属项目', value: 'email', sortable: false },
      { text: '操作', value: 'action', sortable: false }
    ],
    editedItem: {
      centerId: null,
      centerName: '',
      centerNumber: '',
      projectId: [],
      status: true

    },
    defaultItem: {
      centerId: null,
      centerName: '',
      centerNumber: '',
      projectId: [],
      status: true
    },
    projectList: []

  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增' : '编辑'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.api = selectCenterTable
    this.initialize()
  },

  mounted() {
    // 所有下拉框数据
    this.getSelectData()
  },

  methods: {
    async getSelectData() {
      // 处理数据
      try {
        this.projectList = (await selectAllProject()).data
      } catch (err) {
        console.log(err)
      }
    },

    edit(item) {
      // title判断新增还是编辑
      this.editedIndex = this.tableData.indexOf(item)
      editCenterMessage({ centerId: item.centerId })
        .then(res => {
          this.editedItem = Object.assign({}, res.data)
          this.dialog = true
        })
    },

    deleteItem(item) {
      // 删除
      const index = this.tableData.indexOf(item)
      confirm('确定删除这条记录么?') && this.tableData.splice(index, 1)
    },

    close() {
      // 关闭
      this.dialog = false
      this.formReset('userForm')
    },

    save() {
      // 保存
      if (this.$refs.userForm.validate()) {
        if (this.editedItem.centerId === null) {
          // 新增
          addCenter(this.editedItem)
            .then(res => {
              this.$message.success(res.msg)
              this.close()
              this.initialize()
            })
        } else {
          editCenter(this.editedItem)
            .then(res => {
              this.$message.success(res.msg)
              this.close()
              this.initialize()
            })
        }
      }
    },

    addDataPermission() {
      // 新增一条
      this.editedItem.dataPermission.push({
        projectId: null,
        centerId: []
      })
    },

    deleDataPermission(i) {
      // 删除某一条
      this.editedItem.dataPermission.splice(i, 1)
    }
  }
}
</script>
