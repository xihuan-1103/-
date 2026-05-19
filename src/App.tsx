import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Target, 
  Zap, 
  BarChart3, 
  Map as MapIcon, 
  Layers, 
  Cpu, 
  TrendingUp, 
  ExternalLink,
  ChevronDown,
  Calendar,
  CheckCircle2,
  Rocket,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { REPORT_DATA } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('vision');
  const [selectedStage, setSelectedStage] = useState<typeof REPORT_DATA.vision.stages[0] | null>(null);

  // Intersection observer to update active tab on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    REPORT_DATA.menu.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const highlightText = (text: string, highlights: string[]) => {
    let parts = [text];
    highlights.forEach(h => {
      const newParts: string[] = [];
      parts.forEach(p => {
        const split = p.split(h);
        for (let i = 0; i < split.length; i++) {
          newParts.push(split[i]);
          if (i < split.length - 1) newParts.push(`<span class="text-red-600 font-bold underline decoration-red-200 underline-offset-4">${h}</span>`);
        }
      });
      parts = newParts;
    });
    return <span dangerouslySetInnerHTML={{ __html: parts.join('') }} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Modals for Vision Stages */}
      <AnimatePresence>
        {selectedStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedStage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full p-10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedStage(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green shadow-sm">
                  {selectedStage.id === 1 ? <Zap className="w-8 h-8" /> : selectedStage.id === 2 ? <Cpu className="w-8 h-8" /> : <Rocket className="w-8 h-8" />}
                </div>
                <div>
                  <div className="text-brand-green font-mono text-sm tracking-widest uppercase mb-1">Stage 0{selectedStage.id}</div>
                  <h3 className="text-3xl font-black text-slate-900">{selectedStage.name}</h3>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-brand-light rounded-2xl border-l-[6px] border-brand-green">
                  <h4 className="text-sm font-black text-brand-dark uppercase tracking-wider mb-2">战略目标</h4>
                  <p className="text-xl font-bold text-brand-dark leading-relaxed">
                    {selectedStage.goal}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider">行动计划</h4>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {highlightText(selectedStage.action, [selectedStage.highlight, selectedStage.highlight2])}
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedStage(null)}
                  className="px-8 py-3 bg-brand-green text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  确 认
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-green rounded flex items-center justify-center">
              <Layers className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-brand-dark">{REPORT_DATA.title}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {REPORT_DATA.menu.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-colors hover:text-brand-green ${
                  activeTab === item.id ? 'text-brand-green' : 'text-slate-600'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-brand-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-300 rounded-full blur-3xl" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center space-y-6 px-6"
        >
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium tracking-widest mb-4">
            {REPORT_DATA.date}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {REPORT_DATA.title}
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto font-light">
            打造智联·绿色·高效的基础设施养护新生态
          </p>
          <div className="pt-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#vision"
              className="px-8 py-3 bg-white text-brand-green font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto w-fit"
            >
              开始汇报 <ChevronDown className="w-5 h-5 animate-bounce" />
            </motion.a>
          </div>
        </motion.div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-60">
          <span className="text-sm font-medium tracking-widest">{REPORT_DATA.company}</span>
        </div>
      </section>

      {/* Directory Section (Anchor Based) */}
      <section className="py-12 bg-white flex justify-center border-b border-slate-100">
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 px-6">
          {REPORT_DATA.menu.map((item, idx) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              whileHover={{ y: -2 }}
              className="group flex items-center gap-3"
            >
              <span className="text-brand-green font-black opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
              <span className="text-slate-900 font-bold hover:text-brand-green transition-colors">{item.label}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* 1. Vision Section */}
      <section id="vision" className="py-24 px-6 max-w-7xl mx-auto space-y-16 scroll-mt-16">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-brand-green/10 text-brand-green rounded-full font-bold text-sm tracking-widest mb-2">
            愿景
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            {highlightText(REPORT_DATA.vision.title, ["养护数字化", "数智养护产业化"])}
          </h2>
        </div>

        {/* Compact Stages Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {REPORT_DATA.vision.stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedStage(stage)}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full hover:border-brand-green/40 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors shrink-0">
                  {index === 0 ? <Zap className="w-6 h-6" /> : index === 1 ? <Cpu className="w-6 h-6" /> : <Rocket className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{stage.name}</h3>
              </div>
              <div className="space-y-4 flex-1">
                <p className="text-sm font-bold text-brand-green">目标：{stage.goal}</p>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                  行动：{highlightText(stage.action, [stage.highlight, stage.highlight2])}
                </p>
                <div className="pt-4 flex items-center text-xs font-bold text-slate-400 group-hover:text-brand-green transition-colors uppercase tracking-widest">
                  点击查看详情 <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Change Card with Staircase Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="flex flex-col items-end space-y-2">
                <div className="w-[85%] bg-emerald-500 text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition-transform font-bold text-center">
                   精细化专项场景模型
                </div>
                <div className="w-[75%] bg-brand-green text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition-transform font-bold text-center mr-8">
                   挖掘数据资产潜在价值
                </div>
                <div className="w-[65%] bg-brand-dark text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition-transform font-bold text-center mr-16">
                   建强业务平台夯实数据基础
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-1 bg-brand-green rounded-full" />
                <span className="text-brand-green font-bold tracking-widest uppercase text-xs">Strategic Evolution</span>
              </div>
              <h4 className="text-3xl font-black text-slate-900 tracking-tight">整体规划的转变</h4>
              <div className="space-y-4">
                <p className="text-slate-600 text-xl leading-relaxed">
                  {highlightText(REPORT_DATA.vision.change.text, REPORT_DATA.vision.change.highlights)}
                </p>
                <p className="text-slate-500 text-base leading-relaxed border-l-4 border-brand-green/20 pl-6 bg-slate-50 p-6 rounded-r-2xl italic">
                  {REPORT_DATA.vision.change.subText}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Architecture Section */}
      <section id="architecture" className="py-24 bg-slate-100 scroll-mt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-1 bg-brand-green/10 text-brand-green rounded-full font-bold text-sm tracking-widest mb-2">
               体系
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              {highlightText(REPORT_DATA.architecture.title, ["114N+AI"])}
            </h2>
          </div>

          {/* Centralized AI Architecture Layout */}
          <div className="relative max-w-5xl mx-auto">
            {/* Background Connecting Lines (Desktop) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none hidden md:flex">
               <div className="w-full h-px bg-brand-green" />
               <div className="h-full w-px bg-brand-green absolute" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-x-24 md:gap-y-12 relative z-10">
              {REPORT_DATA.architecture.components.map((comp, idx) => (
                <motion.div
                  key={comp.id}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white p-8 rounded-3xl shadow-md border border-slate-200 ${
                    idx === 0 ? 'md:rounded-br-[3rem]' : 
                    idx === 1 ? 'md:rounded-bl-[3rem]' : 
                    idx === 2 ? 'md:rounded-tr-[3rem]' : 
                    'md:rounded-tl-[3rem]'
                  }`}
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-brand-green">0{idx+1}</span>
                    {comp.title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-medium">
                    {highlightText(comp.content, comp.highlights || [])}
                  </p>
                </motion.div>
              ))}
              
            <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                 <motion.div 
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1.1 }}
                    className="w-40 h-40 bg-brand-green rounded-full border-8 border-white shadow-2xl flex flex-col items-center justify-center text-white pointer-events-auto"
                 >
                    <Cpu className="w-10 h-10 mb-1" />
                    <span className="text-lg font-black tracking-widest">AI 赋能</span>
                 </motion.div>
              </div>
            </div>

            {/* Mobile AI display */}
            <div className="md:hidden flex flex-col items-center gap-4 mt-8">
               <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white shadow-lg">
                  <Cpu className="w-12 h-12" />
               </div>
               <p className="text-brand-green font-black text-lg">AI 赋能</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-16 flex justify-center"
          >
            <motion.a
              href="https://docs.qq.com/document/DTmNUZ2dmU05FWndT"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-6 bg-brand-green text-white rounded-3xl shadow-xl hover:shadow-brand-green/40 transition-all flex items-center gap-6 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <ExternalLink className="w-8 h-8" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Architecture Blueprint</div>
                <div className="text-2xl font-black">点击查看总体架构图</div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 3. Action Plan - Compact Grid */}
      <section id="action-plan" className="py-24 max-w-7xl mx-auto px-6 scroll-mt-16 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-brand-green/10 text-brand-green rounded-full font-bold text-sm tracking-widest mb-2">
            路径
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">三年行动安排</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REPORT_DATA.actionPlan.map((plan, index) => (
            <motion.div 
              key={plan.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col"
            >
              <div className="bg-brand-green p-6 text-white text-center">
                 <div className="text-4xl font-black mb-1">{plan.year}</div>
                 <div className="text-md font-bold opacity-90">{plan.tagline}</div>
              </div>

              <div className="p-6 space-y-6 flex-1 flex flex-col">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-brand-green" /> 战略定位
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed h-16 overflow-hidden">
                    {plan.position}
                  </p>
                </div>

                <div className="space-y-3 flex-1">
                   <h4 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-brand-green" /> 关键成果
                  </h4>
                  <div className="space-y-2 text-xs">
                    {plan.achievements.map((ach) => (
                      <div key={ach.label} className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="font-bold block text-slate-700">{ach.label}</span>
                        <span className="text-[10px] text-slate-400">{ach.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2026 Details Redesign - High Contrast Light Theme */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl border-2 border-brand-green/5 relative overflow-hidden mt-16"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-green">
            <Rocket className="w-48 h-48" />
          </div>
          <div className="relative z-10 space-y-12">
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-black text-brand-dark">2026年 “数智养护” 我们准备这样干！</h3>
              <p className="text-slate-400 font-mono tracking-widest uppercase">Target & Execution Phase I</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8 bg-slate-50 p-8 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-green">
                     <Layers className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">{highlightText("(一) 养护管理平台建设", ["养护管理平台"])}</h4>
                </div>
                <div className="space-y-4">
                  {REPORT_DATA.year2026.platform.map((p, i) => (
                    <div key={i} className="flex gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      <div className="w-1 bg-brand-green rounded-full h-full" />
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {highlightText(p, ["7月份", "11月份", "业务闭环", "产值"])}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-brand-light p-8 rounded-3xl border border-emerald-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-green">
                       <Cpu className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-dark">AI赋能与排班</h4>
                  </div>
                  <p className="text-brand-dark/70 font-medium mb-4">{REPORT_DATA.year2026.ai}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                       <MapIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">专业场景平台</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {REPORT_DATA.year2026.scenes.map((s, i) => (
                      <div key={i} className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 hover:border-brand-green transition-colors">
                        {highlightText(s, ["6月份", "7月份", "12月份", "路桥隧坡", "沥青拌合站", "无人机"])}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. Outlook Section - Clean Neutral Theme */}
      <section id="outlook" className="py-24 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {/* Key Results */}
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">三个关键成果</h2>
              <div className="flex justify-center h-2 w-24 bg-brand-green mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {REPORT_DATA.keyResults.map((result, idx) => (
                <motion.div 
                  key={result.title}
                  whileHover={{ y: -8 }}
                  className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 relative group overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-green/5 rounded-full" />
                  <h3 className="text-2xl font-black text-brand-dark mb-8 tracking-tight">{result.title}</h3>
                  <div className="space-y-6 relative z-10">
                    {result.points?.map(p => (
                      <div key={p} className="text-slate-600 text-sm leading-relaxed border-l-2 border-brand-green/20 pl-4">
                        {highlightText(p, ["业务主线闭环", "成本主线闭环", "业务贯通", "数据流通", "系统打通"])}
                      </div>
                    ))}
                    {result.items?.map(item => (
                      <div key={item} className="flex items-center gap-3 font-bold text-brand-dark bg-brand-light p-4 rounded-2xl border border-emerald-100 shadow-sm group-hover:bg-brand-green group-hover:text-white transition-all">
                        <div className="w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center text-brand-green">
                          <Cpu className="w-4 h-4" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Outlook Cards - Neutral Style */}
          <div className="space-y-12">
             <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">未来展望</h2>
                <p className="text-slate-400 uppercase tracking-[0.4em] text-xs font-bold">Future Strategic Prospects</p>
             </div>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REPORT_DATA.outlook.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-white text-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-between group hover:border-brand-green transition-all"
                  >
                    <div>
                      <div className="text-brand-green font-black text-2xl mb-6">0{item.id}</div>
                      <h4 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-brand-green transition-colors">
                        {highlightText(item.title, ["数字化", "数智养护产业化", "AI", "施工养护"])}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                        {highlightText(item.content, item.highlight || [])}
                      </p>
                    </div>
                    <div className="pt-6 border-t border-slate-50 flex items-center justify-end">
                       <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-brand-green transition-all" />
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Footer - Redesigned with brand green and vertical slogans */}
      <footer className="bg-brand-green py-24 px-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[160px] opacity-10" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex flex-col gap-12 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold tracking-[0.5em]"
            >
              道筑至诚 徳贯八方
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black tracking-[0.8em] py-4 border-y border-white/10"
            >
              数智养护 共创未来
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold tracking-[0.5em]"
            >
              浙江交工
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
