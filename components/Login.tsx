import React, { useContext, useState } from "react";
import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import styles from "@/styles/Register.module.css";
import { post } from "utils/apiCalling";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AppContext } from "lib/context";
import { setCookie } from "nookies";

interface SignData {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const { dataAppContext, setDataAppContext } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SignData>({
    username: "",
    password: "",
  });

  const validationForm = (signData: SignData) => {
    if (!signData.username || !signData.password) {
      toast.error("Please enter your username or password");
      return false;
    } else if (HasSpace(signData.username) || HasSpace(signData.password)) {
      toast.error("Please check again your username or password (Have spaces)");
      return false;
    }
    return true;
  };

  const handleChangeData = (e: any) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validationForm(data)) {
      const res = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      }).catch((err: any) => {
        setLoading(false);
        toast.error(err.response.data.error);
      });
      if (!res) return;
      setDataAppContext({ ...dataAppContext, user: res?.data?.currentUser });
      setCookie(null, "AccessToken", res?.data?.accessToken);
      router.push("/");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <Form className={styles.registerForm}>
          <Form.Group className="mb-3" controlId="formUsername">
            {/* <Form.Label className={styles.label}>User Name</Form.Label> */}
            <Form.Control
              className={styles.inputField}
              placeholder="Username"
              value={data.username}
              onChange={handleChangeData}
              type="text"
              name="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            {/* <Form.Label className={styles.label}>Password</Form.Label> */}
            <Form.Control
              className={styles.inputField}
              placeholder="Password"
              value={data.password}
              onChange={handleChangeData}
              type="password"
              name="password"
            />
          </Form.Group>
          <Button
            className={styles.SubmitButton}
            variant="primary"
            onClick={handleSubmit}
            type="submit"
            disabled={!data.username || !data.password}
          >
            {loading ? <SyncOutlined spin /> : "Login"}
          </Button>
          <p className="text-center p-3">
            Not a member?{" "}
            <Link href="/register" color="blue">
              <a className={styles.link}>Signup</a>
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

export default Login;