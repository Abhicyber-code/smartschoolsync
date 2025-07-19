import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

const USERS = [
    {
        id: '1',
        name: 'Omkar Jadhav',
        className: '10th A',
        dp: 'https://i.pravatar.cc/150?img=1',
        lastMessageTime: '10:45 AM',
    },
    {
        id: '2',
        name: 'Sneha Patil',
        className: '9th B',
        dp: 'https://i.pravatar.cc/150?img=2',
        lastMessageTime: 'Yesterday',
    },
    {
        id: '3',
        name: 'Rahul Shinde',
        className: '8th C',
        dp: 'https://i.pravatar.cc/150?img=3',
        lastMessageTime: 'Mon',
    },
    {
        id: '4',
        name: 'Aarti Pawar',
        className: '7th A',
        dp: 'https://i.pravatar.cc/150?img=4',
        lastMessageTime: 'Sat',
    },

];

const ChatListScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const filteredUsers = USERS.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search students..."
                value={search}
                onChangeText={setSearch}
                style={styles.searchBar}
                placeholderTextColor="#999"
            />

            <FlatList
                data={filteredUsers}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Chat', { user: item })}
                    >
                        <Image source={{ uri: item.dp }} style={styles.dp} />
                        <View style={styles.userInfo}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.className}>{item.className}</Text>
                        </View>
                        <Text style={styles.time}>{item.lastMessageTime}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AllStudentsChatScreen')}
            >
                <Ionicons name="person-add" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    searchBar: {
        margin: 16,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: '#f2f2f7',
        borderRadius: 12,
        fontSize: 16,
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },

    dp: {
        width: 52,
        height: 52,
        borderRadius: 26,
        marginRight: 14,
    },

    userInfo: {
        flex: 1,
    },

    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },

    className: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },

    time: {
        fontSize: 12,
        color: '#999',
    },

    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
    },

    fabText: {
        fontSize: 34,
        color: '#fff',
        fontWeight: '600',
        includeFontPadding: false,
        textAlignVertical: 'center',
        textAlign: 'center',
        marginTop: -15,
    },

});

export default ChatListScreen;


