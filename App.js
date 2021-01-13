import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const WEATHER_API_KEY = '1a08ff8281fd0ef09ac0112c2ddf0f57'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [ currentWeather, setCurrentWeather ] = useState(null)

  useEffect(() => {
    load()
  }, []);

  async function load() {
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
      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`

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
    const { main : {temp} } = currentWeather
    
    return (
  
      <View style={styles.container}>
        <Text>{temp}</Text>
        <StatusBar style="auto" />
      </View>
      
    )
 } else {

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
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
