import { forwardRef } from 'react';

const CustomButton = forwardRef((props, ref) => (
  <button ref={ref}>{props.children}</button>
));

export default CustomButton;
