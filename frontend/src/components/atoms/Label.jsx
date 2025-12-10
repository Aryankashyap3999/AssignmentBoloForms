import './Label.css';

export const Label = ({ children, htmlFor }) => {
  return (
    <label className="label" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
