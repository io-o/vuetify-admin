
/**
 * 封装table常用方法
 *
 */

const table = {
  data() {
    return {
      tableLoading: false,
      form: {
        filter: '',
        pageNum: 1,
        pageSize: 10
      },
      pageCount: null, // 总页数
      tableData: [],
      api: '' // table请求接口
    }
  },

  watch: {
    'form.pageNum': function() {
      // 监听翻页请求
      this.initialize()
    }
  },

  computed: {
    btnRole() {
      // 返回操作权限
      return this.$route.meta
    }
  },

  methods: {
    initialize(isSearch) {
      this.tableLoading = true
      // 搜索 需要页码还原 1
      this.form.pageNum = isSearch ? 1 : this.form.pageNum

      this.api(this.form)
        .then(res => {
          this.tableLoading = false
          this.tableData = res.data.list
          this.length = res.data.pages
        })
        .catch(_ => {
          this.tableLoading = false
        })
    },

    formReset(form) {
      // 表单重置
      this.$refs[form].resetValidation()
      const cloneItem = this._.cloneDeep(this.defaultItem)
      this.editedItem = cloneItem
    }
  }
}

export default table
