import styled from "styled-components";

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContentWrapper = styled.View`
  background-color: #fff;
  border-radius: 15px;
  padding: 30px 20px;
  width: 80%;
  align-items: center;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

export const InputLabel = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
  text-align: center;
`;

export const StyledInput = styled.TextInput`
  width: 80px;
  height: 40px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: #007AFF;
  padding: 10px 20px;
  border-radius: 8px;
`;

export const ModalButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const ConfigBox = styled.View`
  background-color: #fff;
  padding: 25px;
  border-radius: 20px;
  width: 80%;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  color: #555;
`;

export const TimeRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;

export const SaveButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #4CAF50;
  padding: 12px 25px;
  border-radius: 10px;
`;

export const SaveText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
