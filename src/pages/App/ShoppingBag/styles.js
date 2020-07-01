import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ddd;
`;

export const ProductsList = styled.FlatList`
  flex: 1;
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

export const Separator = styled.View`
  height: 1px;
  border-width: 1px;
  border-color: #666;
  margin: 2px 1px 1px;
  width: 100%;
`;

export const Detail = styled.View`
  width: 100%;
  height: 70px;
  margin: 5px 0 10px;
  background-color: #fff;
  border-radius: 4px;
  padding-right: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FareDetails = styled.View`
  flex: 1;
  max-height: 70px;
  justify-content: center;
  align-items: flex-start;
  padding: 0 5px 0 1px;
`;

export const Price = styled.Text`
  font-size: 18px;
  color: #283d48;
  font-weight: bold;
`;

export const IconContainer = styled.View`
  padding: 0 20px;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;

export const Zipcode = styled.Text`
  font-size: 14px;
  color: #505050;
  font-weight: bold;
  border-color: #ddd;
  border-width: 0.75px;
  border-radius: 2px;
  padding: 1px 7px;
  margin-top: 2px;
`;
