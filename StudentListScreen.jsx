


import React, { useState, useEffect, useMemo } from 'react';
import {
    View, FlatList, Text, TouchableOpacity,
    StyleSheet, TextInput, StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import debounce from 'lodash.debounce';

export default function StudentListScreen({ route, navigation }) {
    const { selectedClass, selectedDivision } = route.params;

    const allStudents = {
        '1st': {
            A: ['Aarav Joshi', 'Tanvi Patil', 'Ishaan Kale', 'Nidhi Pawar', 'Nikhil Sathe'],
            B: ['Riya Bhosale', 'Yug Jadhav', 'Sneha Shinde', 'Manas Gawde', 'Vrushali Salve'],
            C: ['Tejas More', 'Divya Gite', 'Mitali Mahajan', 'Sahil Dhamdhere', 'Neha Raut'],
        },
        '2nd': {
            A: ['Avni Phatak', 'Rudra Deshmukh', 'Rutuja Khot', 'Saanvi Gaikwad', 'Omkar Rane'],
            B: ['Anvi Ingale', 'Tushar Naik', 'Pranav Bhongale', 'Aishwarya Kulkarni', 'Kunal Tambe'],
            C: ['Mayur Mane', 'Ankita Gawande', 'Rohit Barate', 'Sayali Wagh', 'Ameya Raje'],
        }
    };

    const studentDetails = {
        'Aarav Joshi': {
            name: 'Aarav Joshi', class: '1st', division: 'A',
            father: 'Suresh Joshi', mother: 'Lata Joshi', guardian: 'Kiran Joshi',
            dob: '2015-04-12', mobile: '9876543210', altMobile: '9988776655',
            email: 'aarav@example.com', address: 'Pune, Maharashtra', disability: 'None'
        },
        'Tanvi Patil': {
            name: 'Tanvi Patil', class: '1st', division: 'A',
            father: 'Ramesh Patil', mother: 'Sunita Patil', guardian: 'Meena Patil',
            dob: '2015-08-22', mobile: '9123456780', altMobile: '9823456780',
            email: 'tanvi@example.com', address: 'Satara, Maharashtra', disability: 'None'
        },
        // Add other student profiles here...
    };

    const fullList = allStudents[selectedClass]?.[selectedDivision]?.map((name, index) => ({
        id: `${selectedClass}-${selectedDivision}-${index}`,
        name,
        ...studentDetails[name]
    })) || [];

    const [searchText, setSearchText] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(fullList);

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = fullList.filter((student) =>
            student.name.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

    const debouncedSearch = useMemo(() => debounce(handleSearch, 150), [fullList]);

    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, []);

    const getInitialsBg = (name) => {
        const colors = ['#FCD34D', '#6EE7B7', '#93C5FD', '#FCA5A5', '#D8B4FE'];
        let charCodeSum = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
        return colors[charCodeSum % colors.length];
    };

    const highlightMatch = (name) => {
        const keyword = searchText.trim();
        if (!keyword) return <Text style={styles.name}>{name}</Text>;

        const match = name.slice(0, keyword.length);
        const rest = name.slice(keyword.length);

        return (
            <Text style={styles.name}>
                <Text style={styles.highlight}>{match}</Text>
                {rest}
            </Text>
        );
    };

    const handlePress = (student) => {
        navigation.navigate('StudentDetail', { student });
    };

    const renderItem = ({ item, index }) => (
        <Animatable.View animation="fadeInUp" duration={400} delay={index * 50}>
            <TouchableOpacity style={styles.card} onPress={() => handlePress(item)} activeOpacity={0.9}>
                <View style={styles.row}>
                    <View style={[styles.avatar, { backgroundColor: getInitialsBg(item.name) }]}>
                        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                    </View>
                    {highlightMatch(item.name)}
                    <Icon name="chevron-forward" size={24} color="#6b7280" />
                </View>
            </TouchableOpacity>
        </Animatable.View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#E8F0FE" />
            <Text style={styles.header}>Class {selectedClass} - Division {selectedDivision}</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Search student..."
                placeholderTextColor="#999"
                onChangeText={debouncedSearch}
            />

            {filteredStudents.length === 0 ? (
                <Animatable.View animation="fadeIn" style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>😕</Text>
                    <Text style={styles.emptyText}>No students found</Text>
                </Animatable.View>
            ) : (
                <FlatList
                    data={filteredStudents}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F0FE',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    searchInput: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        fontSize: 16,
        color: '#111827',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    card: {
        backgroundColor: '#ffffff',
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 16,
        marginBottom: 14,
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        flex: 1,
        marginLeft: 14,
    },
    highlight: {
        color: '#3b82f6',
        fontWeight: '700',
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#1e3a8a',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6b7280',
    },
});
