import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native";

const SettingsModal = ({ visible, onClose, onSave, currentFocusTime, currentRestTime }) => {
    // Extrai minutos e segundos dos valores atuais (em segundos)
    const extractTimeValues = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return { minutes: minutes.toString(), seconds: seconds.toString() };
    };

    // Inicializa com os valores atuais quando o modal abre
    const [focusMinutes, setFocusMinutes] = useState("");
    const [focusSeconds, setFocusSeconds] = useState("");
    const [restMinutes, setRestMinutes] = useState("");
    const [restSeconds, setRestSeconds] = useState("");

    // Atualiza os valores quando o modal é aberto ou os valores atuais mudam
    useEffect(() => {
        if (visible) {
            const focusValues = extractTimeValues(currentFocusTime);
            const restValues = extractTimeValues(currentRestTime);
            
            setFocusMinutes(focusValues.minutes);
            setFocusSeconds(focusValues.seconds);
            setRestMinutes(restValues.minutes);
            setRestSeconds(restValues.seconds);
        }
    }, [visible, currentFocusTime, currentRestTime]);

    // Validação e formatação dos valores inseridos
    const validateNumericInput = (value, setter) => {
        // Remove caracteres não numéricos
        const numericValue = value.replace(/[^0-9]/g, '');
        setter(numericValue);
        return numericValue;
    };

    const validateSeconds = (value, setter) => {
        const numericValue = validateNumericInput(value, setter);
        // Garante que os segundos estejam entre 0 e 59
        if (parseInt(numericValue) > 59) {
            setter("59");
        }
    };

    const handleSave = () => {
        // Converte e valida os valores
        const focusMin = parseInt(focusMinutes) || 0;
        const focusSec = parseInt(focusSeconds) || 0;
        const restMin = parseInt(restMinutes) || 0;
        const restSec = parseInt(restSeconds) || 0;

        // Garante tempos mínimos (pelo menos 1 segundo)
        const focusTime = Math.max(1, focusMin * 60 + focusSec);
        const restTime = Math.max(1, restMin * 60 + restSec);
        
        onSave(focusTime, restTime);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* Cabeçalho */}
                    <Text style={styles.modalTitle}>Configurações</Text>
                    
                    {/* Seção de tempo de foco */}
                    <Text style={styles.sectionTitle}>Tempo de Foco</Text>
                    <View style={styles.timeInputContainer}>
                        <View style={styles.inputGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="25"
                                keyboardType="numeric"
                                maxLength={3}
                                value={focusMinutes}
                                onChangeText={(value) => validateNumericInput(value, setFocusMinutes)}
                            />
                            <Text style={styles.labelText}>min</Text>
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="00"
                                keyboardType="numeric"
                                maxLength={2}
                                value={focusSeconds}
                                onChangeText={(value) => validateSeconds(value, setFocusSeconds)}
                            />
                            <Text style={styles.labelText}>seg</Text>
                        </View>
                    </View>
                    
                    {/* Seção de tempo de descanso */}
                    <Text style={styles.sectionTitle}>Tempo de Descanso</Text>
                    <View style={styles.timeInputContainer}>
                        <View style={styles.inputGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="5"
                                keyboardType="numeric"
                                maxLength={3}
                                value={restMinutes}
                                onChangeText={(value) => validateNumericInput(value, setRestMinutes)}
                            />
                            <Text style={styles.labelText}>min</Text>
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="00"
                                keyboardType="numeric"
                                maxLength={2}
                                value={restSeconds}
                                onChangeText={(value) => validateSeconds(value, setRestSeconds)}
                            />
                            <Text style={styles.labelText}>seg</Text>
                        </View>
                    </View>
                    
                    {/* Botão de salvar */}
                    <TouchableOpacity 
                        style={styles.saveButton} 
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center"
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center"
    },
    timeInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 15
    },
    inputGroup: {
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        marginHorizontal: 10
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        width: "100%",
        height: 45,
        textAlign: "center",
        fontSize: 18
    },
    labelText: {
        fontSize: 14,
        marginTop: 5,
        color: "#666"
    },
    saveButton: {
        backgroundColor: "#4CAF50", // Cor verde como na imagem
        borderRadius: 5,
        padding: 12,
        alignItems: "center",
        width: "100%",
        marginTop: 10
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default SettingsModal;