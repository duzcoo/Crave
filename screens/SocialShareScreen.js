import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Share } from 'react-native';

const SocialShareScreen = () => {
    const [favorites, setFavorites] = useState([
        { id: '1', name: 'Sushi Platter' },
        { id: '2', name: 'Classic Cheeseburger' },
        { id: '3', name: 'Vegetarian Pizza' },
        { id: '4', name: 'Spicy Ramen' },
        // ... more favorites
    ]);

    const onShare = async (item) => {
        try {
            await Share.share({
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
                        <View style={styles.buttons}>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => onShare(item)}>
                                <Text style={styles.buttonText}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.button, styles.removeButton]}
                                onPress={() => removeFromFavorites(item.id)}>
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: '#f0f0f0',
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        marginLeft: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#007bff',
        borderRadius: 4,
    },
    removeButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
    },
});

export default SocialShareScreen;
