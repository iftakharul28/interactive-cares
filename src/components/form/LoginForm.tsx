"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import Button from "@/components/Button";
import { loginValidate } from "@/helper/validate";
import type { loginValidation } from "@/types/form";
const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit,
  });
  async function onSubmit(values: loginValidation) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values?.email,
      password: values?.password,
      callbackUrl: `${searchParams?.get("callbackUrl") ? searchParams?.get("callbackUrl") : window.location.origin}`,
    });
    if (status?.ok) {
      router.push(status?.url || "");
    }
  }
  // async function handleGoogleSignin() {
  //   signIn("google", {
  //     redirect: true,
  //     callbackUrl: `${searchParams?.get("callbackUrl") ? searchParams?.get("callbackUrl") : window.location.origin}`,
  //   });
  // }
  return (
    <form className='form login__card-body' role='form' onSubmit={formik.handleSubmit}>
      <div className='form__input-group'>
        <label htmlFor='email' className='form__label'>
          Email
        </label>
        <input id='email' type='email' className={`form__input${formik.errors.email && formik.touched.email ? " form__input--red" : ""}`} placeholder='Email' {...formik.getFieldProps("email")} />
      </div>
      <div className='form__input-group'>
        <input
          id='password'
          type='password'
          className={`form__input ${formik.errors.password && formik.touched.password ? "form__input--red" : ""}`}
          placeholder='Password'
          {...formik.getFieldProps("password")}
        />
      </div>
      <Button className='form__button' type='submit'>
        Sign in
      </Button>
      {/* <Button className='login__button' type='button' onClick={handleGoogleSignin}>
        Sign In with Google
        <img src={"/google.svg"} alt='google' width='20' height={20} />
      </Button> */}
    </form>
  );
};

export default LoginForm;
