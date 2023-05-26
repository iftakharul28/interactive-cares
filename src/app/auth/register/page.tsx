import RegisterForm from "@/components/form/RegisterForm";
import Button from "@/components/Button";
export default function Register() {
  return (
    <section className='login'>
      <div className='login__first-col'>
        <div className='login__card-heading'>
          <h3 className='login__heading'>Welcome!</h3>
          <p className='login__text'>Use these awesome forms to login or create new account in your project for free.</p>
        </div>
        <RegisterForm />
        <p className='login__footer-text'>
          Have an account?
          <Button type='link' className='login__footer-link' url='/auth/login'>
            Sign in
          </Button>
        </p>
      </div>
      <div className='login__second-col'>
        <div
          className='login__bg-image'
          style={{
            backgroundImage: "url(/assets/curved-4.jpg)",
          }}></div>
      </div>
    </section>
  );
}
