


import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ContactUsScreen = () => {
    const schoolName = 'XYZ Public School';
    const phoneNumber = '+919876543210';  // Change this to the actual number
    const email = 'contact@xyzschool.com'; // Change this to the actual email
    const logoUrl = 'https://your-school-logo-url.com/logo.png'; // Replace with your actual logo URL

    return (
        <View style={styles.container}>
            {/* School Logo */}
            <Image source={{ uri: logoUrl }} style={styles.logo} />

            {/* School Name */}
            <Text style={styles.schoolName}>{schoolName}</Text>

            {/* Contact Info */}
            <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.infoBox} onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
                    <Text style={styles.infoText}>📞 {phoneNumber}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoBox} onPress={() => Linking.openURL(`mailto:${email}`)}>
                    <Text style={styles.infoText}>📧 {email}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8F0FE',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#007BFF',
    },
    schoolName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    infoContainer: {
        width: '90%',
        alignItems: 'center',
    },
    infoBox: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 18,
        color: '#007BFF',
        fontWeight: '500',
    },
});

export default ContactUsScreen;