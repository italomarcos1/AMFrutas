import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;

export const Header = styled.View`
  background: #fff;
  padding: 15px 10px;
  flex-direction: row;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  margin-left: 5px;
`;

export const EmptyListContainer = styled.View`
  align-self: center;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const EmptyListTitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #3a3a3a;
  margin: 20px 0 10px;
`;

export const EmptyListText = styled.Text`
  font-size: 16px;
  max-width: 50%;
  text-align: center;
  line-height: 25px;
  font-weight: bold;
  color: #596473;
`;

export const FavoritesList = styled.FlatList`
  flex: 1;
`;
