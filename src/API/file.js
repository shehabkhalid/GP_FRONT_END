import axios from "axios";

const instance = axios.create({ baseURL: "https://endpoints.colab.cf" });

const postFile = async (token, data) => {
  try {
    const result = await instance.post(
      "/files",
      {
        name: data.name,
        extension: data.extension,
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

const updateFileData = async (token, fileId, data) => {
  try {
    const result = await instance.patch(
      "/files/" + fileId,
      {
        fileContent: data.fileContent,
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

const updateFileName = async (token, fileId, data) => {
  try {
    const result = await instance.patch(
      "/files/name/" + fileId,
      {
        name: data.name,
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

const getFileData = async (token, fileId) => {
  try {
    const result = await instance.get("/files/" + fileId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const deleteFile = async (token, fileId) => {
  try {
    const result = await instance.delete("/files/" + fileId, {
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
  postFile,
  updateFileData,
  updateFileName,
  getFileData,
  deleteFile,
};
