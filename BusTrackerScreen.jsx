


import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const API_URL = 'https://www.smartschoolsync.com/api/bus/getBusTracking';
const BUS_ID = '68496cde6acc046a6df67740';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjYyOTVhYTI5NmUxYTU4M2MyNzM1OCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MDE4MDkyMiwiZXhwIjoxNzUwMTk4OTIyfQ.xDP5wrdERuz97Q-rJMLbJtRqAiUP8rxWInFLty5gLwM';

const SCHOOL_LOCATION = { latitude: 18.5204, longitude: 73.8567 };
const STUDENT_HOME_LOCATION = { latitude: 18.5074, longitude: 73.8375 };
const DRIVER_PHONE_NUMBER = '9876543210';

const BusTrackerScreen = () => {
  const [busLocation, setBusLocation] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [mapType, setMapType] = useState('standard');
  const [mapReady, setMapReady] = useState(false);

  const mapRef = useRef(null);

  const fetchBusLocation = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      const bus = res.data.data.find(b => b._id === BUS_ID);
      if (bus) {
        const newLoc = {
          latitude: parseFloat(bus.latitude),
          longitude: parseFloat(bus.longitude),
        };
        setBusLocation(newLoc);
        setLastUpdated(new Date().toLocaleTimeString());

        if (mapReady && mapRef.current) {
          mapRef.current.animateToRegion({
            ...newLoc,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, 1000);
        }
      }
    } catch (e) {
      console.error('Fetch error:', e.message);
    }
  };

  useEffect(() => {
    fetchBusLocation();
    const interval = setInterval(fetchBusLocation, 30000);
    return () => clearInterval(interval);
  }, []);

  const openCall = () => Linking.openURL(`tel:${DRIVER_PHONE_NUMBER}`);
  const openMessage = () => Linking.openURL(`sms:${DRIVER_PHONE_NUMBER}`);

  if (!busLocation) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Loading live bus location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapType}
        showsUserLocation
        onMapReady={() => setMapReady(true)}
      >
        <Marker coordinate={busLocation} title="Bus No. 01">
          <View style={styles.busMarker}>
            <View style={styles.circle}>
              <Text style={styles.busEmoji}>🚌</Text>
            </View>
            <View style={styles.pointer} />
          </View>
        </Marker>

        <Marker coordinate={SCHOOL_LOCATION} title="Narayana School" pinColor="#007AFF" />
        <Marker coordinate={STUDENT_HOME_LOCATION} title="Home" pinColor="#FF3B30" />
      </MapView>

      <TouchableOpacity style={styles.refreshBtn} onPress={fetchBusLocation}>
        <Icon name="refresh" size={20} color="#007AFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toggleBtn}
        onPress={() => setMapType(prev => (prev === 'standard' ? 'satellite' : 'standard'))}
      >
        <Icon name="layers-outline" size={20} color="#007AFF" />
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <View style={styles.cardContent}>
          <View style={{ flex: 1 }}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🚌 Status</Text>
              <Text style={styles.infoValue}>En Route</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>👨‍✈️ Driver</Text>
              <Text style={styles.infoValue}>R. Shinde</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>⏱️ Updated</Text>
              <Text style={styles.infoValue}>{lastUpdated}</Text>
            </View>
          </View>

          <View style={styles.iconButtons}>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor: '#34C759' }]} onPress={openCall}>
              <Icon name="call-outline" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor: '#007AFF' }]} onPress={openMessage}>
              <Icon name="chatbubble-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  toggleBtn: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  infoCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    ...Platform.select({
      android: { elevation: 6 },
    }),
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  iconButtons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 16,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    ...Platform.select({
      android: { elevation: 4 },
    }),
  },

  // Bus Marker Styles
  busMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 44,
    height: 44,
    backgroundColor: '#007AFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  busEmoji: {
    fontSize: 22,
    color: '#fff',
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#007AFF',
    marginTop: -2,
  },
});

export default BusTrackerScreen;
