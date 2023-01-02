<template>
  <div class="main-div">
    <div class="login-div">
      <div>
      <h1 class="text">Sign In</h1>
    </div>
      <form v-on:submit.prevent class="form-div">
        <label for="fname" class="lable-txt">User name:</label>
        <input type="text" id="fname" name="fname" v-model="username" class="input"><br><br>
        <label for="lname" class="lable">Password:</label>
        <input type="password" id="lname" name="lname" v-model="password" class="input"><br><br>
        <button v-on:click="HandleLogin" class="log-btn">Login</button>
      </form>
    </div>

    <router-view />
  </div>
</template>

<script>

export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    HandleLogin() {

      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log({ result })
          if (result.token) { 
            localStorage.setItem("token", result.token)
            this.$router.push('/userindex')
          }
        });

    },
  }
}



</script>

<style scoped>
.main-div{
background-color: aquamarine;
height: 650px;
}

.login-div{
 padding-top:100px ;
}

.text{
  font-family: 'Times New Roman', Times, serif;
  font-size: 50px;
  margin-left: 50px;
}

.form-div{
  margin-top:50px;
  text-align: center;
  justify-items: center;
  justify-content: center;
  
}
.lable-txt{
  margin-right:10px ;
  font-weight: bold;

}
.lable{
  margin-right:16px ;
  font-weight: bold;

}
.input{
  border-radius: 8px;
  border-color: aliceblue;
}
.log-btn{
  padding: 5px;
  margin: 3px;
  background-color: rgb(36, 49, 235);
  border-radius: 8px;
  border: none;
  color: white;
 
}

</style>>

