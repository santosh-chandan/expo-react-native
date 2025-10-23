import React from 'react';
import { View } from 'react-native';
import RegisterScreen from '../../src/features/auth/screens/RegisterScreen';

export default function RegisterRoute() {
    return (
        <View style={{ flex: 1 }}>
            <RegisterScreen />
        </View>
    );
}
