import styled from 'styled-components/native';
import LogoBlack from '~/assets/logo-black.svg';

export const Background = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const Container = styled.ScrollView`
  background-color: #fff;
  padding: 10px 30px;
`;

export const FacebookButton = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  border-radius: 30px;
  background-color: #4267b2;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-family: 'RobotoBold';
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
`;

export const Logo = styled(LogoBlack)`
  margin-top: 20px;
`;
