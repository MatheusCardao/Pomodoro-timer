import React, { useState } from "react";
import { View, Text, Button, Modal, TextInput } from "react-native";

const SettingsModal = ({ visible, onClose, onSave }) => {
    const [focusMinutes, setFocusMinutes] = useState("25");
    const [focusSeconds, setFocusSeconds] = useState("0");
    const [restMinutes, setRestMinutes] = useState("5");
    const [restSeconds, setRestSeconds] = useState("0");

    const handleSave = () => {
        const focusTime = parseInt(focusMinutes) * 60 + parseInt(focusSeconds);
        const restTime = parseInt(restMinutes) * 60 + parseInt(restSeconds);
        onSave(focusTime, restTime);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={{ padding: 20 }}>
                <Text>🧠 Tempo de Foco</Text>
                <TextInput
                    placeholder="Minutos"
                    keyboardType="numeric"
                    value={focusMinutes}
                    onChangeText={setFocusMinutes}
                />
                <TextInput
                    placeholder="Segundos"
                    keyboardType="numeric"
                    value={focusSeconds}
                    onChangeText={setFocusSeconds}
                />

                <Text>😌 Tempo de Descanso</Text>
                <TextInput
                    placeholder="Minutos"
                    keyboardType="numeric"
                    value={restMinutes}
                    onChangeText={setRestMinutes}
                />
                <TextInput
                    placeholder="Segundos"
                    keyboardType="numeric"
                    value={restSeconds}
                    onChangeText={setRestSeconds}
                />

                <Button title="Salvar" onPress={handleSave} />
                <Button title="Cancelar" onPress={onClose} />
            </View>
        </Modal>
    );
};

export default SettingsModal;
