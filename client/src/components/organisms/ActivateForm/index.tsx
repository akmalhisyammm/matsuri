import { useState, useContext } from 'react';

import { CustomButton } from 'components/atoms';
import { InputGroup } from 'components/molecules';
import { AuthContext } from 'contexts/auth';

type ActivateFormProps = {
  email: string;
};

const ActivateForm = ({ email }: ActivateFormProps) => {
  const [form, setForm] = useState({ otp: '' });

  const authCtx = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm({ ...form, [id]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authCtx.activate(form.otp, email);
  };

  return (
    <section className="login header bg-navy">
      <div className="container">
        <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero">
          <div className="col-md-6">
            <div className="hero-headline text-start">
              Expand Your <br className="d-none d-md-block" />
              Knowledge & Skills
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
                id="otp"
                variant="d-flex flex-column align-items-start"
                label="OTP"
                type="text"
                placeholder="Type your registration OTP"
                onChange={handleInputChange}
              />

              <div className="d-grid mt-2">
                <CustomButton type="submit" variant="btn-green">
                  Activate
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivateForm;
