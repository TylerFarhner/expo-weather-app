import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from "./components/UnitsPicker";

const WEATHER_API_KEY = '1a08ff8281fd0ef09ac0112c2ddf0f57'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [ currentWeather, setCurrentWeather ] = useState(null)
  const [ unitSystem, setUnitSystem ] = useState('imperial')

  useEffect(() => {
    load()
  }, [ unitSystem ]);

  async function load() {

    setCurrentWeather(null)

    try{ 
      let { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app.')
        return
      }
      // get location
      const location = await Location.getCurrentPositionAsync()

      
      // read Lat and Lng from coords from location
      const { latitude, longitude } = location.coords

      // Weather API URL
      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`

      // make fetch request, passing url in
      const response = await fetch(weatherURL)

      // return that response as JSON
      const result = await response.json()

      // set state value 
      if( response.ok ) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }

      // alert(`Latitiude : ${latitude}, Longitude : ${longitude}`)
    } catch (error){
      setErrorMessage(error.message)
    }
  }

  if(currentWeather) {
    
    return (
  
      // ------- MAIN VIEW -------------
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
      </View>
      
    )
} else {

    // --------- ERROR VIEW ------------
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )

    }
}



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },

    main: {
      justifyContent: 'center',
      flex: 1
    },

  });
