import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import opencage from 'opencage-api-client';
import { loactionObject, RootTabScreenProps } from '../types';
import CurretLocation from '../components/CurretLocation';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import {
  addLoctions,
  deleteAllLocations,
  removeLocations,
} from '../store/locationsSlice';
import Colors from '../constants/Colors';
import PrevLocations from '../components/PrevLocations';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const dispatch = useAppDispatch();
  const { mylocations } = useAppSelector((state) => state.locations);
  const [location, setLocation] = useState<loactionObject>();

  let url;
  let randomId = uuidv4();

  const locationHandler = async () => {
    if (location && mylocations.length <= 30) {
      dispatch(addLoctions(location));
    } else {
      return;
    }
  };

  useEffect(() => {
    locationHandler();
  }, [location]);

  const reverseGeocode = async (lat: number, long: number, mylocation: any) => {
    const key = '8a473a10fc0c48b887cda02a14c86a82';
    const response = await opencage.geocode({
      key,
      q: `${lat}, ${long}`,
    });

    const result = response.results[0];

    console.log(result.formatted);

    setLocation((prev) => ({
      ...prev,
      id: randomId,
      location: {
        latitude: mylocation.coords.latitude,
        longitude: mylocation.coords.longitude,
      },
      timestamp: mylocation.timestamp,
      address: result.formatted,
    }));
  };

  const fetchLocation = async () => {
    const key = '8a473a10fc0c48b887cda02a14c86a82';

    const response = await Location.requestForegroundPermissionsAsync();

    // console.log(response, 'response');

    if (response.status !== 'granted') {
      alert(
        'Permission to access loacation was denied, Please give permission for location'
      );
    }
    const Myloaction = await Location.getCurrentPositionAsync();

    url = `https://api.opencagedata.com/geocode/v1/json?q=${
      (Myloaction.coords.latitude, Myloaction.coords.longitude)
    }&key=${key}&language=en`;

    console.log(Myloaction, location, url, 'Punith');

    await reverseGeocode(
      Myloaction.coords.latitude,
      Myloaction.coords.longitude,
      Myloaction
    );
  };

  useEffect(() => {
    fetchLocation();
    console.log('running once');
    let interval = setInterval(() => {
      console.log('running');
      fetchLocation();
    }, 1000 * 5 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const removeLocationHandler = (key: string) => {
    console.log(key, 'id to be removed');
    dispatch(removeLocations(key));
  };

  const deletAllHandler = () => {
    dispatch(deleteAllLocations());
  };
  console.log('redux location', mylocations, mylocations.length);
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.mainTitleText}>Location Manager</Text>
      {mylocations.length > 0 ? (
        <CurretLocation
          address={
            mylocations ? mylocations[mylocations.length - 1]?.address : null
          }
          timestamp={
            mylocations ? mylocations[mylocations.length - 1]?.timestamp : null
          }
        />
      ) : null}
      <Text style={styles.title2}>Previous Locations</Text>
      <FlatList
        data={mylocations}
        style={{
          marginBottom: 80,
        }}
        renderItem={(itemData) => {
          return (
            <View>
              <PrevLocations
                key={itemData.item.id}
                address={itemData.item.address}
                id={itemData.item.id}
                timestamp={itemData.item.timestamp}
                onRemove={removeLocationHandler}
              />
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.button} onPress={deletAllHandler}>
        <Text style={styles.btnText}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    paddingLeft: 10,
  },
  title2: {
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 20,
    fontWeight: '600',
    paddingLeft: 10,
    marginTop: 20,
    color: Colors.silver,
  },
  mainTitleText: {
    fontSize: 22,
    lineHeight: 30,
    marginLeft: 20,
    fontWeight: '700',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  button: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    bottom: 30,
    backgroundColor: Colors.blue,
    width: '60%',
    borderRadius: 10,
  },
  btnText: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    textAlign: 'center',
    color: Colors.white,
  },
});
