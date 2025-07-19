import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { loginParent } from './parentApiService';

const ParentLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Validation Error', 'Please enter both email and password.');
            return;
        }

        try {
            setLoading(true);
            const response = await loginParent(email, password);
            console.log('✅ Parent login success:', response);
            Alert.alert('Login Success', 'Welcome!');
            navigation.replace('Parentdaycare');
        } catch (error) {
            const msg = error?.response?.data?.message || 'Invalid credentials or server error.';
            Alert.alert('Login Failed', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.card}>
                    <Text style={styles.title}>👨‍👩‍👧 Parent Login</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#aaa"
                    />

                    <TouchableOpacity
                        style={[styles.button, loading && styles.disabledButton]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default ParentLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 14,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#2980b9',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    disabledButton: {
        backgroundColor: '#7f8c8d',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});



// import React, { useState } from 'react';
// import {
//     View,
//     TextInput,
//     Text,
//     StyleSheet,
//     Alert,
//     TouchableOpacity,
//     KeyboardAvoidingView,
//     Platform,
//     ActivityIndicator,
//     TouchableWithoutFeedback,
//     Keyboard
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loginParent } from './parentApiService';

// const ParentLogin = ({ navigation }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const handleLogin = async () => {
//         if (!email || !password) {
//             Alert.alert('Validation Error', 'Please enter both email and password.');
//             return;
//         }

//         try {
//             setLoading(true);
//             const response = await loginParent(email, password);
//             console.log('✅ Parent login success:', response);

//             const { user, token } = response.data || {};
//             const userId = user?._id;

//             console.log('userId:', userId, 'token:', token);

//             if (userId) {
//                 await AsyncStorage.setItem('parentUserId', userId);
//             } else {
//                 await AsyncStorage.removeItem('parentUserId');
//             }

//             if (token) {
//                 await AsyncStorage.setItem('parentToken', token);
//             } else {
//                 await AsyncStorage.removeItem('parentToken');
//             }

//             Alert.alert('Login Success', 'Welcome!');
//             navigation.replace('Parentdaycare');
//         } catch (error) {
//             const msg = error?.response?.data?.message || 'Invalid credentials or server error.';
//             Alert.alert('Login Failed', msg);
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <KeyboardAvoidingView
//                 style={styles.container}
//                 behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//             >
//                 <View style={styles.card}>
//                     <Text style={styles.title}>👨‍👩‍👧 Parent Login</Text>

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         value={email}
//                         onChangeText={setEmail}
//                         autoCapitalize="none"
//                         keyboardType="email-address"
//                         placeholderTextColor="#aaa"
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Password"
//                         value={password}
//                         onChangeText={setPassword}
//                         secureTextEntry
//                         placeholderTextColor="#aaa"
//                     />

//                     <TouchableOpacity
//                         style={[styles.button, loading && styles.disabledButton]}
//                         onPress={handleLogin}
//                         disabled={loading}
//                     >
//                         {loading ? (
//                             <ActivityIndicator color="#fff" />
//                         ) : (
//                             <Text style={styles.buttonText}>Login</Text>
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </KeyboardAvoidingView>
//         </TouchableWithoutFeedback>
//     );
// };

// export default ParentLogin;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor: '#ecf0f1',
//         padding: 16,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         padding: 24,
//         elevation: 4,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//     },
//     title: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: '#2c3e50',
//         marginBottom: 24,
//         textAlign: 'center',
//     },
//     input: {
//         height: 48,
//         borderColor: '#bdc3c7',
//         borderWidth: 1,
//         borderRadius: 12,
//         marginBottom: 16,
//         paddingHorizontal: 14,
//         fontSize: 16,
//         backgroundColor: '#f9f9f9',
//     },
//     button: {
//         backgroundColor: '#2980b9',
//         borderRadius: 12,
//         paddingVertical: 14,
//         alignItems: 'center',
//         marginTop: 8,
//     },
//     disabledButton: {
//         backgroundColor: '#7f8c8d',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });
