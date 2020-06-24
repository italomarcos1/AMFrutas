import styled from 'styled-components/native';
import LogoBlack from '~/assets/logo-black.svg';

export const Background = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const Container = styled.ScrollView`
  background-color: #f2f2f2;
  padding: 10px 30px;
`;

export const FacebookButton = styled.TouchableOpacity`
  height: 55px;
  width: 80%;
  border-radius: 30px;
  background-color: #3b5998;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  width: 100%;
  justify-content: space-between;
  padding: 10px 0 10px;
  position: relative;
`;

export const CloseModal = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

export const FacebookButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  padding: 10px;
`;

export const WelcomeContainer = styled.View`
  width: 100%;
  margin: 20px 0 30px;
  height: 55px;
  align-items: center;
`;

export const WelcomeTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #000;
`;

export const WelcomeDisclame = styled.Text`
  font-size: 16px;
  color: #444;
`;

export const ForgotPassword = styled.TouchableOpacity`
  width: 100%;
  align-self: center;
  margin-bottom: 20px;
`;

export const ForgotPasswordText = styled.Text`
  color: #888;
  font-size: 15px;
  text-align: center;
`;

export const Logo = styled(LogoBlack)`
  margin-top: 10px;
  align-self: center;
`;
