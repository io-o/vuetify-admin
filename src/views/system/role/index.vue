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
                <v-btn color="primary" dark class="mb-2" v-on="on">新增权限</v-btn>
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
                    ref="roleForm"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-row>
                      <v-col cols="12" sm="6" md="4" lg="4">
                        <v-text-field
                          v-model="editedItem.roleName"
                          label="角色名称*"
                          required
                          :rules="[v => !!v || '请输入']"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4">
                        <v-text-field
                          v-model="editedItem.roleDescription"
                          label="角色描述"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4">
                        <v-switch v-model="editedItem.status" color="primary" :label="`${editedItem.status ? '启用' :'禁用' }`" />
                      </v-col>
                    </v-row>
                    <v-card width="100%">
                      <v-toolbar flat color="primary" dark>
                        <v-toolbar-title>操作权限</v-toolbar-title>
                      </v-toolbar>
                      <v-container>
                        <v-row align="center">
                          <v-col cols="12" sm="12">
                            <v-treeview
                              v-model="editedItem.operatePermission"
                              selectable
                              selected-color="primary"
                              :items="treeData"
                              @input="handleInput"
                            />
                          </v-col>
                        </v-row>

                      </v-container>
                    </v-card>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <!-- status -->
      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status" color="primary" label text-color="white">
          启用
        </v-chip>
        <v-chip v-else color="error" label text-color="white">
          禁用
        </v-chip>
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
import { selectRoleTable, addRole, editRole, editRoleMessage, selectRolePermissionTree } from '@/api/system/role'
export default {
  mixins: [mixin],
  data: () => ({
    dialog: false,
    valid: true,
    editedIndex: -1,
    length: 0,
    headers: [
      { text: '角色名称', value: 'roleName', sortable: false, align: 'left' },
      { text: '角色描述', value: 'roleDescription', sortable: false },
      { text: '状态', value: 'status', sortable: false },
      { text: '操作', value: 'action', sortable: false }
    ],
    editedItem: {
      roleId: null,
      roleDescription: '',
      roleName: '',
      operatePermission: [],
      status: true

    },
    defaultItem: {
      roleId: null,
      roleDescription: '',
      roleName: '',
      operatePermission: [],
      status: true
    },
    treeData: [],
    treeOpen: []

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
    this.api = selectRoleTable
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
        this.treeData = (await selectRolePermissionTree({ roleId: 2 })).data.treeData
      } catch (err) {
        console.log(err)
      }
    },

    edit(item) {
      // title判断新增还是编辑
      this.editedIndex = this.tableData.indexOf(item)
      editRoleMessage({ roleId: item.roleId })
        .then(res => {
          this.editedItem = Object.assign({}, res.data)
          this.dialog = true
        })
    },

    close() {
      // 关闭
      this.dialog = false
      this.formReset('roleForm')
    },

    save() {
      // 保存
      if (this.$refs.roleForm.validate()) {
        if (this.editedItem.roleId === null) {
          // 新增
          addRole(this.editedItem)
            .then(res => {
              this.$message.success(res.msg)
              this.close()
              this.initialize()
            })
        } else {
          editRole(this.editedItem)
            .then(res => {
              this.$message.success(res.msg)
              this.close()
              this.initialize()
            })
        }
      }
    },

    handleInput(arr) {
      // tree选中 赋值
      this.editedItem.operatePermission = arr
    }
  }
}
</script>
