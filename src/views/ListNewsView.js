import React, { useEffect, useLayoutEffect } from 'react';
import { 
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { getNewsData, checkremoveItems } from './redux/Actions';
import { useSelector } from 'react-redux';
import ListNews from '../components/ListNews';
import { Ionicons } from '@expo/vector-icons';

export default function ListNewsView({ navigation }) {

    const dispatch = useDispatch();
    const { trash, isLoad } = useSelector(state => state.news);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <>
                <Ionicons name="trash-outline" size={29} color="deepskyblue" />
                <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'deepskyblue' }}>({trash})</Text>
                </View>
            </>
          ),
        });
    }, [navigation, trash]);


    useEffect(() => {
        dispatch(getNewsData());
        dispatch(checkremoveItems());
    },[]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
        { !isLoad ? 
            <Spinner/> : <ListNews navigation={navigation} />
        }
        </SafeAreaView>
    )
}
