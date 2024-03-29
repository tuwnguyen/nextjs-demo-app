import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "lib/context";
const { Item, SubMenu } = Menu;

const TopNav = () => {
  const { dataAppContext, setDataAppContext } = useContext(AppContext);
  const { user } = dataAppContext;
  const router = useRouter();
  const [current, setCurrent] = useState<string>("/register");

  useEffect(() => {
    setCurrent(router.pathname);
  }, [router.pathname]);
  const handleLogout = () => {
    window.location.replace("/signout");
    setDataAppContext({ ...dataAppContext, user: null });
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        onClick={(e: any) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e: any) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>
          <Item
            key="/register"
            onClick={(e: any) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      )}
      {user !== null && (
        <>
          <Item
            key="/demotodos"
            onClick={(e: any) => setCurrent(e.key)}
            icon={<MenuUnfoldOutlined />}
          >
            <Link href="/note">
              <a>Demo todos</a>
            </Link>
          </Item>
          <SubMenu
            key="sub"
            style={{ float: "right" }}
            className="float-right"
            title={user?.email!}
            icon={<CoffeeOutlined />}
          >
            <Item onClick={handleLogout} icon={<LogoutOutlined />}>
              Logout
            </Item>
          </SubMenu>
        </>
      )}
    </Menu>
  );
};

export default TopNav;
