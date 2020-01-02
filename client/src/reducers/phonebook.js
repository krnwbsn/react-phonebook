const phonebook = (state = [], action) => {
    switch(action.type) {
        case 'LOAD_PHONEBOOK_SUCCESS':
            return action.phonebook.map((item, index) => {
                return {name: item.name, index: index + 1, phone: item.phone, id: item._id, sent: true};
            })
        case 'POST_PHONEBOOK':
            return [
                ...state,
                {
                    name: action.name,
                    phone: action.phone,
                    id_fake: action.id_fake,
                    sent: true
                }
            ]
        case 'POST_PHONEBOOK_SUCCESS':
            return action.phonebook.map((item, index) => {
                return {name: item.name, index: index + 1, phone: item.phone, id: item._id, sent: true};
            })
        case 'POST_PHONEBOOK_FAILURE':
            return state.map(item => {
                if (item.id_fake === action.id_fake) {
                    item.sent = false;
                }
                return item;
            })
        case 'EDIT_PHONEBOOK':
            return state.map(item => {
                if (item.id === action.id) {
                    item.name = action.name;
                    item.phone = action.phone;
                }
                return item;
            })
        case 'EDIT_PHONEBOOK_SUCCESS':
            return action.phonebook.map((item, index) => {
                return {name: item.name, index: index + 1, phone: item.phone, id: item._id, sent: true};
            })
        case 'EDIT_PHONEBOOK_FAILURE':
            return state.map(item => {
                if (item.id === action.id) {
                    item.name = action.oldName;
                    item.phone = action.oldPhone;
                }
                return item;
            })
        case 'DELETE_PHONEBOOK':
            let a = state.filter(item => item.id !== action.id)
            console.log(a)
            return a;
        case 'DELETE_PHONEBOOK_FAILURE':
            state.splice(action.props.id-1, 0, {name: action.props.name, index: action.props.id-1, phone: action.props.phone, id: action.props.origin_id, sent: true});
            return [...state];
        case 'SEARCH_PHONEBOOK_SUCCESS':
            return action.phonebook.map(item => {
                return {name: item.name, phone: item.phone, id: item._id, sent: true};
            })
        case 'DELETE_PHONEBOOK_SUCCESS':
        case 'LOAD_PHONEBOOK_FAILURE':
        default:
            return state;
    }   
}

export default phonebook;