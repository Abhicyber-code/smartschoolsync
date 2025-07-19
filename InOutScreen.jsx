import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Animated,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const InOutScreen = () => {
    const navigation = useNavigation();
    const [selectedClass, setSelectedClass] = useState('1');
    const [selectedDivision, setSelectedDivision] = useState('A');
    const scaleIn = new Animated.Value(1);
    const scaleOut = new Animated.Value(1);

    const students = [
        { name: 'Omkar Jadhav', class: '1', division: 'A', status: 'IN' },
        { name: 'Sneha Patil', class: '1', division: 'A', status: 'OUT' },
        { name: 'Aditya Shinde', class: '1', division: 'A', status: 'IN' },
        { name: 'Priya Pawar', class: '1', division: 'A', status: 'OUT' },
        { name: 'Rohan More', class: '1', division: 'A', status: 'IN' },
    ];

    const handleNavigate = (type) => {
        const filtered = students.filter(
            (s) =>
                s.class === selectedClass &&
                s.division === selectedDivision &&
                s.status === type
        );
        navigation.navigate(type === 'IN' ? 'InList' : 'OutList', {
            students: filtered,
            selectedClass,
            selectedDivision,
        });
    };

    const animateButton = (scale, toValue) => {
        Animated.spring(scale, {
            toValue,
            useNativeDriver: true,
            friction: 5,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}> Class & Division</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Select Class</Text>
                <Picker
                    selectedValue={selectedClass}
                    onValueChange={(value) => setSelectedClass(value)}
                    style={styles.picker}
                    dropdownIconColor="#444"
                >
                    <Picker.Item label="Class 1" value="1" />
                    <Picker.Item label="Class 2" value="2" />
                </Picker>

                <Text style={styles.label}>Select Division</Text>
                <Picker
                    selectedValue={selectedDivision}
                    onValueChange={(value) => setSelectedDivision(value)}
                    style={styles.picker}
                    dropdownIconColor="#444"
                >
                    <Picker.Item label="Division A" value="A" />
                    <Picker.Item label="Division B" value="B" />
                </Picker>
            </View>

            <Text style={styles.subheading}>Mark Student Status</Text>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    onPress={() => handleNavigate('IN')}
                    onPressIn={() => animateButton(scaleIn, 0.95)}
                    onPressOut={() => animateButton(scaleIn, 1)}
                    activeOpacity={0.9}
                >
                    <Animated.View style={[styles.action, { transform: [{ scale: scaleIn }] }]}>
                        <LinearGradient
                            colors={['#0f9d58', '#34c759']}
                            style={styles.gradient}
                        >
                            <Icon name="log-in-outline" size={32} color="#fff" />
                            <Text style={styles.actionText}>IN</Text>
                        </LinearGradient>
                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleNavigate('OUT')}
                    onPressIn={() => animateButton(scaleOut, 0.95)}
                    onPressOut={() => animateButton(scaleOut, 1)}
                    activeOpacity={0.9}
                >
                    <Animated.View style={[styles.action, { transform: [{ scale: scaleOut }] }]}>
                        <LinearGradient
                            colors={['#f44336', '#ff3b30']}
                            style={styles.gradient}
                        >
                            <Icon name="log-out-outline" size={32} color="#fff" />
                            <Text style={styles.actionText}>OUT</Text>
                        </LinearGradient>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InOutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f8',
        padding: 24,
        paddingTop: 60,
    },
    header: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1c1c1e',
        marginBottom: 30,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 20,
        fontWeight: '600',
        color: '#555',
        textAlign: 'center',
        marginVertical: 30,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        elevation: 6,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
        marginTop: 12,
    },
    picker: {
        height: Platform.OS === 'ios' ? 180 : 50,
        backgroundColor: '#f0f0f5',
        borderRadius: 12,
        color: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 12,
    },
    action: {
        width: 120,
        height: 120,
        borderRadius: 36,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 12,
        elevation: 10,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    actionText: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 10,
        color: '#fff',
        letterSpacing: 0.5,
    },
});


// import React, { useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Platform,
//     Animated,
//     ActivityIndicator,
//     ToastAndroid,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// import LinearGradient from 'react-native-linear-gradient';
// import { getStudentList } from './apiService'; // your API file


// const InOutScreen = () => {
//     const navigation = useNavigation();
//     const [selectedClass, setSelectedClass] = useState('Nursery');
//     const [selectedDivision, setSelectedDivision] = useState('A');
//     const [loading, setLoading] = useState(false);

//     const scaleIn = useRef(new Animated.Value(1)).current;
//     const scaleOut = useRef(new Animated.Value(1)).current;


