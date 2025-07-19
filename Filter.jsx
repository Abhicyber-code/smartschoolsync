

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Filter = ({ onFilterChange }) => {
    const [isFilterExpanded, setFilterExpanded] = useState(false);
    const [localSelectedTags, setLocalSelectedTags] = useState([]);
    const [localSelectedClasses, setLocalSelectedClasses] = useState({});
    const [expandAnimation] = useState(new Animated.Value(0));
    const [arrowRotation] = useState(new Animated.Value(0));

    const filterOptions = [
        { id: 'gradeA', label: 'Grade A' },
        { id: 'gradeB', label: 'Grade B' },
        {
            id: 'class1',
            label: 'Class 1',
            subOptions: ['Division A', 'Division B', 'Division C'],
        },
        {
            id: 'class2',
            label: 'Class 2',
            subOptions: ['Division A', 'Division B'],
        },
        { id: 'math', label: 'Math' },
        { id: 'science', label: 'Science' },
        { id: '2025', label: '2025' },
        { id: '2026', label: '2026' },
    ];

    const toggleFilter = () => {
        setFilterExpanded(!isFilterExpanded);

        Animated.timing(expandAnimation, {
            toValue: isFilterExpanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(arrowRotation, {
            toValue: isFilterExpanded ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const toggleTagSelection = (tag) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (localSelectedTags.includes(tag)) {
            setLocalSelectedTags(localSelectedTags.filter((item) => item !== tag));
        } else {
            setLocalSelectedTags([...localSelectedTags, tag]);
        }
    };

    const toggleClass = (cls) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const isSelected = localSelectedClasses[cls.id]?.selected;

        setLocalSelectedClasses((prev) => ({
            ...prev,
            [cls.id]: {
                ...prev[cls.id],
                selected: !isSelected,
            },
        }));

        if (!isSelected) {
            setLocalSelectedTags((prev) => prev.filter((tag) => !tag.startsWith(cls.id)));
        }
    };

    const toggleDivision = (classId, division) => {
        const key = `${classId}_${division}`;
        toggleTagSelection(key);

        setLocalSelectedClasses((prev) => ({
            ...prev,
            [classId]: {
                ...(prev[classId] || {}),
                selected: true,
            },
        }));
    };

    const clearAllTags = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setLocalSelectedTags([]);  // Clear selected tags
        setLocalSelectedClasses({});  // Clear selected classes
        onFilterChange([]); // Notify the parent to reset the filter
        toggleFilter(); // Close the filter when clearing all tags
    };

    const handleApply = () => {
        onFilterChange(localSelectedTags); // Notify parent of the selected tags
        toggleFilter(); // Close the filter after applying
    };

    const arrowRotationInterpolated = arrowRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
                    <Text style={styles.filterText}>Filter</Text>
                    {localSelectedTags.length > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{localSelectedTags.length}</Text>
                        </View>
                    )}
                    <Animated.Text
                        style={[styles.arrow, { transform: [{ rotate: arrowRotationInterpolated }] }]} >
                        ▼
                    </Animated.Text>
                </TouchableOpacity>
            </View>

            <Animated.View
                style={[styles.filterSection, {
                    height: expandAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 350],
                    }),
                    opacity: expandAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    }),
                }]}>
                <ScrollView contentContainerStyle={styles.tagWrap}>
                    {filterOptions.map((option) => {
                        const isParentWithChildren = option.subOptions;
                        const isParentSelected = localSelectedClasses[option.id]?.selected;

                        if (isParentWithChildren) {
                            return (
                                <View key={option.id} style={styles.classBlock}>
                                    <TouchableOpacity
                                        onPress={() => toggleClass(option)}
                                        style={[styles.filterTag, isParentSelected && styles.selectedTag]}>
                                        <Text style={[styles.filterTagText, isParentSelected && styles.selectedTagText]}>
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>

                                    {isParentSelected && (
                                        <View style={styles.divisionContainer}>
                                            {option.subOptions.map((sub) => {
                                                const key = `${option.id}_${sub}`;
                                                const isSelected = localSelectedTags.includes(key);
                                                return (
                                                    <TouchableOpacity
                                                        key={key}
                                                        onPress={() => toggleDivision(option.id, sub)}
                                                        style={[styles.filterTag, isSelected && styles.selectedTag]}>
                                                        <Text style={[styles.filterTagText, isSelected && styles.selectedTagText]}>
                                                            {sub}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    )}
                                </View>
                            );
                        }

                        const isSelected = localSelectedTags.includes(option.label);
                        return (
                            <TouchableOpacity
                                key={option.id}
                                style={[styles.filterTag, isSelected && styles.selectedTag]}
                                onPress={() => toggleTagSelection(option.label)}>
                                <Text style={[styles.filterTagText, isSelected && styles.selectedTagText]}>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearAllTags}>
                        <Text style={styles.clearButtonText}>Clear All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={handleApply}>
                        <Text style={styles.applyButtonText}>Apply Filter</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};



const styles = StyleSheet.create({
    header: {
        backgroundColor: '#333',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        elevation: 4,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 18,
        backgroundColor: '#F4F4F4',
        elevation: 4,
    },
    filterText: {
        color: '#333',
        fontSize: 18,
        fontWeight: '500',
    },
    badge: {
        backgroundColor: '#FF5E00',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginLeft: 12,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
    arrow: {
        color: '#333',
        fontSize: 20,
        marginLeft: 16,
    },
    filterSection: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        borderRadius: 12,
        elevation: 4,
    },
    tagWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 12,
    },
    filterTag: {
        backgroundColor: '#F4F4F4',
        borderRadius: 24,
        paddingVertical: 10,
        paddingHorizontal: 18,
        marginHorizontal: 8,
        marginVertical: 8,
        minWidth: 120,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    filterTagText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '400',
    },
    selectedTag: {
        backgroundColor: '#007AFF',
    },
    selectedTagText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    classBlock: {
        marginBottom: 16,
    },
    divisionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    button: {
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 6,
    },
    applyButton: {
        backgroundColor: '#34C759',
        flex: 1,
        marginLeft: 12,
        borderRadius: 30,
    },
    clearButton: {
        backgroundColor: '#FF3B30',
        flex: 1,
        borderRadius: 30,
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    clearButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Filter;