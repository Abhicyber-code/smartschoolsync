


import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EnquiryDetails = ({ route }) => {
    const { enquiries } = route.params;
    const [selectedClass, setSelectedClass] = useState('All');

    // Extract unique class names from enquiries
    const classOptions = ['All', ...new Set(enquiries.map(item => item.selectedClass))];

    // Filter enquiries based on selected class
    const filteredEnquiries = enquiries.filter(item => selectedClass === 'All' || item.selectedClass === selectedClass);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📋 Admission Enquiries</Text>

            {/* Class Selection Dropdown */}
            <Picker
                selectedValue={selectedClass}
                onValueChange={(itemValue) => setSelectedClass(itemValue)}
                style={styles.picker}
            >
                {classOptions.map((classItem, index) => (
                    <Picker.Item key={index} label={classItem} value={classItem} />
                ))}
            </Picker>

            <FlatList
                data={filteredEnquiries}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Child Name:</Text>
                            <Text style={styles.value}>{item.childName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Class:</Text>
                            <Text style={styles.value}>{item.selectedClass}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Enquiry Type:</Text>
                            <Text style={styles.value}>{item.enquiryType}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Father's Name:</Text>
                            <Text style={styles.value}>{item.fatherName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Mobile:</Text>
                            <Text style={styles.value}>{item.fatherMobile}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>DOB:</Text>
                            <Text style={styles.value}>{new Date(item.dob).toDateString()}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Follow-up:</Text>
                            <Text style={styles.value}>{new Date(item.followUpDate).toDateString()}</Text>
                        </View>
                        <View style={styles.commentBox}>
                            <Text style={styles.commentTitle}>Comments</Text>
                            <Text style={styles.commentText}>{item.comment}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#0D47A1' },
    picker: { height: 50, width: '100%', marginBottom: 10, backgroundColor: '#FFF', borderRadius: 8 },

    // Card Styling
    card: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#90CAF9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },

    // Label & Value Styling
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DDD',
    },
    label: { fontWeight: 'bold', color: '#00000', fontSize: 14 },
    value: { color: '#333', fontSize: 14 },

    // Comment Styling
    commentBox: { marginTop: 10, padding: 10, backgroundColor: '#E3F2FD', borderRadius: 8 },
    commentTitle: { fontWeight: 'bold', color: '#0D47A1', fontSize: 14 },
    commentText: { color: '#333', fontSize: 14, marginTop: 2 },
});

export default EnquiryDetails;

