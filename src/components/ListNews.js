import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    RefreshControl,
    Alert,
    Image,
    Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeNews, getNewsData, refreshNews, newsSelected, checkNetworkState } from '../views/redux/Actions';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export default function ListNews({ navigation }) {

    const { news, refresh } = useSelector(state => state.news);
    const dispatch = useDispatch();

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, row) => {
        closeRow(rowMap, row.key);
        dispatch(removeNews(row));
    };

    const renderItem = ({ item }) => {
        return <TouchableHighlight
                onPress={() => selectedRow(item) }
                style={styles.rowContent}
                underlayColor={'#FFF'}
                >
                <View style={styles.intoContent}>
                    <View style={styles.rowTitleText}>
                        <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.title}>
                            { item.story_title || item.title }
                        </Text>
                        <Text>{item.author} - {moment(item.created_at).fromNow()}</Text>
                    </View>
                </View>
            </TouchableHighlight>
    };

    const selectedRow = async (item) => {
         const isOffline = await checkNetworkState();
        if (!isOffline) {
            Alert.alert(
                "Información",
                "No tiene acceso a internet para ver este contenido.",
                [
                  { text: "OK" }
                ]
            );
        } else {
            dispatch(newsSelected(item));
            navigation.navigate('DetailNews');
        }
    }

    const renderHiddenItem = ({ item }, rowMap) => {
            return <View style={styles.rowBack}>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => deleteRow(rowMap, item)}
                >
                    <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
            </View>
    };

    if (refresh) {
        setTimeout(() => {
            dispatch(getNewsData());
        },1500);
    }
    

    return (
        <View style={styles.container}>
            {news.length ? 
            <SwipeListView
                data={news}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                disableRightSwipe={true}
                rightOpenValue={-75}
                previewRowKey={null}
                refreshControl={
                    <RefreshControl
                       refreshing={refresh}
                       onRefresh={() =>  dispatch(refreshNews(true))}
                       tintColor="red"
                       colors={["red","green"]}
                       size={RefreshControl.SIZE.LARGE}
                   />
                }               
            />
            : <View style={styles.nodata}>
                <Image source={require('../assets/images/nodata-smile.png')} style={styles.smile}/>
                <Text>Sin contenido.</Text>
                <Button
                    title="Retry now"
                    onPress={() => dispatch(getNewsData())}
                />
              </View>
           }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowContent: {
        height: 80,
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
    },
    title: {
        fontWeight: 'bold',
    },
    rowTitleText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    intoContent: {
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    nodata: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smile: {
        width: 50,
        height: 50,
        marginBottom: 15,
    }
});