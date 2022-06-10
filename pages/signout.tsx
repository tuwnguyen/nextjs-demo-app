import { GetServerSideProps } from "next";
import { destroyCookie } from "nookies";
export default function Signout() {
  return "";
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  destroyCookie(context, "AccessToken");
  return {
    redirect: {
      destination: "/login",
      statusCode: 302,
    },
  };
};
