import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.apiUrl;
const Api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
  },
});

//** ---------- api tracks ---------- **/
export const getTracks = () => Api.get('/tracks');

export const getTrack = (id: string | string[] | undefined) =>
  Api.get('/tracks/' + id);

export const searchTracks = (query: string) =>
  Api.get('/tracks/search?query=' + query);

export const deleteTrack = (id: string) => Api.delete('/tracks/' + id);

export const addListeningTracks = (id: string) =>
  Api.post('/tracks/listen/' + id);

export const newTrack = (record: {}) => Api.post('/tracks', record);

export const newComment = (record: {}) => Api.post('/tracks/comment', record);
//** ----------  ---------- **/
