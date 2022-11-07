import Image from 'next/image';

type CustomRadioProps = {
  variant: string;
  name: string;
  id: string;
  label: string;
  imageUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomRadio = ({ variant, name, id, label, imageUrl, onChange }: CustomRadioProps) => {
  return (
    <label className={`${variant} h-100 d-flex justify-content-between align-items-center`}>
      <div className="d-flex align-items-center gap-4">
        <Image src={imageUrl} alt={label} width={65} height={0} style={{ height: 'auto' }} />
        <div>{label}</div>
      </div>
      <input type="radio" name={name} id={id} onChange={onChange} />
      <span className="checkmark" />
    </label>
  );
};

export default CustomRadio;
