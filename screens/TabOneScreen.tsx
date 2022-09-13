import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import opencage from 'opencage-api-client';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [loaction, setLocation] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  let url;

  const reverseGeocode = async (lat: any, long: any) => {
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

    setLocation(Myloaction.coords.latitude);

    url = `https://api.opencagedata.com/geocode/v1/json?q=${
      (Myloaction.coords.latitude, Myloaction.coords.longitude)
    }&key=2041e9fcb53f4c1c99f231515f76d559&language=en`;

    console.log(url, 'Punith');

    reverseGeocode(Myloaction.coords.latitude, Myloaction.coords.longitude);
  }, [loaction, errorMsg]);

  useEffect(() => {
    let interval: any = setInterval(() => {
      console.log('calling function');
      fetchLocation();
    }, 3_00_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{address ? address : ''}</Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
