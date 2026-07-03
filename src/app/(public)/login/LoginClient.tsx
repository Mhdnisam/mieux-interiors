"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, App as AntApp } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Logo from "@/components/public/Logo";

const { Text } = Typography;

export default function LoginClient({ authBgImage }: { authBgImage: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { message } = AntApp.useApp();

  const redirect = searchParams.get("redirect") || "/";

  const onFinishLogin = async (values: any) => {
    setLoading(true);
    try {
      let userLoggedIn = false;
      
      // First try user login
      try {
        const res = await fetch("/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            message.success("Logged in successfully. Welcome back!");
            router.push(redirect);
            setTimeout(() => { window.location.href = redirect; }, 500);
            userLoggedIn = true;
            return;
          }
        }
      } catch (userErr) {
        console.error("User login fetch error:", userErr);
      }

      if (userLoggedIn) return;
      
      // If user login fails or errors out, try admin login silently
      try {
        const adminRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        
        if (adminRes.ok) {
          const adminData = await adminRes.json();
          if (adminData.success) {
            message.success("Logged in successfully. Welcome to Mieux Admin!");
            router.push("/admin/dashboard");
            return;
          }
        }
      } catch (adminErr) {
        console.error("Admin login fetch error:", adminErr);
      }

      // Both failed
      message.error("Invalid credentials.");
    } catch (err) {
      console.error("Login flow error:", err);
      message.error("Login request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 76px)",
        width: "100%",
        backgroundImage: `url('${authBgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px 24px",
      }}
    >
      <div
        className="login-card-anim"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.95)", // Almost solid white
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
          padding: "48px 40px", 
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "36px" }}>
          <Link href="/" style={{ display: "flex", justifyContent: "center" }}>
            <Logo fontSize="28px" layout="horizontal" />
          </Link>
        </div>

          <Form layout="vertical" onFinish={onFinishLogin} requiredMark={false} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              style={{ margin: 0 }}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#888", marginRight: "12px", fontSize: "18px" }} />}
                placeholder="Email address"
                size="large"
                style={{
                  height: "54px",
                  borderRadius: "8px",
                  backgroundColor: "#f7f7f7",
                  border: "1px solid #eaeaea",
                  boxShadow: "none",
                  fontSize: "15px",
                  color: "#1a1a1a",
                }}
                className="premium-input"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password" }]}
              style={{ margin: 0 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#888", marginRight: "12px", fontSize: "18px" }} />}
                placeholder="Password"
                size="large"
                style={{
                  height: "54px",
                  borderRadius: "8px",
                  backgroundColor: "#f7f7f7",
                  border: "1px solid #eaeaea",
                  boxShadow: "none",
                  fontSize: "15px",
                  color: "#1a1a1a",
                }}
                className="premium-input"
              />
            </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="premium-btn"
            style={{
              height: "54px",
              marginTop: "8px",
              fontWeight: 500,
              fontSize: "16px",
              borderRadius: "8px",
              background: "#1a1a1a",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
              border: "none",
              color: "#fff",
            }}
          >
            Sign In
          </Button>
          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <Text style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.7)", fontWeight: 400 }}>
              New to Mieux?{" "}
              <Link
                href="/register"
                className="register-link"
                style={{
                  color: "#000",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Register here
              </Link>
            </Text>
          </div>
        </Form>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-card-anim {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .premium-btn {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .premium-btn:hover {
          background: #000 !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
          transform: translateY(-2px);
        }
        .premium-input input {
          transition: all 0.3s ease;
        }
        .premium-input input::placeholder {
          color: #888 !important;
        }
        .premium-input:focus-within {
          border-color: #000 !important;
          box-shadow: 0 0 0 1px #000 !important;
          background-color: #fff !important;
        }
        /* Anti browser autofill styling */
        .premium-input input:-webkit-autofill,
        .premium-input input:-webkit-autofill:hover, 
        .premium-input input:-webkit-autofill:focus, 
        .premium-input input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: #1a1a1a !important;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: inset 0 0 20px 20px #f7f7f7 !important;
        }
        /* Underline animation for register link */
        .register-link {
          position: relative;
          display: inline-block;
        }
        .register-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1.5px;
          bottom: -2px;
          left: 0;
          background-color: #000;
          transform-origin: bottom right;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .register-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>
    </div>
  );
}
