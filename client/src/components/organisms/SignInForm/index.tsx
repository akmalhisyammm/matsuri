import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { CustomButton } from 'components/atoms';
import { InputGroup } from 'components/molecules';
import { AuthContext } from 'contexts/auth';

const SignInForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm({ ...form, [id]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authCtx.signIn(form.email, form.password);
    router.push('/');
  };

  return (
    <section className="login header bg-navy">
      <div className="container">
        <div className="d-flex flex-column align-items-center hero gap-5">
          <div>
            <div className="hero-headline text-start">Sign In</div>
          </div>

          <form
            className="form-login d-flex flex-column mt-4 mt-md-0 p-30"
            onSubmit={handleFormSubmit}>
            <InputGroup
              id="email"
              variant="d-flex flex-column align-items-start"
              label="Email"
              type="email"
              placeholder="matsuri@example.com"
              onChange={handleInputChange}
            />
            <InputGroup
              id="password"
              variant="d-flex flex-column align-items-start"
              label="Password (6 characters)"
              type="password"
              placeholder="Type your password"
              onChange={handleInputChange}
            />

            <div className="d-grid mt-2 gap-4">
              <CustomButton type="submit" variant="btn-green">
                Sign In
              </CustomButton>
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
