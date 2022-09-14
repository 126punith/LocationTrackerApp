import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import opencage from 'opencage-api-client';
import { RootTabScreenProps } from '../types';

import CurretLocation from '../components/CurretLocation';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [loaction, setLocation] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  let url;

  const reverseGeocode = async (lat: number, long: number) => {
    const key = '2041e9fcb53f4c1c99f231515f76d559';
    const response = await opencage.geocode({
      key,
      q: `${lat}, ${long}`,
    });

    const result = response.results[0];
    console.log(result.formatted);
    setAddress(result.formatted);
  };

  const fetchLocation = useCallback(async () => {
    const response = await Location.requestForegroundPermissionsAsync();

    // console.log(response, 'response');

    if (response.status !== 'granted') {
      setErrorMsg('Permission to access loacation was denied');
    }
    const Myloaction = await Location.getCurrentPositionAsync();

    setLocation(Myloaction);

    // url = `https://api.opencagedata.com/geocode/v1/json?q=${
    //   (Myloaction.coords.latitude, Myloaction.coords.longitude)
    // }&key=2041e9fcb53f4c1c99f231515f76d559&language=en`;

    console.log(Myloaction, 'Punith');

    reverseGeocode(Myloaction.coords.latitude, Myloaction.coords.longitude);
  }, [loaction, errorMsg]);

  useEffect(() => {
    fetchLocation();
    console.log('punith');
    let interval = setInterval(() => {
      console.log('running');
      fetchLocation();
    }, 1000 * 5 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text
        style={{
          fontSize: 22,
          lineHeight: 30,
          marginLeft: 20,
          fontWeight: '700',
        }}
      >
        Location Manager
      </Text>
      <CurretLocation
        address={address ? address : ''}
        loaction={loaction}
        timestamp={loaction ? loaction.timestamp : 0}
      />
      {/* <View>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 22,
            marginLeft: 20,
            fontWeight: '600',
            marginTop: 20,
            marginBottom: 10,
            paddingLeft: 10,
          }}
        >
          Current Location
        </Text>
        <View
          style={{
            width: '80%',
            height: 50,
            flexDirection: 'row',
            // marginTop: 20,
            marginLeft: 20,
          }}
        >
          <Image
            source={{
              uri: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
            }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {address ? address : ''}
            </Text>

            <Text
              style={[
                styles.title,
                {
                  color: Colors.silver,
                },
              ]}
              numberOfLines={1}
            >
              {loaction && getTimeHandler(loaction.timestamp)}
            </Text>
          </View>
        </View>
      </View> */}
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
});
