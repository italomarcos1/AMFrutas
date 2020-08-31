import styled from 'styled-components/native';

export const StepsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const Step = styled.TouchableOpacity`
  background: ${props => (props.validated ? '#12b118' : '#aaa')};
  border-bottom-width: 2px;
  border-color: ${props => (props.validated ? '#0d9112' : '#aaa')};
  flex: 1;
  padding: 10px 5px;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

export const StepText = styled.Text`
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
`;

export const Container = styled.ScrollView`
  padding: 10px;
  flex: 1;
`;

export const AlertMessage = styled.Text`
  background: #f34;
  padding: 10px 0;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
  display: ${props => (props.visible ? 'flex' : 'none')};
`;

export const InputContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: ${props => (!props.last ? '15px' : 0)};
`;

export const ProceedButton = styled.TouchableOpacity`
  background-color: #12b118;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

export const ProceedButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: #fff;
  align-self: center;
`;
