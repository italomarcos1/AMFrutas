import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const Container = styled.View`
  background-color: #ddd;
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(ActivityIndicator).attrs({
  color: '#777',
  size: 'large',
})``;

export const LoadingText = styled.Text`
  font-size: 20px;
  color: #777;
  margin-top: 20px;
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

export const Option = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
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
