import styled from 'styled-components/native';

export const SearchHeader = styled.View`
  width: 81.5%;
  height: 45px;
  text-align: center;
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin: 0 0 15px;
`;

export const ProductItem = styled.TouchableOpacity`
  width: 81.5%;
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

export const Searching = styled.Text`
  font-size: 18px;
  font-family: 'Roboto';
  text-align: center;
  color: #017118;
`;
export const SearchWord = styled.Text`
  font-size: 16px;
  font-family: 'Roboto';
  color: #491;
`;

export const TransparentBackground = styled.View`
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const SearchContainer = styled.View`
  width: 100%;
  height: 100%;
  padding: 35px 20px 20px;
  border-radius: 8px;
  background-color: #ddd;
  align-items: center;
  justify-content: space-around;
`;
