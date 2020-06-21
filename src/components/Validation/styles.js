import styled from 'styled-components/native';

export const Header = styled.View`
  width: 100%;
  height: 50px;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  background-color: #3b8e39;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const Item = styled.TouchableOpacity`
  width: 100%;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 5px 10px 5px 10px;
`;

export const ItemText = styled.Text`
  font-size: 20px;
  color: #fff;
`;
