import axios from "axios";

const state = {
  users: [],
};

const getters = {
  allUsers: (state) => {
    return state.users;
  },
};
const actions = {
  async getUsers({ commit }) {
    const response = await axios.get("https://dummyjson.com/users");
    console.log({ response });
    commit("setUsers", response.data.users);
  },
  // user delete start
  userDelete({ commit }, deleteId) {
    let arr = state.users.filter((x) => x.id !== deleteId);
    console.log(deleteId, " action DeleteId", arr);
    commit("setDelete", arr);
  },
  // user delete End
  // user update start
  updateUser({ commit }, editedUser) {
    const UpdatedUserData = [];
    state.users.forEach((item) => {
      if (item.id == editedUser.id) item = { ...item, ...editedUser };
      UpdatedUserData.push(item);
    });

    commit("setUpdate", UpdatedUserData);
  },
  // user update end

   addUser({ commit }, newUser) {
    const newUserData = [newUser, ...state.users]
     commit("setNewUser", newUserData);
  },
};

const mutations = {
  setUsers: (state, users) => (state.users = users), //fisplay user
  setNewUser: (state, newUserData) => (state.users = newUserData), //Add user
  setDelete: (state, arr) => (state.users = arr),
  setUpdate: (state, UpdatedUserData) => (state.users = UpdatedUserData),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
