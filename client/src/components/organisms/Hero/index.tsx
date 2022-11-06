import { CustomLink } from 'components/atoms';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-headline">
        Expand Your <span className="text-gradient-blue">Knowledge</span>{' '}
        <br className="d-none d-lg-block" />
        by <span className="text-gradient-pink">Joining</span> Our Greatest Events
      </div>

      <p className="hero-paragraph">
        We provide the best events to boost your knowledge and experience
      </p>

      <CustomLink variant="btn-green" href="#grow-today" scroll={false}>
        Browse Now
      </CustomLink>
    </section>
  );
};

export default Hero;
