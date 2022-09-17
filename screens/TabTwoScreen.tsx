import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAppSelector } from '../hooks/hook';

export default function TabTwoScreen() {
  const { mylocations } = useAppSelector((state) => state.locations);

  return (
    <>
      {mylocations.length > 0 ? (
        mylocations.map((item) => {
          let lat = item.location.latitude;
          let long = item.location.longitude;
          return (
            <MapView
              style={[styles.container, StyleSheet.absoluteFillObject]}
              showsMyLocationButton={true}
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00921,
              }}
            >
              <Marker
                // key={item.id}
                coordinate={{
                  latitude: lat,
                  longitude: long,
                }}
                title='My Location'
                identifier='destination'
              />
            </MapView>
          );
        })
      ) : (
        <MapView
          style={[styles.container, StyleSheet.absoluteFillObject]}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: 12.9716,
            longitude: 77.5946,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00921,
          }}
        ></MapView>
      )}
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
