import api from "../libs/axios";

const getPodcastDetails = async (podcastId) => {
    try {
        const response = await api.get(`/podcast/detail/${podcastId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
}

const getAllPodcasts = async ({
    sortBy ="created_at",
    sortOrder="asc",
    limit=4,
    page=1,
}) => {
    try {
        const response = await api.get(`/podcast/list?sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}&page=${page}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
}

const getPodcastRecent = async ({
    limit = 4,
    page = 1,
}) => {
    try {
        const response = await api.get('/podcast/recent', {
            params: { limit, page }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
}

const updatePodcast = async (podcastId, data) => {
    try {
        const response = await api.put(`/podcast/update/${podcastId}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
}

const getListPodcastV2 = async ({})=>{
    try {
        const response = await api.get('/podcast/listAny');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
}

export {
    getPodcastDetails,
    getAllPodcasts,
    getPodcastRecent,
    updatePodcast,
    getListPodcastV2
}