import API from './API'

export const submitVoterRequest = (data) => {
    // for (const pair of data.formData.entries()) {
    //     console.log('submitVoterRequest request section...', pair[0] + ', ' + pair[1])
    // }
    return API.post('/voter', data.formData, data.config)
}