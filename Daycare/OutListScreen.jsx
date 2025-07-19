

import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStudentList, markStudentOut } from '../apiService';

const OutListScreen = () => {
    const [students, setStudents] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    const [loadingList, setLoadingList] = useState(false);

    const loadStudents = async () => {
        setLoadingList(true);
        try {
            const allStudents = await getStudentList();
            console.log('Students fetched:', allStudents);
            if (!Array.isArray(allStudents)) {
                throw new Error('Invalid student data');
            }
            setStudents(allStudents); // ✅ Set all students here
        } catch (err) {
            console.error('Error loading students:', err);
            ToastAndroid.show('Failed to load students', ToastAndroid.SHORT);
        } finally {
            setLoadingList(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadStudents();
        }, [])
    );

    // const handleMarkOut = async (studentId) => {
    //     setLoadingId(studentId);
    //     try {
    //         await markStudentOut(studentId);
    //         ToastAndroid.show('Student marked OUT!', ToastAndroid.SHORT);
    //         await loadStudents(); // Refresh list after marking OUT
    //     } catch (err) {
    //         const msg = err?.response?.data?.message || 'Failed to mark OUT';
    //         ToastAndroid.show(msg, ToastAndroid.SHORT);
    //     } finally {
    //         setLoadingId(null);
    //     }
    // };

    const handleMarkOut = async (studentId) => {
        setLoadingId(studentId);
        try {
            await markStudentOut(studentId);
            ToastAndroid.show('Student marked OUT!', ToastAndroid.SHORT);
            // Remove student from local state
            setStudents(prev => prev.filter(student => student._id !== studentId));
        } catch (err) {
            const msg = err?.response?.data?.message || 'Failed to mark OUT';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } finally {
            setLoadingId(null);
        }
    };


    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.profilePic || 'https://via.placeholder.com/50' }}
                style={styles.avatar}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.mobile}>Roll: {item.rollNumber}</Text>
            </View>
            <TouchableOpacity
                style={[styles.button, loadingId === item._id && styles.buttonDisabled]}
                onPress={() => handleMarkOut(item._id)}
                disabled={loadingId === item._id}
            >
                {loadingId === item._id ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.btnText}>Mark OUT</Text>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Students</Text>
            {loadingList ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : students.length === 0 ? (
                <Text style={styles.emptyText}>No students found.</Text>
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={item => item._id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={students.length === 0 && styles.emptyContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9fb' },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 15, color: '#333' },
    emptyText: { textAlign: 'center', color: '#666', marginTop: 40 },
    emptyContainer: { flexGrow: 1, justifyContent: 'center' },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 18,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 2,
    },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: '600', color: '#333' },
    mobile: { fontSize: 14, color: '#888' },
    button: {
        backgroundColor: '#FF3B30',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 22,
    },
    buttonDisabled: {
        backgroundColor: '#f5a1a1',
    },
    btnText: { color: '#fff', fontWeight: '600' },
});

export default OutListScreen;
