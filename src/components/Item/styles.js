import styled from 'styled-components';

export const ContainerImage = styled.TouchableOpacity`
  width: 150px;
  height: ${props => (props.isCategory ? '130px' : '170px')};
  border-radius: 15px;
  background-color: #fff;
  margin: 0 15px 15px 0;
`;

export const ProductImage = styled.Image`
  width: 150px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: ${props => (props.isCategory ? '80px' : '110px')};
`;

export const ProductText = styled.Text`
  font-size: ${props => (props.isBlog ? '12px' : '14px')};
  color: black;
  text-transform: ${props => (props.isCategory ? 'none' : 'uppercase')};
  font-weight: ${props => (props.isCategory ? 'normal' : 'bold')};
  padding: 10px;
  text-align: center;
`;
