import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAppSelector } from '../hooks/hook';

export default function TabTwoScreen() {
  const { mylocations } = useAppSelector((state) => state.locations);

  return (
    <>
      {mylocations.length > 0 &&
        mylocations.map((item) => {
          console.log(item.location, mylocations.length, 'item');
          return (
            <MapView
              style={[styles.container, StyleSheet.absoluteFillObject]}
              showsMyLocationButton={true}
              initialRegion={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                latitudeDelta: 0.00722,
                longitudeDelta: 0.00721,
              }}
            >
              <Marker
                // key={item.id}
                coordinate={{
                  latitude: item.location.latitude,
                  longitude: item.location.latitude,
                }}
                title='My Location'
                identifier='destination'
              />
            </MapView>
          );
        })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
