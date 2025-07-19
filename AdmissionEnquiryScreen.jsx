


import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdmissionEnquiryForm = ({ navigation }) => {
  const [enquiry, setEnquiry] = useState({
    selectedClass: '',
    enquiryType: '',
    childName: '',
    dob: new Date(),
    fatherName: '',
    fatherMobile: '',
    followUpDate: new Date(),
    comment: ''
  });
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [showFollowUpPicker, setShowFollowUpPicker] = useState(false);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const loadEnquiries = async () => {
      let storedEnquiries = await AsyncStorage.getItem('admissionEnquiries');
      storedEnquiries = storedEnquiries ? JSON.parse(storedEnquiries) : [];
      setEnquiries(storedEnquiries);
    };
    loadEnquiries();
  }, []);

  const classOptions = [
    'Daycare', 'Playgroup', 'Nursery', 'LKG', 'UKG',
    '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade'
  ];

  const enquiryTypes = ['Website', 'Social Media', 'Walk-in', 'Advertisement', 'Others'];

  const handleInputChange = (field, value) => {
    setEnquiry({ ...enquiry, [field]: value });
  };

  const saveEnquiry = async () => {
    try {
      let existingEnquiries = await AsyncStorage.getItem('admissionEnquiries');
      existingEnquiries = existingEnquiries ? JSON.parse(existingEnquiries) : [];
      existingEnquiries.push(enquiry);
      await AsyncStorage.setItem('admissionEnquiries', JSON.stringify(existingEnquiries));
      setEnquiries(existingEnquiries);
      Alert.alert('Success', 'Enquiry submitted successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save enquiry');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>New Admission Enquiry</Text>

        <Text style={styles.label}>Select Class</Text>
        <Picker
          selectedValue={enquiry.selectedClass}
          onValueChange={(value) => handleInputChange('selectedClass', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Class" value="" />
          {classOptions.map((cls, index) => (
            <Picker.Item key={index} label={cls} value={cls} />
          ))}
        </Picker>

        <Text style={styles.label}>Select Enquiry Type</Text>
        <Picker
          selectedValue={enquiry.enquiryType}
          onValueChange={(value) => handleInputChange('enquiryType', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Enquiry Type" value="" />
          {enquiryTypes.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>

        <Text style={styles.label}>Child Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter child's name"
          value={enquiry.childName}
          onChangeText={(text) => handleInputChange('childName', text)}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={() => setShowDOBPicker(true)} style={styles.dateButton}>
          <Text>{enquiry.dob.toDateString()}</Text>
        </TouchableOpacity>
        {showDOBPicker && (
          <DateTimePicker
            value={enquiry.dob}
            mode="date"
            display="default"
            maximumDate={new Date()} // Prevents future dates
            onChange={(event, selectedDate) => {
              setShowDOBPicker(false);
              if (selectedDate) handleInputChange('dob', selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Father's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter father's name"
          value={enquiry.fatherName}
          onChangeText={(text) => handleInputChange('fatherName', text)}
        />

        <Text style={styles.label}>Father's Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          value={enquiry.fatherMobile}
          onChangeText={(text) => handleInputChange('fatherMobile', text)}
        />

        <Text style={styles.label}>Follow-up Date</Text>
        <TouchableOpacity onPress={() => setShowFollowUpPicker(true)} style={styles.dateButton}>
          <Text>{enquiry.followUpDate.toDateString()}</Text>
        </TouchableOpacity>
        {showFollowUpPicker && (
          <DateTimePicker
            value={enquiry.followUpDate}
            mode="date"
            display="default"
            minimumDate={new Date()} // Prevents past dates
            onChange={(event, selectedDate) => {
              setShowFollowUpPicker(false);
              if (selectedDate) handleInputChange('followUpDate', selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Comments</Text>
        <TextInput
          style={[styles.input, styles.commentBox]}
          placeholder="Enter any additional comments"
          multiline
          value={enquiry.comment}
          onChangeText={(text) => handleInputChange('comment', text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={saveEnquiry}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('EnquiryDetails', { enquiries })}>
        <Icon name="list" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#CCC' },
  picker: { backgroundColor: '#FFF', borderRadius: 8, marginBottom: 15 },
  dateButton: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#CCC', marginBottom: 15 },
  commentBox: { height: 80 },
  submitButton: { backgroundColor: '#0288D1', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 50 },
  submitButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  floatingButton: { position: 'absolute', bottom: 20, right: 30, backgroundColor: '#1976D2', padding: 15, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }
});

export default AdmissionEnquiryForm;
