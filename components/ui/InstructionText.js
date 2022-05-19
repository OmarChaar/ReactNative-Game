import { StyleSheet, Text} from 'react-native';
import Colors from '../../constants/colors';

function InstructionText({children, style}) {
    return (
        <Text style={[styles.instructionText, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        color: Colors.accent500,
        marginVertical: 0,
    }
})

export default InstructionText;