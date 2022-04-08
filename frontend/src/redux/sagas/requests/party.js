import API from './API'

export const submitPartyRequest = (data) => {
    return API.post('/party', data)
}