import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Filter from './Filter';

const demoData = [
    { id: '1', name: 'John', tags: ['Grade A', 'Math', '2025'] },
    { id: '2', name: 'Alice', tags: ['Grade B', 'Science', '2026'] },
    { id: '3', name: 'Bob', tags: ['class1_Division A', 'Math', '2025'] },
    { id: '4', name: 'Charlie', tags: ['class2_Division B', 'Science', '2026'] },
];

const MyScreen = () => {
    const [filteredData, setFilteredData] = useState(demoData);

    const handleFilterChange = (selectedTags) => {
        if (selectedTags.length === 0) {
            setFilteredData(demoData); // Show all records if no filter is applied
        } else {
            // Filter data by matching any of the selected tags
            const filtered = demoData.filter((item) => {
                // Check if any of the selected tags match the item's tags
                return selectedTags.some(tag => item.tags.includes(tag));
            });
            setFilteredData(filtered);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Filter onFilterChange={handleFilterChange} />
            <View style={styles.listContainer}>
                <Text style={styles.heading}>Results: {filteredData.length}</Text>
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.tags}>{item.tags.join(', ')}</Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    item: {
        backgroundColor: '#f2f2f2',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
    tags: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
});

export default MyScreen;
