import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

const DaycareHistoryScreen = () => {
    const historyData = [
        { date: '2025-04-12', activity: 'John Doe checked in' },
        { date: '2025-04-11', activity: 'Jane Smith checked out' },
        { date: '2025-04-10', activity: 'Michael Brown checked in' },
        { date: '2025-04-09', activity: 'Emily Davis checked out' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daycare History</Text>

            <FlatList
                data={historyData}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.historyItem}>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.activity}>{item.activity}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f9fafc',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    historyItem: {
        padding: 15,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    date: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    activity: {
        fontSize: 16,
        color: '#666',
        marginTop: 6,
    },
});

export default DaycareHistoryScreen;
