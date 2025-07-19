import React, { useState } from 'react';
import {
    View, TextInput, Text, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AuthScreen = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    const handleLogin = async () => {
        if (username.trim() === '' || password.trim() === '') {
            Alert.alert("Error", "Both fields are required.");
            return;
        }

        if (username === 'Admin' && password === '1234') {
            await AsyncStorage.setItem('userToken', 'dummy_token');
            setIsLoggedIn(true);
        } else {
            Alert.alert("Login Failed", "Invalid username or password.");
        }
    };

    return (
        <View style={styles.container}>
            <MaterialIcons name="school" size={80} color="#007AFF" style={styles.icon} />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to continue</Text>

            <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={24} color="#555" />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#888"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={24} color="#555" />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <MaterialIcons name={secureText ? "visibility-off" : "visibility"} size={24} color="#555" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        elevation: 2,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 15,
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#007AFF',
        width: '90%',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AuthScreen;
