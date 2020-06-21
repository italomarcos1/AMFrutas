import styled from 'styled-components/native';

export const Header = styled.View`
  background-color: #12b118;
  width: 100%;
  height: 120px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
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
