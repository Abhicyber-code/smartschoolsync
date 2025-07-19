 import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

const ChatScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); 

    const sendMessage = () => {
        if (message.trim() === '') return;

        const newMessage = {
            id: Date.now().toString(),
            text: message,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');
    };

    const pickImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.7 },
            (response) => {
                if (response.didCancel || response.errorCode) return;

                const asset = response.assets?.[0];
                if (asset) {
                    const newImageMessage = {
                        id: Date.now().toString(),
                        image: asset.uri,
                        sender: 'me',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    };
                    setMessages(prev => [...prev, newImageMessage]);
                }
            }
        );
    };

    const renderItem = ({ item }) => (
        <View
            style={[
                styles.messageBubble,
                item.sender === 'me' ? styles.myMessage : styles.otherMessage,
            ]}
        >
            {item.text && <Text style={styles.messageText}>{item.text}</Text>}
            {item.image && (
                <Image source={{ uri: item.image }} style={styles.messageImage} />
            )}
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#007AFF" />
                </TouchableOpacity>
                <Image source={{ uri: user.dp }} style={styles.dp} />
                <Text style={styles.name}>{user.name}</Text>
                <Ionicons name="call" size={24} color="#007AFF" style={styles.callIcon} />
            </View>

            {/* Messages */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.chatArea}
            />

            {/* Input */}
            <View style={styles.inputArea}>
                <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
                    <Ionicons name="image-outline" size={22} color="#555" />
                </TouchableOpacity>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message"
                    placeholderTextColor="#999"
                    style={styles.input}
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f2' },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 14,
        elevation: 4,
    },

    backButton: {
        paddingRight: 10,
    },

    dp: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },

    name: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        color: '#333',
    },

    callIcon: {
        padding: 4,
    },

    chatArea: {
        padding: 10,
        flexGrow: 1,
    },

    messageBubble: {
        maxWidth: '75%',
        borderRadius: 16,
        padding: 10,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },

    myMessage: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },

    otherMessage: {
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
    },

    messageText: {
        fontSize: 15,
        color: '#333',
    },

    messageImage: {
        width: 180,
        height: 180,
        borderRadius: 12,
        marginTop: 4,
    },

    messageTime: {
        fontSize: 11,
        color: '#555',
        marginTop: 4,
        alignSelf: 'flex-end',
    },

    inputArea: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    iconButton: {
        padding: 6,
        marginRight: 6,
    },

    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        marginRight: 6,
    },

    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 24,
        padding: 10,
    },
});

export default ChatScreen;

