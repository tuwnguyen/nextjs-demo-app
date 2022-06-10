import RegisterComponent from "../components/Register";
import { GetServerSideProps } from "next";

export default function Register() {
  return RegisterComponent();
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};
