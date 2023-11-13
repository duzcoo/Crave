import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FoodInsightsScreen = () => {
    const [trendingDishes, setTrendingDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch trending dishes
    const fetchTrendingDishes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Replace with your API call to fetch trending dishes
            const fetchedDishes = [
                { id: '1', name: 'Spicy Ramen', popularity: 95 },
                { id: '2', name: 'Avocado Salad', popularity: 90 },
                // ... more dishes
            ];
            setTrendingDishes(fetchedDishes);
        } catch (err) {
            setError('Failed to load data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendingDishes();
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
                data={trendingDishes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text>Popularity: {item.popularity}%</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
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

export default FoodInsightsScreen;
