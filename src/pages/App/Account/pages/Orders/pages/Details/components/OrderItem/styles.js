import styled from 'styled-components/native';

export const Shirt = styled.View`
  width: 100%;
  height: 180px;

  flex: 1;
  border-radius: 4px;
  padding: 5px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ShirtImage = styled.Image`
  width: 110px;
  height: 120px;
`;

export const ShirtInfo = styled.View`
  flex: 1;
  height: 160px;
  margin-left: 5px;
  justify-content: space-between;
`;

export const Item = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
