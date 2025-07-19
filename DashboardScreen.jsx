import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from './ProfileScreen';

const { width } = Dimensions.get('window');

const student = {
  name: 'Abhi Gitte',
  class: '10th Grade',
  rollNo: '23',
  profilePic: '',
};

const features = [
  { title: 'Myscreen', icon: 'event', color: '#D32F2F', bg: '#FFEBEE', screen: 'Myscreen' },
  { title: 'Timetable', icon: 'schedule', color: '#1976D2', bg: '#E3F2FD', screen: 'TimetableScreen' },
  { title: 'Meals', icon: 'restaurant', color: '#F9A825', bg: '#FFF9C4', screen: 'MealsScreen' },
  { title: 'Daycare', icon: 'favorite', color: '#C2185B', bg: '#FCE4EC', screen: 'DaycareMainScreen' },
  { title: 'Comments', icon: 'chat', color: '#FF6F00', bg: '#FFF3E0', screen: 'CommentsScreen' },
  { title: 'Feedbackparent', icon: 'assignment', color: '#512DA8', bg: '#EDE7F6', screen: 'Feedbackparent' },
  { title: 'Feedback', icon: 'school', color: '#455A64', bg: '#CFD8DC', screen: 'Feedback' },
  { title: 'Fees', icon: 'currency-rupee', color: '#388E3C', bg: '#E8F5E9', screen: 'FeesScreen' },
  { title: 'AdminTimetableScreen', icon: 'menu-book', color: '#0288D1', bg: '#E1F5FE', screen: 'AdminTimetableScreen' },
  { title: 'Chats', icon: 'event-note', color: '#8D6E63', bg: '#EFEBE9', screen: 'ChatListScreen' },
  { title: 'Chatttt', icon: 'event-note', color: '#8D6E63', bg: '#EFEBE9', screen: 'ChatScreenComponent' },
];

const actions = [
  { title: 'Bus Tracker', icon: 'directions-bus', color: '#689F38', screen: 'BusTrackerScreen' },
  { title: 'Parent Login', icon: 'message', color: '#7B1FA2', screen: 'parentlogin' },
  { title: 'Enquiry', icon: 'assignment', color: '#FF7043', screen: 'AdmissionEnquiryScreen' },
  { title: 'Profile', icon: 'poll', color: '#0288D1', screen: 'StudentProfileScreen' },
  { title: 'Messages', icon: 'message', color: '#7B1FA2', screen: 'MessagesScreen' },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const QuickAction = ({ icon, color, title, screen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
      style={[styles.quickCard, { backgroundColor: color }]}
    >
      <Icon name={icon} size={26} color="#fff" />
      <Text style={styles.quickText}>{title}</Text>
    </TouchableOpacity>
  );
};

const FeatureCard = ({ icon, color, bg, title, screen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
      style={[styles.card, { backgroundColor: bg, borderColor: color }]}
    >
      <Icon name={icon} size={28} color={color} />
      <Text style={styles.cardText}>{title}</Text>
      <Icon name="school" size={50} color={color} style={styles.faintIcon} />
    </TouchableOpacity>
  );
};

const Dashboard = () => {
  const [greeting, setGreeting] = useState(getGreeting());
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Header */}
      <View style={styles.fullWidthHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <TouchableOpacity>
            <Icon name="notifications" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: student.profilePic }} style={styles.profilePic} />
          <View>
            <Text style={styles.greeting}>{greeting},</Text>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.studentDetails}>
              Class: {student.class} | Roll No: {student.rollNo}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Animatable.View animation="fadeInUp" duration={800} style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {actions.map((a, i) => <QuickAction key={i} {...a} />)}
          </ScrollView>
        </Animatable.View>

        {/* Feature Cards */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.cardsContainer}>
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </Animatable.View>

        {/* Achievements */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.section}>
          <Text style={styles.sectionTitle}>🎖️ Achievements</Text>
          <Text style={styles.sectionText}>🏆 Abhi won 1st prize in Science Fair 2025!</Text>
        </Animatable.View>

        {/* Quote of the Day */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Quote of the Day</Text>
          <Text style={styles.sectionText}>
            “Education is the passport to the future, for tomorrow belongs to those who prepare for it today.” – Malcolm X
          </Text>
        </Animatable.View>
      </ScrollView>
    </>
  );
};

const Tab = createBottomTabNavigator();

const DashboardScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const icons = { Dashboard: 'dashboard', Profile: 'person' };
        return <Icon name={icons[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FFF',
      tabBarInactiveTintColor: '#ADB5BD',
      tabBarStyle: {
        backgroundColor: '#1E293B',
        paddingBottom: 5,
        borderTopWidth: 0,
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  fullWidthHeader: { backgroundColor: '#1E293B', width: '100%' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 15, paddingHorizontal: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 15 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F1F5F9', borderRadius: 20,
    padding: 20, marginBottom: 25,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 3,
  },
  profilePic: {
    width: 65, height: 65, borderRadius: 32.5,
    marginRight: 15, backgroundColor: '#DEE2E6',
  },
  greeting: { fontSize: 14, color: '#6C757D' },
  studentName: { fontSize: 20, fontWeight: 'bold', color: '#212529' },
  studentDetails: { fontSize: 14, color: '#495057' },
  cardsContainer: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between', marginBottom: 25,
  },
  card: {
    width: '48%', padding: 18, borderRadius: 12, marginBottom: 15,
    alignItems: 'center', borderWidth: 1, position: 'relative',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 3,
  },
  cardText: {
    color: '#212529', fontSize: 17, fontWeight: 'bold',
    marginTop: 5, textAlign: 'center',
  },
  faintIcon: { position: 'absolute', bottom: 5, right: 5, opacity: 0.1 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#212529' },
  sectionText: { fontSize: 15, color: '#495057' },
  quickCard: {
    width: width * 0.4, padding: 15, borderRadius: 14,
    marginRight: 15, alignItems: 'center', justifyContent: 'center',
  },
  quickText: { color: '#FFF', fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
});

export default DashboardScreen;
