type CustomButtonProps = {
  children: React.ReactNode;
  variant: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  action?: () => void;
};

const CustomButton = ({
  children,
  variant,
  type = 'button',
  disabled = false,
  action,
}: CustomButtonProps) => {
  return (
    <button type={type} className={variant} onClick={action} disabled={disabled}>
      {children}
    </button>
  );
};

export default CustomButton;
