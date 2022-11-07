import { useRouter } from 'next/router';
import Image from 'next/image';

import { CustomButton } from 'components/atoms';

const Story = () => {
  const router = useRouter();

  return (
    <section className="stories">
      <div className="d-flex flex-row justify-content-center align-items-center container">
        <Image
          src="/images/story.png"
          alt="Story"
          className="d-none d-lg-block"
          width={515}
          height={0}
          style={{ height: 'auto' }}
          priority
        />

        <div className="d-flex flex-column">
          <div>
            <div className="sub-title">
              <span className="text-gradient-pink">Story</span>
            </div>
            <div className="title">
              One Great Event. <br className="d-none d-lg-block" />
              For The Better World.
            </div>
          </div>

          <p className="paragraph">
            Baca kisah bagaimana Shayna berhasil membangun <br className="d-none d-lg-block" />
            sebuah Startup yang membantu warga untuk <br className="d-none d-lg-block" />
            mendapatkan bantuan selama pandemic.
          </p>

          <CustomButton variant="btn-navy" action={() => router.push('/stories')}>
            Read
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default Story;
