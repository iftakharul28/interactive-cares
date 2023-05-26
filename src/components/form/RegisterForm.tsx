"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Http from "@/helper/http";
import Button from "@/components/Button";
import { registerValidate } from "@/helper/validate";
import type { registertype } from "@/types/form";

const RegisterForm = () => {
  const router = useRouter();
  // formik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      passWord: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });
  async function onSubmit(values: registertype) {
    try {
      const data = await Http.Post({
        path: `user/post`,
        data: {
          name: values.name,
          email: values.email,
          password: values.passWord,
        },
      });
      if (data.status === 201) {
        router.push("/auth/login");
      } else {
        const content = await data.json();
        console.log(content);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form className='form login__card-body' role='form' onSubmit={formik.handleSubmit}>
      <div className='form__input-group'>
        <label htmlFor='name' className='form__label'>
          Name
        </label>
        <input id='name' type='text' placeholder='Name' className={`form__input${formik.errors.name && formik.touched.name ? " form__input--red" : ""}`} {...formik.getFieldProps("name")} />
      </div>
      <div className='form__input-group'>
        <label htmlFor='email' className='form__label'>
          Email
        </label>
        <input id='email' type='email' placeholder='Email' className={`form__input${formik.errors.email && formik.touched.email ? " form__input--red" : ""}`} {...formik.getFieldProps("email")} />
      </div>
      <div className='form__input-group'>
        <label htmlFor='password' className='form__label'>
          Password
        </label>
        <input
          id='password'
          type='password'
          placeholder='Password'
          className={`form__input${formik.errors.passWord && formik.touched.passWord ? " form__input--red" : ""}`}
          {...formik.getFieldProps("passWord")}
        />
      </div>
      <div className='form__input-group'>
        <label htmlFor='cpassword' className='form__label'>
          RePassword
        </label>
        <input
          id='cpassword'
          type='password'
          placeholder='Password'
          className={`form__input${formik.errors.cpassword && formik.touched.cpassword ? " form__input--red" : ""}`}
          {...formik.getFieldProps("cpassword")}
        />
      </div>
      <Button type='submit' className='form__button'>
        Sign Up
      </Button>
    </form>
  );
};

export default RegisterForm;
