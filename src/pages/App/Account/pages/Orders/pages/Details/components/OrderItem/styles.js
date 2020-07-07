import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Item = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-color: #eee;
  flex: 1;
  border-radius: 8px;
  padding: 0 0 15px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export const ItemImage = styled.Image`
  width: 110px;
  height: 120px;
  border-radius: 4px;
`;

export const ItemInfo = styled.View`
  flex: 1;
  border-left-color: #efefef;
  border-left-width: 1px;
  margin-left: 15px;
  padding-left: 10px;
  justify-content: space-between;
`;

export const ProductTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  color: black;
  text-transform: capitalize;
  align-self: flex-start;
  line-height: 18px;
  padding: 2px;
`;

export const ProductAmount = styled.Text`
  font-size: 14px;
  width: 100%;
  margin-top: 5px;
  color: black;
  align-self: flex-start;
  padding: 2px;
`;

export const ProductPrice = styled.Text`
  font-size: 22px;
  margin: 5px 0;
  font-weight: bold;
  color: #ff9000;
  align-self: flex-start;
`;
