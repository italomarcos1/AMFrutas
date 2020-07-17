import { Platform } from 'react-native';
import styled from 'styled-components/native';
import LogoBlack from '~/assets/logo-black.svg';

export const Background = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background-color: #f2f2f2;
  flex: 1;
  justify-content: center;
  padding: ${props => (props.isIphoneX ? '50px' : '10px')} 10px 10px;
`;

export const Container = styled.View`
  align-items: center;
  position: relative;
`;

export const CloseModal = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  right: 0;
  position: absolute;
  top: 0;
`;

export const Logo = styled(LogoBlack)`
  margin: 10px 0 20px;
  align-self: center;
`;

export const AuthTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #000;
`;

export const RegisterText = styled.Text`
  font-size: 14px;
  color: #444;
`;

export const Form = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const FacebookButton = styled.TouchableOpacity`
  height: 50px;
  width: 80%;
  border-radius: 30px;
  background-color: #3b5998;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FacebookButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  padding: 10px;
`;

export const ForgotPasswordContainer = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  position: relative;
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
