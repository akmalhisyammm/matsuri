import { CustomButton } from 'components/atoms';
import { InputGroup } from 'components/molecules';

const SignUpForm = () => {
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
              Kami menyediakan berbagai acara terbaik untuk membantu{' '}
              <br className="d-none d-lg-block" />
              anda dalam meningkatkan skills di bidang teknologi
            </p>
          </div>

          <div className="col-md-6">
            <form action="" className="form-login d-flex flex-column mt-4 mt-md-0">
              <InputGroup
                id="first_name"
                variant="d-flex flex-column align-items-start"
                label="First Name"
                type="text"
                placeholder="Type your first name"
              />
              <InputGroup
                id="last_name"
                variant="d-flex flex-column align-items-start"
                label="Last Name"
                type="text"
                placeholder="Type your last name"
              />
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
              <InputGroup
                id="role"
                variant="d-flex flex-column align-items-start"
                label="Role"
                type="text"
                placeholder="ex: Product Designer"
              />

              <div className="d-grid mt-2">
                <CustomButton variant="btn-green">Sign Up</CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
