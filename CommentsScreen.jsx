

import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, Image, TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CommentsScreen({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const comments = [
        { id: '1', userType: 'Teacher', message: 'Speech compitition on thursday!', date: '2025-03-25', time: '10:15 AM', avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        { id: '2', userType: 'Admin', message: 'New ID cards will be distributed by the end of this month.', date: '2025-03-24', time: '2:30 PM', avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png' },
        { id: '3', userType: 'Principle', message: 'Our school is launching new extracurricular programs; stay tuned!', date: '2025-03-26', time: '4:45 PM', avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        { id: '4', userType: 'Teacher', message: 'Assignment check completed.', date: '2025-03-25', time: '6:45 PM', avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        { id: '5', userType: 'Teacher', message: 'Assignment check completed.', date: '2025-03-23', time: '4:45 PM', avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        { id: '6', userType: 'Admin', message: 'School trip is scheduled on monday.', date: '2025-03-27', time: '3:15 PM', avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        { id: '2', userType: 'Admin', message: 'All students are reminded to clear pending fees before the due date.', date: '2025-03-25', time: '3:17 PM', avatar: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png' },
    ];

    // Filter comments by selected date
    const filteredComments = comments.filter(comment => comment.date === selectedDate.toISOString().split('T')[0]);

    return (
        <View style={styles.container}>
            {/* Date Picker Button */}
            <TouchableOpacity style={styles.selectDateButton} onPress={() => setShowPicker(true)}>
                <Text style={styles.selectDateText}> Select Date</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default" 
                    onChange={(event, date) => {
                        setShowPicker(false);
                        if (date) setSelectedDate(date);
                    }}
                />
            )}

            {/* Comments List */}
            {filteredComments.length > 0 ? (
                <FlatList
                    data={filteredComments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.commentCard}
                            onPress={() => navigation.navigate('ChatsScreen', { comment: item })}
                        >
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            <View style={styles.textContainer}>
                                <Text style={styles.userType}>Comment from: {item.userType}</Text>
                                <Text style={styles.message}>{item.message}</Text>
                                <Text style={styles.date}>🗓 {new Date(item.date).toDateString()} ⏰ {item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={styles.noCommentsContainer}>
                    <Text style={styles.noComments}>No comments for this day.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    selectDateButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 10,
    },
    selectDateText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    commentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    userType: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    message: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    date: {
        fontSize: 12,
        color: 'gray',
    },
    noCommentsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noComments: {
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold',
    },
});
