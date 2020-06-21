import React, { forwardRef } from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, CustomInput } from './styles';

Icon.loadFont();

function InputMenu(
  { card = false, help = false, clear, style = {}, selected, ...rest },
  ref
) {
  return (
    <Container selected={selected} style={style}>
      {card && (
        <Icon
          name="credit-card"
          color="#76797E"
          size={20}
          style={{ marginHorizontal: 3 }}
        />
      )}
      <CustomInput {...rest} ref={ref} />
      <TouchableOpacity
        onPress={() => {
          clear();
          Keyboard.dismiss();
        }}
      >
        {!card && !help && <Icon name="x-circle" color="#76797E" size={15} />}
        {help && <Icon name="help-circle" color="#76797E" size={15} />}
      </TouchableOpacity>
    </Container>
  );
}

export default forwardRef(InputMenu);
