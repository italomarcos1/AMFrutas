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

export const Header = styled.View`
  background-color: #12b118;
  width: 100%;
  height: 120px;
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

export const TitleContainer = styled.View`
  width: 100%;
  height: 45px;
  padding: 0 20px;
  align-items: flex-end;
  justify-content: center;
  background-color: #12d118;
  color: #fff;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
`;
