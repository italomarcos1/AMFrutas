import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f3f4;
  align-items: center;
  padding: 20px;
`;

export const Option = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  background-color: #fff;
  border-radius: 4px;
  padding: 2px 10px;
`;

export const OptionsContainer = styled.TouchableOpacity`
  width: 100%;
  height: 180px;
  justify-content: space-between;
`;

export const RadioButtonBackground = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background-color: #fff;
  border-width: 1px;
  border-color: #f06d85;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

export const Selected = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #f06d85;

  display: ${props => (props.selected ? 'flex' : 'none')};
`;

export const RadioText = styled.Text`
  font-size: 18px;
  color: #3a3a3a;
  margin-left: 5px;
`;
