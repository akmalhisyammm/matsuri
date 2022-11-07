import Image from 'next/image';

type KeypointItemProps = {
  iconUrl: string;
  description: string;
};

const KeypointItem = ({ iconUrl, description }: KeypointItemProps) => {
  return (
    <div className="d-flex align-items-start gap-3">
      <Image src={iconUrl} alt="Keypoint" width={24} height={24} />
      <span>{description}</span>
    </div>
  );
};

export default KeypointItem;
