

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const timetableData = {
    Monday: [
        { time: '07:00 AM', subject: 'English Lecture' },
        { time: '08:00 AM', subject: 'Geography' },
        { time: '09:00 AM', subject: 'Math Class' },
        { time: '10:00 AM', subject: 'Break' },
    ],
    Tuesday: [
        { time: '07:00 AM', subject: 'Math Class' },
        { time: '08:00 AM', subject: 'Chemistry Lab' },
        { time: '09:00 AM', subject: 'English Lecture' },
        { time: '10:00 AM', subject: 'Break' },
    ],
    Wednesday: [
        { time: '07:00 AM', subject: 'Geography' },
        { time: '08:00 AM', subject: 'Science Lab' },
        { time: '09:00 AM', subject: 'History Lecture' },
        { time: '10:00 AM', subject: 'Break' },
    ],
    Thursday: [
        { time: '07:00 AM', subject: 'Economics' },
        { time: '08:00 AM', subject: 'Hindi Lecture' },
        { time: '09:00 AM', subject: 'History Lecture' },
        { time: '10:00 AM', subject: 'Break' },
    ],
    Friday: [
        { time: '07:00 AM', subject: 'Math Class' },
        { time: '08:00 AM', subject: 'Science Lab' },
        { time: '09:00 AM', subject: 'History Lecture' },
        { time: '10:00 AM', subject: 'Break' },
    ],
    Saturday: [
        { time: '07:00 AM', subject: 'Biology Class' },
        { time: '08:00 AM', subject: 'Physics Lab' },
        { time: '09:00 AM', subject: 'Marathi Lecture' },
        { time: '10:00 AM', subject: 'Break' },
    ],
};

const getCurrentDay = () => {
    const days = Object.keys(timetableData);
    const todayIndex = new Date().getDay() - 1; // getDay() returns 0 for Sunday, so adjust index
    return days[todayIndex] || 'Monday'; // Default to Monday if Sunday
};

const TimetableScreen = () => {
    const [selectedDay, setSelectedDay] = useState(getCurrentDay());

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select Day:</Text>
            <RNPickerSelect
                onValueChange={(value) => setSelectedDay(value)}
                items={Object.keys(timetableData).map((day) => ({ label: day, value: day }))}
                value={selectedDay}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select a Day', value: null }}
            />

            <View style={styles.headerRow}>
                <Text style={styles.headerText}>Time</Text>
                <Text style={styles.headerText}>Subject</Text>
            </View>

            <FlatList
                data={timetableData[selectedDay]}
                keyExtractor={(item) => item.time}
                renderItem={({ item, index }) => (
                    <View style={[styles.row, index % 2 !== 0 && styles.alternateRow]}>
                        <Text style={styles.time}>{item.time}</Text>
                        <Text style={styles.subject}>{item.subject}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, backgroundColor: '#ddd', paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#aaa' },
    headerText: { fontSize: 16, fontWeight: 'bold' },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    alternateRow: { backgroundColor: '#f2f2f2' },
    time: { fontSize: 16, fontWeight: 'bold' },
    subject: { fontSize: 16, color: '#333' },
});

const pickerSelectStyles = {
    inputAndroid: { fontSize: 16, padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 4, marginBottom: 10 },
};

export default TimetableScreen;
