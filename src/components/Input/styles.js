import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  flex-direction: row;
  width: 100%;
  height: 45px;
  padding: 0 10px;
  border-width: ${({ selected }) => (selected ? '2px' : '0')};
  border-color: ${({ selected }) => (selected ? '#89D6B9' : 'transparent')};
`;

export const CustomInput = styled.TextInput`
  flex: 1;
  color: #999;
  font-size: 14px;
  margin-left: 10px;
  font-family: 'Roboto';
`;
