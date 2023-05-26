import Button from "@/components/Button";
import LoginForm from "@/components/form/LoginForm";
const login = () => {
  return (
    <section className='login'>
      <div className='login__first-col'>
        <div className='login__card-heading'>
          <h3 className='login__heading'>Welcome back</h3>
          <p className='login__text'>Enter your email and password to sign in</p>
        </div>
        <LoginForm />
        <p className='login__footer-text'>
          Donot have an account?
          <Button type='link' className='login__footer-link' url='/auth/register'>
            Sign up
          </Button>
        </p>
      </div>
      <div className='login__second-col'>
        <div
          className='login__bg-image'
          style={{
            backgroundImage: "url(/assets/curved-6.jpg)",
          }}></div>
      </div>
    </section>
  );
};

export default login;
