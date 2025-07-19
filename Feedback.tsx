



import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const Feedback = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Replace with secure auth values
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWMzMDcwYTEwZWI1ZTY5YTFhYTZhZiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MDY3ODAwNSwiZXhwIjoxNzUwNjk2MDA1fQ.vciQY1H8FRnYNLDB7DQ2iWDDqdHyFD73v05MKB_VRjE';
  const recipientId = 'TEACHER1122'; // from login context

  const handleSearch = async () => {
    if (fromDate > toDate) {
      alert('From Date cannot be after To Date');
      return;
    }

    setModalVisible(false);
    setLoading(true);

    try {
      const res = await axios.get(
        `http://192.168.234.184:4000/api/feedback/getFeedbackById/${recipientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const allFeedbacks = Array.isArray(res.data.message) ? res.data.message : [];

      // Optional: filter by date range
      const filtered = allFeedbacks.filter(item => {
        const itemDate = new Date(item.timestamps || item.createdAt);
        return itemDate >= fromDate && itemDate <= toDate;
      });

      setFeedbacks(filtered);
    } catch (err) {
      console.error(err);
      alert('Error fetching feedbacks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📬 My Received Feedbacks</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6A0DAD" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {feedbacks.length === 0 ? (
            <Text style={styles.noData}>No feedbacks in selected range.</Text>
          ) : (
            feedbacks.map((fb, idx) => (
              <View key={idx} style={styles.card}>
                <Text style={styles.subject}>{fb.subject || 'No Subject'}</Text>
                <Text style={styles.msg}>{fb.message || 'No Message'}</Text>
                <Text style={styles.meta}>Category: {fb.feedbackCategory || 'N/A'}</Text>
                <Text style={styles.meta}>From Student ID: {fb.studentId || 'N/A'}</Text>
                <Text style={styles.meta}>Contact via: {fb.prefferredContactMethod || 'N/A'}</Text>
                <Text style={styles.date}>
                  Submitted on:{' '}
                  {new Date(fb.timestamps || fb.createdAt).toLocaleDateString()}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Icon name="calendar" size={32} color="white" />
      </TouchableOpacity>

      {/* Date Filter Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>📅 Select Date Range</Text>

            <Text style={styles.dateLabel}>From</Text>
            <TouchableOpacity onPress={() => setShowFromDate(true)} style={styles.datePicker}>
              <Text>{fromDate.toDateString()}</Text>
            </TouchableOpacity>
            {showFromDate && (
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="default"
                onChange={(e, date) => {
                  setShowFromDate(false);
                  if (date) setFromDate(date);
                }}
              />
            )}

            <Text style={styles.dateLabel}>To</Text>
            <TouchableOpacity onPress={() => setShowToDate(true)} style={styles.datePicker}>
              <Text>{toDate.toDateString()}</Text>
            </TouchableOpacity>
            {showToDate && (
              <DateTimePicker
                value={toDate}
                mode="date"
                display="default"
                onChange={(e, date) => {
                  setShowToDate(false);
                  if (date) setToDate(date);
                }}
              />
            )}

            <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
              <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Icon name="close-circle" size={34} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#4B0082',
  },
  scrollContent: { paddingBottom: 100 },
  noData: { textAlign: 'center', marginTop: 60, color: '#999', fontSize: 16 },
  card: {
    backgroundColor: '#F2ECFF',
    marginVertical: 10,
    padding: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  subject: { fontSize: 17, fontWeight: 'bold', color: '#333' },
  msg: { marginTop: 6, color: '#555', fontSize: 15 },
  meta: { fontSize: 13, color: '#666', marginTop: 5 },
  date: { fontSize: 12, color: '#999', marginTop: 5 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6A0DAD',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4B0082',
  },
  dateLabel: { fontSize: 15, fontWeight: '600', marginTop: 10, color: '#444' },
  datePicker: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#EFEAFE',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchBtn: {
    marginTop: 25,
    backgroundColor: '#6A0DAD',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  closeBtn: {
    position: 'absolute',
    top: -20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 6,
  },
});
