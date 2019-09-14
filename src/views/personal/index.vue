<template>
  <v-card outlined>
    <!-- <v-toolbar flat color="primary" dark>
      <v-toolbar-title>User Profile</v-toolbar-title>
    </v-toolbar> -->
    <v-tabs vertical>
      <v-tab>
        个人设置
      </v-tab>
      <v-tab>
        修改密码
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-form
                ref="personalForm"
                v-model="valid"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                    <v-text-field
                      v-model="editedItem.userName"
                      label="用户名称*"
                      required
                      :rules="[v => !!v || '请输入']"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                    <v-text-field
                      v-model="editedItem.email"
                      label="用户邮箱"
                    />
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                    <v-text-field v-model="editedItem.telephone" label="手机号" />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-btn color="primary" @click="save">修改</v-btn>
                  </v-col>
                </v-row>

              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-form
                ref="passwordForm"
                v-model="valid"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                    <v-text-field
                      v-model="passwordItem.oldPassword"
                      label="原密码*"
                      required
                      :rules="[v => !!v || '请输入']"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                    <v-text-field
                      v-model="passwordItem.newPassword"
                      label="新密码*"
                      required
                      type="password"
                      :rules="[v => !!v || '请输入']"
                    />
                  </v-col>

                  <v-col cols="12" sm="6" md="4" lg="4" xl="3">
                    <v-text-field
                      v-model="tPassword"
                      label="确认密码"
                      required
                      type="password"
                      :rules="[v => (v && v === passwordItem.newPassword) || '两次密码不一致']"
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-btn color="primary" @click="editPassword">修改</v-btn>
                  </v-col>
                </v-row>

              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </v-card>
</template>

<script type="text/javascript">
import { selectUserDetails, editUserDetails, updateUserPassword } from '@/api/user'
export default {
  data() {
    return {
      tab: null,
      valid: true,
      editedItem: {
        loginName: sessionStorage.getItem('name'),
        userName: '',
        email: '',
        telephone: ''
      },
      passwordItem: {
        loginName: sessionStorage.getItem('name'),
        oldPassword: '',
        newPassword: ''
      },
      tPassword: ''
    }
  },

  created() {
    this.initData()
  },

  methods: {
    async initData() {
      const res = await selectUserDetails({ loginName: sessionStorage.getItem('name') })
      this.editedItem = Object.assign({}, res.data)
    },

    save() {
      if (this.$refs.personalForm.validate()) {
        editUserDetails(this.editedItem)
          .then(res => {
            this.$message.success(res.msg)
          })
      }
    },

    editPassword() {
      if (this.$refs.passwordForm.validate()) {
        updateUserPassword(this.passwordItem)
          .then(res => {
            this.$message.success(res.msg)
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-application--is-ltr .v-tabs-bar.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows)>.v-slide-group__wrapper>.v-tabs-bar__content>.v-tab:first-child, .v-application--is-ltr .v-tabs-bar.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows)>.v-slide-group__wrapper>.v-tabs-bar__content>.v-tabs-slider-wrapper+.v-tab
  margin-left 0
</style>
