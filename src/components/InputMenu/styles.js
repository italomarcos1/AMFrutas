import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  border-bottom-width: 2px;
  border-bottom-color: ${props => (props.selected ? '#3b8e39' : '#efefef')};

  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const CustomInput = styled.TextInput`
  flex: 1;
  border: 0;
  color: #000;
  font-size: 15px;
  padding: 0;
  margin-top: ${props => (props.hasLabel ? '10px' : 0)};
`;

export const Label = styled.Text`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 12px;
`;
