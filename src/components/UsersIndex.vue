<template>
  <div>
    <div class="flex-container">
      <div><button class="btn" v-b-modal.modal-1 @click="() => { this.show = true; }">Add User
        </button>
        <button class="btn" v-on:click="HandleLogout">Logout</button>
      </div>
    </div>
    <div>
      <table id="customers">
        <tr>
          <th>ID</th>
          <th>FirstName</th>
          <th>Age</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
        <tr v-for="(item, index) in allUsers" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td><button v-b-modal.modal-1 id="btn-edit" @click="handleUpdate(item)">Edit</button>
            <button id="btn-delete" @click="handleDelete(item.id)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
    <div>

      <b-modal id="modal-1" title="User" hide-footer v-if="this.show">
        <div>
          <b-form @submit="onSubmit">
            <b-form-group id="input-group-1" label="Fisrt Name:" label-for="input-1">
              <b-form-input id="input-1" v-model="form.firstName" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
              <b-form-input id="input-2" v-model="form.email" type="email" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Age:" label-for="input-3">
              <b-form-input id="input-3" v-model="form.age" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Phone:" label-for="input-4">
              <b-form-input id="input-4" v-model="form.phone" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Save</b-button>
          </b-form>

        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import { mapActions, mapGetters } from "vuex"
export default {
  name: "UsersIndex",
  data() {
    return {
      form: {
        email: '',
        firstName: '',
        age: '',
        phone: '',
        id: null
      },
      show: true
    }
  },

  methods: {
    HandleLogout() {
      localStorage.removeItem("token");
      this.$router.push('/')
    },

    ...mapActions(["getUsers"]),

    handleUpdate(user) {
      this.show = true;
      this.form.firstName = user.firstName;
      this.form.email = user.email;
      this.form.age = user.age;
      this.form.phone = user.phone;
      this.form.id = user.id;
    },

    // new user Add part
    ...mapActions(["addUser"]),
    // update user
    ...mapActions(["updateUser"]),

    onSubmit(event) {
      event.preventDefault()
      if (this.form.id) {
        this.updateUser(this.form)
        this.show = false
        this.resetForm();
      } else {
        this.addUser(this.form);
        this.show = false
      }
    },

    resetForm() {
      this.form.email = ''
      this.form.firstName = ''
      this.form.phone = ''
      this.form.age = ''
      this.form.id = null
    },

    ...mapActions(["userDelete"]),

    handleDelete(id) {
      this.userDelete(id)
    },
  },

  created() {
    this.getUsers()
  },

  computed: mapGetters(['allUsers']),
}
</script>

<style scoped>
.container {
  display: flex;
  background-color: rgb(234, 238, 242);
  justify-content: end;
}

.flex-container {
  display: flex;
  background-color: rgb(234, 238, 242);
  justify-content: end;
}

.btn {
  padding: 10px;
  margin: 5px;
  background-color: rgb(46, 107, 205);
  border-radius: 8px;
  border: none;
  color: white;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #048caa;
  color: white;
}

#btn-delete {
  padding: 5px;
  margin: 3px;
  background-color: rgb(207, 51, 51);
  border-radius: 8px;
  border: none;
  color: white;
}

#btn-edit {
  padding: 5px;
  margin: 3px;
  background-color: rgb(42, 69, 202);
  border-radius: 8px;
  border: none;
  color: white;
}
</style>

