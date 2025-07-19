import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';

const classes = ['Class 1', 'Class 2', 'Class 3'];
const divisions = ['A', 'B', 'C'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AdminTimetableScreen = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [schoolFrom, setSchoolFrom] = useState(new Date());
    const [schoolTo, setSchoolTo] = useState(new Date());
    const [lunchFrom, setLunchFrom] = useState(new Date());
    const [lunchTo, setLunchTo] = useState(new Date());
    const [lectureDuration, setLectureDuration] = useState('60');
    const [timetable, setTimetable] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isTimetableGenerated, setIsTimetableGenerated] = useState(false);
    const [pickerType, setPickerType] = useState('');
    const [isPickerVisible, setPickerVisible] = useState(false);

    const [sameAsPreviousDay, setSameAsPreviousDay] = useState(false);
    const [sameForAllWeek, setSameForAllWeek] = useState(false);

    const showTimePicker = (type) => {
        setPickerType(type);
        setPickerVisible(true);
    };

    const hideTimePicker = () => {
        setPickerVisible(false);
    };

    const handleTimeConfirm = (time) => {
        switch (pickerType) {
            case 'schoolFrom':
                setSchoolFrom(time);
                break;
            case 'schoolTo':
                setSchoolTo(time);
                break;
            case 'lunchFrom':
                setLunchFrom(time);
                break;
            case 'lunchTo':
                setLunchTo(time);
                break;
            default:
                break;
        }
        hideTimePicker();
    };

    const formatTime = (time) => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const isInLunchBreak = (start, end) => {
        return (start < lunchTo && end > lunchFrom);
    };

    const generateLectureSlots = () => {
        const slots = [];
        let current = new Date(schoolFrom);
        const duration = parseInt(lectureDuration);

        while (current < schoolTo) {
            const next = new Date(current.getTime() + duration * 60000);

            if (next > schoolTo) break;

            if (isInLunchBreak(current, next)) {
                slots.push({
                    start: new Date(lunchFrom),
                    end: new Date(lunchTo),
                    subject: 'Lunch Break',
                    isLunch: true,
                });
                current = new Date(lunchTo);
                continue;
            }

            slots.push({
                start: new Date(current),
                end: new Date(next),
                subject: '',
                isLunch: false,
            });

            current = new Date(next);
        }

        return slots;
    };

    const handleGenerateTimetable = () => {
        if (!selectedClass || !selectedDivision || !lectureDuration) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        const dailySlots = generateLectureSlots();
        const fullTimetable = {};

        days.forEach((day) => {
            fullTimetable[day] = dailySlots.map((slot, index) => ({
                ...slot,
                id: `${day}-${index}`,
            }));
        });

        setTimetable(fullTimetable);
        setIsTimetableGenerated(true);
    };

    const handleSaveTimetable = () => {
        if (!timetable) {
            Alert.alert('Error', 'No timetable to save');
            return;
        }

        const serializeSlot = (slot) => ({
            start: slot.start.toISOString(),
            end: slot.end.toISOString(),
            subject: slot.subject,
            isLunch: slot.isLunch,
        });

        const serializedTimetable = {};
        Object.keys(timetable).forEach((day) => {
            serializedTimetable[day] = timetable[day].map(serializeSlot);
        });

        const timetableJson = JSON.stringify({
            class: selectedClass,
            division: selectedDivision,
            lectureDuration,
            schoolFrom: schoolFrom.toISOString(),
            schoolTo: schoolTo.toISOString(),
            lunchFrom: lunchFrom.toISOString(),
            lunchTo: lunchTo.toISOString(),
            timetable: serializedTimetable,
        }, null, 2);

        console.log('Generated Timetable JSON:', timetableJson);
        Alert.alert('Success', 'Timetable Saved Successfully!');
        setIsSaved(true);

        setTimeout(() => setIsSaved(false), 3000);
    };

    const updateSubject = (day, index, text) => {
        const updated = { ...timetable };
        updated[day][index].subject = text;
        setTimetable(updated);
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const applySameAsPreviousDay = (day) => {
        if (!timetable || !timetable[day]) return;
        const previousDay = days[days.indexOf(day) - 1] || days[days.length - 1];
        setTimetable((prevTimetable) => ({
            ...prevTimetable,
            [day]: prevTimetable[previousDay].map((slot) => ({ ...slot })),
        }));
    };

    const applySameForAllWeek = () => {
        if (!timetable) return;
        const allDaySlots = Object.values(timetable)[0];
        const newTimetable = {};
        days.forEach((day) => {
            newTimetable[day] = allDaySlots.map((slot) => ({ ...slot }));
        });
        setTimetable(newTimetable);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.header}>Upload Weekly Timetable</Text>

            <Text style={styles.label}>Select Class</Text>
            <Picker
                selectedValue={selectedClass}
                onValueChange={setSelectedClass}
                style={styles.picker}
            >
                <Picker.Item label="-- Select Class --" value="" />
                {classes.map((cls) => (
                    <Picker.Item key={cls} label={cls} value={cls} />
                ))}
            </Picker>

            <Text style={styles.label}>Select Division</Text>
            <Picker
                selectedValue={selectedDivision}
                onValueChange={setSelectedDivision}
                style={styles.picker}
            >
                <Picker.Item label="-- Select Division --" value="" />
                {divisions.map((div) => (
                    <Picker.Item key={div} label={div} value={div} />
                ))}
            </Picker>

            {[{ label: 'School Start Time', value: schoolFrom, key: 'schoolFrom' },
            { label: 'School End Time', value: schoolTo, key: 'schoolTo' },
            { label: 'Lunch Start Time', value: lunchFrom, key: 'lunchFrom' },
            { label: 'Lunch End Time', value: lunchTo, key: 'lunchTo' }].map(({ label, value, key }) => (
                <View key={key} style={styles.timeBlock}>
                    <Text style={styles.label}>{label}</Text>
                    <TouchableOpacity style={styles.timeInput} onPress={() => showTimePicker(key)}>
                        <Text>{formatTime(value)}</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
                is24Hour={true}
            />

            <Text style={styles.label}>Lecture Duration (in minutes)</Text>
            <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                value={lectureDuration}
                onChangeText={setLectureDuration}
                placeholder="e.g., 60"
            />

            <TouchableOpacity style={styles.generateBtn} onPress={handleGenerateTimetable}>
                <Text style={styles.generateText}>Generate Timetable</Text>
            </TouchableOpacity>

            {isTimetableGenerated && (
                <>
                    <ScrollView
                        horizontal
                        contentContainerStyle={styles.dayContainer}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                    >
                        {days.map((day, index) => (
                            <TouchableOpacity
                                key={day}
                                style={[styles.dayBox, { backgroundColor: index % 2 === 0 ? '#3498db' : '#e67e22' }]}
                                onPress={() => handleDayClick(day)}
                            >
                                <Text style={styles.dayBoxText}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={styles.checkboxContainer}>
                        <View style={styles.checkboxRow}>
                            <CheckBox
                                value={sameAsPreviousDay}
                                onValueChange={() => {
                                    setSameAsPreviousDay(!sameAsPreviousDay);
                                    if (sameAsPreviousDay) {
                                        applySameAsPreviousDay(selectedDay);
                                    }
                                }}
                            />
                            <Text style={styles.checkboxLabel}>Same as Previous Day</Text>
                        </View>
                        <View style={styles.checkboxRow}>
                            <CheckBox
                                value={sameForAllWeek}
                                onValueChange={() => {
                                    setSameForAllWeek(!sameForAllWeek);
                                    if (sameForAllWeek) {
                                        applySameForAllWeek();
                                    }
                                }}
                            />
                            <Text style={styles.checkboxLabel}>Same for All Week</Text>
                        </View>
                    </View>

                    {selectedDay && (
                        <View style={styles.selectedDayContainer}>
                            <Text style={styles.selectedDayHeader}>Timetable for {selectedDay}</Text>
                            {timetable[selectedDay]?.map((slot, index) => (
                                <View key={slot.id} style={styles.slotRow}>
                                    <Text style={styles.slotTime}>
                                        {formatTime(slot.start)} - {formatTime(slot.end)}
                                    </Text>
                                    {slot.isLunch ? (
                                        <Text style={[styles.subjectInput, styles.lunchText]}>Lunch Break</Text>
                                    ) : (
                                        <TextInput
                                            placeholder="Enter Subject"
                                            value={slot.subject}
                                            onChangeText={(text) => updateSubject(selectedDay, index, text)}
                                            style={styles.subjectInput}
                                        />
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Checkboxes visible for all days */}


                    <TouchableOpacity
                        style={[styles.saveBtn, { backgroundColor: isSaved ? '#95a5a6' : '#2ecc71' }]}
                        onPress={handleSaveTimetable}
                        disabled={!timetable}
                    >
                        <Text style={styles.saveText}>
                            {isSaved ? 'Saved' : 'Save Timetable'}
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f0f4f8',
        padding: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 25,
        color: '#0a0f2c',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginTop: 15,
    },
    picker: {
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    timeBlock: {
        marginBottom: 20,
    },
    timeInput: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
    },
    textInput: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    generateBtn: {
        backgroundColor: '#4e8cff',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#4e8cff',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    generateText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    dayContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
    },
    dayBox: {
        paddingVertical: 12,
        paddingHorizontal: 22,
        backgroundColor: '#d0d9ff',
        borderRadius: 20,
        marginHorizontal: 6,
        alignItems: 'center',
    },
    dayBoxText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    selectedDayContainer: {
        marginTop: 20,
    },
    selectedDayHeader: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0a0f2c',
        marginBottom: 15,
    },
    slotRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 12,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    slotTime: {
        width: 110,
        fontSize: 16,
        fontWeight: '600',
        color: '#344054',
    },
    subjectInput: {
        flex: 1,
        padding: 12,
        backgroundColor: '#f7f9fc',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#d1d5db',
        marginLeft: 12,
        fontSize: 15,
    },
    lunchText: {
        color: '#e74c3c',
        fontStyle: 'italic',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
    },
    saveBtn: {
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#00c48c',
        marginTop: 30,
        shadowColor: '#00c48c',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    saveText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },

    checkboxContainer: {
        marginVertical: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkboxLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
    },
});

export default AdminTimetableScreen;