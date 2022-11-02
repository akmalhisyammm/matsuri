import { CustomLink } from 'components/atoms';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer bg-navy">
      <div className="container">
        <CustomLink href="index.html">
          <Image src="/images/logo.svg" alt="matsuri" width={124} height={27} />
        </CustomLink>

        <div className="mt-3 d-flex flex-row flex-wrap footer-content align-items-baseline">
          <p className="paragraph">
            Semina adalah tempat di mana <br className="d-md-block d-none" /> anda dapat mencari
            event sesuai <br className="d-md-block d-none" /> dengan minat & terdekat.
          </p>

          <div className="d-flex flex-column footer-links">
            <div className="title-links mb-3">Features</div>
            <CustomLink href="#">Virtual</CustomLink>
            <CustomLink href="#">Pricing</CustomLink>
            <CustomLink href="#">Merchant</CustomLink>
            <CustomLink href="#">Tickets</CustomLink>
          </div>

          <div className="d-flex flex-column footer-links">
            <div className="title-links mb-3">Company</div>
            <CustomLink href="#">Jobs</CustomLink>
            <CustomLink href="#">API</CustomLink>
            <CustomLink href="#">Press</CustomLink>
            <CustomLink href="#">Sitemap</CustomLink>
          </div>

          <div className="d-flex flex-column footer-links">
            <div className="title-links mb-3">Learn</div>
            <CustomLink href="#">Guidebook</CustomLink>
            <CustomLink href="#">Inspiration</CustomLink>
            <CustomLink href="#">Community</CustomLink>
            <CustomLink href="#">Tools</CustomLink>
          </div>
        </div>

        <div className="d-flex justify-content-center paragraph all-rights">
          All Rights Reserved. Semina Angga 2022.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
