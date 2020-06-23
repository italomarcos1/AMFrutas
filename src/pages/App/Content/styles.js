import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background: #f2f2f2;
  padding: 20px 15px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-transform: uppercase;
  color: #12b118;
  margin: 10px 0 15px;
  font-weight: bold;
  text-align: center;
`;

export const Banner = styled.Image`
  border-radius: 10px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
