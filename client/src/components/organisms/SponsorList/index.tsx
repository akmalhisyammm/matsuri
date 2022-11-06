import Image from 'next/image';

type SponsorListProps = {
  theme: 'light' | 'dark';
};

const SponsorList = ({ theme }: SponsorListProps) => {
  return (
    <section className={`brand-partner text-center ${theme === 'dark' && 'bg-navy pt-0'}`}>
      <p>Events held by top & biggest global companies</p>

      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
        <Image src="/images/apple-111.svg" alt="Apple" width={88} height={30} />
        <Image src="/images/Adobe.svg" alt="Adobe" width={127} height={30} />
        <Image src="/images/slack-21.svg" alt="Slack" width={119} height={30} />
        <Image src="/images/spotify-11.svg" alt="Spotify" width={101} height={30} />
        <Image src="/images/google-2015.svg" alt="Google" width={93} height={30} />
      </div>
    </section>
  );
};

export default SponsorList;
