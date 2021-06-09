import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {View , StyleSheet} from 'react-native';
import { useUser } from '../../store/UserProvider';

MapboxGL.setAccessToken("pk.eyJ1IjoibGlnaHQtbGlnIiwiYSI6ImNrb29uM2tlMzBiMGwyeG8wZzVtdms0aTYifQ.nfJIZAijYNOopZrFAYr18Q");
const Proyectos = () =>{
  const { state } = useUser();
  return (
        <MapboxGL.MapView
      style={{flex:1, width: '100%'}}
      styleURL={'mapbox://styles/mapbox/dark-v10'}
      showUserLocation={true}
      >
         <MapboxGL.Camera
           zoomLevel={12}
           animationMode={'flyTo'}
           animationDuration={6000}
           centerCoordinate={[-73.985353,40.754073]}
         />
     </MapboxGL.MapView>
  )
};

export default Proyectos;
