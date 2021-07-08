import axios from "axios";

const instance = axios.create({ baseURL: "https://endpoints.colab.cf" });

const postTextMessage = async (token, data) => {
  try {
    const result = await instance.post(
      "/messages",
      {
        channel: data.channel,
        content: data.content,
        sender: data.sender,
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

const postImageMessage = async (token, data, image) => {
  try {
    const result = await instance.post(
      "/messages",
      {
        channel: data.channel,
        sender: data.sender,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    let fdata = new FormData();
    fdata.append("photo", image);

    const result2 = await instance.patch(
      "/messages/picture/" + result.data._id,
      fdata,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return result2.data;
  } catch (e) {
    return { message: e.message };
  }
};

const updateTextMessage = async (token, messageId, data) => {
  try {
    const result = await instance.patch(
      "/messages/" + messageId,
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

const getMessages = async (token, data) => {
  try {
    const result = await instance.get("/messages", {
      params: {
        channelId: data.channelId,
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

const getMessage = async (token, messageId) => {
  try {
    const result = await instance.get("/messages/" + messageId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  } catch (e) {
    return { message: e.message };
  }
};

const deleteMessage = async (token, messageId) => {
  try {
    const result = await instance.delete("/messages/" + messageId, {
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
  postTextMessage,
  postImageMessage,
  updateTextMessage,
  getMessages,
  getMessage,
  deleteMessage,
};
