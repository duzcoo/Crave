import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const FoodInsightsScreen = () => {
    const [trendingDishes, setTrendingDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTrendingDishes = async () => {
        setIsLoading(true);
        setError(null);

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const coords = location.coords;

            const yelpApiKey = Constants.expoConfig.extra.yelpApiKey;
            const apiUrl = 'https://api.yelp.com/v3/businesses/search';
            const params = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                term: 'restaurants',
                sort_by: 'rating',
                limit: 12
            };

            const queryString = Object.keys(params)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join('&');

            const response = await fetch(`${apiUrl}?${queryString}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${yelpApiKey}`,
                },
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Network response was not ok: ${response.status}. Body: ${errorBody}`);
            }

            const data = await response.json();

            const fetchedDishes = data.businesses.map(business => ({
                id: business.id,
                name: business.name,
                imageUrl: business.image_url, // Include image URL
                popularity: Math.round(business.rating * 20),
                yelpUrl: business.url
            }));

            setTrendingDishes(fetchedDishes);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Failed to load data: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const PopularityIcon = ({ popularity }) => {
        let icon;
        if (popularity >= 75) {
            icon = '▲▲▲';
        } else if (popularity >= 50) {
            icon = '▲▲';
        } else {
            icon = '▲';
        }

        return <Text style={styles.popularityIcon}>{icon}</Text>;
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
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => item.yelpUrl && Linking.openURL(item.yelpUrl)}>
                        {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
                        <Text style={styles.title}>{item.name}</Text>
                        <PopularityIcon popularity={item.popularity} />
                    </TouchableOpacity>
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
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
    },
    popularityIcon: {
        fontSize: 18,
        color: '#FFD700', // Adjust the color as needed
    },
    // ... any additional styles ...
});

export default FoodInsightsScreen;
