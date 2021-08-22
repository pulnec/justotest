import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_NEWS, REMOVE_UNIT_NEWS, REFRESH_NEWS, NEWS_SELECTED, TRASH_NUMBER } from './Types';
import NetInfo from '@react-native-community/netinfo';

export const newsSelected = (news) => {
    return (dispatch) => {
        dispatch({
            type: NEWS_SELECTED,
            payload: news,
        })
    }
}

export const refreshNews = (val) => {
    return (dispatch) => {
        dispatch({
            type: REFRESH_NEWS,
            payload: val,
        })
    }
}

export const removeNews = (item) => {
    return async (dispatch) => {

        let deletesIds = await AsyncStorage.getItem('@removesIds');
        
        deletesIds = deletesIds ? JSON.parse(deletesIds) : [];
        deletesIds.push(item);

        AsyncStorage.setItem('@removesIds', JSON.stringify(deletesIds));
        
        dispatch({
            type: REMOVE_UNIT_NEWS,
            payload: {
                item,
                total: deletesIds.length,
            },
        })
    }
}

export const checkNetworkState = async () => {
   const netState = await NetInfo.fetch();
   return netState.isConnected;
}

const formatdata = async (data) => {
    
    let deletesIds = await AsyncStorage.getItem('@removesIds');
    deletesIds = deletesIds ? JSON.parse(deletesIds) : [];
    deletesIds = deletesIds.map(item => item.key);

    let newdata = [];

     data.forEach(item => {
        if (!deletesIds.includes(item.objectID)) {
            newdata.push({
                ...item,
                key: item.objectID,
            });
        }
    });

    return newdata;
}

export const checkremoveItems = () => {
    return async (dispatch) => {

        let deletesIds = await AsyncStorage.getItem('@removesIds');
        deletesIds = deletesIds ? JSON.parse(deletesIds) : [];

        dispatch({
            type: TRASH_NUMBER,
            payload: deletesIds.length,
        })
    }
}

export const getNewsData = () => {
    return async (dispatch) => {

        const isOnline = await checkNetworkState();
        
        let dataStore = await AsyncStorage.getItem('@dataNews');
        dataStore = JSON.parse(dataStore) || [];

        let responsedata = await formatdata(dataStore);

        if (isOnline) {
                axios.get('http://hn.algolia.com/api/v1/search_by_date').then( async (response) => {
                    responsedata = await formatdata(response.data.hits)
                    AsyncStorage.setItem('@dataNews', JSON.stringify(responsedata));
                    dispatch(setDataNews(responsedata));     
                }, () => {
                    dispatch(setDataNews(responsedata));
                })
        } else {
            dispatch(setDataNews(responsedata));     
        }
    }
}

const setDataNews = (payload) => ({
    type: FETCH_NEWS,
    payload,
});