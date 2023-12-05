import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const RecommendationScreen = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecommendations = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            const yelpApiKey = Constants.expoConfig.extra.yelpApiKey;
            const apiUrl = 'https://api.yelp.com/v3/businesses/search';
            const params = { latitude, longitude, term: 'restaurants', sort_by: 'review_count', limit: 20 };
            const queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

            const response = await fetch(`${apiUrl}?${queryString}`, { method: 'GET', headers: { Authorization: `Bearer ${yelpApiKey}` } });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Network response was not ok: ${response.status}. Body: ${errorBody}`);
            }

            const data = await response.json();

            const fetchedRecommendations = data.businesses.map(business => ({
                id: business.id,
                name: business.name,
                rating: business.rating,
                imageUrl: business.image_url,
                yelpUrl: business.url
            }));

            setRecommendations(fetchedRecommendations);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Failed to load recommendations: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectRestaurant = (restaurantUrl) => {
        Linking.canOpenURL(restaurantUrl).then(supported => {
            if (supported) {
                Linking.openURL(restaurantUrl);
            } else {
                console.log("Don't know how to open this URL: " + restaurantUrl);
            }
        });
    };

    const renderStars = (rating) => {
        const fullStar = '★';
        const emptyStar = '☆';
        const totalStars = 5;

        const fullStarCount = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? '½' : '';
        const emptyStarCount = totalStars - fullStarCount - (halfStar ? 1 : 0);

        return (
            <Text style={styles.starRating}>
                {fullStar.repeat(fullStarCount)}
                {halfStar}
                {emptyStar.repeat(emptyStarCount)}
            </Text>
        );
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
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => handleSelectRestaurant(item.yelpUrl)}>
                        <Text style={styles.title}>{item.name}</Text>
                        {renderStars(item.rating)}
                        {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
                    </TouchableOpacity>
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
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    starRating: {
        color: '#FFD700', // Making stars yellow
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginTop: 10,
    },
});

export default RecommendationScreen;
