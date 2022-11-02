import { useRouter } from 'next/router';
import { CustomButton } from 'components/atoms';
import { InputGroup } from 'components/molecules';

const SignInForm = () => {
  const router = useRouter();

  return (
    <section className="login header bg-navy">
      <div className="container">
        <div className="d-flex flex-column align-items-center hero gap-5">
          <div>
            <div className="hero-headline text-start">Sign In</div>
          </div>

          <form action="" className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
            <InputGroup
              id="email_address"
              variant="d-flex flex-column align-items-start"
              label="Email"
              type="email"
              placeholder="matsuri@example.com"
            />
            <InputGroup
              id="password"
              variant="d-flex flex-column align-items-start"
              label="Password (6 characters)"
              type="password"
              placeholder="Type your password"
            />

            <div className="d-grid mt-2 gap-4">
              <CustomButton variant="btn-green">Sign In</CustomButton>
              <CustomButton variant="btn-navy" action={() => router.push('/sign-up')}>
                Create New Account
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
