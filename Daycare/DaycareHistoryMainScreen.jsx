// // DaycareHistoryMainScreen.tsx
// import React from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // import icon

// const students = [
//     {
//         id: '1',
//         name: 'Omkar Jadhav',
//         division: 'A',
//         profile: 'https://i.pravatar.cc/150?img=1',
//     },
//     {
//         id: '2',
//         name: 'Snehal Patil',
//         division: 'B',
//         profile: 'https://i.pravatar.cc/150?img=2',
//     },
//     // Add more students
// ];

// const DaycareHistoryMainScreen = () => {
//     const navigation = useNavigation();

//     const renderStudent = ({ item }: any) => (
//         <TouchableOpacity
//             style={styles.card}
//             onPress={() => navigation.navigate('StudentDaycareDetail', { student: item })}
//         >
//             <Image source={{ uri: item.profile }} style={styles.profileImage} />
//             <View style={styles.info}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.division}>Division: {item.division}</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={24} color="gray" /> {/* Arrow Icon */}
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={students}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderStudent}
//                 contentContainerStyle={{ padding: 16 }}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     card: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 12,
//         backgroundColor: '#f5f5f5',
//         borderRadius: 12,
//         marginBottom: 12,
//         elevation: 2,
//     },
//     profileImage: {
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//         marginRight: 12,
//     },
//     info: {
//         flex: 1,
//     },
//     name: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     division: {
//         fontSize: 14,
//         color: 'gray',
//     },
// });

// export default DaycareHistoryMainScreen;


// DaycareHistoryMainScreen.tsx

// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     FlatList,
//     Image,
//     TouchableOpacity,
//     StyleSheet,
//     ActivityIndicator,
//     ToastAndroid,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { getDaycareHistory } from './apiService'; // 👈 Import from your API service

// type Student = {
//     id: string;
//     name: string;
//     division: string;
//     profile: string;
// };

// const students: Student[] = [
//     {
//         id: '1',
//         name: 'Omkar Jadhav',
//         division: 'A',
//         profile: 'https://i.pravatar.cc/150?img=1',
//     },
//     {
//         id: '2',
//         name: 'Snehal Patil',
//         division: 'B',
//         profile: 'https://i.pravatar.cc/150?img=2',
//     },
//     // Add more students
// ];

// const DaycareHistoryMainScreen = () => {
//     const navigation = useNavigation();
//     const [loadingId, setLoadingId] = useState(null);


//     const onStudentPress = async (student: Student) => {
//         try {
//             console.log('Fetching history for:', student.name);
//             setLoadingId(student.id);

//             const toDate = new Date().toISOString().slice(0, 10);
//             const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

//             const response = await getDaycareHistory(student.id, fromDate, toDate);

//             navigation.navigate('StudentDaycareDetail', {
//                 student,
//                 history: response.data,
//             });
//         } catch (error) {
//             console.error('API Error:', error);
//             ToastAndroid.show('Failed to fetch history', ToastAndroid.SHORT);
//         } finally {
//             setLoadingId(null);
//         }
//     };

// const onStudentPress = async (student: Student) => {
//     try {
//         console.log('Fetching history for:', student.name);
//         setLoadingId(student.id);

//         const fromDate = '2025-05-30';
//         const toDate = '2025-06-01';
//         const response = await getDaycareHistory(student.id, fromDate, toDate);

//         console.log('API Success:', response);

//         navigation.navigate('StudentDaycareDetail', {
//             student,
//             history: response.data,
//         });
//     } catch (error) {
//         console.error('API Error:', error);
//         ToastAndroid.show('Failed to fetch history', ToastAndroid.SHORT);
//     } finally {
//         setLoadingId(null);
//     }
// };

//     const renderStudent = ({ item }: { item: Student }) => (
//         <TouchableOpacity style={styles.card} onPress={() => onStudentPress(item)}>
//             <Image source={{ uri: item.profile }} style={styles.profileImage} />
//             <View style={styles.info}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.division}>Division: {item.division}</Text>
//             </View>
//             {loadingId === item.id ? (
//                 <ActivityIndicator size="small" color="#999" />
//             ) : (
//                 <Ionicons name="chevron-forward" size={24} color="gray" />
//             )}
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={students}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderStudent}
//                 contentContainerStyle={{ padding: 16 }}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     card: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 12,
//         backgroundColor: '#f5f5f5',
//         borderRadius: 12,
//         marginBottom: 12,
//         elevation: 2,
//     },
//     profileImage: {
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//         marginRight: 12,
//     },
//     info: {
//         flex: 1,
//     },
//     name: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     division: {
//         fontSize: 14,
//         color: 'gray',
//     },
// });

// export default DaycareHistoryMainScreen;

// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     FlatList,
//     Image,
//     TouchableOpacity,
//     StyleSheet,
//     ActivityIndicator,
//     ToastAndroid,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { getDaycareHistory, getStudentList } from './apiService';

// /**
//  * @typedef {Object} Student
//  * @property {string} _id
//  * @property {string} name
//  * @property {string} division
//  * @property {string} [profile]
//  */

// const DaycareHistoryMainScreen = () => {
//     const navigation = useNavigation();

//     // students state as array, no generic syntax here for .jsx files
//     const [students, setStudents] = useState([]);
//     // loadingId is string or null
//     const [loadingId, setLoadingId] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchStudents = async () => {
//             try {
//                 const studentData = await getStudentList();
//                 setStudents(studentData);

