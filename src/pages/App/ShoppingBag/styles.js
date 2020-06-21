import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ddd;
`;

export const ProductsList = styled.FlatList`
  flex: 1;
`;

export const Header = styled.Text`
  font-size: 20px;
  color: #333;
  align-self: center;
  margin: 10px;
`;

export const FinishButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: #12b118;
  align-items: center;
  justify-content: center;
`;

export const FinishButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  align-self: center;
`;

export const NoFavoriteProducts = styled.Text`
  font-size: 22px;
  color: #777;
  align-self: center;
  margin: 10px;
  text-align: center;
`;

export const ProductItem = styled.TouchableOpacity`
  width: 100%;
  height: 160px;
  flex-direction: row;
  padding: 2px 10px;
  background-color: #fff;
  align-items: center;
  border-radius: 4px;
  border-width: 0.75px;
  border-color: #bbb;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const ProductImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border-color: #12b118;
  border-width: 1px;
  margin-right: 10px;
`;

export const ProductInfo = styled.View`
  flex: 1;
  justify-content: space-between;
  border-left-width: 0.75px;
  border-left-color: #999;
  padding-left: 20px;
`;

export const ProductName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-transform: capitalize;
  align-self: flex-start;
  /* line-height: 22px; */
  padding: 2px;
`;

export const ProductPrice = styled.Text`
  font-size: 26px;
  margin: 5px 0;
  font-weight: bold;
  color: #ff9000;
  align-self: flex-start;
`;

export const PurchaseConfirmationModal = styled.View`
  flex: 1;
  padding: 40px 20px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const NoFavoriteProductsContainer = styled.View`
  align-self: center;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PurchaseConfirmationContainer = styled.View`
  flex: 1;
  padding: 50px 0 20px;
  border-radius: 8px;
  background-color: #ddd;
  align-items: center;
  justify-content: space-around;
`;

export const RateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-top: 5px;
`;

export const Rate = styled.Text`
  font-size: 14px;
  color: #555;
`;
