import React, { useContext, useState } from "react";
import Head from "next/head";
import { Form, Button, Row } from "react-bootstrap";
import styles from "@/styles/Register.module.css";
import { post } from "utils/apiCalling";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AppContext } from "lib/context";
import { setCookie } from "nookies";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const { dataAppContext, setDataAppContext } = useContext(AppContext);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validationForm(data)) {
      setLoading(true);
      const res = await post("/api/user/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      }).catch((err: any) => {
        setLoading(false);
        if (err.response.data.error.includes("E11000")) {
          toast.error("User is already registered");
        } else {
          toast.error(err.respsonse.data.error);
        }
      });
      if (!res) return;
      setLoading(false);
      setDataAppContext({ ...dataAppContext, user: res?.data?.currentUser });
      setCookie(null, "AccessToken", res?.data?.accessToken);
      toast("Registration successfull!");
      router.push("/");
    }
    setLoading(false);
  };

  const validationForm = (registerData: RegisterData) => {
    if (
      !registerData.username ||
      !registerData.password ||
      !registerData.email
    ) {
      toast.error("Please enter your username or password or email");
      return false;
    } else if (
      HasSpace(registerData.username) ||
      HasSpace(registerData.password) ||
      HasSpace(registerData.email)
    ) {
      toast.error(
        "Please check again your username or password or email (Have spaces)"
      );
      return false;
    } else if (!ValidatePasswordLength(registerData.password)) {
      toast.error("Password is not valid(Less than 12, more than 6)");
      return false;
    }
    return true;
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="jumbotron text-center bg-primary square">Register</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <Form className={styles.registerForm}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Control
              className={styles.inputField}
              placeholder="Enter your username"
              value={data.username}
              onChange={handleChangeData}
              type="text"
              name="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              className={styles.inputField}
              placeholder="Enter your email address"
              value={data.email}
              onChange={handleChangeData}
              type="email"
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              className={styles.inputField}
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChangeData}
              type="password"
              name="password"
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label className={styles.label}>Confirm Password</Form.Label>
              <Form.Control
                value=""
                onChange={handleChangeData}
                type="password"
                name="confirmPassword"
              />
            </Form.Group> */}
          <Button
            className={styles.SubmitButton}
            variant="primary"
            onClick={handleSubmit}
            type="submit"
            disabled={!data.username || !data.password || !data.email}
          >
            {loading ? <SyncOutlined spin /> : "Sign up"}
          </Button>
          <p className="text-center p-3">
            Already registered?{" "}
            <Link href="/login" color="blue">
              <a className={styles.link}>Login</a>
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
};

const HasSpace = (text: string) => {
  const space = / |　/;
  return text && text.match(space);
};

const ValidatePasswordLength = (password: string) => {
  return password && password.length > 6 && password.length < 12;
};

export default Register;
