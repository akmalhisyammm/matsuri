type InputGroupProps = {
  id: string;
  variant: string;
  label: string;
  type: string;
  placeholder: string;
};

const InputGroup = ({ id, variant, label, type, placeholder }: InputGroupProps) => {
  return (
    <div className={variant}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input type={type} className="form-control" id={id} placeholder={placeholder} />
    </div>
  );
};

export default InputGroup;
