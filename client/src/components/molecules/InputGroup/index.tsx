type InputGroupProps = {
  id: string;
  variant: string;
  label: string;
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputGroup = ({ id, variant, label, type, placeholder, onChange }: InputGroupProps) => {
  return (
    <div className={variant}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputGroup;