//                 ToastAndroid.show('Student list fetched successfully', ToastAndroid.SHORT);
//                 console.log('📦 Fetched students:', studentData);
//             } catch (error) {
//                 ToastAndroid.show('Failed to load students', ToastAndroid.SHORT);
//                 console.error('❌ Error fetching students:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchStudents();
//     }, []);


//     // const onStudentPress = async (student) => {
//     //     try {
//     //         setLoadingId(student._id);
//     //         const fromDate = '2025-05-31';
//     //         const toDate = '2025-06-07';

//     //         const response = await getDaycareHistory(student._id, fromDate, toDate);

//     //         navigation.navigate('StudentDaycareDetail', {
//     //             student,
//     //             history: response.data,
//     //         });
//     //     } catch (error) {
//     //         ToastAndroid.show('Failed to fetch history', ToastAndroid.SHORT);
//     //     } finally {
//     //         setLoadingId(null);
//     //     }
//     // };


//     const onStudentPress = async (student) => {
//         try {
//             const fromDate = '2025-05-01';
//             const toDate = '2025-06-07';

//             // Fetch daycare history for the selected student
//             const result = await getDaycareHistory(student._id, fromDate, toDate);

//             if (result.success) {
//                 // Show success toast once
//                 ToastAndroid.showWithGravity(
//                     'History fetched successfully',
//                     ToastAndroid.SHORT,
//                     ToastAndroid.BOTTOM
//                 );

//                 console.log('✅ Daycare history:', result.data);

//                 // Navigate to detail screen with necessary params
//                 navigation.navigate('StudentDaycareDetail', {
//                     studentId: student._id,
//                     studentName: student.name,
//                     history: result.data,
//                 });
//             } else {
//                 // Show failure toast once with message from API
//                 ToastAndroid.showWithGravity(
//                     `Failed to fetch history: ${result.message}`,
//                     ToastAndroid.SHORT,
//                     ToastAndroid.BOTTOM
//                 );

//                 console.warn('API failure:', result.message);
//             }
//         } catch (error) {
//             // Show error toast once
//             ToastAndroid.showWithGravity(
//                 'Error fetching history. Please try again.',
//                 ToastAndroid.SHORT,
//                 ToastAndroid.BOTTOM
//             );

//             console.error('❌ Fetch history error:', error);
//         }
//     };



//     const renderStudent = ({ item }) => (
//         <TouchableOpacity style={styles.card} onPress={() => onStudentPress(item)}>
//             <Image
//                 source={{
//                     uri: item.profile || 'https://i.pravatar.cc/150?img=3', // fallback image
//                 }}
//                 style={styles.profileImage}
//             />
//             <View style={styles.info}>
//                 <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
//                 <Text style={styles.division}>Division: {item.section}</Text>
//             </View>
//             {loadingId === item._id ? (
//                 <ActivityIndicator size="small" color="#999" />
//             ) : (
//                 <Ionicons name="chevron-forward" size={24} color="gray" />
//             )}
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             {isLoading ? (
//                 <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
//             ) : (
//                 <FlatList
//                     data={students}
//                     keyExtractor={(item) => item._id}
//                     renderItem={renderStudent}
//                     contentContainerStyle={{ padding: 16 }}
//                 />
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     card: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 12,
//         backgroundColor: '#f5f5f5',
//         borderRadius: 12,
//         marginBottom: 12,
//         elevation: 2,
//     },
//     profileImage: {
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//         marginRight: 12,
//     },
//     info: {
//         flex: 1,
//     },
//     name: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: 'black',  // force black color
//     },
//     division: {
//         fontSize: 14,
//         color: 'black',  // force black color
//     },

// });

// export default DaycareHistoryMainScreen;



import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDaycareHistory, getStudentList } from '../apiService';

/**
 * @typedef {Object} Student
 * @property {string} _id
 * @property {string} name
 * @property {string} division
 * @property {string} [profile]
 */

const DaycareHistoryMainScreen = () => {
    const navigation = useNavigation();

    // students state as array, no generic syntax here for .jsx files
    const [students, setStudents] = useState([]);
    // loadingId is string or null
    const [loadingId, setLoadingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentData = await getStudentList();
                setStudents(studentData);

                ToastAndroid.show('Student list fetched successfully', ToastAndroid.SHORT);
                console.log('📦 Fetched students:', studentData);
            } catch (error) {
                ToastAndroid.show('Failed to load students', ToastAndroid.SHORT);

            } finally {
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, []);


    const onStudentPress = async (student) => {
        try {
            setLoadingId(student._id);
            const fromDate = '2025-05-31';
            const toDate = '2025-06-07';

            const response = await getDaycareHistory(student._id, fromDate, toDate);

            navigation.navigate('StudentDaycareDetail', {
                student,
                history: response.data,
            });
        } catch (error) {
            ToastAndroid.show('Failed to fetch history', ToastAndroid.SHORT);
        } finally {
            setLoadingId(null);
        }
    };

    const renderStudent = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => onStudentPress(item)}>
            <Image
                source={{
                    uri: item.profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJxOLfDct_vEPdS-6OsRnS-kDl_HCv5nI2A&s', // fallback image
                }}
                style={styles.profileImage}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.division}>Division: {item.section}</Text>
            </View>
            {loadingId === item._id ? (
                <ActivityIndicator size="small" color="#999" />
            ) : (
                <Ionicons name="chevron-forward" size={24} color="gray" />
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={(item) => item._id}
                    renderItem={renderStudent}
                    contentContainerStyle={{ padding: 16 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',  // force black color
    },
    division: {
        fontSize: 14,
        color: 'black',  // force black color
    },

});

export default DaycareHistoryMainScreen;
