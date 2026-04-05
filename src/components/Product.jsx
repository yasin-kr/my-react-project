export const Card = ({ title = 'Not', text, children }) => {
  return (
    <section>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {children}
    </section>
  );
};
