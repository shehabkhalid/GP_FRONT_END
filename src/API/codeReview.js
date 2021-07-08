import axios from "axios";

const instance = axios.create({ baseURL: "https://endpoints.colab.cf" });

const postCodeReview = async (token, data) => {
  try {
    const result = await instance.post(
      "/codeReview",
      {
        file: data.file,
        content: data.content,
        creator: data.creator,
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

const updateCodeReview = async (token, codeReviewId, data) => {
  try {
    const result = await instance.patch(
      "/codeReview/" + codeReviewId,
      {
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

const getCodeReviews = async (token, data) => {
  try {
    const result = await instance.get("/codeReview", {
      params: {
        fileId: data.fileId,
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

const getCodeReviewById = async (token, codeReviewId) => {
  try {
    const result = await instance.get("/codeReview/" + codeReviewId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const deleteCodeReview = async (token, codeReviewId) => {
  try {
    const result = await instance.delete("/codeReview/" + codeReviewId, {
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
  postCodeReview,
  updateCodeReview,
  getCodeReviews,
  getCodeReviewById,
  deleteCodeReview,
};
