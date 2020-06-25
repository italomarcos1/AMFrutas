import styled from 'styled-components/native';
import Button from '~/components/Button';

export const ImageContainer = styled.View`
  height: 140px;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 0px 10px 20px;
  background-color: #3b8e39;
`;

export const Container = styled.ScrollView`
  background-color: #fff;
`;

export const AvatarContainer = styled.View`
  width: 90px;
  align-items: center;
  justify-content: center;
  height: 90px;
  margin: 20px 0 0 0;
  border-radius: 45px;
  border-color: #fff;
  border-width: 2px;
`;

export const Avatar = styled.Image`
  width: 86px;
  height: 86px;
  border-radius: 43px;
`;

export const ChangeAvatarContainer = styled.View`
  margin: 5px 0 0;
  width: 100px;
  height: 50px;
  align-items: center;
  background-color: #399;
  justify-content: space-evenly;
`;

export const ChangeAvatar = styled.TouchableOpacity`
  width: 45px;
  height: 20px;
  border-radius: 7.5px;
  background-color: #12b118;
  align-items: center;
  justify-content: center;
`;

export const ChangeAvatarText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

export const Content = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-bottom-color: #d2d2d4;
  align-items: center;
  justify-content: space-between;
  padding: 2px 8px 2px 20px;
`;

export const Item = styled.TouchableOpacity`
  flex: 1;
  justify-content: space-evenly;
`;

export const ChoosePhotoButton = styled.TouchableOpacity`
  top: -20px;
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

export const LogoutButton = styled(Button)`
  background-color: #f53030;
  height: 40px;
  max-width: 200px;
  border-radius: 30px;
`;

export const NameInput = styled.TextInput`
  border: 0;
  width: 100%;
  background-color: #f2f3f4;
  border-radius: 1px;
  padding: 1px 5px;
  font-size: 16px;
  color: #000;
`;

export const VerifiedFieldContainer = styled.View`
  height: 5px;
  justify-content: flex-start;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

export const Field = styled.Text`
  color: #818181;
  font-size: 13px;
`;

export const VerifiedField = styled.Text`
  color: ${props => (props.verified ? '#5bae59' : '#F5811F')};
  font-size: 13px;
  margin-left: 15px;
`;

export const Value = styled.Text`
  color: #000;
  font-size: 16px;
`;
