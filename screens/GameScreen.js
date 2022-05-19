
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import Title from '../components/ui/Title';
import React, { useState, useEffect } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {

    const initialGuess = generateRandomNumberBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    const { width, height } = useWindowDimensions(); // Gets windows dimensions dynamically.

    useEffect(() => {
        if(currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function generateRandomNumberBetween(min, max, exclue) {
        const rndNumber = Math.floor(Math.random() * (max - min)) + min;
    
        if(rndNumber === exclue) {
            return generateRandomNumberBetween(min, max, exclue);
        }
        else {
            return rndNumber;
        }
    }
    
    function newGuessHandler(direction) { // 'lower', 'greater'

        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)){
            Alert.alert("Don't lie!", "You know that this is wrong...", [{text: 'Sorry!', style: 'cancel'}])
            return;
        }

        if(direction === 'lower') {
            maxBoundary = currentGuess;
        }
        else {
            minBoundary = currentGuess + 1;
        }

        const newRndNumber = generateRandomNumberBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={newGuessHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={newGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    
                    
                </View>
                
            </Card>
        </>
    
    );

    if(width > 500) {
        content = (
            <>
                <View style={styles.buttonsContainerLandscape}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={newGuessHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color="white"/>
                        </PrimaryButton>
                    </View>

                    <NumberContainer>{currentGuess}</NumberContainer>

                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={newGuessHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </>
        );
    }

    return (
            <View style={styles.screen}>
                <Title>Opponent's Guess</Title>

                {content}

                <View style={styles.listContainer}>
                    {/* MAPPING ARRAYS */}
                    {/* <View >
                        {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)}
                    </View> */}

                    {/* FLAT-LIST */}
                    <FlatList 
                        data={guessRounds} 
                        renderItem={(itemData) => // FlatList adds 'key' to <Text> automatically 
                            <GuessLogItem 
                                roundNumber={guessRoundsListLength - itemData.index} 
                                guess={itemData.item}>
                            </GuessLogItem>
                        } 
                        keyExtractor={(item) => item} // Unique key
                    />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonsContainerLandscape: {
        flexDirection: 'row',
        alignItems: 'center'
    },  
    buttonContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
});

export default GameScreen;