type CustomButtonProps = {
  children: React.ReactNode;
  variant: string;
  action?: () => void;
};

const CustomButton = ({ children, variant, action }: CustomButtonProps) => {
  return (
    <button type="button" className={variant} onClick={action}>
      {children}
    </button>
  );
};

export default CustomButton;
