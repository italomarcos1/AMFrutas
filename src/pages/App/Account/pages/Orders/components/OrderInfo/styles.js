import styled from 'styled-components/native';

export const Info = styled.View`
  flex: 1;
  align-items: center;
`;

export const Item = styled.TouchableOpacity`
  width: 100%;
  height: 250px;

  border-width: 1px;
  border-color: #ebeced;
  justify-content: flex-start;
  padding: 15px;
`;

export const Order = styled.View`
  height: 120px;
  align-items: flex-start;
  justify-content: flex-start;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  padding: 0 10px 10px;
`;

export const OrderNumberContainer = styled.View`
  height: 50px;
  align-items: flex-start;
  justify-content: center;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  padding: 0 10px;
`;

export const ContentContainer = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;

export const Content = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: #283d48;
`;

export const Details = styled.TouchableOpacity`
  background-color: #cbced0;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const ShippingDetails = styled.View`
  height: 60px;
  padding: 10px 0 0 0;

  flex-direction: row;

  align-items: flex-start;
  justify-content: center;
`;

export const DeliveryStatus = styled.View`
  flex: 1;
  border-right-width: 0.5px;
  border-right-color: #ccc;
  padding: 0 10px 0 0;
  align-items: flex-start;
`;

export const ShippingStatus = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: #f06d85;
`;
