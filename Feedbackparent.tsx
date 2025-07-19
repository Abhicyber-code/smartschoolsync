

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const screenHeight = Dimensions.get('window').height;

const Feedbackparent = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [comment, setComment] = useState('');
  const [preferredContact, setPreferredContact] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedTeacherName, setSelectedTeacherName] = useState('');

  const studentId = '6822dfac29957a2b9f63af36';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWMzMDcwYTEwZWI1ZTY5YTFhYTZhZiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MDY3ODAwNSwiZXhwIjoxNzUwNjk2MDA1fQ.vciQY1H8FRnYNLDB7DQ2iWDDqdHyFD73v05MKB_VRjE'; // Replace with actual token

  const fetchFeedback = async () => { 
    try { 
      const res = await axios.get(
        `http://192.168.234.184:4000/api/feedback/getFeedbacks`, 
        { headers: { 
          Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) { 
        setFeedbackList(res.data.message);
      }
    } catch (error) {

      Alert.alert('Error', 'Could not load feedback.');

    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`http://192.168.234.184:4000/api/getallteachers`, {

        headers: { Authorization: `Bearer ${token}` },

      });
      if (res.data?.success) {
        setTeachers(res.data.data);
      }
    } catch (err) {
      console.log('Error fetching teachers', err);
    }
  };

  useEffect(() => {
    fetchFeedback(); 
  }, []);

  const openModal = (edit = false, feedback = null) => {
    setIsEditing(edit);
    setSelectedFeedback(feedback);
    fetchTeachers();

    if (edit && feedback) {
      setCategory(feedback.feedbackCategory);
      setSubject(feedback.subject);
      setComment(feedback.message);
      setPreferredContact(feedback.prefferredContactMethod);
      setSelectedTeacherId(feedback.recipientId || '');
      setSelectedTeacherName(feedback.recipientName || '');
    } else {
      setCategory('');
      setSubject('');
      setComment('');
      setPreferredContact('');
      setSelectedTeacherId('');
      setSelectedTeacherName('');
      setImageUri(null);
    }

    setModalVisible(true);
  };
const resetForm = () => {
  setCategory('');
  setSubject('');
  setComment('');
  setPreferredContact('');
  setSelectedTeacherId('');
  setSelectedTeacherName('');
  setImageUri(null);
};

  const handleSubmit = async () => {
  if (loading || !category || !subject || !comment || !preferredContact || !selectedTeacherId) return;

  setLoading(true);

  const payload = {
    studentId,
    recipientName: selectedTeacherName,
    recipientId: selectedTeacherId,
    feedbackCategory: category,
    subject,
    message: comment,
    timestamps: new Date().toISOString(),
    attachments: [], // optional enhancement
    prefferredContactMethod: preferredContact,
  };

  try {
    const url = isEditing && selectedFeedback
      ? `http://192.168.234.184:4000/api/feedback/update-feedback/${selectedFeedback._id}`
      : `http://192.168.234.184:4000/api/feedback/create-feedback`;

    const method = isEditing ? axios.put : axios.post;

    await method(url, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setModalVisible(false);
    resetForm();
    setShowSuccessModal(true);
    fetchFeedback();

    setTimeout(() => setShowSuccessModal(false), 2500);
  } catch (error) {
    console.error(error);
    const msg = error.response?.data?.message || 'Could not save feedback.';
    Alert.alert('Submission Error', msg);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    Alert.alert('Delete Feedback', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            await axios.delete(
              `http://192.168.234.184:4000/api/feedback/delete-feedback/${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchFeedback();
          } catch (error) {
            Alert.alert('Error', 'Could not delete feedback.');
          }
        },
      },
    ]);
  };

  const handleBrowseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Feedback Summary</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!feedbackList.length ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No feedback yet.</Text>
          </View>
        ) : (
          feedbackList.map((feedback) => (
            <View key={feedback._id} style={styles.feedbackCard}>
              <Text style={styles.feedbackTitle}>{feedback.subject}</Text>
              <Text style={styles.feedbackMsg}>{feedback.message}</Text>
              <Text style={styles.feedbackMeta}>
                Category: {feedback.feedbackCategory} | Contact: {feedback.prefferredContactMethod}
              </Text>
              <Text style={styles.feedbackDate}>
                Submitted: {new Date(feedback.timestamps).toLocaleString()}
              </Text>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => openModal(true, feedback)}>
                  <Icon name="create-outline" size={20} color="#fff" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(feedback._id)}>
                  <Icon name="trash-outline" size={20} color="#fff" />
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => openModal(false)}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Icon name="close-circle" size={40} color="#C62828" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
              <Text style={styles.modalTitle}>{isEditing ? 'Edit Feedback' : 'Add Feedback'}</Text>

              <TouchableOpacity onPress={handleBrowseImage} style={styles.imageBrowseBtn}>
                {imageUri ? (
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                  </View>
                ) : (
                  <Icon name="image-outline" size={26} color="#6A0DAD" />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={handleBrowseImage} style={styles.browseBtn}>
                <Text style={styles.browseBtnText}>Browse</Text>
              </TouchableOpacity>

              <Text style={styles.label}>Teacher</Text>
              <View style={styles.dropdown}>
                <Picker
                  selectedValue={selectedTeacherId}
                  onValueChange={(itemValue) => {
                    const teacher = teachers.find(t => t._id === itemValue);
                    setSelectedTeacherId(itemValue);
                    setSelectedTeacherName(`${teacher?.firstName} ${teacher?.lastName}`);
                  }}
                >
                  <Picker.Item label="Select Teacher" value="" enabled={false} />
                  {teachers.map(t => (
                    <Picker.Item key={t._id} label={`${t.firstName} ${t.lastName}`} value={t._id} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Category</Text>
              <View style={styles.dropdown}>
                <Picker selectedValue={category} onValueChange={setCategory}>
                  <Picker.Item label="Select Category" value="" enabled={false} />
                  <Picker.Item label="Complaint" value="complaint" />
                  <Picker.Item label="Suggestion" value="suggestion" />
                  <Picker.Item label="Appreciation" value="appreciation" />
                  <Picker.Item label="Concern" value="concern" />
                </Picker>
              </View>

              <Text style={styles.label}>Subject</Text>
              <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder="Enter subject" />

              <Text style={styles.label}>Preferred Contact</Text>
              <View style={styles.dropdown}>
                <Picker selectedValue={preferredContact} onValueChange={setPreferredContact}>
                  <Picker.Item label="Select Method" value="" enabled={false} />
                  <Picker.Item label="Email" value="Email" />
                  <Picker.Item label="Phone" value="Phone" />
                </Picker>
              </View>

              <Text style={styles.label}>Message</Text>
              <TextInput
                style={styles.textarea}
                multiline
                value={comment}
                onChangeText={setComment}
                placeholder="Write your feedback"
              />

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!category || !subject || !comment || !preferredContact || !selectedTeacherId}
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor:
                      !category || !subject || !comment || !preferredContact || !selectedTeacherId
                        ? '#ccc'
                        : '#6A0DAD',
                  },
                ]}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>{isEditing ? 'Update' : 'Submit'}</Text>}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* GPay-style Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <Icon name="checkmark-circle-outline" size={80} color="#6A0DAD" />
            <Text style={styles.successText}>Feedback Submitted!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Feedbackparent;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F1F8', paddingTop: 50, paddingHorizontal: 20 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  scrollContent: { paddingBottom: 100, paddingTop: 10 },
  emptyContainer: { marginTop: 80, alignItems: 'center', justifyContent: 'center', flex: 1 },
  emptyText: { textAlign: 'center', color: '#777' },
  feedbackCard: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginVertical: 10, elevation: 6 },
  feedbackTitle: { fontSize: 17, fontWeight: '700', color: '#333' },
  feedbackMsg: { marginTop: 6, fontSize: 15, color: '#555', lineHeight: 22 },
  feedbackMeta: { fontSize: 13, marginTop: 8, color: '#888' },
  feedbackDate: { fontSize: 12, marginTop: 2, color: '#aaa' },
  cardActions: { flexDirection: 'row', gap: 12, marginTop: 14 },
  editBtn: { flexDirection: 'row', backgroundColor: '#6A0DAD', padding: 10, borderRadius: 10, alignItems: 'center', gap: 6 },
  deleteBtn: { flexDirection: 'row', backgroundColor: '#C62828', padding: 10, borderRadius: 10, alignItems: 'center', gap: 6 },
  actionText: { color: '#fff', fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#6A0DAD', padding: 16, borderRadius: 32, elevation: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    
     height: screenHeight * 0.65, // ⬅️ Set modal to 65% height
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative',
  },
  modalTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 10, color: '#222' },
  label: { fontWeight: '600', fontSize: 14, marginTop: 10, marginBottom: 4 },
  input: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 10, fontSize: 15 },
  dropdown: { backgroundColor: '#EFEAFE', borderRadius: 10, borderWidth: 1, borderColor: '#C7B6F2' },
  textarea: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 10, fontSize: 15, height: 90, textAlignVertical: 'top' },
  submitBtn: { marginTop: 20, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  closeBtn: {
    position: 'absolute',
    top: -20,
    right: 16,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  imageBrowseBtn: {
    alignSelf: 'center',
    marginTop: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C7B6F2',
    overflow: 'hidden',
    elevation: 3,
  },
  imageWrapper: { width: 80, height: 80, borderRadius: 40, overflow: 'hidden' },
  imagePreview: { width: '100%', height: '100%', resizeMode: 'cover' },
  browseBtn: {
    backgroundColor: '#6A0DAD',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
    elevation: 3,
  },
  browseBtnText: { color: '#fff', fontWeight: '600', fontSize: 15, letterSpacing: 0.5 },
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  successText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
    color: '#6A0DAD',
  },
});
