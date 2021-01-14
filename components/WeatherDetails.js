import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils/index'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

export default function WeatherDetails() {
    return (
        <View style={ styles.weatherDetails }>
            <Text>Hi</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    weatherDetails: {
        marginTop: 'auto',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10
    }
})