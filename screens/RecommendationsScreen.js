import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const RecommendationScreen = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecommendations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Replace with your API call to fetch personalized recommendations
            const fetchedRecommendations = [
                { id: '1', name: 'Chicken Alfredo' },
                { id: '2', name: 'Vegan Buddha Bowl' },
                // ... more recommendations
            ];
            setRecommendations(fetchedRecommendations);
        } catch (err) {
            setError('Failed to load recommendations.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    if (isLoading) {
        return <View style={styles.container}><Text>Loading...</Text></View>;
    }

    if (error) {
        return <View style={styles.container}><Text>{error}</Text></View>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={recommendations}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    title: {
        fontWeight: 'bold',
    },
});

export default RecommendationScreen;
