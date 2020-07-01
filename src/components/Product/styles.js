import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Header = styled.View`
  background-color: #1eb118;
  height: 70px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
`;

export const ProductImage = styled.Image`
  width: ${Dimensions.get('window').width};
  height: 300px;
  align-self: center;
`;

export const ProductInfo = styled.View`
  height: 150px;
  border-top-color: #ccc;
  border-top-width: 0.5px;
  border-bottom-color: #ccc;
  border-bottom-width: 0.5px;
  padding: 10px 0; /* talvez eh so vertical */
`;

export const Promotional = styled.View`
  width: 55px;
  height: 20px;
  background-color: #fdf3dd;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  justify-content: space-evenly;
`;

export const DescriptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;

export const PromotionalContainer = styled.View`
  flex: 0.6;
  align-items: center;
  justify-content: center;
`;

export const WarrantyOptionsContainer = styled.View`
  flex: 0.3;
  align-items: flex-end;
  padding-right: 20;
`;

export const FavoriteContainer = styled.View`
  flex: 0.4;
  align-items: center;
  justify-content: center;
`;

export const PromotionalPrice = styled.Text`
  color: #f2801e;
  font-size: 14px;
  font-weight: bold;
`;

export const MinimalPrice = styled.View`
  height: 20px;
  background-color: #259d41;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const WarrantyContainer = styled.View`
  height: 40px;
  border-top-color: #ccc;
  border-top-width: 0.5px;
  border-bottom-color: #ccc;
  border-bottom-width: 0.5px;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  flex-direction: row;
`;

export const ShieldContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  flex-direction: row;
`;

export const ShippingContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Shipping = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-right: 10px;
`;

export const ShippingDestination = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 3px;
  margin-right: 3px;
`;

export const ShippingPrice = styled.Text`
  color: #259d41;
  font-size: 22px;
  font-weight: bold;
`;

export const WhatsAppButton = styled.TouchableOpacity`
  height: 75px;
  flex: 0.3;
  align-items: center;
  justify-content: center;
`;

export const ChangeShippingDestination = styled.Text`
  color: #ff0202;
  text-decoration: underline;
`;

export const AddToCartContainer = styled.View`
  width: 100%;
  height: 75px;
  flex-direction: row;
  border-bottom-color: #aaa;
  border-bottom-width: 1px;
`;

export const AddToCartButton = styled.TouchableOpacity`
  height: 75px;
  flex: 0.7;
  background-color: ${props => (props.disabled ? '#666' : '#3edd69')};
  align-items: center;
  justify-content: center;
  border-bottom-color: #aaa;
  border-bottom-width: 1px;
`;

export const CreditContainer = styled.View`
  height: 90px;
  justify-content: space-around;
  border-top-color: #ccc;
  border-top-width: 0.5px;
  border-bottom-color: #ccc;
  border-bottom-width: 0.5px;
  padding: 15px 20px;
`;

export const ProductPrice = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  flex: 1;
  height: 20px;
  padding: 0 10px 0 20px;
`;

export const OldPrice = styled.Text`
  color: #999;
  font-size: 20px;
  text-decoration: line-through;
`;

export const OldPriceLabel = styled.Text`
  margin: 0 10px;
  font-weight: bold;
`;

export const Price = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const Amount = styled.Text`
  font-size: 28px;
  align-self: center;
  text-align: center;
`;

export const AmountButtonContainer = styled.View`
  width: 120px;
  flex-direction: row;
  justify-content: space-between;
`;

export const AmountButton = styled.TouchableOpacity`
  background-color: #c9c9c9;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.5);
  width: 45px;
  height: 45px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 20px;
  left: 20px;
`;

export const DescriptionTitleContainer = styled.TouchableOpacity`
  height: 30px;
  width: 270px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
`;

export const SeeDescription = styled.TouchableOpacity`
  border-color: #999;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 25px;
`;

export const CloseDescription = styled.TouchableOpacity`
  background-color: #f53030;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

export const NoDescription = styled.View`
  width: 120px;
  height: 25px;
`;

export const ProductNameContainer = styled.Text`
  height: 40px;
  padding: 0 20px 0 20px;
  justify-content: center;
  font-family: 'Roboto';
`;

export const TransparentBackground = styled.View`
  flex: 1;
  padding: 40px 20px;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

export const SearchingContainer = styled.View`
  height: 120px;
  width: 270px;
  padding: 20px 10px;
  background-color: #ddd;
  align-items: center;
  border-radius: 8px;
  justify-content: space-between;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #333;
  align-self: center;
`;
