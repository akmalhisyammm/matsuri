import { useRouter } from 'next/router';

import { CustomButton } from 'components/atoms';

type NotFoundProps = {
  message: string;
};

const NotFound = ({ message }: NotFoundProps) => {
  const router = useRouter();

  return (
    <section
      className="header bg-navy"
      style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="hero">
        <div className="hero-headline">
          This <span className="text-gradient-blue">Page</span> <br className="d-none d-lg-block" />
          is <span className="text-gradient-pink">{message}.</span>
        </div>

        <p className="hero-paragraph">Please go to Home by clicking the button below</p>

        <CustomButton variant="btn-green" action={() => router.replace('/')}>
          Go to Home
        </CustomButton>
      </div>
    </section>
  );
};

export default NotFound;
