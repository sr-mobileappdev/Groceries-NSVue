<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-6">
        <div class="section">
          <h1 class="subtitle is-3">Complete Password Reset</h1>
          <p class="description">
            Enter your confirmation code which was emailed to you and a new password.
          </p>
          <p v-if="error" class="error">{{ error.message }}</p>
          <div class="box is-clearfix">
            <form @submit.prevent="passwordReset">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your email"
                    v-model="email"
                    required
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Confirmation Code</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your code"
                    v-model="code"
                    required
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Enter your password"
                    v-model="pass"
                    required
                  >
                </div>
              </div>
              <div class="field is-grouped is-pulled-left">
                <div class="control">
                  <button class="button is-link" v-if="!submitting">Confirm</button>
                  <button class="button is-link" disabled v-if="submitting">Confirming</button>
                </div>
              </div>
              <p class="is-pulled-right login-links">
                <router-link to="/login">Back to Login</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      code: '',
      pass: '',
      error: null,
      submitting: false
    }
  },
  methods: {
    passwordReset () {
      this.submitting = true
      this.$cognitoAuth.confirmPassword(this.email, this.code, this.pass, (err, result) => {
        this.submitting = false
        if (err) {
          this.error = err
          console.error(err)
        } else {
          this.$router.replace('/table')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .error {
    color: red;
    padding-bottom: 20px;
  }
  .description {
    padding-bottom: 20px;
  }
  .login-links {
    line-height: 35px;
  }
</style>
