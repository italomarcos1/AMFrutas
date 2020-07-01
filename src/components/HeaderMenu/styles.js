import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: 10px 10px;
  flex-direction: row;
  background-color: ${props => (props.custom ? '#fff' : '#5bae59')};
`;

export const Title = styled.Text`
  font-size: 22px;
  color: ${props => (props.custom ? '#000' : '#fff')};
`;

export const CloseHeader = styled.TouchableOpacity`
  border-radius: 15px;
  margin-right: 10px;
`;
