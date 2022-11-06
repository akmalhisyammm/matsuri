import Image from 'next/image';

type CustomRadioProps = {
  variant: string;
  name: string;
  label: string;
  imageUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomRadio = ({ variant, name, label, imageUrl, onChange }: CustomRadioProps) => {
  return (
    <label className={`${variant} h-100 d-flex justify-content-between align-items-center`}>
      <div className="d-flex align-items-center gap-4">
        <Image src={imageUrl} alt={label} width={65} height={40} />
        <div>{label}</div>
      </div>
      <input type="radio" name={name} onChange={onChange} />
      <span className="checkmark" />
    </label>
  );
};

export default CustomRadio;
