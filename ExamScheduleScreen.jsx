import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Platform, Modal, TextInput, RefreshControl, Share, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as Calendar from 'expo-calendar'; // Uncomment if using Expo

// Dummy data for demonstration. Replace with API call as needed.
const DUMMY_EXAMS = [
  {
    id: '1',
    title: 'Mathematics',
    date: '2025-07-10',
    time: '10:00 AM - 12:00 PM',
    location: 'Room 101',
    type: 'Theory',
    class: '10',
    division: 'A',
    syllabus: 'Algebra, Geometry, Trigonometry',
    instructions: 'Bring geometry box. No calculators allowed.',
  },
  {
    id: '2',
    title: 'Science',
    date: '2025-07-12',
    time: '1:00 PM - 3:00 PM',
    location: 'Room 102',
    type: 'Practical',
    class: '10',
    division: 'A',
    syllabus: 'Physics: Electricity, Chemistry: Acids & Bases',
    instructions: 'Lab coat required.',
  },
  {
    id: '3',
    title: 'English',
    date: '2025-07-14',
    time: '10:00 AM - 12:00 PM',
    location: 'Room 103',
    type: 'Theory',
    class: '10',
    division: 'B',
    syllabus: 'Poetry, Prose, Grammar',
    instructions: 'Read all chapters.',
  },
];

const CLASSES = ['All', '10', '11', '12'];
const DIVISIONS = ['All', 'A', 'B', 'C'];

const getExamStatus = (date) => {
  const today = new Date();
  const examDate = new Date(date);
  if (examDate.toDateString() === today.toDateString()) return 'ongoing';
  if (examDate > today) return 'upcoming';
  return 'past';
};

