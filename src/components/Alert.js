import { Alert } from "react-native";

const showBreakReminder = () => {
    Alert.alert(
        "Pausa para Alongamento!",
        "Levante-se, alongue-se, beba água e descanse por alguns minutos! 🏃‍♂️💧",
        [{ text: "OK", onPress: () => console.log("Alerta fechado") }]
    );
};

export default showBreakReminder;
