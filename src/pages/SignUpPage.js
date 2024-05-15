import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { LoadingSpinner } from "components/loading";
import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  // onAuthStateChanged,
  // signInWithEmailAndPassword,
  // signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Authentication from "./Authentication";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

const schema = yup.object({
  fullname: yup.string().required("Please enter your username"),
  email: yup.string().email().required("Please enter your email address"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    )
    .required("Please enter your password"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  // console.log(Object.values(errors));
  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });
      const colRef = collection(db, "users");
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        usename: slugify(values.fullname, { lower: true }),

        avatar:
          "https://images.unsplash.com/photo-1660893669101-841cc1b0aea3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      });
      toast.success("register account successfully!", {
        pauseOnHover: false,
      });
      navigate("/");
    } catch (error) {
      toast.error("auth/email already in use");
    }
  };
  // const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0)
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
  }, [errors]);
  useEffect(() => {
    document.title = "Register";
  }, []);
  return (
    <Authentication>
      {/* <div className="container">
        <img srcSet="/logo.png 2x" alt="" className="logo" />
        <h2 className="title">Monkey Blogging</h2> */}
      <form className="form" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="enter your fullname"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            placeholder="enter your email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>

        <div className="have-account">
          do you have an account? <NavLink to={"/sign-in"}>Login</NavLink>{" "}
        </div>
        <Button
          type="submit"
          style={{ width: 200 }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
      {/* </div> */}
    </Authentication>
  );
};

export default SignUpPage;
