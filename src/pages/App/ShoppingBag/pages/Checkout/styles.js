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

export const Container = styled.View`
  padding: 10px;
  flex: 1;
  position: relative;
`;

export const ActivityIndicatorContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: #fff;
  align-items: center;
  justify-content: center;
`;

export const AlertMessage = styled.Text`
  background: #f34;
  border-radius: 2px;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
  display: ${props => (props.visible ? 'flex' : 'none')};
`;

export const WarningMessage = styled.Text`
  background: #fff;
  border: 1px solid #e6d2a9;
  border-radius: 2px;
  padding: 10px;
  color: #8a6d3b;
  font-size: 15px;
  line-height: 25px;
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

export const PickerContainer = styled.View`
  border: 1px solid #ddd;
  position: relative;
  border-radius: 2px;
  background: #fff;
  padding-top: 3px;
  margin-bottom: 10px;
`;

export const PickerLabel = styled.Text`
  position: absolute;
  left: 8px;
  font-size: 13px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 5px 2px 15px;
  width: 100%;
`;

export const Card = styled.View`
  background: #fff;
  padding: 5px 10px 10px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
  border-right-width: 1px;
  border-right-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

export const CardTitle = styled.Text`
  color: #333;
  font-size: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  padding-bottom: 5px;
`;

export const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => (props.noMargin ? 0 : '10px')};
`;

export const CardLabel = styled.Text`
  color: #665;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  width: ${props => (props.width ? `${props.width}%` : 'auto')};
  text-align: ${props => (props.align ? props.align : 'auto')};
`;

export const Small = styled.Text`
  font-size: 12px;
  color: #000;
`;
