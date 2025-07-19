import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Image,
    Pressable,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Example student
const student = {
    fullName: 'Priya Jadhav',
    dp: 'https://randomuser.me/api/portraits/women/44.jpg',
};

// Static history data
const daycareHistory = [
    { id: '1', date: '2025-04-09', status: 'IN', time: '08:15 AM' },
    { id: '2', date: '2025-04-09', status: 'OUT', time: '05:45 PM' },
    { id: '3', date: '2025-04-08', status: 'IN', time: '08:10 AM' },
    { id: '4', date: '2025-04-08', status: 'OUT', time: '06:00 PM' },
    { id: '5', date: '2025-04-07', status: 'IN', time: '08:25 AM' },
    { id: '6', date: '2025-04-07', status: 'OUT', time: '05:30 PM' },
    { id: '7', date: '2025-04-05', status: 'IN', time: '08:00 AM' },
    { id: '8', date: '2025-04-05', status: 'OUT', time: '06:00 PM' },
];

const DaycareHistoryScreen = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showPicker, setShowPicker] = useState({ type: '', show: false });

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            const isoDate = selectedDate.toISOString().split('T')[0];
            if (showPicker.type === 'from') setFromDate(isoDate);
            else if (showPicker.type === 'to') setToDate(isoDate);
        }
        setShowPicker({ type: '', show: false });
    };

    const filterHistory = () => {
        if (!fromDate || !toDate) return daycareHistory;
        return daycareHistory.filter((item) => item.date >= fromDate && item.date <= toDate);
    };

    const renderItem = ({ item, index }) => {
        const isIn = item.status === 'IN';
        return (
            <Animated.View entering={FadeInUp.delay(index * 100)} style={styles.card}>
                <View style={styles.row}>
                    <Icon
                        name={isIn ? 'login' : 'logout'}
                        size={28}
                        color={isIn ? '#4CAF50' : '#F44336'}
                        style={styles.icon}
                    />
                    <View>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={[styles.status, { color: isIn ? '#4CAF50' : '#F44336' }]}>
                            {item.status} at {item.time}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Student Profile */}
            <View style={styles.profileContainer}>
                <Image source={{ uri: student.dp }} style={styles.dp} />
                <Text style={styles.name}>{student.fullName}</Text>
            </View>

            {/* From-To Date Picker */}
            <View style={styles.datePickerContainer}>
                <Pressable
                    style={styles.dateButton}
                    onPress={() => setShowPicker({ type: 'from', show: true })}
                >
                    <Text style={styles.dateText}>
                        From: {fromDate ? fromDate : 'Select Date'}
                    </Text>
                </Pressable>
                <Pressable
                    style={styles.dateButton}
                    onPress={() => setShowPicker({ type: 'to', show: true })}
                >
                    <Text style={styles.dateText}>
                        To: {toDate ? toDate : 'Select Date'}
                    </Text>
                </Pressable>
            </View>

            {showPicker.show && (
                <DateTimePicker
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    value={new Date()}
                    onChange={handleDateChange}
                />
            )}

            {/* Title */}
            <Text style={styles.header}>Daycare History</Text>

            {/* Filtered List */}
            <FlatList
                data={filterHistory()}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.empty}>No records found.</Text>}
            />
        </SafeAreaView>
    );
};

export default DaycareHistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 16,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    dp: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 12,
    },
    dateButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 12,
        flex: 1,
        marginHorizontal: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    dateText: {
        textAlign: 'center',
        color: '#333',
        fontWeight: '500',
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 10,
        color: '#222',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    date: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    status: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
    },
    empty: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        color: '#888',
    },
});
