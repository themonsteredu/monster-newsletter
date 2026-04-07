"use client";

import { useState } from "react";

const TABS = [
  { id: "basic", label: "기본정보" },
  { id: "news1", label: "소식 1" },
  { id: "news2", label: "소식 2" },
  { id: "news3", label: "소식 3" },
  { id: "schedule", label: "일정" },
  { id: "edu", label: "교육정보" },
];

const DEFAULT_DATA = {
  basic: {
    academyName: "더몬스터학원",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    subtitle: "월간 소식지",
    greeting: "학부모님, 학생 여러분 안녕하세요!",
  },
  news1: { title: "학원 소식 1", content: "", image: "" },
  news2: { title: "학원 소식 2", content: "", image: "" },
  news3: { title: "학원 소식 3", content: "", image: "" },
  schedule: { events: [{ date: "", description: "" }] },
  edu: { title: "교육 정보", content: "" },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("basic");
  const [data, setData] = useState(DEFAULT_DATA);

  const updateField = (tab, field, value) => {
    setData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [field]: value },
    }));
  };

  const addScheduleEvent = () => {
    setData((prev) => ({
      ...prev,
      schedule: {
        events: [...prev.schedule.events, { date: "", description: "" }],
      },
    }));
  };

  const updateScheduleEvent = (index, field, value) => {
    setData((prev) => {
      const events = [...prev.schedule.events];
      events[index] = { ...events[index], [field]: value };
      return { ...prev, schedule: { events } };
    });
  };

  const removeScheduleEvent = (index) => {
    setData((prev) => ({
      ...prev,
      schedule: {
        events: prev.schedule.events.filter((_, i) => i !== index),
      },
    }));
  };

  const openPreview = (format) => {
    const previewWindow = window.open("", "_blank");
    const html = generatePreviewHTML(format, data);
    previewWindow.document.write(html);
    previewWindow.document.close();
  };

  return (
    <div style={st.container}>
      <header style={st.header}>
        <h1 style={st.headerTitle}>더몬스터학원 월간 소식지 생성기</h1>
        <p style={st.headerSub}>매월 학원 소식지를 간편하게 만들어보세요</p>
      </header>

      <div style={st.main}>
        <nav style={st.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...st.tab,
                ...(activeTab === tab.id ? st.tabActive : {}),
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={st.formArea}>
          {activeTab === "basic" && (
            <BasicForm data={data.basic} onChange={(f, v) => updateField("basic", f, v)} />
          )}
          {activeTab === "news1" && (
            <NewsForm data={data.news1} onChange={(f, v) => updateField("news1", f, v)} />
          )}
          {activeTab === "news2" && (
            <NewsForm data={data.news2} onChange={(f, v) => updateField("news2", f, v)} />
          )}
          {activeTab === "news3" && (
            <NewsForm data={data.news3} onChange={(f, v) => updateField("news3", f, v)} />
          )}
          {activeTab === "schedule" && (
            <ScheduleForm
              events={data.schedule.events}
              onAdd={addScheduleEvent}
              onUpdate={updateScheduleEvent}
              onRemove={removeScheduleEvent}
            />
          )}
          {activeTab === "edu" && (
            <EduForm data={data.edu} onChange={(f, v) => updateField("edu", f, v)} />
          )}
        </div>

        <div style={st.exportSection}>
          <h2 style={st.exportTitle}>미리보기 & 다운로드</h2>
          <div style={st.exportButtons}>
            <button style={st.btnA4} onClick={() => openPreview("a4")}>
              A4 PDF용 미리보기
            </button>
            <button style={st.btnKakao} onClick={() => openPreview("kakao")}>
              카카오톡 카드뉴스 (720x1080)
            </button>
            <button style={st.btnDanggeun} onClick={() => openPreview("danggeun")}>
              당근마켓 (1080x1080)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicForm({ data, onChange }) {
  return (
    <div>
      <h2 style={st.formTitle}>기본 정보</h2>
      <label style={st.label}>학원명</label>
      <input style={st.input} value={data.academyName} onChange={(e) => onChange("academyName", e.target.value)} />
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={st.label}>연도</label>
          <input style={st.input} type="number" value={data.year} onChange={(e) => onChange("year", e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={st.label}>월</label>
          <input style={st.input} type="number" min="1" max="12" value={data.month} onChange={(e) => onChange("month", e.target.value)} />
        </div>
      </div>
      <label style={st.label}>부제목</label>
      <input style={st.input} value={data.subtitle} onChange={(e) => onChange("subtitle", e.target.value)} />
      <label style={st.label}>인사말</label>
      <textarea style={st.textarea} value={data.greeting} onChange={(e) => onChange("greeting", e.target.value)} />
    </div>
  );
}

function NewsForm({ data, onChange }) {
  return (
    <div>
      <h2 style={st.formTitle}>소식</h2>
      <label style={st.label}>제목</label>
      <input style={st.input} value={data.title} onChange={(e) => onChange("title", e.target.value)} />
      <label style={st.label}>내용</label>
      <textarea style={{ ...st.textarea, minHeight: 200 }} value={data.content} onChange={(e) => onChange("content", e.target.value)} />
      <label style={st.label}>이미지 URL (선택)</label>
      <input style={st.input} value={data.image} placeholder="https://..." onChange={(e) => onChange("image", e.target.value)} />
    </div>
  );
}

function ScheduleForm({ events, onAdd, onUpdate, onRemove }) {
  return (
    <div>
      <h2 style={st.formTitle}>이달의 일정</h2>
      {events.map((event, i) => (
        <div key={i} style={st.scheduleRow}>
          <input
            style={{ ...st.input, flex: "0 0 140px" }}
            type="date"
            value={event.date}
            onChange={(e) => onUpdate(i, "date", e.target.value)}
          />
          <input
            style={{ ...st.input, flex: 1 }}
            placeholder="일정 내용"
            value={event.description}
            onChange={(e) => onUpdate(i, "description", e.target.value)}
          />
          <button style={st.btnRemove} onClick={() => onRemove(i)}>✕</button>
        </div>
      ))}
      <button style={st.btnAdd} onClick={onAdd}>+ 일정 추가</button>
    </div>
  );
}

function EduForm({ data, onChange }) {
  return (
    <div>
      <h2 style={st.formTitle}>교육 정보</h2>
      <label style={st.label}>제목</label>
      <input style={st.input} value={data.title} onChange={(e) => onChange("title", e.target.value)} />
      <label style={st.label}>내용</label>
      <textarea style={{ ...st.textarea, minHeight: 200 }} value={data.content} onChange={(e) => onChange("content", e.target.value)} />
    </div>
  );
}

function generatePreviewHTML(format, data) {
  const { basic, news1, news2, news3, schedule, edu } = data;
  const monthStr = `${basic.year}년 ${basic.month}월`;

  const dimensions = {
    a4: { width: 794, height: 1123 },
    kakao: { width: 720, height: 1080 },
    danggeun: { width: 1080, height: 1080 },
  };

  const dim = dimensions[format];

  const scheduleHTML = schedule.events
    .filter((e) => e.date || e.description)
    .map((e) => {
      const dateStr = e.date ? new Date(e.date + "T00:00:00").toLocaleDateString("ko-KR", { month: "long", day: "numeric" }) : "";
      return `<tr><td style="padding:6px 12px;font-weight:bold;color:#e8630a;white-space:nowrap;border-bottom:1px solid #eee;">${dateStr}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${e.description}</td></tr>`;
    })
    .join("");

  const newsSection = (news) => {
    if (!news.content) return "";
    const imgHTML = news.image ? `<img src="${encodeURI(news.image)}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;margin-bottom:8px;" />` : "";
    return `
      <div style="margin-bottom:16px;">
        <h3 style="color:#1a1a5e;font-size:${format === "a4" ? "16px" : "14px"};border-left:4px solid #e8630a;padding-left:8px;margin-bottom:8px;">${escapeHTML(news.title)}</h3>
        ${imgHTML}
        <p style="font-size:${format === "a4" ? "13px" : "11px"};line-height:1.7;color:#333;">${escapeHTML(news.content).replace(/\n/g, "<br/>")}</p>
      </div>
    `;
  };

  const isCompact = format !== "a4";

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<title>${escapeHTML(basic.academyName)} ${monthStr} 소식지</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700;900&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { display:flex; justify-content:center; align-items:flex-start; min-height:100vh; background:#888; padding:20px; font-family:'Noto Sans KR',sans-serif; }
  @media print { body { background:white; padding:0; } .no-print { display:none!important; } }
</style>
</head>
<body>
<div class="no-print" style="position:fixed;top:10px;right:10px;z-index:100;">
  <button onclick="window.print()" style="padding:10px 24px;background:#1a1a5e;color:white;border:none;border-radius:6px;font-size:14px;cursor:pointer;font-family:'Noto Sans KR',sans-serif;">PDF 다운로드 (인쇄)</button>
</div>

<div style="width:${dim.width}px;${format !== "a4" ? `height:${dim.height}px;` : ""}background:white;box-shadow:0 4px 24px rgba(0,0,0,0.2);overflow:hidden;position:relative;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#1a1a5e 0%,#2d2d7a 100%);color:white;padding:${isCompact ? "20px" : "32px"};position:relative;overflow:hidden;">
    <div style="position:absolute;top:-20px;right:-20px;width:120px;height:120px;background:rgba(232,99,10,0.15);border-radius:50%;"></div>
    <div style="position:absolute;bottom:-30px;left:40%;width:80px;height:80px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div>
        <h1 style="font-family:'Noto Serif KR',serif;font-size:${isCompact ? "22px" : "32px"};font-weight:900;letter-spacing:-1px;">${escapeHTML(basic.academyName)}</h1>
        <p style="font-size:${isCompact ? "12px" : "14px"};opacity:0.8;margin-top:4px;">${escapeHTML(basic.subtitle)}</p>
      </div>
      <div style="text-align:right;">
        <div style="background:#e8630a;color:white;padding:${isCompact ? "6px 14px" : "8px 20px"};border-radius:20px;font-weight:700;font-size:${isCompact ? "14px" : "18px"};">${monthStr}</div>
      </div>
    </div>
    ${basic.greeting ? `<p style="margin-top:${isCompact ? "10px" : "16px"};font-size:${isCompact ? "11px" : "13px"};line-height:1.6;opacity:0.9;">${escapeHTML(basic.greeting)}</p>` : ""}
  </div>

  <!-- Content -->
  <div style="padding:${isCompact ? "16px" : "24px"};">
    ${format === "a4" ? `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <div>
          ${newsSection(news1)}
          ${newsSection(news2)}
        </div>
        <div>
          ${newsSection(news3)}
          ${schedule.events.some(e => e.date || e.description) ? `
            <div style="margin-bottom:16px;">
              <h3 style="color:#1a1a5e;font-size:16px;border-left:4px solid #e8630a;padding-left:8px;margin-bottom:10px;">이달의 일정</h3>
              <table style="width:100%;font-size:12px;border-collapse:collapse;">${scheduleHTML}</table>
            </div>
          ` : ""}
          ${edu.content ? `
            <div style="background:#f8f6f0;padding:14px;border-radius:8px;border:1px solid #e8e4d8;">
              <h3 style="color:#1a1a5e;font-size:15px;margin-bottom:8px;">${escapeHTML(edu.title)}</h3>
              <p style="font-size:12px;line-height:1.7;color:#444;">${escapeHTML(edu.content).replace(/\n/g, "<br/>")}</p>
            </div>
          ` : ""}
        </div>
      </div>
    ` : `
      ${newsSection(news1)}
      ${newsSection(news2)}
      ${newsSection(news3)}
      ${schedule.events.some(e => e.date || e.description) ? `
        <div style="margin-bottom:12px;">
          <h3 style="color:#1a1a5e;font-size:13px;border-left:4px solid #e8630a;padding-left:8px;margin-bottom:8px;">이달의 일정</h3>
          <table style="width:100%;font-size:11px;border-collapse:collapse;">${scheduleHTML}</table>
        </div>
      ` : ""}
      ${edu.content ? `
        <div style="background:#f8f6f0;padding:12px;border-radius:8px;border:1px solid #e8e4d8;">
          <h3 style="color:#1a1a5e;font-size:12px;margin-bottom:6px;">${escapeHTML(edu.title)}</h3>
          <p style="font-size:11px;line-height:1.6;color:#444;">${escapeHTML(edu.content).replace(/\n/g, "<br/>")}</p>
        </div>
      ` : ""}
    `}
  </div>

  <!-- Footer -->
  <div style="position:${format !== "a4" ? "absolute" : "relative"};bottom:0;left:0;right:0;background:#1a1a5e;color:white;text-align:center;padding:${isCompact ? "10px" : "14px"};font-size:${isCompact ? "10px" : "11px"};opacity:0.9;">
    ${escapeHTML(basic.academyName)} | ${monthStr} 소식지
  </div>
</div>
</body>
</html>`;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const st = {
  container: {
    minHeight: "100vh",
    background: "#f0f2f5",
  },
  header: {
    background: "linear-gradient(135deg, #1a1a5e 0%, #2d2d7a 100%)",
    color: "white",
    padding: "32px 24px",
    textAlign: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: -1,
  },
  headerSub: {
    marginTop: 8,
    opacity: 0.8,
    fontSize: 14,
  },
  main: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "24px 16px",
  },
  tabs: {
    display: "flex",
    gap: 4,
    marginBottom: 20,
    overflowX: "auto",
    background: "white",
    borderRadius: 12,
    padding: 4,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  tab: {
    flex: 1,
    padding: "10px 16px",
    border: "none",
    borderRadius: 8,
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    color: "#666",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  tabActive: {
    background: "#1a1a5e",
    color: "white",
  },
  formArea: {
    background: "white",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1a1a5e",
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#555",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px 14px",
    border: "2px solid #e0e0e0",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  },
  textarea: {
    display: "block",
    width: "100%",
    padding: "10px 14px",
    border: "2px solid #e0e0e0",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    minHeight: 100,
    resize: "vertical",
    fontFamily: "inherit",
    lineHeight: 1.6,
  },
  scheduleRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  btnRemove: {
    width: 32,
    height: 32,
    border: "none",
    borderRadius: 6,
    background: "#fee",
    color: "#c00",
    fontSize: 14,
    cursor: "pointer",
  },
  btnAdd: {
    marginTop: 8,
    padding: "8px 20px",
    border: "2px dashed #ccc",
    borderRadius: 8,
    background: "transparent",
    color: "#888",
    fontSize: 13,
    cursor: "pointer",
    width: "100%",
  },
  exportSection: {
    background: "white",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  exportTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1a1a5e",
    marginBottom: 16,
  },
  exportButtons: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  btnA4: {
    flex: 1,
    padding: "14px 20px",
    border: "none",
    borderRadius: 8,
    background: "#1a1a5e",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    minWidth: 200,
  },
  btnKakao: {
    flex: 1,
    padding: "14px 20px",
    border: "none",
    borderRadius: 8,
    background: "#e8630a",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    minWidth: 200,
  },
  btnDanggeun: {
    flex: 1,
    padding: "14px 20px",
    border: "none",
    borderRadius: 8,
    background: "#ff6f0f",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    minWidth: 200,
  },
};
