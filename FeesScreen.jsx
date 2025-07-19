

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const FeesScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    // Summary Details Data
    const summaryDetails = [
        { id: '1', paidOn: '10 Jan 2025', amount: '₹5000', mode: 'Online' },
        { id: '2', paidOn: '15 Mar 2025', amount: '₹6000', mode: 'Offline' },
        { id: '3', paidOn: '20 Jun 2025', amount: '₹4000', mode: 'Online' }
    ];

    // Payment Schedule Data
    const paymentSchedule = [
        { id: '1', installment: '1 Mar 2025', lastDate: moment('2025-03-01').add(15, 'days').format('DD MMM YYYY'), amount: '₹4000' },
        { id: '2', installment: '1 Jun 2025', lastDate: moment('2025-06-01').add(15, 'days').format('DD MMM YYYY'), amount: '₹3000' },
        { id: '3', installment: '1 Sep 2025', lastDate: moment('2025-09-01').add(15, 'days').format('DD MMM YYYY'), amount: '₹3000' }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fees</Text>

            <View style={styles.feesBox}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6XaULMNiaEVLwNMc8AimB1CDA4zimESvrow&s' }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.amountText}>Total Amount: ₹15000</Text>
                    <Text>Collected Amount: ₹10000</Text>
                    <Text>Pending Amount: ₹5000</Text>
                </View>
            </View>

            {/* Open Payment Schedule Modal */}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.scheduleButton}>
                <Text style={styles.scheduleText}>View Payment Schedule</Text>
            </TouchableOpacity>

            {/* Pay Now Button */}
            <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payText}>Pay Now</Text>
            </TouchableOpacity>

            {/* Summary Details Table */}
            <Text style={styles.summaryTitle}>Summary Details</Text>
            <View style={styles.summaryContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Installment Paid On</Text>
                    <Text style={styles.headerText}>Amount</Text>
                    <Text style={styles.headerText}>Payment   Mode</Text>
                </View>

                <FlatList
                    data={summaryDetails}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View style={[styles.tableRow, index % 2 !== 0 && styles.alternateRow]}>
                            <Text style={styles.rowText}>{item.paidOn}</Text>
                            <Text style={styles.rowText}>{item.amount}</Text>
                            <Text style={styles.rowText}>{item.mode}</Text>
                        </View>
                    )}
                />
            </View>

            {/* Payment Schedule Modal (Bottom Sheet) */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Payment Schedule</Text>

                        <View style={styles.tableHeader}>
                            <Text style={styles.headerText}>Installment</Text>
                            <Text style={styles.headerText}>Last Date</Text>
                            <Text style={styles.headerText}>Amount</Text>
                        </View>

                        <FlatList
                            data={paymentSchedule}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <View style={[styles.tableRow, index % 2 !== 0 && styles.alternateRow]}>
                                    <Text style={styles.rowText}>{item.installment}</Text>
                                    <Text style={styles.rowText}>{item.lastDate}</Text>
                                    <Text style={styles.rowText}>{item.amount}</Text>
                                </View>
                            )}
                        />

                        {/* Close Button */}
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Icon name="close-circle" size={35} color="red" />
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },

    feesBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        marginBottom: 10,
        width: '90%'
    },

    profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    amountText: { fontSize: 18, fontWeight: 'bold' },

    scheduleButton: { marginVertical: 15 },
    scheduleText: { fontSize: 18, fontWeight: '500', color: '#007bff', textAlign: 'center' },

    payButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', width: '90%' },
    payText: { color: 'white', fontSize: 16, fontWeight: '500' },

    summaryTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },

    summaryContainer: {
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ddd'
    },

    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },

    headerText: { fontSize: 14, fontWeight: '600', color: '#333', flex: 1, textAlign: 'center' },

    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10
    },

    alternateRow: { backgroundColor: '#f9f9f9' },

    rowText: { fontSize: 14, color: '#333', textAlign: 'center', flex: 1 },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },

    modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },

    closeButton: {
        position: 'absolute',
        top: -20,
        right: 25,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 10,
    },

});

export default FeesScreen;
