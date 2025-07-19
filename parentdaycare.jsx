


import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    Animated,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { fetchDaycareHistory } from './parentApiService';

const STUDENT_ID = '68468bc4d57a5e1f03ac0d5b';

const RecordItem = ({ item, index }) => {
    const itemAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(itemAnim, {
            toValue: 1,
            duration: 400,
            delay: index * 150,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.recordCard,
                {
                    opacity: itemAnim,
                    transform: [
                        {
                            translateY: itemAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [15, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            <View style={styles.column}>
                <Text style={styles.recordLabel}>Date</Text>
                <Text style={styles.recordText}>{item.date}</Text>
                <Text style={styles.recordLabel}>In Time</Text>
                <Text style={styles.recordText}>{item.inTime}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.recordLabel}>Total Hours</Text>
                <Text style={styles.recordText}>{item.totalHours}</Text>
                <Text style={styles.recordLabel}>Out Time</Text>
                <Text style={styles.recordText}>{item.outTime}</Text>
            </View>
        </Animated.View>
    );
};

const DayCare = () => {
    const [studentName, setStudentName] = useState('Loading...');
    const [totalHours, setTotalHours] = useState('0h 0m');
    const [records, setRecords] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromDate, setShowFromDate] = useState(false);
    const [showToDate, setShowToDate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        fetchRecords(new Date(), new Date());
    }, []);

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.96, duration: 100, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
        ]).start();
    };

    const fetchRecords = async (startDate, endDate) => {
        const from = startDate.toISOString().split('T')[0];
        const to = endDate.toISOString().split('T')[0];
        try {
            const data = await fetchDaycareHistory(STUDENT_ID, from, to);
            if (!Array.isArray(data) || data.length === 0) {
                setTotalHours('0h 0m');
                setRecords([]);
                return;
            }

            const { student } = data[0];
            if (student?.firstName && student?.lastName) {
                setStudentName(`${student.firstName} ${student.lastName}`);
            }

            let totalMinutes = 0;
            const formatted = [];

            data.forEach((entry) => {
                const date = new Date(entry.date).toDateString();
                entry.sessions?.forEach((session, i) => {
                    if (session.inTime && session.outTime) {
                        const inTime = new Date(session.inTime);
                        const outTime = new Date(session.outTime);
                        const mins = (outTime - inTime) / (1000 * 60);
                        totalMinutes += mins;

                        formatted.push({
                            id: `${entry.date}-${i}`,
                            date,
                            inTime: inTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            outTime: outTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            totalHours: `${Math.floor(mins / 60)}h ${Math.floor(mins % 60)}m`,
                            dateTimeISO: session.inTime,
                        });
                    }
                });
            });

            formatted.sort((a, b) => new Date(b.dateTimeISO) - new Date(a.dateTimeISO));
            setRecords(formatted);
            setTotalHours(`${Math.floor(totalMinutes / 60)}h ${Math.floor(totalMinutes % 60)}m`);
        } catch (err) {
            console.error(err);
            Alert.alert('Error', err.message || 'Unable to fetch records');
            setRecords([]);
            setTotalHours('0h 0m');
        }
    };

    const handleSearch = () => {
        if (fromDate > toDate) return Alert.alert('Invalid', 'From Date cannot be after To Date');
        animateButton();
        fetchRecords(fromDate, toDate);
        setShowModal(false);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1D2B64', '#f8cdda']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.topCard}
            >
                <MaterialCommunityIcons name="account-circle" size={56} color="#fff" style={{ alignSelf: 'center' }} />
                <Text style={styles.nameText} numberOfLines={2}>{studentName}</Text>
                <View style={styles.totalHoursBox}>
                    <FontAwesome name="clock-o" size={20} color="#fff" />
                    <Text style={styles.totalHoursText}>{totalHours}</Text>
                </View>
            </LinearGradient>

            <View style={styles.recordsHeader}>
                <Text style={styles.allRecordsText}>All Records</Text>
                <TouchableOpacity onPress={() => setShowModal(true)} style={styles.calendarBtn}>
                    <EntypoIcon name="calendar" size={28} color="#1C1C1E" />
                </TouchableOpacity>
            </View>

            <Modal visible={showModal} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseButton}>
                            <EntypoIcon name="cross" size={28} color="#444" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Select Date Range</Text>
                        <Text style={styles.modalSubtitle}>View previous records by date</Text>

                        <Text style={styles.dateLabel}>From Date</Text>
                        <TouchableOpacity onPress={() => setShowFromDate(true)} style={styles.datePicker}>
                            <Text style={styles.dateText}>{fromDate.toDateString()}</Text>
                        </TouchableOpacity>
                        {showFromDate && (
                            <DateTimePicker
                                value={fromDate}
                                mode="date"
                                display="default"
                                onChange={(ev, d) => {
                                    setShowFromDate(false);
                                    if (d) setFromDate(d);
                                }}
                            />
                        )}

                        <Text style={styles.dateLabel}>To Date</Text>
                        <TouchableOpacity onPress={() => setShowToDate(true)} style={styles.datePicker}>
                            <Text style={styles.dateText}>{toDate.toDateString()}</Text>
                        </TouchableOpacity>
                        {showToDate && (
                            <DateTimePicker
                                value={toDate}
                                mode="date"
                                display="default"
                                onChange={(ev, d) => {
                                    setShowToDate(false);
                                    if (d) setToDate(d);
                                }}
                            />
                        )}

                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                                <Text style={styles.buttonText}>Search</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </Modal>

            <FlatList
                data={records || []}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item, index }) => <RecordItem item={item} index={index} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9FBFD',
    },
    topCard: {
        borderRadius: 20,
        paddingVertical: 28,
        paddingHorizontal: 20,
        marginBottom: 28,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    nameText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginTop: 12,
        maxWidth: '90%',
    },
    totalHoursBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginTop: 10,
    },
    totalHoursText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginLeft: 6,
    },
    recordsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    allRecordsText: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    calendarBtn: {
        backgroundColor: '#E6EAF0',
        padding: 8,
        borderRadius: 10,
    },
    recordCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderLeftWidth: 5,
        borderColor: '#4A90E2',
        elevation: 3,
    },
    column: {
        flex: 1,
    },
    recordLabel: {
        fontSize: 13,
        color: '#6B6B6B',
        fontWeight: '600',
        marginTop: 10,
    },
    recordText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1F',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.42)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 28,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    modalCloseButton: {
        position: 'absolute',
        top: -24,
        alignSelf: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 24,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 8,
        color: '#2C2C2E',
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#7D7E86',
        textAlign: 'center',
        marginBottom: 28,
    },
    dateLabel: {
        fontSize: 15,
        fontWeight: '700',
        marginTop: 14,
        color: '#5B5D67',
    },
    datePicker: {
        backgroundColor: '#EFF1F6',
        padding: 14,
        borderRadius: 16,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#D1D4DB',
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    searchButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 16,
        borderRadius: 20,
        marginTop: 28,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
    },
});

export default DayCare;



