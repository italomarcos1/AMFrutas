import styled from 'styled-components/native';

export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  width: 80%;
  border-radius: 6px;
  background-color: #12b118;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-family: ${props => (props.login ? 'Calibri' : 'RobotoBold')};
  font-weight: ${props => (props.login ? 'normal' : 'bold')};
  font-size: ${props => (props.login ? '14px' : '18px')};
  padding: 10px;
`;
