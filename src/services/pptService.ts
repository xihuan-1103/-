import pptxgen from "pptxgenjs";
import { REPORT_DATA } from "../constants";

export async function generatePPT() {
  const ppt = new pptxgen();
  ppt.layout = "LAYOUT_WIDE";

  const BRAND_GREEN = "00703C";
  const BRAND_DARK = "004D29";
  const BRAND_LIGHT = "F0F9F4";
  const TEXT_SLATE = "334155";
  const TEXT_BLACK = "0F172A";

  // Slide 1: Cover
  const coverSlide = ppt.addSlide();
  coverSlide.background = { color: BRAND_GREEN };
  coverSlide.addText(REPORT_DATA.title, {
    x: 1,
    y: 2,
    w: "80%",
    fontSize: 44,
    bold: true,
    color: "FFFFFF",
    align: "center",
  });
  coverSlide.addText(REPORT_DATA.company, {
    x: 1,
    y: 3.5,
    w: "80%",
    fontSize: 24,
    color: "E0F2F1",
    align: "center",
  });
  coverSlide.addText(REPORT_DATA.date, {
    x: 1,
    y: 5.5,
    w: "80%",
    fontSize: 14,
    color: "FFFFFF",
    align: "center",
  });

  // Slide 2: Directory
  const dirSlide = ppt.addSlide();
  dirSlide.addText("目录 / Directory", {
    x: 0.5,
    y: 0.5,
    fontSize: 28,
    bold: true,
    color: BRAND_GREEN,
  });
  REPORT_DATA.menu.forEach((item, idx) => {
    dirSlide.addText(item.label, {
      x: 1,
      y: 1.5 + idx * 0.8,
      fontSize: 20,
      color: TEXT_BLACK,
      bold: true,
    });
  });

  // Slide 3: Vision Stages
  const visionSlide = ppt.addSlide();
  visionSlide.addText("一、愿景: 从“养护数字化”到“数智养护产业化”", {
    x: 0.5,
    y: 0.3,
    w: "90%",
    fontSize: 24,
    bold: true,
    color: BRAND_GREEN,
  });

  REPORT_DATA.vision.stages.forEach((stage, idx) => {
    const xPos = 0.5 + idx * 3;
    const yPos = 1.2 + idx * 1.2;
    visionSlide.addShape(ppt.ShapeType.rect, {
      x: xPos,
      y: yPos,
      w: 2.8,
      h: 2.5,
      fill: { color: "FFFFFF" },
      line: { color: BRAND_GREEN, width: 1 },
    });
    visionSlide.addText(stage.name, {
      x: xPos + 0.1,
      y: yPos + 0.2,
      w: 2.6,
      fontSize: 16,
      bold: true,
      color: BRAND_DARK,
    });
    visionSlide.addText(`目标：${stage.goal}`, {
      x: xPos + 0.1,
      y: yPos + 0.6,
      w: 2.6,
      fontSize: 11,
      color: TEXT_SLATE,
    });
    visionSlide.addText(`行动：${stage.action.substring(0, 80)}...`, {
      x: xPos + 0.1,
      y: yPos + 1.2,
      w: 2.6,
      fontSize: 10,
      color: TEXT_SLATE,
    });
  });

  // Slide 4: Change
  const changeSlide = ppt.addSlide();
  changeSlide.addText("整体规划的转变", { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: BRAND_GREEN });
  changeSlide.addShape(ppt.ShapeType.rect, {
    x: 0.5,
    y: 1.5,
    w: "90%",
    h: 3,
    fill: { color: BRAND_LIGHT },
    line: { color: BRAND_GREEN, width: 1 },
  });
  changeSlide.addText(REPORT_DATA.vision.change.text, {
    x: 0.8,
    y: 2,
    w: "85%",
    fontSize: 18,
    color: TEXT_BLACK,
    align: "left",
  });

  // Slide 5: Architecture
  const archSlide = ppt.addSlide();
  archSlide.addText("二、总体架构: 打造“114N+AI”", { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: BRAND_GREEN });
  REPORT_DATA.architecture.components.forEach((comp, idx) => {
    const x = idx % 2 === 0 ? 0.5 : 5.2;
    const y = Math.floor(idx / 2) * 2.2 + 1.2;
    archSlide.addShape(ppt.ShapeType.rect, { x, y, w: 4.5, h: 2, fill: { color: "FFFFFF" }, line: { color: "E2E8F0" } });
    archSlide.addText(comp.title, { x: x + 0.2, y: y + 0.2, w: 4.1, fontSize: 14, bold: true, color: BRAND_DARK });
    archSlide.addText(comp.content, { x: x + 0.2, y: y + 0.6, w: 4.1, fontSize: 11, color: TEXT_SLATE });
  });

  // Slide 6: Action Plan Overview
  const timelineSlide = ppt.addSlide();
  timelineSlide.addText("三、三年行动安排", { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: BRAND_GREEN });
  REPORT_DATA.actionPlan.forEach((plan, idx) => {
    const y = 1.2 + idx * 1.8;
    timelineSlide.addText(plan.year, { x: 0.5, y, w: 1, fontSize: 36, bold: true, color: "E2E8F0" });
    timelineSlide.addText(plan.tagline, { x: 1.8, y: y + 0.2, w: 8, fontSize: 18, bold: true, color: BRAND_DARK });
    timelineSlide.addText(plan.position.substring(0, 100) + "...", { x: 1.8, y: y + 0.8, w: 7.5, fontSize: 10, color: TEXT_SLATE });
  });

  // Slide 7: 2026 Focus
  const p2026Slide = ppt.addSlide();
  p2026Slide.background = { color: BRAND_DARK };
  p2026Slide.addText("2026年 “数智养护” 我们准备这样干！", { x: 0.5, y: 0.5, w: "90%", fontSize: 28, bold: true, color: "FFFFFF" });
  p2026Slide.addText("1. 养护管理平台建设", { x: 0.5, y: 1.5, fontSize: 18, bold: true, color: "10B981" });
  REPORT_DATA.year2026.platform.forEach((p, i) => {
     p2026Slide.addText(`• ${p}`, { x: 0.7, y: 2 + i * 0.4, w: 4.5, fontSize: 10, color: "E0F2F1" });
  });
  p2026Slide.addText("2. AI排班智能体", { x: 5.5, y: 1.5, fontSize: 18, bold: true, color: "10B981" });
  p2026Slide.addText(REPORT_DATA.year2026.ai, { x: 5.7, y: 2, w: 4, fontSize: 10, color: "E0F2F1" });
  
  p2026Slide.addText("3. 专业场景平台", { x: 5.5, y: 3, fontSize: 18, bold: true, color: "10B981" });
  REPORT_DATA.year2026.scenes.forEach((s, i) => {
    p2026Slide.addText(`• ${s}`, { x: 5.7, y: 3.5 + i * 0.4, w: 4, fontSize: 9, color: "E0F2F1" });
  });

  // Slide 8: Key Results
  const krSlide = ppt.addSlide();
  krSlide.addText("三个关键成果", { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: BRAND_GREEN, align: "center" });
  REPORT_DATA.keyResults.forEach((res, idx) => {
    const x = 0.5 + idx * 3.1;
    krSlide.addShape(ppt.ShapeType.rect, { x, y: 1.5, w: 2.8, h: 4, fill: { color: "F8FAFC" }, line: { color: "E2E8F0" } });
    krSlide.addText(res.title, { x: x + 0.1, y: 1.7, w: 2.6, fontSize: 14, bold: true, color: BRAND_DARK });
    if (res.points) {
      res.points.forEach((p, i) => {
        krSlide.addText(`- ${p.substring(0, 60)}...`, { x: x + 0.1, y: 2.2 + i * 0.8, w: 2.6, fontSize: 9, color: TEXT_SLATE });
      });
    }
    if (res.items) {
      res.items.forEach((item, i) => {
        krSlide.addText(`√ ${item}`, { x: x + 0.1, y: 2.2 + i * 0.5, w: 2.6, fontSize: 10, bold: true, color: "DC2626" });
      });
    }
  });

  // Slide 9: Outlook
  const outlookSlide = ppt.addSlide();
  outlookSlide.addText("四、展望", { x: 0.5, y: 0.3, fontSize: 24, bold: true, color: BRAND_GREEN });
  REPORT_DATA.outlook.forEach((item, idx) => {
    const y = 0.8 + idx * 1.3;
    outlookSlide.addShape(ppt.ShapeType.rect, { x: 0.5, y, w: "90%", h: 1.1, fill: { color: "111827" }, line: { color: "374151" } });
    outlookSlide.addText(`0${item.id} ${item.title}`, { x: 0.7, y: y + 0.1, w: 8.5, fontSize: 14, bold: true, color: "34D399" });
    outlookSlide.addText(item.content, { x: 0.7, y: y + 0.5, w: 8.5, fontSize: 10, color: "9CA3AF" });
  });

  // Save
  ppt.writeFile({ fileName: `数智养护总体规划_${new Date().toISOString().split('T')[0]}.pptx` });
}
