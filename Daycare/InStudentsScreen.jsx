// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // For icon

// const InStudentsScreen = ({ route, navigation }) => {
//     // Destructure params and provide a fallback empty array for filteredStudents
//     const { selectedClass, selectedDivision, filteredStudents = [], setOutStudents } = route.params || {}; // Get `setOutStudents` from params
//     const [inStudents, setInStudents] = useState(
//         Array.isArray(filteredStudents) ? filteredStudents.filter((student) => student.daycareStatus === 'IN') : []
//     );

//     useEffect(() => {
//         console.log('Filtered Students passed to InStudentsScreen:', filteredStudents);
//     }, [filteredStudents]);

//     // Function to handle marking the student OUT
//     const handleMarkOut = (studentId) => {
//         const studentToMove = inStudents.find((student) => student.id === studentId);

//         if (studentToMove) {
//             // Add the student to OutStudents
//             setOutStudents((prevOutStudents) => [...prevOutStudents, { ...studentToMove, daycareStatus: 'OUT' }]);

//             // Remove student from IN list
//             setInStudents((prevInStudents) => prevInStudents.filter((student) => student.id !== studentId));

//             Alert.alert('Student marked OUT', `${studentToMove.name} is now marked as OUT.`);
//         }
//     };

//     const renderItem = ({ item }) => (
//         <View style={styles.studentCard}>
//             <Image source={{ uri: item.photo }} style={styles.studentImage} />
//             <View style={styles.studentInfo}>
//                 <Text style={styles.studentName}>{item.name}</Text>
//                 <Text style={styles.studentDetails}>Mobile: {item.mobileNo}</Text> {/* Show mobile number */}
//                 <TouchableOpacity
//                     style={styles.markOutButton}
//                     onPress={() => handleMarkOut(item._id)}
//                 >
//                     <Icon name="times" size={20} color="white" />
//                     <Text style={styles.buttonText}>Mark OUT</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>
//                 Students who are IN - {selectedClass} {selectedDivision}
//             </Text>

//             {inStudents.length === 0 ? (
//                 <Text style={styles.noStudentsText}>No students are currently marked as IN.</Text>
//             ) : (
//                 <FlatList
//                     data={inStudents}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={renderItem}
//                 />
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: '#f9fafe',
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: '600',
//         color: '#1c1c1e',
//         marginBottom: 30,
//     },
//     studentCard: {
//         flexDirection: 'row',
//         padding: 10,
//         marginBottom: 10,
//         backgroundColor: '#ffffff',
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//         elevation: 4,
//     },
//     studentImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 15,
//     },
//     studentInfo: {
//         justifyContent: 'center',
//     },
//     studentName: {
//         fontSize: 18,
//         fontWeight: '500',
//     },
//     studentDetails: {
//         fontSize: 14,
//         color: '#555',
//     },
//     noStudentsText: {
//         fontSize: 16,
//         color: '#888',
//         textAlign: 'center',
//     },
//     markOutButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#ff3b30', // Red background for the button
//         paddingVertical: 8,
//         paddingHorizontal: 12,
//         borderRadius: 12, // Rounded corners
//         marginTop: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 4,
//         elevation: 5, // Slight elevation for the shadow
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: '600',
//         marginLeft: 8,
//     },
// });

// export default InStudentsScreen;
