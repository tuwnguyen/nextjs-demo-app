import LoginComponent from "../components/Login";
import { GetServerSideProps } from "next";

export default function Login() {
  return LoginComponent();
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};
