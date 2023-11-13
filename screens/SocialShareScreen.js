import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Share } from 'react-native';

const SocialShareScreen = () => {
    const [favorites, setFavorites] = useState([
        { id: '1', name: 'Sushi Platter' },
        { id: '2', name: 'Classic Cheeseburger' },
        // ... more favorites
    ]);

    const onShare = async (item) => {
        try {
            const result = await Share.share({
                message: `Check out this dish I love on Crave: ${item.name}`,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const removeFromFavorites = (itemId) => {
        setFavorites(favorites.filter(item => item.id !== itemId));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Button title="Share" onPress={() => onShare(item)} />
                        <Button title="Remove from Favorites" onPress={() => removeFromFavorites(item.id)} />
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
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
    },
});

export default SocialShareScreen;
