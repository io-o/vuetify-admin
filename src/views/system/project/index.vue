<template>
  <v-container>
    <v-row>
      <!--项目 -->
      <v-col cols="12" md="12" lg="4">
        <v-card
          tile
          outlined
          height="300"
        >
          <v-toolbar
            color="primary"
            dark
          >
            <!-- <v-app-bar-nav-icon /> -->

            <v-toolbar-title>项目</v-toolbar-title>

            <div class="flex-grow-1" />
            <v-btn text>
              <v-icon dark @click="projectOpen(1)">mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-autocomplete
              v-model="editedItem.projectId"
              filled
              :items="projectData"
              item-text="projectName"
              item-value="projectId"
              clearable
              label="选择项目"
              no-data-text="无数据"
              chips
              :rules="[v => v !== null || '请选择']"
              required
            />
          </v-card-text>
        </v-card>
      </v-col>
      <!-- 类型 -->
      <v-col cols="12" md="12" lg="4">
        <v-card
          tile
          outlined
          height="300"
        >
          <v-toolbar
            color="primary"
            dark
          >
            <v-toolbar-title>类型</v-toolbar-title>
            <div class="flex-grow-1" />
            <!-- <v-btn text>
              <v-icon dark>mdi-plus</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-card-text>
            <v-autocomplete
              v-model="editedItem.typeId"
              filled
              :items="typeData"
              item-text="name"
              item-value="id"
              clearable
              :rules="[v => v !== null || '请选择']"
              label="选择类型"
              required
              chips
              no-data-text="无数据"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <!-- 表单 -->
      <v-col cols="12" md="12" lg="4">
        <v-card
          tile
          outlined
          height="300"
        >
          <v-toolbar
            color="primary"
            dark
          >
            <v-toolbar-title>表单</v-toolbar-title>
            <div class="flex-grow-1" />
            <v-btn text @click="projectOpen(2)">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <!-- <v-subheader class="project-subheader">表单</v-subheader> -->
          <v-card-text>
            <v-autocomplete
              v-model="editedItem.formIds"
              filled
              :items="formData"
              item-text="formName"
              item-value="formId"
              clearable
              :rules="[v => v !== null || '请选择']"
              label="选择表单"
              required
              chips
              multiple
              no-data-text="无数据"
            />
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1" />
            <v-btn
              text
              color="primary"
              x-large
              @click="handleSave"
            >
              提交
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- 弹出框 -->
    <v-dialog v-model="dialog" fullscreen>
      <component :is="formCom" @dialogClose="dialogClose" />
    </v-dialog>

  </v-container>
</template>
<script>
import { selectAllProject, selectFormList } from '@/api/select'
import { selectTypeByProject, selectProjectTypeForms, addProjectTypeForm } from '@/api/system/project'
import ProjectCom from './project'
export default {
  components: {
    ProjectCom
  },

  data: () => ({
    item: 0,
    dialog: false,
    formCom: null,
    projectData: [],
    typeData: [],
    formData: [],
    editedItem: {
      projectId: null,
      typeId: null,
      formIds: []
    }
  }),

  watch: {
    'editedItem.projectId': function(newV) {
      // 选择项目后查询类型
      if (newV) {
        selectTypeByProject({ projectId: newV })
          .then(res => {
            this.typeData = res.data
          })
      }
    },
    'editedItem.typeId': function(newV) {
      // 选择类型后查询表单
      if (newV && this.editedItem.projectId) {
        selectProjectTypeForms({ projectId: this.editedItem.projectId, typeId: newV })
          .then(res => {
            this.editedItem.formIds = res.data
          })
      }
    }
  },

  created() {
    this.initData()
  },

  methods: {
    async initData() {
      try {
        this.projectData = (await selectAllProject()).data
        this.formData = (await selectFormList()).data
      } catch (err) {
        // 处理错误
        console.log(err)
      }
    },

    projectOpen(type) {
      switch (type) {
        case 1:
          this.formCom = ProjectCom
          this.dialog = true
          break
        case 2:
          this.$router.push({ path: '/ecrf/form' })
          break
      }
    },

    dialogClose(v) {
      // 关闭后 重新请求
      this.dialog = v
      this.initData()
    },

    handleSave() {
      if (this.editedItem.projectId === null || this.editedItem.typeId === null || this.editedItem.formIds.length === 0) {
        this.$message.error('请检查 项目/类型/表单 是否选中')
      } else {
        addProjectTypeForm(this.editedItem)
          .then(res => {
            this.$message.success(res.msg)
          })
      }
    }

  }
}
</script>

<style lang="stylus" scoped>
.project
  display flex
  justify-content left
  .project-right
    line-height 600px
</style>
