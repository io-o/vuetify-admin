<template>
  <div class="split-bg">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <!-- <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120" > -->
                  <h1 class="flex my-4 primary--text">
                    OJBK
                  </h1>
                </div>
                <v-form ref="loginForm">
                  <v-text-field
                    v-model="model.username"
                    append-icon="person"
                    name="login"
                    label="账号"
                    type="text"
                  />
                  <v-text-field
                    id="password"
                    v-model="model.password"
                    :append-icon="show ? 'visibility' : 'lock'"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    label="密码"
                    hint="密码不少于8位"
                    counter
                    @click:append="show = !show"
                  />
                </v-form>
              </v-card-text>
              <div class="login-btn">
                <v-spacer />
                <v-btn block color="primary" :loading="loading" @click="login">登录</v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>

export default {
  data: () => ({
    loading: false,
    show: false,
    model: {
      username: '',
      password: ''
    },
    rules: {
      required: value => !!value || '请输入',
      min: v => v.length >= 8 || '密码不少于8位'
    }
  }),

  methods: {
    login() {
      this.loading = true
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch('user/login', this.model)
          .then(res => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          })
          .catch(_ => {
            this.loading = false
          })
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="stylus">
.split-bg
  width 100%
  height 50%
  position absolute
  top 0
  bottom 0
  margin auto
</style>