//     const handleNavigate = async (type: 'IN' | 'OUT') => {
//         setLoading(true);
//         try {
//             const allStudents = await getStudentList(selectedClass, selectedDivision);

//             // Pass full list to next screen
//             navigation.navigate(type === 'IN' ? 'OutList' : 'InList', {
//                 students: allStudents,
//                 selectedClass,
//                 selectedDivision,
//             });
//         } catch (error) {
//             ToastAndroid.show('Failed to load students', ToastAndroid.SHORT);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Class & Division</Text>

//             <View style={styles.card}>
//                 <Text style={styles.label}>Select Class</Text>
//                 <Picker
//                     selectedValue={selectedClass}
//                     onValueChange={(value) => setSelectedClass(value)}
//                     style={styles.picker}
//                     dropdownIconColor="#444"
//                 >
//                     <Picker.Item label="Nursery" value="Nursery" />
//                     <Picker.Item label="1st" value="1" />
//                     <Picker.Item label="2nd" value="2" />
//                 </Picker>

//                 <Text style={styles.label}>Select Division</Text>
//                 <Picker
//                     selectedValue={selectedDivision}
//                     onValueChange={(value) => setSelectedDivision(value)}
//                     style={styles.picker}
//                     dropdownIconColor="#444"
//                 >
//                     <Picker.Item label="A" value="A" />
//                     <Picker.Item label="B" value="B" />
//                 </Picker>
//             </View>

//             <Text style={styles.subheading}>Mark Student Status</Text>

//             {loading ? (
//                 <ActivityIndicator size="large" color="#007aff" />
//             ) : (
//                 <View style={styles.buttonRow}>
//                     <TouchableOpacity
//                         onPress={() => handleNavigate('IN')}
//                         onPressIn={() => animateButton(scaleIn, 0.95)}
//                         onPressOut={() => animateButton(scaleIn, 1)}
//                         activeOpacity={0.9}
//                     >
//                         <Animated.View style={[styles.action, { transform: [{ scale: scaleIn }] }]}>
//                             <LinearGradient colors={['#0f9d58', '#34c759']} style={styles.gradient}>
//                                 <Icon name="log-in-outline" size={32} color="#fff" />
//                                 <Text style={styles.actionText}>IN</Text>
//                             </LinearGradient>
//                         </Animated.View>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         onPress={() => handleNavigate('OUT')}
//                         onPressIn={() => animateButton(scaleOut, 0.95)}
//                         onPressOut={() => animateButton(scaleOut, 1)}
//                         activeOpacity={0.9}
//                     >
//                         <Animated.View style={[styles.action, { transform: [{ scale: scaleOut }] }]}>
//                             <LinearGradient colors={['#f44336', '#ff3b30']} style={styles.gradient}>
//                                 <Icon name="log-out-outline" size={32} color="#fff" />
//                                 <Text style={styles.actionText}>OUT</Text>
//                             </LinearGradient>
//                         </Animated.View>
//                     </TouchableOpacity>
//                 </View>
//             )}
//         </View>
//     );
// };

// export default InOutScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f2f4f8',
//         padding: 24,
//         paddingTop: 60,
//     },
//     header: {
//         fontSize: 28,
//         fontWeight: '800',
//         color: '#1c1c1e',
//         marginBottom: 30,
//         textAlign: 'center',
//     },
//     subheading: {
//         fontSize: 20,
//         fontWeight: '600',
//         color: '#555',
//         textAlign: 'center',
//         marginVertical: 30,
//     },
//     card: {
//         backgroundColor: '#ffffff',
//         borderRadius: 20,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOpacity: 0.05,
//         shadowOffset: { width: 0, height: 10 },
//         shadowRadius: 20,
//         elevation: 6,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#333',
//         marginBottom: 6,
//         marginTop: 12,
//     },
//     picker: {
//         height: Platform.OS === 'ios' ? 180 : 50,
//         backgroundColor: '#f0f0f5',
//         borderRadius: 12,
//         color: '#333',
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         marginTop: 12,
//     },
//     action: {
//         width: 120,
//         height: 120,
//         borderRadius: 36,
//         overflow: 'hidden',
//         shadowColor: '#000',
//         shadowOpacity: 0.15,
//         shadowOffset: { width: 0, height: 8 },
//         shadowRadius: 12,
//         elevation: 10,
//     },
//     gradient: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 16,
//     },
//     actionText: {
//         fontSize: 20,
//         fontWeight: '700',
//         marginTop: 10,
//         color: '#fff',
//         letterSpacing: 0.5,
//     },
// });
