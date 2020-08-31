import styled from 'styled-components/native';

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

export const InputContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: ${props => (!props.last ? '15px' : 0)};
`;

export const Content = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-bottom-color: #d2d2d4;
  align-items: center;
  min-height: 50px;
  padding: 5px 8px 5px 20px;
`;

export const Item = styled.TouchableOpacity`
  flex: 1;
  justify-content: space-evenly;
`;

export const Option = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  background-color: #efefef;
  border-radius: 4px;
  padding: 10px 10px;
  margin-bottom: ${props => (props.last ? 0 : '10px')};
`;

export const OptionsContainer = styled.TouchableOpacity`
  width: 100%;
  justify-content: space-between;
`;

export const RadioButtonBackground = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background-color: #fff;
  border-width: 1px;
  border-color: #12b118;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

export const Selected = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #12b118;
  display: ${props => (props.selected ? 'flex' : 'none')};
`;

export const RadioText = styled.Text`
  font-size: 16px;
  color: #3a3a3a;
  margin-left: 5px;
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

export const VerifiedFieldContainer = styled.View`
  justify-content: flex-start;
  flex-direction: row;
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
