import { AppDispatch } from "../store";
import { appReducer } from "./AppSlice";

export const fetching = (url: string, query: string) => async(dispatch: AppDispatch) => {
    await fetch(`${url}${query}`, {
        headers: {
            'User-Agent': 'request'
        }})
        .then(response => {
            if(response.ok) {
                return response;
            } throw Error(response.statusText);
        })
        .then( response => response.json() )
        .then( data => {
            dispatch(appReducer.actions.handleSubmit(data))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
}

export const handleChangeQuery = (evt: React.ChangeEvent<HTMLInputElement>) => (dispatch: AppDispatch) => {
    dispatch(appReducer.actions.handleChange(evt.target.value))
}

export const changeTheme = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(appReducer.actions.handleChangeTheme(value))
}