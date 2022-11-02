import Image from 'next/image';
import { useRouter } from 'next/router';
import { CustomButton, CustomLink } from 'components/atoms';
import { BannerList, Hero } from 'components/organisms';

type HeaderProps = {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className={`${title === 'Home' && 'header'} bg-navy`}>
      <nav className="container navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <CustomLink variant="navbar-brand" href="/">
            <Image src="/images/logo.svg" alt="matsuri" width={124} height={27} />
          </CustomLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div
              className={`navbar-nav my-3 my-lg-0 ${title !== 'Sign In' ? 'mx-auto' : 'ms-auto'}`}>
              <CustomLink variant={`nav-link ${title === 'Home' && 'active'}`} href="/">
                Home
              </CustomLink>
              <CustomLink variant={`nav-link ${title === 'Browse' && 'active'}`} href="#">
                Browse
              </CustomLink>
              <CustomLink variant={`nav-link ${title === 'Stories' && 'active'}`} href="#">
                Stories
              </CustomLink>
              <CustomLink variant={`nav-link ${title === 'About' && 'active'}`} href="#">
                About
              </CustomLink>
            </div>

            {title !== 'Sign In' && (
              <div className="d-grid">
                <CustomButton variant="btn-navy" action={() => router.push('/sign-in')}>
                  Sign In
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </nav>

      {title === 'Home' && <Hero />}
      {title === 'Home' && <BannerList />}
    </header>
  );
};

export default Header;
