import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

export default function StudentProfileScreen({ navigation }) {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');

    const classOptions = [
        'Daycare', 'Playgroup', 'Nursery', 'LKG', 'UKG',
        '1st', '2nd', '3rd', '4th', '5th',
        '6th', '7th', '8th', '9th', '10th',
    ];

    const divisionOptions = ['A', 'B', 'C'];

    const handleSearch = () => {
        if (selectedClass && selectedDivision) {
            navigation.navigate('StudentList', {
                selectedClass,
                selectedDivision,
            });
        }
    };

    return (
        <LinearGradient colors={['#f9fbfd', '#eef1f5']} style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Student Profile</Text>

                <Text style={styles.label}>Select Class</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedClass}
                        onValueChange={setSelectedClass}
                        style={styles.picker}
                        dropdownIconColor="#666"
                    >
                        <Picker.Item label="Select Class" value="" />
                        {classOptions.map((item, index) => (
                            <Picker.Item label={item} value={item} key={index} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Select Division</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedDivision}
                        onValueChange={setSelectedDivision}
                        style={styles.picker}
                        dropdownIconColor="#666"
                    >
                        <Picker.Item label="Select Division" value="" />
                        {divisionOptions.map((div, index) => (
                            <Picker.Item label={div} value={div} key={index} />
                        ))}
                    </Picker>
                </View>

                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { opacity: pressed ? 0.85 : 1 },
                    ]}
                    onPress={handleSearch}
                >
                    <Text style={styles.buttonText}>Search Students</Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        marginTop: 12,
        marginBottom: 6,
    },
    pickerContainer: {
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#d1d5db',
        marginBottom: 12,
        overflow: 'hidden',
    },
    picker: {
        height: Platform.OS === 'ios' ? 180 : 50,
        width: '100%',
    },
    button: {
        backgroundColor: '#0288D1',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 24,
        shadowColor: '#0288D1',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 8,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});
