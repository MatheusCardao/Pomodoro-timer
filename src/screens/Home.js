import React, { useState } from "react";
import { Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Modal, Text } from "react-native";
import LogoImg from "../../assets/Logotipo.png"
import styled from "styled-components/native";
import Timer from "../components/Timer";
import Controls from "../components/Control";
import Icon from "react-native-vector-icons/MaterialIcons";
import { showBreakReminder, showFocusReminder } from "../components/Alert";
import {
    ModalContainer,
    ModalContentWrapper,
    InputWrapper,
    InputLabel as ImportedInputLabel,
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

const InputContainer = styled.View`
  align-items: center;
`;

const InputWithLabel = styled.View`
  align-items: center;
`;

const TimeUnitLabel = styled.Text`
  color: #666;
  font-size: 12px;
  margin-top: 3px;
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
//Logo da estacio
const LogoAndNameContainer = styled.View`
  width: 100%;
  align-items: center;
  position: fixed;
  top: 270px;
`;

const GroupName = styled.Text`  
  font-size: 16px;
  font-weight: bold;
  color: #333;
  position: relative;
  top: 20px;
`;

const Logo = styled.Image`
  width: 150px;
  height: 150px;
`;

const Home = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("focus");
    const [focusTime, setFocusTime] = useState(25 * 60); // 25 minutos em segundos
    const [restTime, setRestTime] = useState(5 * 60);   // 5 minutos em segundos
    const [modalVisible, setModalVisible] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(0);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setResetTrigger(prev => prev + 1);
    };

const handleSaveSettings = () => {
    if (focusTime === 0 || restTime === 0) {
        Alert.alert(
            "Tempo inválido",
            "Defina um tempo maior que 00:00 para foco e descanso."
        );
        return;
    }

    setModalVisible(false);
};

    const handleFinish = () => {
        setIsRunning(false);
        if (mode === "focus") {
            setMode("rest");
        } else {
            setMode("focus");
        }
    };

    const handleFocusMinutesChange = (text) => {
        const minutes = parseInt(text) || 0;
        const seconds = focusTime % 60;
        setFocusTime(minutes * 60 + seconds);
    };

    const handleFocusSecondsChange = (text) => {
        const minutes = Math.floor(focusTime / 60);
        const seconds = parseInt(text) || 0;
        const validSeconds = Math.min(59, seconds);
        setFocusTime(minutes * 60 + validSeconds);
    };

    const handleRestMinutesChange = (text) => {
        const minutes = parseInt(text) || 0;
        const seconds = restTime % 60;
        setRestTime(minutes * 60 + seconds);
    };

    const handleRestSecondsChange = (text) => {
        const minutes = Math.floor(restTime / 60);
        const seconds = parseInt(text) || 0;
        const validSeconds = Math.min(59, seconds);
        setRestTime(minutes * 60 + validSeconds);
    };

    return (
        <GradientBackground
            colors={["#f8f9fa", "#e0f0ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <SettingsButton onPress={() => setModalVisible(true)}>
                <Icon name="settings" size={30} color="#333" />
            </SettingsButton>

            <SettingsModal visible={modalVisible} transparent animationType="slide">
                <ModalContent>
                    <ConfigBox>
                        <Title>Configurações</Title>

                        <Label>Tempo de Foco</Label>
                        <TimeRow>
                            <InputWithLabel>
                                <StyledInput
                                    keyboardType="numeric"
                                    value={String(Math.floor(focusTime / 60))}
                                    onChangeText={handleFocusMinutesChange}
                                />
                                <TimeUnitLabel>min</TimeUnitLabel>
                            </InputWithLabel>

                            <InputWithLabel>
                                <StyledInput
                                    keyboardType="numeric"
                                    value={String(focusTime % 60)}
                                    onChangeText={handleFocusSecondsChange}
                                />
                                <TimeUnitLabel>seg</TimeUnitLabel>
                            </InputWithLabel>
                        </TimeRow>

                        <Label>Tempo de Descanso</Label>
                        <TimeRow>
                            <InputWithLabel>
                                <StyledInput
                                    keyboardType="numeric"
                                    value={String(Math.floor(restTime / 60))}
                                    onChangeText={handleRestMinutesChange}
                                />
                                <TimeUnitLabel>min</TimeUnitLabel>
                            </InputWithLabel>

                            <InputWithLabel>
                                <StyledInput
                                    keyboardType="numeric"
                                    value={String(restTime % 60)}
                                    onChangeText={handleRestSecondsChange}
                                />
                                <TimeUnitLabel>seg</TimeUnitLabel>
                            </InputWithLabel>
                        </TimeRow>

                        <SaveButton onPress={handleSaveSettings}>
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
            <LogoAndNameContainer>
                        <GroupName>Matheus De Siqueira Hammes Cardão</GroupName>
                        <GroupName>Djalma Neto</GroupName>
                        <GroupName>Pablo Carvalho Lopes Morais</GroupName>
                <Logo source={LogoImg} resizeMode="contain" />
            </LogoAndNameContainer>
        </GradientBackground>
    );
};

export default Home;