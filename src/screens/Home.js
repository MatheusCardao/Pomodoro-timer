import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Modal } from "react-native";
import styled from "styled-components/native";
import Timer from "../components/Timer";
import Controls from "../components/Control";
import Icon from "react-native-vector-icons/MaterialIcons";
import showBreakReminder from "../components/Alert";
import {
    ModalContainer,
    ModalContentWrapper,
    InputWrapper,
    InputLabel,
    StyledInput,
    ModalButton,
    ModalButtonText,
    ConfigBox,
    Title,
    Label,
    TimeRow,
    SaveButton,
    SaveText
} from "../styles/ModalStyles";

// Gradiente aplicado como container principal
const GradientBackground = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SettingsButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 20px;
  z-index: 10;
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
            showBreakReminder();
            setMode("rest");
        } else {
            setMode("focus");
        }
    };

    return (
        <GradientBackground
            colors={["#f8f9fa", "#e0f0ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            {/* Botão de engrenagem */}
            <SettingsButton onPress={() => setModalVisible(true)}>
                <Icon name="settings" size={30} color="#333" />
            </SettingsButton>

            {/* Modal de configurações */}
            <SettingsModal visible={modalVisible} transparent animationType="slide">
                <ModalContent>
                    <ConfigBox>
                        <Title>Configurações</Title>

                        <Label>Tempo de Foco</Label>
                        <TimeRow>
                            <StyledInput
                                keyboardType="numeric"
                                placeholder="Min"
                                value={String(Math.floor(focusTime / 60))}
                                onChangeText={(text) =>
                                    setFocusTime((prev) => (Number(text) * 60) + (focusTime % 60))
                                }
                            />
                            <StyledInput
                                keyboardType="numeric"
                                placeholder="Seg"
                                value={String(focusTime % 60)}
                                onChangeText={(text) =>
                                    setFocusTime((prev) => (Math.floor(focusTime / 60) * 60) + Number(text))
                                }
                            />
                        </TimeRow>

                        <Label>Tempo de Descanso</Label>
                        <TimeRow>
                            <StyledInput
                                keyboardType="numeric"
                                placeholder="Min"
                                value={String(Math.floor(restTime / 60))}
                                onChangeText={(text) =>
                                    setRestTime((prev) => (Number(text) * 60) + (restTime % 60))
                                }
                            />
                            <StyledInput
                                keyboardType="numeric"
                                placeholder="Seg"
                                value={String(restTime % 60)}
                                onChangeText={(text) =>
                                    setRestTime((prev) => (Math.floor(restTime / 60) * 60) + Number(text))
                                }
                            />
                        </TimeRow>

                        <SaveButton onPress={() => setModalVisible(false)}>
                            <SaveText>Salvar</SaveText>
                        </SaveButton>
                    </ConfigBox>
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
            <Controls
                isRunning={isRunning}
                onStartPause={handleStartPause}
                onReset={handleReset}
            />
        </GradientBackground>
    );
};

export default Home;
