import { verify } from "lib/server/services/authVerify";
import { GetServerSideProps } from "next";
import NoteComponent from "../components/Note/Note";
import { resetServerContext } from "react-beautiful-dnd";
export default function Note() {
  return NoteComponent();
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const auth = await verify(context);
  if (!auth) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 302,
      },
    };
  }
  resetServerContext();
  return {
    props: {},
  };
};
