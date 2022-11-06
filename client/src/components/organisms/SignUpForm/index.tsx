import { useState, useContext } from 'react';

import { CustomButton } from 'components/atoms';
import { InputGroup } from 'components/molecules';
import { AuthContext } from 'contexts/auth';

const SignUpForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  const authCtx = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm({ ...form, [id]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authCtx.signUp(form.firstName, form.lastName, form.email, form.password, form.role);
  };

  return (
    <section className="login header bg-navy">
      <div className="container">
        <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero">
          <div className="col-md-6">
            <div className="hero-headline text-start">
              Expand Your <br className="d-none d-md-block" />
              Knowledge & Experience
            </div>
            <p className="hero-paragraph text-start">
              We provide the best events to boost your knowledge and experience
            </p>
          </div>

          <div className="col-md-6">
            <form
              className="form-login d-flex flex-column mt-4 mt-md-0"
              onSubmit={handleFormSubmit}>
              <InputGroup
                id="firstName"
                variant="d-flex flex-column align-items-start"
                label="First Name"
                type="text"
                placeholder="Type your first name"
                onChange={handleInputChange}
              />
              <InputGroup
                id="lastName"
                variant="d-flex flex-column align-items-start"
                label="Last Name"
                type="text"
                placeholder="Type your last name"
                onChange={handleInputChange}
              />
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
                label="Password"
                type="password"
                placeholder="Type your password"
                onChange={handleInputChange}
              />
              <InputGroup
                id="role"
                variant="d-flex flex-column align-items-start"
                label="Role"
                type="text"
                placeholder="ex: Product Designer"
                onChange={handleInputChange}
              />

              <div className="d-grid mt-2">
                <CustomButton type="submit" variant="btn-green">
                  Sign Up
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
