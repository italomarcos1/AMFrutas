import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ddd;
  padding: 5px;
`;

export const FavoritesList = styled.FlatList`
  flex: 1;
`;

export const Header = styled.Text`
  font-size: 20px;
  color: #333;
  align-self: center;
  margin: 10px;
`;

export const NoFavoriteProducts = styled.Text`
  font-size: 22px;
  color: #777;
  align-self: center;
  margin: 10px;
  text-align: center;
`;
export const NoFavoriteProductsContainer = styled.View`
  flex: 1;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const ProductItem = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  flex-direction: row;
  padding: 2px 5px;
  background-color: #fff;
  align-items: center;
  border-radius: 4px;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const ProductImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

export const ProductInfo = styled.View`
  flex: 1;
  justify-content: space-evenly;
`;

export const ProductName = styled.Text`
  font-size: 14px;
  color: black;
  text-transform: capitalize;
  align-self: flex-start;
  /* line-height: 22px; */
  padding: 2px;
`;

export const ProductPrice = styled.Text`
  font-size: 18px;
  font-weight: bold;
  /* line-height: 22px; */
  align-self: flex-start;
`;

export const RateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 110px;
  /* line-height: 22px; */
  align-self: flex-start;
`;

export const Rate = styled.Text`
  font-size: 11px;
  color: #555;
  /* line-height: 22px; */
  align-self: flex-start;
`;
