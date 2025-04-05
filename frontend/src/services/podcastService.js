const getPodcastDetails = async (podcastId) => {
    try {
        const response = await api.get(`/podcast/detail/${podcastId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
}

const getAllPodcasts = async () => {
    try {
        const response = await api.get('/podcasts');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Lỗi không xác định' };
    }
}

export const podcastService = {
    getPodcastDetails,
    getAllPodcasts,
};