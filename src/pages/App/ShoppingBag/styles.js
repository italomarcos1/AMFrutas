import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;

export const FinishButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: #12b118;
  align-items: center;
  justify-content: center;
`;

export const ProductsListContainer = styled.View`
  flex: 1;
  padding: 0 10px 10px;
`;

export const ProductsList = styled.FlatList`
  flex: 1;
  padding-bottom: 20px;
`;

export const ProductItem = styled.View`
  width: 100%;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
  align-items: center;
  border-radius: 6px;
  border-width: 0.75px;
  border-color: #dedede;
  justify-content: space-between;
  margin: 10px 0 0;
`;

export const ProductInfoRow = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const ProductInfoColumn = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const ProductImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

export const ProductTitle = styled.Text`
  flex: 1;
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 40px;
  align-items: center;
`;

export const OldPrice = styled.Text`
  color: #9f9f9f;
  font-size: 16px;
  font-weight: bold;
  text-decoration: line-through;
`;

export const CurrentPrice = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

export const DiscountPercent = styled.Text`
  color: #f06d85;
  font-size: 16px;
  font-weight: bold;
`;

export const ProductBottomRow = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding-top: 10px;
  margin-top: 10px;
  border-top-width: 1px;
  border-top-color: #ccc;
  align-items: center;
`;

export const Quantity = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const RemoveButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px 5px 0;
  border-right-width: 1px;
  border-right-color: #ccc;
`;

export const RemoveButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-right: 3px;
  margin-top: -2px;
`;

export const Total = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const PurchaseConfirmationModal = styled.View`
  flex: 1;
  padding: 40px 20px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const EmptyBagContainer = styled.View`
  align-self: center;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const EmptyBagTitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #3a3a3a;
  margin: 20px 0 10px;
`;

export const EmptyBagText = styled.Text`
  font-size: 16px;
  max-width: 50%;
  text-align: center;
  line-height: 25px;
  font-weight: bold;
  color: #596473;
`;

export const PurchaseConfirmationContainer = styled.View`
  flex: 1;
  padding: 50px 0 20px;
  border-radius: 8px;
  background-color: #ddd;
  align-items: center;
  justify-content: space-around;
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

export const FinishButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: #fff;
  align-self: center;
`;
