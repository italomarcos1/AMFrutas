import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const Container = styled.View`
  background-color: #ddd;
  flex: 1;
  align-items: center;
  justify-content: center;
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
