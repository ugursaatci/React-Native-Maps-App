import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMsg: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        this.setState({ errorMsg: 'Permission to access location was denied' });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });

      
      if (location) {
        this.setState({
          region: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  render() {
    const { region, location, errorMsg } = this.state;

    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={region}>
          {location && (
            <Marker 
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              description="You are here"
            />
          )}
        </MapView>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
