<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>新增项目</v-toolbar-title>
      <div class="flex-grow-1" />
      <v-toolbar-items>
        <v-btn dark text @click="close">取消</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn dark text @click="save">保存</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-form
          ref="projectForm"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4" xl="3">
              <v-text-field
                v-model="editedItem.projectName"
                label="项目名称*"
                required
                :rules="[v => !!v || '请输入']"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4" xl="3">
              <v-text-field
                v-model="editedItem.projectNumber"
                label="项目编号*"
                required
                :rules="[v => !!v || '请输入']"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4" xl="3">
              <v-autocomplete
                v-model="editedItem.typeIds"
                :items="typeData"
                item-text="name"
                item-value="id"
                clearable
                :rules="[v => v !== null || '请选择']"
                label="检测类型*"
                required
                multiple
                no-data-text="无数据"
              />
            </v-col>

          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>

</template>

<script type="text/javascript">
import { addProject, selectTypeList } from '@/api/system/project'
export default {
  data() {
    return {
      valid: true,
      typeData: [],
      editedItem: {
        typeIds: null,
        projectName: '',
        projectNumber: ''
      },
      defaultItem: {
        typeIds: null,
        projectName: '',
        projectNumber: ''
      }
    }
  },

  created() {
    selectTypeList()
      .then(res => {
        this.typeData = res.data
      })
  },

  methods: {
    save() {
      if (this.$refs.projectForm.validate()) {
        addProject(this.editedItem)
          .then(res => {
            this.$message.success(res.msg)
            this.$emit('dialogClose', false)
          })
      }
    },
    close() {
      // 监听关闭弹出框
      this.$emit('dialogClose', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
