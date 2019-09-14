<template>
  <v-container>
    <div>
      <v-autocomplete
        v-model="projectId"
        :items="projectList"
        item-text="projectName"
        item-value="id"
        clearable
        label="选择项目"
        no-data-text="无数据"
        @change="handleChange"
      />
    </div>
    <v-row>
      <v-col
        v-if="centerList.length == 0"
        cols="12"
        sm="12"
        style="text-align:center;"
      >
        <v-btn text disabled large>无数据</v-btn>
      </v-col>
      <v-col
        v-for="item in centerList"
        v-else
        :key="item.centerId"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>{{ item.centerName }}</v-toolbar-title>
            <div class="flex-grow-1" />
            <v-btn text color="primary" @click="handleClick(item)">
              进入
            </v-btn>
          </v-toolbar>
          <v-divider />
          <v-list class="transparent">
            <v-list-item>
              <v-list-item-title>中心编号</v-list-item-title>
              <v-list-item-subtitle class="text-right">
                {{ item.centerNumber }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>受试者数</v-list-item-title>
              <v-list-item-subtitle class="text-right">
                {{ item.num }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

    </v-row>
  </v-container>

</template>
<script type="text/javascript">
import { selectProjectList, selectCenterList } from '@/api/dashbroad'

export default {
  data: () => ({
    centerList: [],
    projectList: [],
    projectId: null

  }),

  created() {
    this.initialize()
    this.handleChange()
  },

  methods: {
    async initialize() {
      try {
        this.projectList = (await selectProjectList()).data
      } catch (err) {
        console.log(err)
      }
    },

    handleChange() {
      // 项目Id查询中心
      selectCenterList({ projectId: this.projectId })
        .then(res => {
          this.centerList = res.data
        })
    },

    handleClick(item) {
      // 跳转 受试者
      this.$router.push({ path: `/subject/index?id=${item.id}` })
    }
  }
}
</script>