const ExamScheduleScreen = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = () => {
    setLoading(true);
    setTimeout(() => {
      setExams(DUMMY_EXAMS);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchExams();
      setRefreshing(false);
    }, 1000);
  };

  const filteredExams = exams.filter(exam => {
    const matchClass = selectedClass === 'All' || exam.class === selectedClass;
    const matchDiv = selectedDivision === 'All' || exam.division === selectedDivision;
    const matchSearch =
      exam.title.toLowerCase().includes(search.toLowerCase()) ||
      exam.type.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchDiv && matchSearch;
  });

  const openExamModal = (exam) => {
    setSelectedExam(exam);
    setModalVisible(true);
  };

  const addToCalendar = async (exam) => {
    Alert.alert('Calendar', 'This would add the exam to your device calendar. (Demo only)');
    // Implement calendar logic here
  };

  const shareExam = async (exam) => {
    try {
      await Share.share({
        message: `Exam: ${exam.title}\nDate: ${exam.date}\nTime: ${exam.time}\nLocation: ${exam.location}`,
      });
    } catch (e) {
      Alert.alert('Error', 'Could not share exam.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📅 Exam Schedule</Text>
      {/* Filter Row */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CLASSES.map(cls => (
            <TouchableOpacity
              key={cls}
              style={[styles.filterBtn, selectedClass === cls && styles.filterBtnActive]}
              onPress={() => setSelectedClass(cls)}
            >
              <Text style={[styles.filterText, selectedClass === cls && styles.filterTextActive]}>{cls === 'All' ? 'All Classes' : `Class ${cls}`}</Text>
            </TouchableOpacity>
          ))}
          {DIVISIONS.map(div => (
            <TouchableOpacity
              key={div}
              style={[styles.filterBtn, selectedDivision === div && styles.filterBtnActive]}
              onPress={() => setSelectedDivision(div)}
            >
              <Text style={[styles.filterText, selectedDivision === div && styles.filterTextActive]}>{div === 'All' ? 'All Divisions' : `Div ${div}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search exams..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#6A0DAD" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {filteredExams.length === 0 ? (
            <Text style={styles.noData}>No exams scheduled.</Text>
          ) : (
            filteredExams.map((exam) => {
              const status = getExamStatus(exam.date);
              return (
                <TouchableOpacity key={exam.id} style={[styles.card, status === 'upcoming' && styles.cardUpcoming, status === 'ongoing' && styles.cardOngoing, status === 'past' && styles.cardPast]} onPress={() => openExamModal(exam)}>
                  <View style={styles.cardHeader}>
                    <Icon name="book-outline" size={28} color="#6A0DAD" style={{ marginRight: 10 }} />
                    <Text style={styles.examTitle}>{exam.title}</Text>
                    <View style={styles.examTypeBadge}>
                      <Text style={styles.examTypeText}>{exam.type}</Text>
                    </View>
                  </View>
                  <View style={styles.infoRow}>
                    <Icon name="calendar-outline" size={20} color="#888" />
                    <Text style={styles.infoText}>{new Date(exam.date).toDateString()}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Icon name="time-outline" size={20} color="#888" />
                    <Text style={styles.infoText}>{exam.time}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Icon name="location-outline" size={20} color="#888" />
                    <Text style={styles.infoText}>{exam.location}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Icon name="people-outline" size={20} color="#888" />
                    <Text style={styles.infoText}>Class {exam.class} - Div {exam.division}</Text>
                  </View>
                  <View style={styles.statusRow}>
                    {status === 'upcoming' && <Text style={styles.statusUpcoming}>Upcoming</Text>}
                    {status === 'ongoing' && <Text style={styles.statusOngoing}>Ongoing</Text>}
                    {status === 'past' && <Text style={styles.statusPast}>Past</Text>}
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity onPress={() => addToCalendar(exam)} style={styles.actionBtn}>
                      <Icon name="calendar" size={20} color="#6A0DAD" />
                      <Text style={styles.actionText}>Add to Calendar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => shareExam(exam)} style={styles.actionBtn}>
                      <Icon name="share-social" size={20} color="#6A0DAD" />
                      <Text style={styles.actionText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      )}
      {/* Exam Details Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedExam && (
              <>
                <Text style={styles.modalTitle}>{selectedExam.title}</Text>
                <Text style={styles.modalLabel}>Date</Text>
                <Text style={styles.modalValue}>{new Date(selectedExam.date).toDateString()}</Text>
                <Text style={styles.modalLabel}>Time</Text>
                <Text style={styles.modalValue}>{selectedExam.time}</Text>
                <Text style={styles.modalLabel}>Location</Text>
                <Text style={styles.modalValue}>{selectedExam.location}</Text>
                <Text style={styles.modalLabel}>Syllabus</Text>
                <Text style={styles.modalValue}>{selectedExam.syllabus}</Text>
                <Text style={styles.modalLabel}>Instructions</Text>
                <Text style={styles.modalValue}>{selectedExam.instructions}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                  <Icon name="close-circle" size={34} color="#D32F2F" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      {/* Floating Action Button for Add Exam (Demo) */}
      <TouchableOpacity style={styles.fab} onPress={() => Alert.alert('Add Exam', 'This would open the add exam form (admin/teacher only).')}>
        <Icon name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ExamScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FD',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A3A5A',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: '#E0E7FF',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 2,
  },
  filterBtn: {
    backgroundColor: '#E3E6F5',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    shadowColor: '#B6B6D6',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  filterBtnActive: {
    backgroundColor: '#6A0DAD',
    borderColor: '#6A0DAD',
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.15,
  },
  filterText: {
    color: '#6A0DAD',
    fontWeight: '600',
    fontSize: 15,
  },
  filterTextActive: {
    color: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 14,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  noData: {
    textAlign: 'center',
    marginTop: 60,
    color: '#B0B3C6',
    fontSize: 17,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 22,
    marginBottom: 20,
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderWidth: 1.5,
    borderColor: '#F0EFFF',
    position: 'relative',
  },
  cardUpcoming: {
    borderLeftWidth: 7,
    borderLeftColor: '#6A0DAD',
    backgroundColor: '#F7F3FF',
  },
  cardOngoing: {
    borderLeftWidth: 7,
    borderLeftColor: '#F9A825',
    backgroundColor: '#FFFBEA',
  },
  cardPast: {
    borderLeftWidth: 7,
    borderLeftColor: '#BDBDBD',
    backgroundColor: '#F5F5F5',
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  examTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4B0082',
    flex: 1,
    letterSpacing: 0.2,
  },
  examTypeBadge: {
    backgroundColor: '#EFEAFE',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginLeft: 10,
  },
  examTypeText: {
    color: '#6A0DAD',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    gap: 8,
  },
  infoText: {
    marginLeft: 10,
    color: '#444',
    fontSize: 16,
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  statusUpcoming: {
    color: '#6A0DAD',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: '#EFEAFE',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  statusOngoing: {
    color: '#F9A825',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: '#FFF9C4',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  statusPast: {
    color: '#BDBDBD',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 18,
    justifyContent: 'flex-end',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 7,
    elevation: 2,
  },
  actionText: {
    color: '#6A0DAD',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 34,
    borderRadius: 24,
    alignItems: 'flex-start',
    width: '88%',
    elevation: 7,
    position: 'relative',
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.13,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 12,
    alignSelf: 'center',
    letterSpacing: 0.2,
  },
  modalLabel: {
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginTop: 12,
    fontSize: 15,
  },
  modalValue: {
    color: '#444',
    fontSize: 16,
    marginBottom: 2,
    fontWeight: '500',
  },
  closeBtn: {
    position: 'absolute',
    top: -20,
    right: -20,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  fab: {
    position: 'absolute',
    right: 28,
    bottom: 38,
    backgroundColor: '#6A0DAD',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 9,
    shadowColor: '#6A0DAD',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
});