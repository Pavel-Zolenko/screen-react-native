import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions  } from "react-native";

import MapView, { Marker } from "react-native-maps";


const MapScreen = ({ route }) => {
    const { latitude, longitude } = route.params.location;
    
    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                mapType="standard"
                minZoomLevel={15}
                onMapReady={() => console.log("Map is ready")}
            // onRegionChange={() => console.log("Region change")}
            >
                <Marker
                    title="I am here"
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    description='Hello'
                />
            </MapView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
    mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
})

export default MapScreen;