"use client";

import React from "react";
import { Row, Col, Space, Typography, Tag, Image, Button } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, CompassOutlined, BorderOutlined, AppstoreOutlined } from "@ant-design/icons";
import Link from "next/link";
import MediaCardSlider from "@/components/public/MediaCardSlider";
import { optimizeMediaUrl } from "@/lib/cloudinary-optimize";

const { Title, Paragraph, Text } = Typography;

interface ProjectDetailsClientProps {
  project: any;
}

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const mediaItems = project.media && project.media.length > 0
    ? project.media
    : project.gallery
      ? project.gallery.map((url: string) => ({ url, type: "image" as const }))
      : project.coverImage
        ? [{ url: project.coverImage, type: "image" as const }]
        : [];

  return (
    <div style={{ backgroundColor: "var(--bg-warm)", minHeight: "100vh", paddingBottom: "100px" }}>
      {/* Cover Banner */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          minHeight: "400px",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <MediaCardSlider media={project.media} coverImage={project.coverImage} height="60vh" width={1200} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, rgba(43, 38, 33, 0.2) 0%, rgba(43, 38, 33, 0.7) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            right: "40px",
            maxWidth: "1200px",
            margin: "0 auto",
            color: "#ffffff",
            zIndex: 2,
          }}
        >
          <Link href="/projects" style={{ color: "#eae4db", display: "inline-flex", alignItems: "center", marginBottom: "16px" }}>
            <ArrowLeftOutlined style={{ marginRight: "8px" }} /> Back to Portfolio
          </Link>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <Tag color="var(--primary-color)" style={{ textTransform: "uppercase", padding: "4px 8px" }}>
              {project.category}
            </Tag>
          </div>
          <Title level={1} style={{ color: "#ffffff", fontSize: "clamp(28px, 5vw, 48px)", margin: 0 }} className="font-serif">
            {project.title}
          </Title>
        </div>
      </section>

      {/* Details & Info */}
      <section style={{ maxWidth: "1200px", margin: "60px auto 0 auto", padding: "0 40px" }}>
        <Row gutter={[48, 48]}>
          <Col xs={24} lg={16}>
            <Title level={2} className="font-serif" style={{ fontSize: "28px", marginBottom: "24px" }}>
              Project Narrative
            </Title>
            <Paragraph style={{ fontSize: "16px", color: "var(--text-main)", lineHeight: "1.9" }}>
              {project.fullDescription}
            </Paragraph>

            {project.styleTags && project.styleTags.length > 0 && (
              <div style={{ marginTop: "40px" }}>
                <Title level={4} style={{ fontSize: "16px", marginBottom: "12px" }}>Style Tags</Title>
                <Space size={8} wrap>
                  {project.styleTags.map((tag: string, index: number) => (
                    <Tag key={index} style={{ border: "1px solid var(--border-color)", background: "#ffffff", color: "var(--text-main)" }}>
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}
          </Col>

          {/* Sidebar Info Grid */}
          <Col xs={24} lg={8}>
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "32px",
                boxShadow: "0 4px 15px rgba(138, 106, 74, 0.02)",
              }}
            >
              <Title level={3} className="font-serif" style={{ fontSize: "22px", marginBottom: "24px" }}>
                Specifications
              </Title>

              <Space direction="vertical" size={24} style={{ width: "100%" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <CompassOutlined style={{ fontSize: "20px", color: "var(--primary-color)" }} />
                  <div>
                    <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>LOCATION</Text>
                    <Text style={{ fontWeight: 500 }}>{project.location}</Text>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <AppstoreOutlined style={{ fontSize: "20px", color: "var(--primary-color)" }} />
                  <div>
                    <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>CATEGORY</Text>
                    <Text style={{ fontWeight: 500, textTransform: "capitalize" }}>{project.category}</Text>
                  </div>
                </div>

                {project.year && (
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <CalendarOutlined style={{ fontSize: "20px", color: "var(--primary-color)" }} />
                    <div>
                      <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>YEAR</Text>
                      <Text style={{ fontWeight: 500 }}>{project.year}</Text>
                    </div>
                  </div>
                )}

                {project.area && (
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <BorderOutlined style={{ fontSize: "20px", color: "var(--primary-color)" }} />
                    <div>
                      <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>PROJECT AREA</Text>
                      <Text style={{ fontWeight: 500 }}>{project.area}</Text>
                    </div>
                  </div>
                )}
              </Space>

              <Button type="primary" block href="/contact" style={{ marginTop: "32px", height: "45px" }}>
                Consult About This Project
              </Button>
            </div>
          </Col>
        </Row>
      </section>

      {/* Gallery Section */}
      {mediaItems.length > 0 && (
        <section style={{ maxWidth: "1200px", margin: "80px auto 0 auto", padding: "0 40px" }}>
          <Title level={2} className="font-serif" style={{ fontSize: "28px", marginBottom: "32px" }}>
            Photo Gallery
          </Title>

          <Image.PreviewGroup>
            <Row gutter={[20, 20]}>
              {mediaItems.map((item: any, index: number) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <div
                    style={{
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid var(--border-color)",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.02)",
                      height: "240px",
                      position: "relative",
                      backgroundColor: "#000",
                    }}
                  >
                    {item.type === "video" ? (
                      <video
                        src={optimizeMediaUrl(item.url, { width: 800, type: "video" })}
                        controls
                        style={{
                          width: "100%",
                          height: "240px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Image
                        src={optimizeMediaUrl(item.url, { width: 800, type: "image" })}
                        alt={`${project.title} Gallery ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "240px",
                          objectFit: "cover",
                          cursor: "zoom-in",
                        }}
                        wrapperStyle={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </Image.PreviewGroup>
        </section>
      )}
    </div>
  );
}
