"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Tabs, Card, Row, Col, Typography } from "antd";
import MediaCardSlider from "@/components/public/MediaCardSlider";

const { Title, Paragraph, Text } = Typography;

interface ProjectsClientProps {
  initialProjects: any[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState<any[]>(initialProjects);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeTab));
    }
  }, [activeTab, projects]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabs = [
    { key: "all", label: "All Projects" },
    { key: "residential", label: "Residential" },
    { key: "commercial", label: "Commercial" },
    { key: "interior", label: "Custom Interiors" },
  ];

  return (
    <div style={{ backgroundColor: "var(--bg-warm)", minHeight: "100vh" }}>
      {/* Page Header */}
      <section
        style={{
          backgroundColor: "#2b2621",
          color: "#ffffff",
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontSize: "12px",
              color: "var(--primary-color)",
              fontWeight: 600,
              display: "block",
              marginBottom: "8px",
            }}
          >
            Our Work
          </span>
          <Title level={1} style={{ color: "#ffffff", fontSize: "40px", margin: 0 }} className="font-serif">
            Design Portfolio
          </Title>
          <Paragraph style={{ color: "#d8cfc0", fontSize: "16px", marginTop: "16px", lineHeight: "1.6" }}>
            Explore our architectural commissions and interior design assignments completed across Kallachi and Kozhikode.
          </Paragraph>
        </div>
      </section>

      {/* Tabs Filter & Grid */}
      <section style={{ padding: "60px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <Tabs
          defaultActiveKey="all"
          onChange={handleTabChange}
          centered
          size="large"
          items={tabs.map((t) => ({ key: t.key, label: t.label }))}
          style={{ marginBottom: "48px" }}
        />

        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              No projects found in this category.
            </Text>
          </div>
        ) : (
          <Row gutter={[24, 32]}>
            {filteredProjects.map((project) => (
              <Col xs={24} sm={12} md={8} key={project._id}>
                <Link href={`/projects/${project.slug}`}>
                  <Card
                    hoverable
                    className="premium-card"
                    cover={
                      <MediaCardSlider
                        media={project.media}
                        coverImage={project.coverImage}
                        height="280px"
                      />
                    }
                    styles={{ body: { padding: "24px" } }}
                  >
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {project.category}
                    </span>
                    <Title level={3} className="font-serif" style={{ fontSize: "22px", margin: "8px 0" }}>
                      {project.title}
                    </Title>
                    <Text type="secondary" style={{ display: "block", marginBottom: "12px" }}>
                      {project.location}
                    </Text>
                    <Paragraph type="secondary" style={{ fontSize: "14px", margin: 0, lineHeight: "1.6" }}>
                      {project.shortDescription}
                    </Paragraph>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </div>
  );
}
