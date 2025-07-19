// import React, { useEffect } from 'react';
// import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// const OutStudentsScreen = ({ route }) => {
//     const { selectedClass, selectedDivision, filteredStudents } = route.params || {};

//     // Log to ensure the filteredStudents is passed correctly
//     useEffect(() => {
//         console.log('Filtered Students passed to OutStudentsScreen:', filteredStudents);
//     }, [filteredStudents]);

//     // Check if filteredStudents exists and filter them
//     const outStudents = filteredStudents ? filteredStudents.filter(student => student.daycareStatus === 'OUT') : [];

//     console.log('Out Students after filtering:', outStudents);  // Log after filtering to check the result

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>
//                 Students who are OUT - {selectedClass} {selectedDivision}
//             </Text>

//             {/* Check if there are no students marked as OUT */}
//             {outStudents.length === 0 ? (
//                 <Text style={styles.noStudentsText}>No students are currently marked as OUT.</Text>
//             ) : (
//                 <FlatList
//                     data={outStudents}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                         <View style={styles.studentCard}>
//                             <Image source={{ uri: item.photo }} style={styles.studentImage} />
//                             <View style={styles.studentInfo}>
//                                 <Text style={styles.studentName}>{item.name}</Text>
//                                 <Text style={styles.studentDetails}>
//                                     Age: {item.age} | Check-out: {item.checkOutTime || 'N/A'}
//                                 </Text>
//                             </View>
//                         </View>
//                     )}
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
//     noStudentsText: {
//         fontSize: 18,
//         fontWeight: '500',
//         color: '#ff3b30',
//         textAlign: 'center',
//         marginTop: 20,
//     },
//     studentCard: {
//         flexDirection: 'row',
//         marginBottom: 20,
//         borderRadius: 12,
//         overflow: 'hidden',
//         backgroundColor: '#fff',
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//     },
//     studentImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         marginRight: 20,
//     },
//     studentInfo: {
//         justifyContent: 'center',
//     },
//     studentName: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#333',
//     },
//     studentDetails: {
//         fontSize: 14,
//         fontWeight: '400',
//         color: '#777',
//     },
// });

// export default OutStudentsScreen;


