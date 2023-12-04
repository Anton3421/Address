import { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const API_URL = 'https://www.mapquestapi.com/geocoding/v1/address?key=jYUk9tCpfYnEq5s96va4zmMA9e7Yuhq7'
  const [keyword, setKeyword] = useState('')
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,

  })
  

  const getLocation = () => {
    if (keyword) {
        fetch(`${API_URL}&location=${keyword}`)
        .then(response => response.json())
        .then(responseData => {
          setRegion({
            ...region,
            latitude: responseData.results[0].locations[0].latLng.lat,
            longitude: responseData.results[0].locations[0].latLng.lng
          })
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={region}>
        <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude}}
            />
        </MapView>
        <TextInput
          style={{fontSize: 18}}
          placeholder='keyword'
          value={keyword}
          onChangeText={keyword => setKeyword(keyword)}
        />
        <Button title='SHOW' onPress= {getLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
