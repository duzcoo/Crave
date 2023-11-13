import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker'; // or any other image picker library

const MenuScanScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [scannedText, setScannedText] = useState('');

    const handleSelectImage = () => {
        const options = {
            title: 'Select Menu',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                setSelectedImage(source);
                // TODO: Implement OCR processing on the selected image
            }
        });
    };

    // Simulate OCR processing
    const handleScanMenu = () => {
        // TODO: Replace this with actual OCR processing logic
        setScannedText("Extracted text from the image will be displayed here.");
    };

    return (
        <View style={styles.container}>
            <Button title="Select Menu Image" onPress={handleSelectImage} />
            {selectedImage && (
                <>
                    <Image source={selectedImage} style={styles.image} />
                    <Button title="Scan Menu" onPress={handleScanMenu} />
                </>
            )}
            <Text style={styles.scannedText}>{scannedText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 300,
        height: 200,
        margin: 20,
    },
    scannedText: {
        marginTop: 20,
    },
});

export default MenuScanScreen;
