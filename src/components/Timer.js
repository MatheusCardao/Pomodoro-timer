import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import showBreakReminder from "./Alert";
// import { Audio } from "expo-av"; // 🔊 Descomente quando for compilar para mobile

const TimerContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.Text`
  font-size: 48px;
  font-weight: bold;
`;

// 🔊 Preparado para uso futuro em mobile
/*
const playSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/alarm.mp3")
  );
  await sound.playAsync();
};
*/

const Timer = ({ isRunning, onFinish, mode, resetTrigger, focusTime, restTime }) => {
  const initialTime = mode === "focus" ? focusTime * 60 : restTime * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Atualiza o tempo restante quando modo ou tempo forem alterados
  useEffect(() => {
    setTimeLeft(mode === "focus" ? focusTime * 60 : restTime * 60);
  }, [resetTrigger, mode, focusTime, restTime]);

  // Controla o timer
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Ação ao finalizar o tempo
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      // 🔊 Quando for usar mobile, descomente:
      // playSound();

      if (mode === "focus") {
        showBreakReminder();
      }

      onFinish(); // Callback para alternar modos ou reiniciar
    }
  }, [timeLeft, isRunning, mode, onFinish]);

  // Formata o tempo como mm:ss
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
