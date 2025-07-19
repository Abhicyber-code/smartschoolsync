import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Animated,
    FlatList,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const categories = ['Students', 'Events', 'Chats', 'Notices'];

const subFiltersMap = {
    Students: ['Class', 'Division', 'Disability', 'Birthday Today'],
    Events: ['Type', 'Date', 'Location'],
    Chats: ['Unread', 'Starred', 'Pinned'],
    Notices: ['Important', 'Circular', 'Exam'],
};

const SmartFilter = ({ visible, onClose, onApply }) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const slideAnim = new Animated.Value(height);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setStep(2);
    };

    const handleSubFilterToggle = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        );
    };

    const resetFilter = () => {
        setStep(1);
        setSelectedCategory(null);
        setSelectedFilters([]);
    };

    const applyFilter = () => {
        onApply({
            category: selectedCategory,
            filters: selectedFilters,
        });
        resetFilter();
    };

    const startAnimation = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeAnimation = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onClose();
            resetFilter();
        });
    };

    return (
        <Modal transparent visible={visible} animationType="none" onShow={startAnimation}>
            <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={closeAnimation}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Smart Filter</Text>
                    <TouchableOpacity onPress={resetFilter}>
                        <Text style={styles.reset}>Reset</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    {step === 1 && (
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleCategorySelect(item)}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                    <Ionicons name="chevron-forward" size={20} color="#999" />
                                </TouchableOpacity>
                            )}
                        />
                    )}

                    {step === 2 && (
                        <>
                            <Text style={styles.subHeading}>Select Filters for {selectedCategory}</Text>
                            <FlatList
                                data={subFiltersMap[selectedCategory] || []}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.filterPill,
                                            selectedFilters.includes(item) && styles.filterPillSelected,
                                        ]}
                                        onPress={() => handleSubFilterToggle(item)}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                selectedFilters.includes(item) && styles.pillTextSelected,
                                            ]}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                numColumns={2}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                            />
                        </>
                    )}
                </View>

                <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
                    <Text style={styles.applyText}>Apply Filter</Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: '90%',
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    reset: {
        color: '#007AFF',
        fontWeight: '500',
    },
    body: {
        marginTop: 20,
        flex: 1,
    },
    option: {
        padding: 16,
        backgroundColor: '#f7f7f7',
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    filterPill: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 20,
        marginBottom: 10,
        marginRight: 8,
        paddingHorizontal: 16,
    },
    filterPillSelected: {
        backgroundColor: '#007AFF',
    },
    pillText: {
        fontSize: 14,
        color: '#333',
    },
    pillTextSelected: {
        color: '#fff',
    },
    applyButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    applyText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default SmartFilter;
