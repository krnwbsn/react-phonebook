import axios from 'axios';

const API_URL = 'http://localhost:4000/api/phonebook/';

const request = axios.create({
    baseURL: API_URL,
    timout: 1000
})

// load phonebook
export const loadPhonebookSuccess = (phonebooks) => ({
    type: 'LOAD_PHONEBOOK_SUCCESS',
    phonebooks
})

export const loadPhonebookFailure = () => ({
    type: 'LOAD_PHONEBOOK_FAILURE'
})

export const loadPhonebook = () => {
    return dispatch => {
        return request.get('phonebooks')
        .then(function(response) {
            dispatch(loadPhonebookSuccess(response.data));
        })
        .catch(function(error) {
            console.log(error);
            dispatch(loadPhonebookFailure());
        })
    }
}

// post phonebook
export const postPhonebookSuccess = (phonebooks) => ({
    type: 'POST_PHONEBOOK_SUCESS',
    phonebooks
})

export const postPhonebookFailure = (id_fake) => ({
    type: 'POST_PHONEBOOK_FAILURE', 
    id_fake
})

const postPhonebookRedux = (id_fake, name, phone) => ({
    type: 'POST_PHONEBOOK',
    id_fake,
    name,
    phone
})

export const postPhonebook = (name, phone) => {
    let id_fake = Date.now();
    return dispatch => {
        dispatch(postPhonebookRedux(id_fake, name, phone));
        return request.post('phonebooks', {name, phone})
        .then(function(response){
            return request.get('phonebooks')
            .then(function(response){
                dispatch(postPhonebookSuccess(response.data));
            })
        })
        .catch(function(error){
            console.log(error);
            dispatch(postPhonebookFailure(id_fake));
        })
    }
}

// delete phonebook
const deletePhonebookRedux = (id) => ({
    type: 'DELETE_PHONEBOOK',
    id
})

export const deletePhonebookSuccess = () => ({
    type: 'DELETE_PHONEBOOK_SUCCESS'
})

export const deletePhonebookFailure = (props) => ({
    type: 'DELETE_PHONEBOOK_FAILURE',
    props
})

export const deletePhonebook = (props) => {
    return dispatch => {
        dispatch(deletePhonebookRedux(props.origin_id));
        return request.delete(`phonebooks/${props.origin_id}`)
        .then(function(response){
            dispatch(deletePhonebookSuccess());
        })
        .catch(function(error){
            console.log(error);
            dispatch(deletePhonebookFailure(props));
        })
    }
}

// edit phonebook
const editPhonebookRedux = (id, name, phone) => ({
    type: 'EDIT_PHONEBOOK', 
    id, 
    name, 
    phone
})

export const editPhonebookSuccess = (phonebooks) => ({
    type: 'EDIT_PHONEBOOK_SUCCESS',
    phonebooks
})

export const editPhonebookFailure = (id, oldName, oldPhone) => ({
    type: 'EDIT_PHONEBOOK_FAILURE',
    id,
    oldName,
    oldPhone
})

export const editPhonebook = (id, name, phone, oldName, oldPhone) => {
    return dispatch => {
        dispatch(editPhonebookRedux(id, name, phone));
        return request.put(`phonebooks/${id}`, {name, phone})
        .then(function(response)    {
            return request.get('phonebooks')
            .then(function(response) {
                dispatch(editPhonebookSuccess(response.data));
            })
        })
        .catch(function(error) {
            console.log(error);
            dispatch(editPhonebookFailure(id, oldName, oldPhone));
        })
    }
}

// resend phonebook
export const resendPhonebook = (id_fake, name, phone) => {
    return dispatch => {
        return request.post('phonebooks', {name, phone})
        .then(function(response) {
            return request.get('phonebooks')
            .then(function(response) {
                dispatch(postPhonebookSuccess(response.data));
            })
        })
        .catch(function(error) {
            console.log(error);
            dispatch(postPhonebookFailure(id_fake));
        })
    }
}

// search phonebook
const searchPhonebookRedux = (name, phone) => ({
    type: 'SEACRH_PHONEBOOK', 
    name, 
    phone
})

export const searchPhonebookSuccess = (phonebooks) => ({
    type: 'SEARCH_PHONEBOOK', 
    phonebooks
})

export const searchPhonebook = (name, phone) => {
    return dispatch => {
        dispatch(searchPhonebookRedux(name, phone));
        return request.post('phonebooks/search', {name, phone})
        .then(function(response) {
            dispatch(searchPhonebookSuccess(response.data))
        })
        .catch(function(error) {
            console.log(error);
            alert('Cannot search phonebook')
        })
    }
}