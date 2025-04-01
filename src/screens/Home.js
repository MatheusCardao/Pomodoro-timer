import React, { useState } from "react";
import { View, Modal } from "react-native";
import styled from "styled-components/native";
import Timer from "../components/Timer";
import Controls from "../components/Control";
import Icon from "react-native-vector-icons/MaterialIcons";
import showBreakReminder from "../components/Alert"; // Importando o alerta

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
`;

const SettingsButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 20px;
`;

const SettingsModal = styled.Modal``;

const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Input = styled.TextInput`
  width: 80px;
  height: 40px;
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  margin: 5px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
`;

const Home = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("focus");
    const [focusTime, setFocusTime] = useState(25);
    const [restTime, setRestTime] = useState(5);
    const [modalVisible, setModalVisible] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(0);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setMode("focus");
        setResetTrigger(prev => prev + 1);
    };

    const handleFinish = () => {
        if (mode === "focus") {
            showBreakReminder(); // ⬅️ Chama o alerta quando o tempo de foco acaba
            setMode("rest");
        } else {
            setMode("focus");
        }
    };

    return (
        <Container>
            {/* Botão de engrenagem */}
            <SettingsButton onPress={() => setModalVisible(true)}>
                <Icon name="settings" size={30} color="#333" />
            </SettingsButton>

            {/* Modal de configurações */}
            <SettingsModal visible={modalVisible} transparent animationType="slide">
                <ModalContent>
                    <Input
                        keyboardType="numeric"
                        value={String(focusTime)}
                        onChangeText={(text) => setFocusTime(Number(text))}
                        placeholder="Foco (min)"
                    />
                    <Input
                        keyboardType="numeric"
                        value={String(restTime)}
                        onChangeText={(text) => setRestTime(Number(text))}
                        placeholder="Descanso (min)"
                    />
                    <CloseButton onPress={() => setModalVisible(false)}>
                        <Icon name="close" size={20} color="#000" />
                    </CloseButton>
                </ModalContent>
            </SettingsModal>

            <Timer
                isRunning={isRunning}
                mode={mode}
                onFinish={handleFinish}
                focusTime={focusTime}
                restTime={restTime}
                resetTrigger={resetTrigger}
            />
            <Controls isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
        </Container>
    );
};

export default Home;
