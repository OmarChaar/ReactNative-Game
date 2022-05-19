import { StyleSheet, Text, Platform } from 'react-native';
import Colors from '../../constants/colors';

function Title({children}) {
    return (
        <Text style={styles.titleText}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        // fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center',
        borderWidth: 2,
        // borderWidth: Platform.OS === 'android' ? 2 : 0, // Adds styling depending on the current platform.
        // borderWidth: Platform.select({ios: 0, android: 2}), // Alternative Platform styling.
        borderColor: Colors.white,
        padding: 12,
        borderRadius: 4,
        maxWidth: '80%',
        width: 300
    }
})

export default Title;



