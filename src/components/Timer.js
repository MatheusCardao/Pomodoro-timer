import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import styled from "styled-components/native";
import showBreakReminder from "./Alert";

const TimerContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => (props.mode === "focus" ? "#6959CD" : "#4CAF50")};
`;

const Timer = ({ isRunning, onFinish, mode, resetTrigger, focusTime, restTime }) => {
    const parseTime = (value, defaultValue) => {
        const parsed = parseInt(value, 10);
        return isNaN(parsed) || parsed <= 0 ? defaultValue : parsed;
    };

    const getInitialTime = () => {
        return mode === "focus"
          ? Math.max(1, parseTime(focusTime, 1500)) 
          : Math.max(1, parseTime(restTime, 300)); 
      };

    const [timeLeft, setTimeLeft] = useState(getInitialTime());
    const timeLeftRef = useRef(timeLeft);
    const intervalRef = useRef(null);
    const hasFinishedRef = useRef(false);
    const soundRef = useRef(null);

    const playSound = async () => {
        try {
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
            }
            const { sound } = await Audio.Sound.createAsync(
                require("../../assets/alarm.mp3"),
                { shouldPlay: true }
            );
            soundRef.current = sound;
            await sound.playAsync();
        } catch (error) {
            console.error("Erro ao reproduzir som:", error);
        }
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                timeLeftRef.current -= 1;
                setTimeLeft(timeLeftRef.current);
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    useEffect(() => {
        if (timeLeft === 0 && isRunning && !hasFinishedRef.current) {
            hasFinishedRef.current = true;
            playSound();
            if (mode === "focus") showBreakReminder();
            onFinish();
        }
    }, [timeLeft, isRunning, mode, onFinish]);

    useEffect(() => {
        const newTime = getInitialTime();
        setTimeLeft(newTime);
        timeLeftRef.current = newTime;
        hasFinishedRef.current = false;
    }, [resetTrigger, mode, focusTime, restTime]);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <TimerContainer>
            <TimeText mode={mode}>{formatTime(timeLeft)}</TimeText>
        </TimerContainer>
    );
};

export default Timer;
