

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Image,
    Pressable,
    Platform,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { getDaycareHistory } from '../apiService'; // ✅ make sure this function exists

const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const StudentDaycareDetail = () => {
    const route = useRoute();
    const student = route.params?.student || {};


    const [fromDate, setFromDate] = useState('2025-05-01');
    const [toDate, setToDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // format: 'YYYY-MM-DD'
    });

    const [showPicker, setShowPicker] = useState({ type: '', show: false });

    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await getDaycareHistory(student._id, fromDate, toDate);
            console.log("📦 Raw History API Response: ", response);

            const data = response.data || [];

            // Sort the history by date (latest first)
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

            setHistoryData(sortedData);
            ToastAndroid.show('History loaded', ToastAndroid.SHORT);
        } catch (err) {
            ToastAndroid.show('Failed to fetch history', ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchHistory();
    }, [fromDate, toDate]);

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            const isoDate = selectedDate.toISOString().split('T')[0];
            if (showPicker.type === 'from') setFromDate(isoDate);
            else if (showPicker.type === 'to') setToDate(isoDate);
        }
        setShowPicker({ type: '', show: false });
    };

    const renderSession = ({ item, index }) => {
        return (
            <Animated.View entering={FadeInUp.delay(index * 100)} style={styles.card}>
                <Text style={styles.date}>{item.date} (Total: {item.totalDuration})</Text>
                {item.sessions.map((session, i) => (
                    <View key={i} style={styles.sessionRow}>
                        <Icon name="login" color="#4CAF50" size={22} />
                        <Text style={styles.sessionText}>IN: {formatTime(session.inTime)}</Text>

                        {session.outTime ? (
                            <>
                                <Icon name="logout" color="#F44336" size={22} style={{ marginLeft: 10 }} />
                                <Text style={styles.sessionText}>OUT: {formatTime(session.outTime)}</Text>
                            </>
                        ) : (
                            <Text style={[styles.sessionText, { color: '#F44336', marginLeft: 10 }]}>
                                <Icon name="logout" color="#F44336" size={22} style={{ marginLeft: 10 }} />
                                OUT: Pending
                            </Text>
                        )}

                    </View>
                ))}
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: student.profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJxOLfDct_vEPdS-6OsRnS-kDl_HCv5nI2A&s' }} style={styles.dp} />
                <Text style={styles.name}>{student.firstName} {student.lastName}</Text>
                <Text style={styles.subtext}>Division: {student.section}</Text>
            </View>

            <View style={styles.datePickerContainer}>
                <Pressable
                    style={styles.dateButton}
                    onPress={() => setShowPicker({ type: 'from', show: true })}
                >
                    <Text style={styles.dateText}>From: {fromDate}</Text>
                </Pressable>
                <Pressable
                    style={styles.dateButton}
                    onPress={() => setShowPicker({ type: 'to', show: true })}
                >
                    <Text style={styles.dateText}>To: {toDate}</Text>
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

            <Text style={styles.header}>Daycare History</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={historyData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderSession}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={styles.empty}>No records found.</Text>}
                />
            )}
        </SafeAreaView>
    );
};

export default StudentDaycareDetail;

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
    subtext: {
        fontSize: 14,
        color: '#888',
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
        elevation: 3,
    },
    date: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#444',
    },
    sessionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    sessionText: {
        fontSize: 14,
        marginLeft: 4,
        color: '#333',
    },
    empty: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        color: '#888',
    },
});
