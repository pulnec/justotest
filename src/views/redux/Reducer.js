import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    FETCH_NEWS,
    REMOVE_UNIT_NEWS,
    REFRESH_NEWS,
    NEWS_SELECTED,
    TRASH_NUMBER,
} from "./Types";

const initialState = {
    news: [],
    isLoad: false,
    refresh: false,
    selected: null,
    trash: 0,
}

const newsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case TRASH_NUMBER: {
            return {
                ...state,
                trash: action.payload,
            }
        }
        case NEWS_SELECTED: {
            return {
                ...state,
                selected: action.payload,
            }
        }
        case REFRESH_NEWS: {
            return {
                ...state,
                refresh: true,
            }
        }
        case REMOVE_UNIT_NEWS: 
            console.log(action.payload);

            const newData = [...state.news];
            const prevIndex = state.news.findIndex(item => item.key === action.payload.item.key);
            newData.splice(prevIndex, 1);

            AsyncStorage.setItem('@dataNews', JSON.stringify(newData));
            
            return {
                ...state,
                news: newData,
                trash: action.payload.total,
            }
        case FETCH_NEWS: 
            return {
                ...state,
                news: action.payload,
                isLoad: true,
                refresh: false,
            }
        default: 
            return state;
    }
}

export default newsReducer; 