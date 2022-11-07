import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { CustomButton, CustomLink } from 'components/atoms';
import { BannerList, Hero } from 'components/organisms';
import { AuthContext } from 'contexts/auth';

const Header = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const handleSignOut = () => {
    authCtx.signOut();
    router.push('/');
  };

  return (
    <header className={`${router.pathname === '/' && 'header'} bg-navy`}>
      <nav className="container navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <CustomLink variant="navbar-brand" href="/">
            <Image
              src="/images/logo.png"
              alt="Matsuri"
              width={100}
              height={0}
              style={{ height: 'auto' }}
            />
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
              className={`navbar-nav my-3 my-lg-0 ${
                router.pathname !== '/sign-in' ? 'mx-auto' : 'ms-auto'
              }`}>
              <CustomLink variant={`nav-link ${router.pathname === '/' && 'active'}`} href="/">
                Home
              </CustomLink>
              <CustomLink
                variant={`nav-link ${router.pathname === '/browse' && 'active'}`}
                href="/browse">
                Browse
              </CustomLink>
              <CustomLink
                variant={`nav-link ${router.pathname === '/stories' && 'active'}`}
                href="/stories">
                Stories
              </CustomLink>
              <CustomLink
                variant={`nav-link ${router.pathname === '/about' && 'active'}`}
                href="/about">
                About
              </CustomLink>
            </div>

            {router.pathname !== '/sign-in' && (
              <div className={authCtx.user ? 'navbar-nav ms-auto' : 'd-grid'}>
                {authCtx.user ? (
                  <div className="nav-item dropdown d-flex flex-column flex-lg-row align-items-lg-center authenticated gap-3">
                    <span className="text-light d-none d-lg-block">
                      Hello, {authCtx.user.firstName}
                    </span>

                    <a
                      className="nav-link dropdown-toggle mx-0 d-none d-lg-block"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <Image src="/images/avatar.png" alt="Avatar" width={60} height={60} />
                    </a>
                    <a
                      className="d-block d-lg-none dropdown-toggle text-light text-decoration-none"
                      data-bs-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample">
                      <Image src="/images/avatar.png" alt="Avatar" width={60} height={60} />
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <CustomLink variant="dropdown-item" href="/dashboard">
                          Dashboard
                        </CustomLink>
                      </li>
                      <li>
                        <CustomLink variant="dropdown-item" href="/settings">
                          Settings
                        </CustomLink>
                      </li>
                      <li>
                        <CustomLink variant="dropdown-item" href="/rewards">
                          Rewards
                        </CustomLink>
                      </li>
                      <li>
                        <CustomButton variant="dropdown-item" action={handleSignOut}>
                          Sign Out
                        </CustomButton>
                      </li>
                    </ul>

                    <div className="collapse" id="collapseExample">
                      <ul className="list-group">
                        <li>
                          <CustomLink variant="list-group-item" href="#">
                            Dashboard
                          </CustomLink>
                        </li>
                        <li>
                          <CustomLink variant="list-group-item" href="#">
                            Settings
                          </CustomLink>
                        </li>
                        <li>
                          <CustomLink variant="list-group-item" href="#">
                            Rewards
                          </CustomLink>
                        </li>
                        <li>
                          <CustomButton variant="list-group-item" action={handleSignOut}>
                            Sign Out
                          </CustomButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <CustomButton variant="btn-navy" action={() => router.push('/sign-in')}>
                    Sign In
                  </CustomButton>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {router.pathname === '/' && <Hero />}
      {router.pathname === '/' && <BannerList />}
    </header>
  );
};

export default Header;
