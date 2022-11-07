import { useRouter } from 'next/router';

import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Header />
      <main>{children}</main>
      {router.pathname !== '/sign-in' && router.pathname !== '/sign-up' && <Footer />}
    </>
  );
};

export default Layout;
