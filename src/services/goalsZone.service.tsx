import axios from "axios";

export const goalsZoneService = axios.create({
    baseURL: "https://goals.zone/api"
});

export const getMatchesPage = async (offsetParam: number = 0, options: {} = {}) => {
    const response = await goalsZoneService.get(`/matches?limit=50&offset=${offsetParam}&format=json`, options);
    return response.data;
};