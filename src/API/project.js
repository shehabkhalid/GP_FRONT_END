import axios from "axios";

const instance = axios.create({ baseURL: "https://endpoints.colab.cf" });

const postProject = async (token, data) => {
  try {
    const result = await instance.post(
      "/projects",
      {
        name: data.name,
        language: data.language,
        members: data.members,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const updateProject = async (token, projectId, data) => {
  try {
    let body = {};

    if (data.name) {
      body.name = data.name;
    }

    if (data.visibility) {
      body.visibility = data.visibility;
    }

    const result = await instance.patch("/projects/" + projectId, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const addMember = async (token, projectId, data) => {
  try {
    const result = await instance.patch(
      "/projects/add/" + projectId,
      {
        memberId: data.memberId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const removeMember = async (token, projectId, data) => {
  try {
    const result = await instance.patch(
      "/projects/remove/" + projectId,
      {
        memberId: data.memberId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const deleteProject = async (token, projectId) => {
  try {
    const result = await instance.delete("/projects/" + projectId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const getProject = async (token, projectId) => {
  try {
    const result = await instance.get("/projects/" + projectId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const getAllFilesNames = async (token, projectId) => {
  try {
    const result = await instance.get("/projects/filesnames/" + projectId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const getProjects = async (token, memberId) => {
  try {
    const result = await instance.get("/projects", {
      params: {
        memberId: memberId,
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

export default {
  postProject,
  updateProject,
  addMember,
  removeMember,
  deleteProject,
  getAllFilesNames,
  getProject,
  getProjects,
};
