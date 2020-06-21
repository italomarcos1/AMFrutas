import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 45px;
  background-color: #edfcf0;
  background-color: ${props => (props.selected ? '#edfcf0' : '#f6f6f6')};
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.selected ? '#3b8e39' : '#76797e')};

  padding: 3px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const CustomInput = styled.TextInput`
  flex: 1;
  background: transparent;
  border: 0;
  color: #000;
  font-size: 15px;
`;
