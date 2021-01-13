import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function UnitsPicker() {
    return (
        <View>
            <Picker>
                <Picker.item label="C°" value="metric" />
                <Picker.item label="F°" value="imperial" />
            </Picker>
        </View>
    )
}
