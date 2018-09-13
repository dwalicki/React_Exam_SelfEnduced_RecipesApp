export default function(state={},action){
    switch(action.type){
        case 'GET_RECIPES':
            return {
                ...state,
                list:action.payload
             }
        case 'GET_RECIPE':
            return {
                ...state,
                recipe:action.payload
            }
        case 'GET_RECIPE_W_CHEF':
            return {
                ...state,
                recipe:action.payload.recipe,
                chef:action.payload.chef
            }
        case 'CLEAR_RECIPE_W_CHEF':
            return {
                ...state,
                recipe:action.payload.recipe,
                chef:action.payload.chef
            }
        case 'ADD_RECIPE':
            return{
                ...state,
                newrecipe:action.payload
            }
        case 'CLEAR_NEWRECIPE':
            return{
                ...state,
                newrecipe:action.payload
            }
        case 'UPDATE_RECIPE':
            return{
                ...state,
                updateRecipe:action.payload.success,
                recipe:action.payload.doc
            }
        case 'DELETE_RECIPE':
            return{
                ...state,
                postDeleted:action.payload
            }
        case 'CLEAR_RECIPE':
            return{
                ...state,
                updateRecipe:action.payload.updateRecipe,
                recipe:action.payload.recipe,
                postDeleted:action.payload.postDeleted
            }
        default:
            return state;
    }
}