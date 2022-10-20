import axios from "axios";

export const goalsZoneService = axios.create({
    baseURL: "https://gz.meneses.pt/api"
});

export const getMatchesList = async (offsetParam: number = 0, options: {} = {}) => {
    const response = await goalsZoneService.get(`/matches/?limit=50&offset=${offsetParam}&format=json`, options);
    return response.data;
};

export const getMatchDetail = async (slug: string, options: {} = {}) => {
    const response = await goalsZoneService.get(`/matches/${slug}?format=json`, options);
    return response.data;
};

export const getMatchesWeekSearch = async (filter: string, options: {} = {}) => {
    const response = await goalsZoneService.get(`/matches-search-week/?filter=${filter}&format=json`, options);
    return response.data;
};

export const getTeamsList = async (offsetParam: number = 0, options: {} = {}) => {
    const response = await goalsZoneService.get(`/teams/?limit=50&offset=${offsetParam}&format=json`, options);
    return response.data;
};

export const getTeamsSearch = async (filter: string, options: {} = {}) => {
    const response = await goalsZoneService.get(`/teams/?filter=${filter}&format=json`, options);
    return response.data;
};

export const getTeamDetail = async (slug: string, offsetParam: number = 0, options: {} = {}) => {
    const response =
        await goalsZoneService.get(`/teams/${slug}?limit=50&offset=${offsetParam}&format=json`, options);
    return response.data;
};