import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({onPickNumber}) {

    const [enteredNumber, setEnteredNumber] = useState('');

    const { width, height } = useWindowDimensions(); // Gets windows dimensions dynamically.

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
        console.log("enteredNumber", enteredNumber);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Number!', 
                'Number has to be a number between 1 and 99.', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }

        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 400 ? 30 : 100; // Adding this here ensures that it is updated upon orientation changes.

    return (
        <ScrollView style={styles.screen}>
            {/* Building accessible and reachable user input areas */}
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a number</InstructionText>
                        <TextInput 
                            style={styles.numberInput} 
                            maxLength={2} 
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
     
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        // marginTop: deviceHeight < 400 ? 30 : 100, // Any code that should react to orientation changes should go into the component function.
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    numberInput: {
        height: 50,
        width: 50,
        borderBottomColor: Colors.accent500,
        color: Colors.accent500,
        borderBottomWidth: 2,
        fontSize: 32,
        textAlign: 'center',
        marginVertical: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default StartGameScreen;