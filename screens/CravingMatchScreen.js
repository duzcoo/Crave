import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const CravingMatchScreen = () => {
    const [input, setInput] = useState('');
    const [matches, setMatches] = useState([]);

    const handleSearch = async () => {
        // TODO: Implement API call to fetch matched dishes based on `input`
        // For now, let's just simulate with static data
        const fetchedMatches = [
            { id: '1', name: 'Pizza Margherita' },
            { id: '2', name: 'Vegetarian Pasta' },
            // ... more matches
        ];
        setMatches(fetchedMatches);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="What are you craving?"
                onChangeText={setInput}
                value={input}
            />
            <Button
                title="Find Matches"
                onPress={handleSearch}
            />
            <FlatList
                data={matches}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '100%',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default CravingMatchScreen;
