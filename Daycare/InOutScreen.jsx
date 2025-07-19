// import React, { useState } from 'react';
// import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Picker } from '@react-native-picker/picker';
// import daycareStudents from './daycareStudents';

// const InOutScreen = () => {
//     const navigation = useNavigation();

//     const [selectedClass, setSelectedClass] = useState('');
//     const [selectedDivision, setSelectedDivision] = useState('');

//     const filteredStudents = daycareStudents.filter(
//         student =>
//             (!selectedClass || student.class === selectedClass) &&
//             (!selectedDivision || student.division === selectedDivision)
//     );

//     const handleNavigate = (status) => {
//         if (!selectedClass || !selectedDivision) {
//             Alert.alert('Please select class & division');
//             return;
//         }

//         // Filter students based on class, division, and status
//         const filteredStudents = daycareStudents.filter(
//             (s) =>
//                 s.class === selectedClass &&
//                 s.division === selectedDivision &&
//                 s.daycareStatus === status.toUpperCase()
//         );

//         // Navigate to the correct screen and pass the filtered students
//         navigation.navigate(`${status}StudentsScreen`, {
//             selectedClass,
//             selectedDivision,
//             filteredStudents, // Make sure you're passing this key
//         });
//     };



//     const uniqueClasses = [...new Set(daycareStudents.map(student => student.class))];
//     const uniqueDivisions = [...new Set(daycareStudents.map(student => student.division))];

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Manage Attendance</Text>

//             {/* Class Dropdown */}
//             <View style={styles.dropdownContainer}>
//                 <Text style={styles.label}>Class</Text>
//                 <View style={styles.pickerWrapper}>
//                     <Picker
//                         selectedValue={selectedClass}
//                         onValueChange={setSelectedClass}
//                         style={styles.picker}
//                         dropdownIconColor="#007aff"
//                     >
//                         <Picker.Item label="Select Class" value="" />
//                         {uniqueClasses.map((cls, idx) => (
//                             <Picker.Item key={idx} label={cls} value={cls} />
//                         ))}
//                     </Picker>
//                 </View>
//             </View>

//             {/* Division Dropdown */}
//             <View style={styles.dropdownContainer}>
//                 <Text style={styles.label}>Division</Text>
//                 <View style={styles.pickerWrapper}>
//                     <Picker
//                         selectedValue={selectedDivision}
//                         onValueChange={setSelectedDivision}
//                         style={styles.picker}
//                         dropdownIconColor="#007aff"
//                     >
//                         <Picker.Item label="Select Division" value="" />
//                         {uniqueDivisions.map((div, idx) => (
//                             <Picker.Item key={idx} label={div} value={div} />
//                         ))}
//                     </Picker>
//                 </View>
//             </View>

//             {/* Buttons */}
//             <View style={styles.buttonRow}>
//                 <Pressable
//                     onPress={() => handleNavigate('In')}
//                     style={({ pressed }) => [
//                         styles.button,
//                         styles.inButton,
//                         pressed && styles.buttonPressed,
//                     ]}
//                 >
//                     <Icon name="log-in-outline" size={34} color="#007aff" />
//                     <Text style={styles.buttonText}>IN</Text>
//                 </Pressable>

//                 <Pressable
//                     onPress={() => handleNavigate('Out')}
//                     style={({ pressed }) => [
//                         styles.button,
//                         styles.outButton,
//                         pressed && styles.buttonPressed,
//                     ]}
//                 >
//                     <Icon name="log-out-outline" size={34} color="#ff3b30" />
//                     <Text style={styles.buttonText}>OUT</Text>
//                 </Pressable>
//             </View>
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
//     dropdownContainer: {
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '500',
//         marginBottom: 6,
//         color: '#333',
//     },
//     pickerWrapper: {
//         backgroundColor: '#ffffff',
//         borderRadius: 14,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOpacity: 0.05,
//         shadowRadius: 8,
//         overflow: 'hidden',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//         color: '#000',
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 40,
//         paddingHorizontal: 10,
//     },
//     button: {
//         width: 130,
//         height: 130,
//         borderRadius: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     inButton: {
//         backgroundColor: 'rgba(0,122,255,0.08)',
//     },
//     outButton: {
//         backgroundColor: 'rgba(255,59,48,0.08)',
//     },
//     buttonPressed: {
//         transform: [{ scale: 0.96 }],
//         opacity: 0.8,
//     },
//     buttonText: {
//         marginTop: 10,
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#1c1c1e',
//     },
// });

// export default InOutScreen;

