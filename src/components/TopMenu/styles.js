import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #999;
`;

export const Item = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  justify-content: center;
  text-align: center;
  border-bottom-width: ${props => (props.selected ? '3px' : '0')};
  border-bottom-color: ${props => (props.selected ? '#12b118' : '#fff')};
`;

export const ItemText = styled.Text`
  font-size: 12px;
  color: ${props => (props.selected ? '#000' : '#999')};
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
`;
