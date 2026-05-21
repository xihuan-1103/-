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
  archSlide.addText("二、总体架构: 打造“11N+AI”", { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: BRAND_GREEN });
  
  // Render the 3 components + AI as a 2x2 grid
  const allPillars = [
    ...REPORT_DATA.architecture.components,
    { id: 'ai', title: 'AI赋能：智能驱动引擎', content: REPORT_DATA.architecture.ai }
  ];

  allPillars.forEach((comp, idx) => {
    const x = idx % 2 === 0 ? 0.5 : 5.2;
    const y = Math.floor(idx / 2) * 2.5 + 1.2;
    
    archSlide.addShape(ppt.ShapeType.rect, { 
      x, y, w: 4.5, h: 2.2, 
      fill: { color: "FFFFFF" }, 
      line: { color: "E2E8F0" } 
    });
    
    archSlide.addText(comp.title, { 
      x: x + 0.2, y: y + 0.2, w: 4.1, 
      fontSize: 13, bold: true, 
      color: BRAND_DARK 
    });
    
    // Manual highlighting logic for "以点连线、以线成面" in AI slide is complex in PPT, 
    // so we'll just keep the text clean for now or use basic color.
    archSlide.addText(comp.content.replace(/<[^>]*>/g, ''), { 
      x: x + 0.2, y: y + 0.7, w: 4.1, 
      fontSize: 10, 
      color: TEXT_SLATE 
    });
  });

  // Adding a central "Intelligence" label for cohesion
  archSlide.addShape(ppt.ShapeType.ellipse, { x: 4.6, y: 3.2, w: 1.0, h: 1.0, fill: { color: "FFFFFF" }, line: { color: BRAND_GREEN, width: 2 } });
  archSlide.addText("数智养护", { x: 4.6, y: 3.6, w: 1.0, fontSize: 11, bold: true, color: BRAND_GREEN, align: "center" });

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
  let p2026Slide = ppt.addSlide();
  p2026Slide.background = { color: BRAND_DARK };
  p2026Slide.addText("2026年 “数智养护” 我们准备这样干！", { x: 0.5, y: 0.5, w: "90%", fontSize: 24, bold: true, color: "FFFFFF" });
  
  let currentY = 1.2;
  REPORT_DATA.year2026.categories.forEach((cat, idx) => {
    if (currentY > 6.0) {
      p2026Slide = ppt.addSlide();
      p2026Slide.background = { color: BRAND_DARK };
      p2026Slide.addText("2026年 “数智养护” 续", { x: 0.5, y: 0.5, w: "90%", fontSize: 24, bold: true, color: "FFFFFF" });
      currentY = 1.2;
    }

    p2026Slide.addText(`${cat.title}`, { x: 0.5, y: currentY, fontSize: 16, bold: true, color: "10B981" });
    currentY += 0.4;
    
    // ... rest of logic for cat tasks/timeline/subCategories ...
    const categoryTasks = (cat as any).tasks;
    if (categoryTasks) {
      categoryTasks.forEach((task: any) => {
        if (currentY > 6.8) {
           p2026Slide = ppt.addSlide();
           p2026Slide.background = { color: BRAND_DARK };
           currentY = 0.5;
        }
        p2026Slide.addText(`• ${task.name} (${task.progress}%): ${task.timeline}`, { x: 0.7, y: currentY, w: 10, fontSize: 9, color: "E0F2F1" });
        currentY += 0.3;
      });
    }

    if (cat.timeline) {
      cat.timeline.forEach((item: any) => {
        if (currentY > 7.0) {
           p2026Slide = ppt.addSlide();
           p2026Slide.background = { color: BRAND_DARK };
           currentY = 0.5;
        }
        let text = `• ${item.month}：${item.goal} (${item.status === 'completed' ? '已完成' : '待办'})`;
        if (item.specialEvent) text += ` 【${item.specialEvent}】`;
        p2026Slide.addText(text, { x: 0.7, y: currentY, w: 10, fontSize: 9, color: "E0F2F1" });
        currentY += 0.3;
      });
    }
    
    if ((cat as any).subCategories) {
      (cat as any).subCategories.forEach((sub: any) => {
        if (currentY > 6.8) {
           p2026Slide = ppt.addSlide();
           p2026Slide.background = { color: BRAND_DARK };
           currentY = 0.5;
        }
        p2026Slide.addText(`  > ${sub.title}`, { x: 0.8, y: currentY, fontSize: 11, bold: true, color: "FFFFFF" });
        currentY += 0.3;
        sub.tasks.forEach(task => {
          if (currentY > 7.0) {
            p2026Slide = ppt.addSlide();
            p2026Slide.background = { color: BRAND_DARK };
            currentY = 0.5;
          }
          p2026Slide.addText(`    - ${task.name} (${task.progress}%): ${task.timeline}`, { x: 1.1, y: currentY, w: 9, fontSize: 8, color: "CFD8DC" });
          currentY += 0.25;
        });
      });
    }
    currentY += 0.3;
  });

  // Save
  ppt.writeFile({ fileName: `数智养护总体规划_${new Date().toISOString().split('T')[0]}.pptx` });
}
