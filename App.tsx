import React, { useEffect, useState, createContext, useContext } from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

// Screens
import AuthScreen from './AuthScreen';
import DashboardScreen from './DashboardScreen';
import CommentsScreen from './CommentsScreen';
import MealsScreen from './MealsScreen';
import FeesScreen from './FeesScreen';
import TimetableScreen from './TimetableScreen';
import ContactUsScreen from './ContactUsScreen';
import AdmissionEnquiryScreen from './AdmissionEnquiryScreen';
import EnquiryDetails from './EnquiryDetails';
import WelcomeScreen from './WelcomeScreen';
import StudentProfileScreen from './StudentProfileScreen';
import StudentListScreen from './StudentListScreen';
import StudentDetailScreen from './StudentDetailScreen';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';
import AllStudentsChatScreen from './AllStudentsChatScreen';
import DaycareMainScreen from './Daycare/DaycareMainScreen';
import InOutScreen from './InOutScreen';
import InListScreen from './Daycare/InListScreen';
import OutListScreen from './Daycare/OutListScreen';
import DaycareHistoryScreen from './Daycare/DaycareHistoryScreen';
import DaycareHistoryMainScreen from './Daycare/DaycareHistoryMainScreen';
import StudentDaycareDetail from './Daycare/StudentDaycareDetail';
import SmartFilter from './SmartFilter';
import Myscreen from './Myscreen';
import AdminTimetableScreen from './AdminTimetableScreen';
import BusTrackerScreen from './BusTrackerScreen';
import Feedback from './Feedback';
import DayCare from './parentdaycare';
import ParentLogin from './Parentlogin'
import Feedbackparent from './Feedbackparent';
import ExamScheduleScreen from './ExamScheduleScreen';
import ChatScreenComponent from './ChatScreenComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const AuthContext = createContext({ setIsLoggedIn: (value: boolean) => { } });

const LogoutButton = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const confirmLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          setIsLoggedIn(false);
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={confirmLogout} style={styles.logoutBtn}>
      <MaterialIcons name="logout" size={20} color="red" style={{ marginRight: 8 }} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = (props) => (
  <View style={styles.drawerContainer}>
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.profilePic}
        />
        <Text style={styles.profileName}>Abhi Gitte</Text>
        <Text style={styles.profileRole}>Student</Text>
      </View>

      <View style={styles.divider} />

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
    <LogoutButton />
  </View>
);

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#f2f2f7' },
      headerTintColor: '#000',
      headerTitleStyle: { fontSize: 18, fontWeight: 'bold' },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen name="Home" component={DashboardScreen} options={{ headerShown: false }} />
    <Stack.Screen name="TimetableScreen" component={TimetableScreen} options={{ title: 'Timetable' }} />
    <Stack.Screen name="MealsScreen" component={MealsScreen} options={{ title: 'Meals' }} />
    <Stack.Screen name="CommentsScreen" component={CommentsScreen} options={{ title: 'Comments' }} />
    <Stack.Screen name="FeesScreen" component={FeesScreen} options={{ title: 'Fees' }} />
    <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} options={{ title: 'Contact Us' }} />
    <Stack.Screen name="AdmissionEnquiryScreen" component={AdmissionEnquiryScreen} options={{ title: 'Admission Enquiry' }} />
    <Stack.Screen name="EnquiryDetails" component={EnquiryDetails} options={{ title: 'Enquiry Details' }} />
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
    <Stack.Screen name="StudentList" component={StudentListScreen} />
    <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
    <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ChatScreenComponent" component={ChatScreenComponent} options={{ title: 'Chat (Component)' }} />
    <Stack.Screen name="AllStudentsChatScreen" component={AllStudentsChatScreen} />
    <Stack.Screen name="DaycareMainScreen" component={DaycareMainScreen} />
    <Stack.Screen name="InOutScreen" component={InOutScreen} />
    <Stack.Screen name="InList" component={InListScreen} options={{ title: 'IN Students' }} />
    <Stack.Screen name="OutList" component={OutListScreen} options={{ title: 'OUT Students' }} />
    <Stack.Screen name="DaycareHistoryMainScreen" component={DaycareHistoryMainScreen} options={{ title: 'DaycareHistoryMainScreen' }} />
    <Stack.Screen name="DaycareHistoryScreen" component={DaycareHistoryScreen} options={{ title: 'DaycareHistoryScreen' }} />
    <Stack.Screen name="StudentDaycareDetail" component={StudentDaycareDetail} options={{ title: 'StudentDaycareDetail' }} />
    <Stack.Screen name="Myscreen" component={Myscreen} options={{ title: ' Myscreen' }} />
    <Stack.Screen name="AdminTimetableScreen" component={AdminTimetableScreen} options={{ title: ' AdminTimetableScreen' }} />
    <Stack.Screen name="BusTrackerScreen" component={BusTrackerScreen} options={{ title: ' BusTrackerScreen' }} />
    <Stack.Screen name='Parentdaycare' component={DayCare} options={{ title: ' Parentdaycare' }} />
    <Stack.Screen name='parentlogin' component={ParentLogin} options={{ title: ' parentlogin' }} />
    <Stack.Screen name='Feedback' component={Feedback} options={{ title: ' Feedback' }} />
    <Stack.Screen name='Feedbackparent' component={Feedbackparent} options={{ title: ' Feedbackparent' }} />
    <Stack.Screen name="ExamScheduleScreen" component={ExamScheduleScreen} options={{ title: 'Exam Schedule' }} />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveTintColor: '#000',
      drawerInactiveTintColor: '#666',
      drawerLabelStyle: { fontSize: 16 },
    }}
  >
    <Drawer.Screen
      name="Dashboard"
      component={StackNavigator}
      options={{
        drawerIcon: ({ color, size }) => <Ionicons name="speedometer-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="Contact Us"
      component={ContactUsScreen}
      options={{
        drawerIcon: ({ color, size }) => <Ionicons name="call-outline" size={size} color={color} />,
      }}
    />
  </Drawer.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('hasLaunched');
        const userToken = await AsyncStorage.getItem('userToken');

        if (isFirstLaunch === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setShowWelcome(true);
        } else if (userToken) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ setIsLoggedIn }}>
      <NavigationContainer>
        {showWelcome ? (
          <WelcomeScreen onFinishWelcome={() => setShowWelcome(false)} />
        ) : isLoggedIn ? (
          <DrawerNavigator />
        ) : (
          <AuthScreen setIsLoggedIn={setIsLoggedIn} />
        )}
      </NavigationContainer>
      <Toast />
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingTop: 0,
  },
  profileSection: {
    backgroundColor: '#f2f2f7',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  profileRole: {
    fontSize: 14,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 1,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
});
