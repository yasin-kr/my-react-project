import { useId } from 'react';

const Mycomponent = () => {
  const id = useId();
  console.log(id);

  return (
    <div>
      <label htmlFor="id">İsim Soyisim</label>
      <input type="text" id={id} />
    </div>
  );
};

export default Mycomponent;
