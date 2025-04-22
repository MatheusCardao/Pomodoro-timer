import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

const ControlsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled(TouchableOpacity)`
  background-color: #3498db;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 16px;
`;

const Controls = ({ isRunning, onStartPause, onReset }) => {
    return (
        <ControlsContainer>
            <Button onPress={onStartPause}>
                <ButtonText>{isRunning ? "Pausar" : "Iniciar"}</ButtonText>
            </Button>
            <Button onPress={onReset}>
                <ButtonText>Resetar</ButtonText>
            </Button>
        </ControlsContainer>
    );
};

export default Controls;
