import { useId, useState } from 'react';

const Checkboxes = () => {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleChange = (e) => {
    setHasAccepted(e.target.checked);
  };
  const checkId = useId();
  return (
    <div>
      <label htmlFor={checkId}>I accept terms and conditions</label>
      <input
        type="checkbox"
        id={checkId}
        name="terms"
        checked={hasAccepted}
        onChange={handleChange}
      />
      <button type="button" disabled={!hasAccepted}>
        Proceed
      </button>
    </div>
  );
};

export default Checkboxes;
