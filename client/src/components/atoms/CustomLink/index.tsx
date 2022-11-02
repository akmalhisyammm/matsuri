import Link from 'next/link';

type CustomLinkProps = {
  children?: React.ReactNode;
  variant?: string;
  href: string;
  scroll?: boolean;
};

const CustomLink = ({ children, variant, href, scroll = true }: CustomLinkProps) => {
  return (
    <Link href={href} scroll={scroll} legacyBehavior>
      <a className={variant}>{children}</a>
    </Link>
  );
};

export default CustomLink;
