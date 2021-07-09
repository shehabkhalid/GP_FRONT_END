import axios from "axios";

const instance = axios.create({ baseURL: "https://endpoints.colab.cf" });

const registerUser = async (data) => {
  try {
    const result = await instance.post("/users", {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const loginUser = async (data) => {
  try {
    console.log(data.email, data.password);
    const result = await instance.post("/users/login", {
      email: data.email,
      password: data.password,
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const uploadProfilePicture = async (token, image) => {
  try {
    let data = new FormData();
    data.append("profilePicture", image);
    //data.append('profilePicture', image, image.name)

    const result = await instance.post("/users/profile", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const updateUser = async (token, data) => {
  try {
    let body = {};

    if (data.username) {
      body.username = data.username;
    }

    if (data.email) {
      body.email = data.email;
    }

    if (data.password) {
      body.password = data.password;
    }

    const result = await instance.patch("/users", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const getUser = async (userId) => {
  try {
    const result = await instance.get("/users/" + userId);
    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const getAllUsers = async () => {
  try {
    const result = await instance.get("/users");
    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const searchUsers = async (token, name) => {
  try {
    const result = await instance.get("/users/search", {
      params: {
        name: name,
      },

      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const deleteUser = async (token) => {
  try {
    const result = await instance.delete("/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

export default {
  registerUser,
  loginUser,
  updateUser,
  uploadProfilePicture,
  getUser,
  getAllUsers,
  searchUsers,
  deleteUser,
};
