import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Animated
} from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
    {
        key: '1',
        title: 'Bright Future Begins Here',
        subtitle: 'Experience the smartest way to manage your school life.',
        image: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
    },
    {
        key: '2',
        title: 'Powerful. Simple. Seamless.',
        subtitle: 'From attendance to results — everything in one app.',
        image: 'https://cdn-icons-png.flaticon.com/512/1006/1006550.png',
    },
    {
        key: '3',
        title: 'Stay Ahead Always',
        subtitle: 'Get real-time updates, never miss a thing again.',
        image: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
    },
];

const WelcomeScreen = ({ onFinishWelcome }) => {
    const flatListRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleSkip = () => {
        flatListRef.current.scrollToIndex({ index: slides.length - 1 });
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        const nextIndex = viewableItems[0]?.index || 0;
        setCurrentIndex(nextIndex);

        // Fade transition
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }).current;

    const renderItem = ({ item }) => (
        <Animated.View style={[styles.slide, { opacity: fadeAnim }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f4f9ff" />

            <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            />

            <View style={styles.footer}>
                <View style={styles.indicators}>
                    {slides.map((_, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: currentIndex === index ? '#4b7bec' : '#ccc',
                                    transform: [
                                        {
                                            scale: currentIndex === index ? 1.4 : 1,
                                        },
                                    ],
                                },
                            ]}
                        />
                    ))}
                </View>

                {currentIndex === slides.length - 1 ? (
                    <TouchableOpacity
                        style={styles.getStartedBtn}
                        activeOpacity={0.8}
                        onPress={onFinishWelcome}
                    >
                        <Text style={styles.getStartedText}>Get Started</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.nextBtn}
                        activeOpacity={0.7}
                        onPress={handleNext}
                    >
                        <Text style={styles.nextText}>Next</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f9ff',
    },
    skipBtn: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 2,
    },
    skipText: {
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    image: {
        width: width * 0.5,
        height: width * 0.5,
        marginBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 17,
        color: '#444',
        textAlign: 'center',
        paddingHorizontal: 12,
        lineHeight: 24,
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    indicators: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 6,
    },
    getStartedBtn: {
        backgroundColor: '#4b7bec',
        paddingVertical: 14,
        paddingHorizontal: 80,
        borderRadius: 32,
        elevation: 4,
    },
    getStartedText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    nextBtn: {
        padding: 10,
    },
    nextText: {
        color: '#4b7bec',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default WelcomeScreen;
