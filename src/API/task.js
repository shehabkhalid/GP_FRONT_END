import axios from "axios";

const instance = axios.create({ baseURL: "https://endpoints.colab.cf" });

const postTask = async (token, data) => {
  try {
    const result = await instance.post(
      "/tasks",
      {
        name: data.name,
        description: data.description,
        deadline: data.deadline,
        members: data.members,
        project: data.project,
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

const updateTask = async (token, taskId, data) => {
  try {
    let body = {};
    if (data.name) {
      body.name = data.name;
    }

    if (data.description) {
      body.description = data.description;
    }

    if (data.deadline) {
      body.deadline = data.deadline;
    }

    if (data.status) {
      body.status = data.status;
    }

    const result = await instance.patch("/tasks/" + taskId, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const addMemberToTask = async (token, taskId, data) => {
  try {
    const result = await instance.patch(
      "/tasks/add/" + taskId,
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

const removeMemberFromTask = async (token, taskId, data) => {
  try {
    const result = await instance.patch(
      "/tasks/remove/" + taskId,
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

const addComment = async (token, taskId, data) => {
  try {
    const result = await instance.patch(
      "/tasks/comment/add/" + taskId,
      {
        creatorId: data.creatorId,
        content: data.content,
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

const getTasks = async (token, projectId) => {
  try {
    const result = await instance.get("/tasks", {
      params: {
        projectId: projectId,
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

const getTaskById = async (token, taskId) => {
  try {
    const result = await instance.get("/tasks/" + taskId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const deleteTask = async (token, taskId) => {
  try {
    const result = await instance.delete("/tasks/" + taskId, {
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
  postTask,
  updateTask,
  addMemberToTask,
  removeMemberFromTask,
  addComment,
  getTasks,
  getTaskById,
  deleteTask,
};
