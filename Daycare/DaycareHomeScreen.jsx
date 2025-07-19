// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Pressable,
//     Animated,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';

// const DaycareMainScreen = () => {
//     const navigation = useNavigation();

//     const handleNavigate = (screen) => {
//         navigation.navigate(screen);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Daycare</Text>

//             <DropCard
//                 icon="log-in"
//                 label="In / Out"
//                 onPress={() => handleNavigate('InOutScreen')}
//                 iconBg="#d0ebff"
//                 tint="#e6f4ff"
//             />

//             <DropCard
//                 icon="clock"
//                 label="Daycare History"
//                 onPress={() => handleNavigate('DaycareHistoryScreen')}
//                 iconBg="#e2f0cb"
//                 tint="#f0f9e8"
//             />
//         </View>
//     );
// };

// const DropCard = ({ label, onPress, icon, iconBg, tint }) => {
//     const scale = new Animated.Value(1);

//     const handlePressIn = () => {
//         Animated.spring(scale, {
//             toValue: 0.96,
//             useNativeDriver: true,
//         }).start();
//     };

//     const handlePressOut = () => {
//         Animated.spring(scale, {
//             toValue: 1,
//             useNativeDriver: true,
//         }).start();
//     };

//     return (
//         <Pressable
//             onPress={onPress}
//             onPressIn={handlePressIn}
//             onPressOut={handlePressOut}
//             style={{ marginBottom: 24 }}
//         >
//             <Animated.View style={[styles.dropdownCard, { transform: [{ scale }], backgroundColor: tint }]}>
//                 <View style={styles.dropdownContent}>
//                     <View style={styles.left}>
//                         <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}>
//                             <Icon name={icon} size={22} color="#1c1c1e" />
//                         </View>
//                         <Text style={styles.dropdownText}>{label}</Text>
//                     </View>
//                     <Icon name="chevron-right" size={22} color="#1c1c1e" />
//                 </View>
//             </Animated.View>
//         </Pressable>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 70,
//         paddingHorizontal: 24,
//         backgroundColor: '#f9fafc',
//     },
//     title: {
//         fontSize: 34,
//         fontWeight: '700',
//         color: '#0f0f0f',
//         marginBottom: 40,
//         textAlign: 'center',
//         letterSpacing: 0.3,
//     },
//     dropdownCard: {
//         borderRadius: 22,
//         paddingVertical: 18,
//         paddingHorizontal: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 10 },
//         shadowOpacity: 0.06,
//         shadowRadius: 12,
//         elevation: 5,
//     },
//     dropdownContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     left: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     iconWrapper: {
//         width: 42,
//         height: 42,
//         borderRadius: 12,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 14,
//     },
//     dropdownText: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#1c1c1e',
//     },
// });

// export default DaycareMainScreen;


import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const DaycareMainScreen = () => {
    const navigation = useNavigation();

    const handleNavigate = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daycare</Text>

            <Pressable
                onPress={() => handleNavigate('InOutScreen')}
                style={styles.card}
            >
                <View style={styles.cardContent}>
                    <Icon name="log-in" size={50} color="#1c1c1e" />
                    <Text style={styles.cardText}>In/Out</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={() => handleNavigate('DaycareHistoryScreen')}
                style={styles.card}
            >
                <View style={styles.cardContent}>
                    <Icon name="clock" size={50} color="#1c1c1e" />
                    <Text style={styles.cardText}>Daycare History</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 24,
        backgroundColor: '#f9fafc',
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        color: '#0f0f0f',
        marginBottom: 40,
        textAlign: 'center',
        letterSpacing: 0.3,
    },
    card: {
        backgroundColor: '#e2f0cb',
        borderRadius: 20,
        marginBottom: 20,
        padding: 20,
        elevation: 5,
    },
    cardContent: {
        alignItems: 'center',
    },
    cardText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '600',
        color: '#1c1c1e',
    },
});

export default DaycareMainScreen;
