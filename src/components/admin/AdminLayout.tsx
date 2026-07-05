"use client";

import React, { useState } from "react";
import { Layout, Menu, Button, Space, Typography, App as AntApp, Spin, ConfigProvider } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardOutlined,
  FolderOpenOutlined,
  MailOutlined,
  CommentOutlined,
  LogoutOutlined,
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Logo from "../public/Logo";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { message } = AntApp.useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        message.success("Logged out successfully.");
        router.push("/login");
      } else {
        message.error("Logout failed.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      message.error("Failed to logout.");
    }
  };

  const getActiveKey = () => {
    if (pathname.startsWith("/admin/dashboard")) return "1";
    if (pathname.startsWith("/admin/settings")) return "2";
    if (pathname.startsWith("/admin/services")) return "3";
    if (pathname.startsWith("/admin/projects")) return "4";
    if (pathname.startsWith("/admin/testimonials")) return "5";
    if (pathname.startsWith("/admin/inquiries")) return "6";
    if (pathname.startsWith("/admin/users")) return "7";
    return "1";
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link href="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <SettingOutlined />,
      label: <Link href="/admin/settings">Home Page</Link>,
    },
    {
      key: "3",
      icon: <AppstoreOutlined />,
      label: <Link href="/admin/services">Design Offerings</Link>,
    },
    {
      key: "4",
      icon: <FolderOpenOutlined />,
      label: <Link href="/admin/projects">Featured Works</Link>,
    },
    {
      key: "5",
      icon: <CommentOutlined />,
      label: <Link href="/admin/testimonials">Client Reviews</Link>,
    },
    {
      key: "6",
      icon: <MailOutlined />,
      label: <Link href="/admin/inquiries">Enquire</Link>,
    },
    {
      key: "7",
      icon: <UserOutlined />,
      label: <Link href="/admin/users">Registered Users</Link>,
    },
  ];

  if (!mounted) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "var(--bg-warm)"
      }}>
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
          <p style={{ marginTop: "16px", color: "var(--text-secondary)", fontSize: "14px", fontFamily: "var(--font-outfit), sans-serif" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sider panel */}
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              siderBg: "#231f1b",
            },
            Menu: {
              darkItemBg: "#231f1b",
              darkSubMenuItemBg: "#231f1b",
              darkItemHoverBg: "rgba(138, 106, 74, 0.15)",
              darkItemSelectedBg: "#8a6a4a",
              darkItemSelectedColor: "#ffffff",
            },
          },
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg"
          collapsedWidth="0"
          theme="dark"
          style={{
            boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
            zIndex: 100,
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "24px 16px", display: "flex", justifyContent: "center", borderBottom: "1px solid #36302a" }}>
            <Link href="/admin/dashboard" style={{ display: "flex" }}>
              <Logo light fontSize="20px" subtitleSize="7px" />
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[getActiveKey()]}
            items={menuItems}
            onClick={() => {
              if (window.innerWidth < 992) {
                setCollapsed(true);
              }
            }}
            style={{ padding: "16px 0" }}
          />
        </Sider>
      </ConfigProvider>

      {/* Mobile Backdrop Mask */}
      {!collapsed && (
        <div
          className="admin-sidebar-mask"
          onClick={() => setCollapsed(true)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.3)",
            zIndex: 99,
          }}
        />
      )}

      <Layout>
        {/* Header navigation bar */}
        <Header
          style={{
            background: "#ffffff",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(138, 106, 74, 0.05)",
            position: "sticky",
            top: 0,
            zIndex: 99,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: "20px" }} /> : <MenuFoldOutlined style={{ fontSize: "20px" }} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Title level={4} className="font-serif admin-header-title">
              <span className="admin-title-desktop">Mieux Admin Console</span>
              <span className="admin-title-mobile">Mieux Admin</span>
            </Title>
          </div>

          <Space size={16}>
            <Link href="/">
              <Button type="text" icon={<HomeOutlined />}>
                <span className="admin-btn-text">View Live Website</span>
              </Button>
            </Link>
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{
                borderRadius: "4px",
              }}
            >
              <span className="admin-btn-text">Logout</span>
            </Button>
          </Space>
        </Header>

        {/* Content body wrapper */}
        <Content style={{ margin: "24px", minHeight: "280px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
