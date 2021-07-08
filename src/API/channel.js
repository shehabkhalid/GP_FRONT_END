import axios from 'axios'

const instance = axios.create({ baseURL: 'https://endpoints.colab.cf' });

const postChannel = async (token, data) => {
    try {
        const result = await instance.post('/channels', {
            name: data.name,
            type: data.type,
            project: data.project
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        return result.data;
    } catch (e) {
        return { message: e.message }
    }
}


const updateChannel = async (token, channelId, data) => {
    try {
        const result = await instance.patch('/channels/' + channelId, {
            name: data.name
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        return result.data;
    } catch (e) {
        return { message: e.message }
    }
}


const getChannels = async (token, data) => {
    try {
        const result = await instance.get('/channels', {
            params: {
                projectId: data.projectId
            },

            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        return result.data;
    } catch (e) {
        return { message: e.message }
    }
}


const getChannel = async (token, channelId) => {
    try {
        const result = await instance.get('/channels/' + channelId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        return result.data;
    } catch (e) {
        return { message: e.message }
    }
}


const deleteChannel = async (token, channelId) => {
    try {
        const result = await instance.delete('/channels/' + channelId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        return result.data;
    } catch (e) {
        return { message: e.message }
    }
}


export default {
    postChannel,
    updateChannel,
    getChannels,
    getChannel,
    deleteChannel
}