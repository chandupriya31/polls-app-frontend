function categoriesReducer(state,action){
    switch(action.type){
        case 'ALL_CATEGORIES':{
            return {...state,catData:action.payload}
        }
        case 'SET_SELECTED_POLLS':{
            return {...state,selectedPolls:action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default categoriesReducer