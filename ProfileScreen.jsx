

import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Image, TouchableOpacity,
    StyleSheet, Alert, PermissionsAndroid, Platform
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const ProfileScreen = () => {
    const [profilePic, setProfilePic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2nkf_DZC_tTOzZPiAVaJ1GCgpdGQL0VnP5Q&s");
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "Abhijeet Gitte",
        standard: "10th",
        division: "A",
        phone: "9800000000",
        email: "abhi@example.com",
        address: "123, Main Street, City",
    });

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestCameraPermission();
        }
    }, []);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert("Permission Denied", "You need to enable camera access.");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleImagePicker = () => {
        if (!isEditing) return;
        Alert.alert("Profile Picture", "Choose an option", [
            { text: "Take Photo", onPress: launchCamera },
            { text: "Choose from Gallery", onPress: launchGallery },
            { text: "Remove Profile Photo", onPress: removeProfilePhoto },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const launchCamera = () => {
        ImagePicker.launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
            if (!response.didCancel && !response.error && response.assets) {
                setProfilePic(response.assets[0].uri);
            }
        });
    };

    const launchGallery = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error && response.assets) {
                setProfilePic(response.assets[0].uri);
            }
        });
    };

    const removeProfilePhoto = () => {
        setProfilePic('data:image/png;base64,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');
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (field, value) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handleImagePicker} style={styles.imageWrapper}>
                    <Image source={{ uri: profilePic }} style={styles.profileImage} />
                    {isEditing && <Text style={styles.editEmoji}>✏️</Text>}
                </TouchableOpacity>
                <Text style={styles.greeting}>Hello, {user.name}</Text>

                {/* Non-editable Standard & Division */}
                <View style={styles.nonEditableContainer}>
                    <Text style={styles.nonEditableText}>Standard: {user.standard}</Text>
                    <Text style={styles.nonEditableText}>Division: {user.division}</Text>
                </View>
            </View>

            <View style={styles.formContainer}>
                <EditableField label="Phone" value={user.phone} isEditing={isEditing} onChangeText={(text) => handleInputChange('phone', text)} />
                <EditableField label="Email" value={user.email} isEditing={isEditing} onChangeText={(text) => handleInputChange('email', text)} />
                <EditableField label="Address" value={user.address} isEditing={isEditing} onChangeText={(text) => handleInputChange('address', text)} />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleEdit}>
                <Text style={styles.buttonText}>{isEditing ? "Update" : "Edit Profile"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const EditableField = ({ label, value, isEditing, onChangeText }) => (
    <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
            />
        ) : (
            <Text style={styles.value}>{value}</Text>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#007bff',
    },
    editEmoji: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        fontSize: 18,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 3,
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#333',
    },
    nonEditableContainer: {
        marginTop: 5,
        alignItems: 'center',
    },
    nonEditableText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    formContainer: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    fieldContainer: {
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    value: {
        fontSize: 17,
        color: '#222',
        backgroundColor: '#f9f9f9',
        padding: 6,
        borderRadius: 5,
    },
    input: {
        fontSize: 15,
        color: '#222',
        backgroundColor: '#f9f9f9',
        padding: 6,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
        paddingHorizontal: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
