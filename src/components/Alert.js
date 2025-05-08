import { Alert } from "react-native";

export const showBreakReminder = () => {
    Alert.alert(
        "Pausa para Alongamento!",
        "Levante-se, alongue-se, beba água e descanse por alguns minutos! 🏃‍♂️💧",
        [{ text: "OK", onPress: () => console.log("Alerta fechado") }]
    );
};

export const showFocusReminder = () => {
    Alert.alert(
        "Hora de Focar! 🎯",
        "Volte ao seu objetivo. Concentre-se e dê o seu melhor nesse momento de estudo ou trabalho! 🚀",
        [{ text: "Vamos lá!", onPress: () => console.log("Usuário voltou ao foco") }]
    );
};

// export default showBreakReminder;
