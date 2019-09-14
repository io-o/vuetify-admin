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
                <v-btn v-permission="btnRole" color="primary" dark class="mb-2" v-on="on">新增用户</v-btn>
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
                        <v-text-field
                          v-model="editedItem.loginName"
                          label="账号*"
                          required
                          :rules="[v => !!v || '请输入']"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-text-field
                          v-model="editedItem.userName"
                          label="昵称*"
                          required
                          :rules="[v => !!v || '请输入']"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-autocomplete
                          v-model="editedItem.center"
                          :items="centerList"
                          item-text="centerName"
                          item-value="id"
                          clearable
                          :rules="[v => v !== null || '请选择']"
                          label="所属中心*"
                          required
                          no-data-text="无数据"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-autocomplete
                          v-model="editedItem.roleId"
                          :items="roleList"
                          item-text="roleName"
                          item-value="roleId"
                          clearable
                          :rules="[v => v !== null || '请选择']"
                          label="角色*"
                          required
                          no-data-text="无数据"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-text-field v-model="editedItem.telephone" label="电话" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-text-field v-model="editedItem.email" label="邮箱" />
                      </v-col>

                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-text-field v-model="editedItem.remark" label="备注" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                        <v-switch v-model="editedItem.status" color="primary" :label="`${editedItem.status ? '启用' :'禁用' }`" />
                      </v-col>
                    </v-row>
                    <v-card width="100%">
                      <v-toolbar flat color="primary" dark>
                        <v-toolbar-title>数据权限</v-toolbar-title>
                      </v-toolbar>
                      <v-container
                        v-for="(item, index) in editedItem.dataPermission"
                        :key="index"
                      >
                        <v-row align="center">
                          <v-col>
                            <v-autocomplete
                              v-model="item.projectId"
                              :items="projectList"
                              item-text="projectName"
                              item-value="projectId"
                              clearable
                              :rules="[v => v !== null || '请选择']"
                              label="项目"
                              required
                              no-data-text="无数据"
                            />
                          </v-col>
                          <v-col>
                            <v-autocomplete
                              v-model="item.centerId"
                              :items="centerList"
                              item-text="centerName"
                              item-value="id"
                              clearable
                              :rules="[v => v !== null || '请选择']"
                              label="中心"
                              required
                              multiple
                              no-data-text="无数据"
                            />
                          </v-col>
                          <v-col>
                            <v-btn
                              v-show="index!== 0"
                              depressed
                              @click="deleDataPermission(index)"
                            >
                              删除
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-card-actions>
                        <v-btn
                          text
                          style="margin: 0 auto;"
                          @click="addDataPermission"
                        >
                          新增一条
                        </v-btn>
                      </v-card-actions>
                    </v-card>
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
        <!-- <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon> -->
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
import { selectUserTable, addUser, editUser, editUserMessage, selectAllCenterList } from '@/api/system/user'
import { selectRoleList, selectAllProject } from '@/api/select'
export default {
  mixins: [mixin],
  data: () => ({
    dialog: false,
    valid: true,
    editedIndex: -1,
    length: 0,
    headers: [
      { text: '账号', align: 'left', sortable: false, value: 'loginName' },
      { text: '昵称', sortable: false, value: 'userName' },
      { text: '所属中心', value: 'center', sortable: false },
      { text: '电话', value: 'telephone', sortable: false },
      { text: '邮箱', value: 'email', sortable: false },
      { text: '角色', value: 'role', sortable: false },
      { text: '状态', value: 'status', sortable: false },
      { text: '备注', value: 'remark', sortable: false },
      { text: '操作', value: 'action', sortable: false }
    ],
    editedItem: {
      userId: null,
      userName: '',
      loginName: '',
      center: null,
      status: true,
      telephone: '',
      email: '',
      roleId: null,
      remark: '',
      dataPermission: [
        {
          projectId: null,
          centerId: []
        }
      ]
    },
    defaultItem: {
      userId: null,
      userName: '',
      loginName: '',
      center: null,
      status: true,
      telephone: '',
      email: '',
      roleId: null,
      remark: '',
      dataPermission: [
        {
          projectId: null,
          centerId: []
        }
      ]
    },
    centerList: [],
    projectList: [],
    roleList: []

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
    this.api = selectUserTable
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
        this.roleList = (await selectRoleList()).data
        this.projectList = (await selectAllProject()).data
        this.centerList = (await selectAllCenterList()).data
      } catch (err) {
        console.log(err)
      }
    },

    edit(item) {
      // title判断新增还是编辑
      this.editedIndex = this.tableData.indexOf(item)
      editUserMessage({ userId: item.id })
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
        if (this.editedItem.userId === null) {
          // 新增
          addUser(this.editedItem)
            .then(res => {
              this.$message.success(res.msg)
              this.close()
              this.initialize()
            })
        } else {
          editUser(this.editedItem)
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
