"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, App as AntApp } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockOutlined, MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import Logo from "@/components/public/Logo";

const { Text } = Typography;

export default function RegisterClient({ authBgImage }: { authBgImage: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { message } = AntApp.useApp();

  const onFinishRegister = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        message.success("Registration successful! Welcome to Mieux Interiors.");
        // Redirect to homepage
        router.push("/");
        // Force refresh to update Navbar state
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        message.error(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Register page submit error:", err);
      message.error("Registration request failed.");
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

        <Form layout="vertical" onFinish={onFinishRegister} requiredMark={false} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your full name" }]}
            style={{ margin: 0 }}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#888", marginRight: "12px", fontSize: "18px" }} />}
              placeholder="Full Name"
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
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            style={{ margin: 0 }}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#888", marginRight: "12px", fontSize: "18px" }} />}
              placeholder="Email Address"
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
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number" },
              { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit phone number" }
            ]}
            style={{ margin: 0 }}
          >
            <Input
              prefix={<PhoneOutlined style={{ color: "#888", marginRight: "12px", fontSize: "18px" }} />}
              placeholder="Phone Number"
              size="large"
              maxLength={10}
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
            rules={[
              { required: true, message: "Please input your password" },
              { min: 6, message: "Password must be at least 6 characters" }
            ]}
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
            Sign Up
          </Button>

          <div style={{ textAlign: "center", marginTop: "4px" }}>
            <Text style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.7)", fontWeight: 400 }}>
              Already have an account?{" "}
              <Link
                href="/login"
                className="register-link"
                style={{
                  color: "#000",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Sign In here
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
        .premium-input input:-webkit-autofill,
        .premium-input input:-webkit-autofill:hover, 
        .premium-input input:-webkit-autofill:focus, 
        .premium-input input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: #1a1a1a !important;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: inset 0 0 20px 20px #f7f7f7 !important;
        }
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
