import React, { useState, useEffect, useRef } from "react";
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

const ModeText = styled.Text`
  font-size: 24px;
  color: #888;
  margin-bottom: 10px;
`;

const Timer = ({ isRunning, onFinish, mode, resetTrigger, focusTime, restTime }) => {
    const [timeLeft, setTimeLeft] = useState(focusTime * 60);

    // 🔊 Função para tocar o som quando o tempo acabar
    const playSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require("../../assets/audio.wav")
            );
            await sound.playAsync();
        } catch (error) {
            console.warn("Erro ao tocar o som:", error);
        }
    };

    const hasFinished = useRef(false);

    useEffect(() => {
        let interval;

        if (isRunning && timeLeft > 0) {
            hasFinished.current = false; // Reinicia a flag sempre que o tempo tá rolando
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        if (isRunning && timeLeft === 0 && !hasFinished.current) {
            hasFinished.current = true; // Marca que já executou

            playSound();

            if (mode === "focus") {
                showBreakReminder();
            }

            onFinish();
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
            <ModeText>{mode === "focus" ? "🧠 Foco" : "😌 Descanso"}</ModeText>
            <TimeText>{formatTime(timeLeft)}</TimeText>
        </TimerContainer>
    );
};

export default Timer;
