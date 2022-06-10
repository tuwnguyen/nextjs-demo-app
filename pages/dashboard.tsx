import { GetServerSideProps } from "next";
import { verify } from "lib/server/services/authVerify";

export default function Dashboard() {
  return "Hello word";
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await verify(context);
  console.log("auth payload", auth);
  if (!auth) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 302,
      },
    };
  }
  return {
    props: {},
  };
};
