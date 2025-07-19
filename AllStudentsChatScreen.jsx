import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ALL_STUDENTS = [
    {
        id: '1',
        name: 'Omkar Jadhav',
        className: '10th A',
        dp: 'https://i.pravatar.cc/150?img=10',
    },
    {
        id: '2',
        name: 'Sneha Patil',
        className: '10th B',
        dp: 'https://i.pravatar.cc/150?img=11',
    },
    {
        id: '3',
        name: 'Rahul Shinde',
        className: '9th A',
        dp: 'https://i.pravatar.cc/150?img=12',
    },
    {
        id: '4',
        name: 'Aarti Pawar',
        className: '8th B',
        dp: 'https://i.pravatar.cc/150?img=13',
    },
    {
        id: '5',
        name: 'Nikhil Joshi',
        className: '9th B',
        dp: 'https://i.pravatar.cc/150?img=14',
    },
];

const classOptions = ['All', '10th', '9th', '8th'];
const divisionOptions = ['All', 'A', 'B'];

const AllStudentsChatScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [selectedClass, setSelectedClass] = useState('All');
    const [selectedDivision, setSelectedDivision] = useState('All');
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    // Temporary values for modal pickers
    const [tempClass, setTempClass] = useState(selectedClass);
    const [tempDivision, setTempDivision] = useState(selectedDivision);

    const filteredStudents = ALL_STUDENTS.filter(student => {
        const nameMatch = `${student.name} ${student.className}`.toLowerCase().includes(search.toLowerCase());
        const [studentClass, studentDivision] = student.className.split(' ');

        const classMatch = selectedClass === 'All' || studentClass === selectedClass;
        const divisionMatch = selectedDivision === 'All' || studentDivision === selectedDivision;

        return nameMatch && classMatch && divisionMatch;
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchWrapper}>
                    <TextInput
                        placeholder="Search all students..."
                        placeholderTextColor="#aaa"
                        value={search}
                        onChangeText={setSearch}
                        style={styles.searchInput}
                    />
                </View>

                {/* Filter Button */}
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => {
                        setTempClass(selectedClass);
                        setTempDivision(selectedDivision);
                        setFilterModalVisible(true);
                    }}
                >
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>

                {/* Student List */}
                <FlatList
                    data={filteredStudents}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('Chat', { user: item })}
                        >
                            <Image source={{ uri: item.dp }} style={styles.dp} />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.className}>{item.className}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

                {/* Filter Modal */}
                <Modal visible={filterModalVisible} transparent animationType="fade">
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressOut={() => setFilterModalVisible(false)}
                        style={styles.modalWrapper}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Filter Students</Text>

                                <Text style={styles.modalLabel}>Class</Text>
                                <Picker
                                    selectedValue={tempClass}
                                    onValueChange={(val) => setTempClass(val)}
                                    style={styles.picker}
                                >
                                    {classOptions.map(cls => (
                                        <Picker.Item key={cls} label={cls} value={cls} />
                                    ))}
                                </Picker>

                                <Text style={styles.modalLabel}>Division</Text>
                                <Picker
                                    selectedValue={tempDivision}
                                    onValueChange={(val) => setTempDivision(val)}
                                    style={styles.picker}
                                >
                                    {divisionOptions.map(div => (
                                        <Picker.Item key={div} label={div} value={div} />
                                    ))}
                                </Picker>

                                <Button
                                    title="Apply Filters"
                                    onPress={() => {
                                        setSelectedClass(tempClass);
                                        setSelectedDivision(tempDivision);
                                        setFilterModalVisible(false);
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },

    searchWrapper: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 14,
        elevation: 3,
    },

    searchInput: {
        padding: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        borderRadius: 14,
        color: '#333',
    },

    filterButton: {
        marginHorizontal: 16,
        marginBottom: 10,
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: 120,
        alignSelf: 'flex-start',
    },

    filterText: {
        color: '#fff',
        fontWeight: '600',
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 12,
        borderRadius: 12,
        elevation: 1,
    },

    dp: {
        width: 52,
        height: 52,
        borderRadius: 26,
        marginRight: 12,
    },

    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
    },

    className: {
        fontSize: 14,
        color: '#666',
    },

    modalWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 20,
        elevation: 5,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },

    modalLabel: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 4,
        color: '#333',
    },

    picker: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
});

export default AllStudentsChatScreen;
