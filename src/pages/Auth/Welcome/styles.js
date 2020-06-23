import styled from 'styled-components/native';
import LogoBlack from '~/assets/logo-black.svg';

export const Background = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const Container = styled.ScrollView`
  background-color: #f2f2f2;
  padding: 0 30px 10px;
`;

export const FacebookButton = styled.TouchableOpacity`
  height: 50px;
  width: 80%;
  border-radius: 30px;
  background-color: #4267b2;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  /* font-family: 'Roboto'; */
  font-size: 14px;
  padding: 10px;
`;

export const WelcomeContainer = styled.View`
  width: 100%;
  margin: 5px 0 40px;
  height: 55px;
  align-items: center;
`;

export const ForgotPassword = styled.TouchableOpacity`
  width: 100%;
  align-self: center;
  margin: 5px 0 20px;
`;

export const Logo = styled(LogoBlack)`
  margin-top: 10px;
`;
