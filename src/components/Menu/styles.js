import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: #fff;
  flex: 1;
`;

export const Header = styled.View`
  background-color: #12b118;
  width: 100%;
  height: 150px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const SubContainer = styled.View`
  margin-top: 10px;
  width: 90%;
  flex-direction: row;
  justify-content: space-around;
`;

export const OptionsContainer = styled.View`
  background-color: #fff;
  padding: 5px 15px;
  width: 100%;
`;

export const OptionsTitle = styled.Text`
  font-size: 16px;
  margin: 6px 0;
  font-weight: bold;
  color: #12b118;
`;

export const PhoneButtonText = styled.Text`
  font-size: ${props => (props.whatsapp ? '16px' : '15px')};
  font-weight: bold;
  color: black;
`;

export const Option = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  align-self: stretch;
  border-top-color: #999;
  border-top-width: 1px;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
  justify-content: space-between;
  padding: 5px;
`;

export const OptionText = styled.Text`
  font-size: 13px;
`;

export const PhoneButton = styled.TouchableOpacity`
  width: 130px;
  height: 40px;
  background-color: #fff;
  border-radius: 20px;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px;
  flex-direction: row;
`;
