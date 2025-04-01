import React, { useState, useEffect } from "react";
import { Audio } from "expo-av"; // 🔊 Importando o módulo para som
import styled from "styled-components/native";
import showBreakReminder from "./Alert"; // Importando alerta

const TimerContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.Text`
  font-size: 48px;
  font-weight: bold;
`;

const Timer = ({ isRunning, onFinish, mode, resetTrigger, focusTime, restTime }) => {
    const [timeLeft, setTimeLeft] = useState(focusTime * 60);

    // 🔊 Função para tocar o som quando o tempo acabar
    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("../assets/alarm.mp3") // Substitua pelo caminho correto do som
        );
        await sound.playAsync();
    };

    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            playSound(); // 🔊 Emite o som quando o tempo acaba

            if (mode === "focus") {
                showBreakReminder(); // Exibe o alerta apenas quando o FOCO termina
                onFinish(); // Troca para o descanso
            }
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    // Reseta o timer quando resetTrigger mudar ou quando o tempo for alterado no modal
    useEffect(() => {
        setTimeLeft(mode === "focus" ? focusTime * 60 : restTime * 60);
    }, [resetTrigger, mode, focusTime, restTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <TimerContainer>
            <TimeText>{formatTime(timeLeft)}</TimeText>
        </TimerContainer>
    );
};

export default Timer;
