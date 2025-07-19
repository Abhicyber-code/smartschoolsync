

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function StudentDetailScreen({ route }) {
    const { student } = route.params;

    const openDialer = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    const openEmail = (email) => {
        Linking.openURL(`mailto:${email}`);
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.profile}>
                <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
                </View>
                <Text style={styles.name}>{student.name}</Text>
                <Text style={styles.subtext}>Student Profile</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Academic Information</Text>
                <Detail icon="book" label="Class" value={student.class} />
                <Detail icon="layers" label="Division" value={student.division} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Details</Text>
                <Detail icon="calendar" label="Date of Birth" value={student.dob} />
                <Detail icon="man" label="Father's Name" value={student.father} />
                <Detail icon="woman" label="Mother's Name" value={student.mother} />
                <Detail icon="person" label="Guardian Name" value={student.guardian} />
                <Detail icon="accessibility" label="Disability" value={student.disability || 'None'} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <TouchableOpacity onPress={() => openDialer(student.mobile)}>
                    <Detail icon="call" label="Mobile No." value={student.mobile} clickable />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openDialer(student.altMobile)}>
                    <Detail icon="call-outline" label="Secondary Mobile" value={student.altMobile} clickable />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openEmail(student.email)}>
                    <Detail icon="mail" label="Email" value={student.email} clickable />
                </TouchableOpacity>
                <Detail icon="location" label="Address" value={student.address} />
            </View>
        </ScrollView>
    );
}

const Detail = ({ icon, label, value, clickable }) => (
    <View style={styles.detailRow}>
        <View style={styles.detailLabelRow}>
            <Icon name={icon} size={18} color="#4B5563" style={{ marginRight: 8 }} />
            <Text style={[styles.label, clickable && { color: '#2563EB' }]}>{label}</Text>
        </View>
        <Text style={[styles.value, clickable && { color: '#2563EB' }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#F9FAFB',
        paddingBottom: 40,
    },
    profile: {
        alignItems: 'center',
        marginBottom: 28,
    },
    avatarCircle: {
        backgroundColor: '#2563EB',
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    name: {
        marginTop: 12,
        fontSize: 25,
        fontWeight: '700',
        color: '#111827',
    },
    subtext: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    section: {
        backgroundColor: '#F1F5F9',
        borderRadius: 14,
        padding: 18,
        marginBottom: 20,
        elevation: 2,
        borderColor: '#E5E7EB',
        borderWidth: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 6,
    },
    detailRow: {
        marginBottom: 14,
    },
    detailLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    value: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
        marginLeft: 26,
    },
});
