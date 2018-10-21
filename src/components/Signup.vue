<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-6">
        <div class="section">
          <h1 class="subtitle is-3">Sign Up</h1>
          <p v-if="error" class="error">{{ error.message }}</p>
          <div class="box is-clearfix">
            <form @submit.prevent="signup">
              <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your first name"
                    v-model="first_name"
                    required
                  >
                </div>
              </div> 
              <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your last name"
                    v-model="last_name"
                    required
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    placeholder="Enter your email"
                    v-model="email"
                    required
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input
                    class="input"
                    type="username"
                    placeholder="Enter a username"
                    v-model="username"
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
                  <button class="button is-link" v-if="!submitting">Sign Up</button>
                  <button class="button is-link" disabled v-if="submitting">Signing up</button>
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
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      pass: '',
      error: null,
      submitting: false
    }
  },
  methods: {
    signup () {
      this.submitting = true
      this.$cognitoAuth.signup(this.first_name, this.last_name, this.email, this.username, this.pass, (err, result) => {
        this.submitting = false
        if (err) {
          this.error = err
          console.error(err)
        } else {
          console.log('Signup successful:', result)
          this.$router.replace({path: '/confirm', query: {username: this.username}})
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
  .login-links {
    line-height: 35px;
  }
</style>
