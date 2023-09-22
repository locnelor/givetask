import axios from "axios"
const query = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
})

export const searchUser = (s) => query.get(`/user/search?s=${s}`)

export const getWorks = () => query.get("work/get")

export const download = (id) => query.get(`${id}/download`)

export const submitTask = (data) => query.post("task/submit", data)

export const publishWork = (data) => query.post("work/publish", data)

export const delWork = (id) => query.get(`work/${id}/del`)

export const getWorkInformation = (id) => query.get(`work/${id}/information`)