import styled from 'styled-components';

export const ContainerImage = styled.TouchableOpacity`
  width: 150px;
  height: 200px;
  border-radius: 15px;
  background-color: #fff;
  margin: 0 15px 15px 0;
`;

export const ProductInfo = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const ProductImage = styled.ImageBackground`
  width: 150px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 130px;
`;

export const ProductText = styled.Text`
  font-size: 12px;
  color: black;
  text-transform: capitalize;
  align-self: flex-start;
  line-height: 22px;
  padding: 2px;
`;

export const ProductPrice = styled.Text`
  font-size: 18px;
  font-weight: bold;
  line-height: 22px;
  align-self: flex-start;
`;

export const Rate = styled.Text`
  font-size: 10px;
  color: #555;
  line-height: 22px;
  align-self: flex-start;
`;
