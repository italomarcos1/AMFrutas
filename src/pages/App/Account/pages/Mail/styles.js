import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: #fff;
`;

export const ValidationCodeInput = styled.TextInput.attrs({
  maxLength: 1,
  keyboardType: 'numeric',
  placeholder: '0',
})`
  width: 43px;
  height: 50px;
  border-radius: 4px;
  background-color: #eceff4;
  text-align: left;
  color: #3a3a3a;
  font-size: 22px;
  text-align: center;
`;

export const ValidationCodeButton = styled.TouchableOpacity`
  width: 43px;
  height: 50px;
  margin: 0 2px;
  border-radius: 4px;
  background-color: #12b118;
  text-align: left;
  color: #3a3a3a;
  font-size: 22px;
  align-items: center;
  justify-content: center;
`;

export const ValidationContainer = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const CodeSentText = styled.Text`
  margin-top: 20px;
  flex: 1;
  max-height: 100px;
  font-size: 18px;
  font-weight: bold;
  line-height: 20px;
  color: #596473;
  align-self: center;
  text-align: center;
`;

export const ResendCodeText = styled.Text`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 16px;
  color: #d93150;
  align-self: center;
`;
