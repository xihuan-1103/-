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
  ShieldCheck,
  Users,
  X,
  Factory
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { REPORT_DATA } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('vision');
  const [selectedStage, setSelectedStage] = useState<typeof REPORT_DATA.vision.stages[0] | null>(null);
  const [selectedAiStep, setSelectedAiStep] = useState<any>(null);
  const [selectedPlanYear, setSelectedPlanYear] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedPlatformDetail, setSelectedPlatformDetail] = useState<boolean>(false);
  const [active2026Tab, setActive2026Tab] = useState(REPORT_DATA.year2026.categories[0].id);
  const [showAiEvolution, setShowAiEvolution] = useState<boolean>(false);

  const handleAchievementClick = (label: string) => {
    // Match based on title keywords
    const category = REPORT_DATA.year2026.categories.find(c => 
      label.includes(c.title.substring(0, 4)) || 
      c.title.includes(label.substring(0, 4)) ||
      (label.includes('无人机') && c.id === 'drone') ||
      (label.includes('AI') && c.id === 'ai') ||
      (label.includes('场景') && c.id === 'scenes') ||
      (label.includes('平台建设') && c.id === 'platform')
    );
    if (category) {
      setSelectedCategory(category);
    }
  };

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

  const highlightText = (text: string, highlights: string[], customClass?: string) => {
    let parts = [text];
    highlights.forEach(h => {
      if (!h) return;
      const newParts: string[] = [];
      parts.forEach(p => {
        const split = p.split(h);
        for (let i = 0; i < split.length; i++) {
          newParts.push(split[i]);
          if (i < split.length - 1) newParts.push(`<span class="${customClass || 'text-red-600 font-bold'}">${h}</span>`);
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

      {/* Modal for AI Timeline Details */}
      <AnimatePresence>
        {selectedAiStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedAiStep(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full p-10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedAiStep(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${selectedAiStep.status === 'completed' ? 'bg-brand-green/10 text-brand-green' : 'bg-slate-100 text-slate-400'}`}>
                  <Calendar className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-brand-green font-mono text-xs tracking-widest uppercase mb-1">Timeline Milestone</div>
                  <h3 className="text-3xl font-black text-slate-900">{selectedAiStep.month}：{selectedAiStep.goal}</h3>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-brand-green">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">关键任务</h4>
                  <ul className="space-y-3">
                    {selectedAiStep.tasks.map((task: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-1.5 shrink-0" />
                        <span className="text-slate-700 font-medium">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${selectedAiStep.status === 'completed' ? 'bg-brand-green' : 'bg-amber-400 pulse-slow'}`} />
                      <span className={`text-xs font-bold ${selectedAiStep.status === 'completed' ? 'text-brand-green' : 'text-amber-500'}`}>
                        {selectedAiStep.status === 'completed' ? '已按计划完成' : '按计划推进中'}
                      </span>
                   </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedAiStep(null)}
                  className="px-8 py-3 bg-slate-900 text-white font-bold rounded-full shadow-lg hover:bg-brand-dark transition-all"
                >
                  关 闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Platform 1 Build Strategy Modal */}
      <AnimatePresence>
        {selectedPlatformDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedPlatformDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full p-10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPlatformDetail(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green shadow-sm">
                   <Layers className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-brand-green font-mono text-sm tracking-widest uppercase mb-1">Platform Strategy</div>
                  <h3 className="text-3xl font-black text-slate-900">1平台 建设思路</h3>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 bg-brand-light rounded-[2rem] border-l-[8px] border-brand-green shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                     <Target className="w-24 h-24 text-brand-green" />
                  </div>
                  <h4 className="text-sm font-black text-brand-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> 总体建设思路
                  </h4>
                  <p className="text-xl font-bold text-brand-dark leading-relaxed">
                    以先搭建框架并使用为主线，优先完成涉及<span className="text-red-500 font-black underline decoration-red-500/30 underline-offset-4">收入</span>（产值的形象收入，计量收入）以及<span className="text-red-500 font-black underline decoration-red-500/30 underline-offset-4">支出</span>（成本）两大模块。在后续使用过程中逐渐迭代完善。
                  </p>
                </div>

                <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2.5 h-2.5 bg-brand-green rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <div className="w-0.5 h-8 bg-gradient-to-b from-brand-green to-brand-green/20" />
                    <div className="w-0.5 h-8 bg-gradient-to-t from-brand-green to-brand-green/20" />
                    <div className="w-2.5 h-2.5 bg-brand-green rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  <div className="flex flex-col justify-between h-20 py-1">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-16">Top-Down</span>
                       <span className="text-sm font-bold text-slate-700">从上到下：搭建总体框架</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-16">Bottom-Up</span>
                       <span className="text-sm font-bold text-slate-700">从下至上：丰富平台能力</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedPlatformDetail(false)}
                  className="px-10 py-3 bg-slate-900 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  确 定
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPlanYear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedPlanYear(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full p-10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPlanYear(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center text-white shadow-sm font-black text-2xl">
                  {selectedPlanYear.year}
                </div>
                <div>
                  <div className="text-brand-green font-mono text-sm tracking-widest uppercase mb-1">Annual Action Plan</div>
                  <h3 className="text-3xl font-black text-slate-900">{selectedPlanYear.tagline}</h3>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-brand-light rounded-2xl border-l-[6px] border-brand-green">
                  <h4 className="text-sm font-black text-brand-dark uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> 战略定位
                  </h4>
                  <p className="text-lg font-bold text-brand-dark leading-relaxed">
                    {selectedPlanYear.position}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Rocket className="w-4 h-4" /> 关键成果
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedPlanYear.achievements.map((ach: any) => (
                      <div key={ach.label} className="p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                        <span className="font-black text-slate-800 block mb-1">{ach.label}</span>
                        <span className="text-sm text-slate-500 leading-relaxed">{ach.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedPlanYear(null)}
                  className="px-8 py-3 bg-brand-green text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  确 定
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for 2026 Category Detail (Matched Achievements) */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCategory(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-50"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green shadow-sm">
                   {selectedCategory.id === 'platform' ? <Layers className="w-7 h-7" /> : 
                    selectedCategory.id === 'ai' ? <Cpu className="w-7 h-7" /> : 
                    selectedCategory.id === 'drone' ? <Rocket className="w-7 h-7" /> : 
                    selectedCategory.id === 'asphalt' ? <Factory className="w-7 h-7" /> :
                    <MapIcon className="w-7 h-7" />}
                </div>
                <div>
                  <div className="text-brand-green font-mono text-xs tracking-widest uppercase mb-1">Achievement Focus 2026</div>
                  <h3 className="text-3xl font-black text-slate-900">{selectedCategory.title}</h3>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                   <p className="text-slate-600 font-medium leading-relaxed">
                     {selectedCategory.description}
                   </p>
                </div>

                <div className="relative py-12 px-2 overflow-x-auto">
                   <div className="min-w-[800px] relative">
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2" />
                      <div className="relative z-20 flex justify-between gap-4">
                        {selectedCategory.timeline?.map((item: any, idx: number) => (
                          <div key={idx} className="flex flex-col items-center gap-3 w-20">
                            <div className="text-[10px] font-black text-slate-400 uppercase">{item.month}</div>
                            <div className={`w-5 h-5 rounded-full border-4 border-white shadow-sm ring-2 ${item.status === 'completed' ? 'bg-brand-green ring-brand-green' : 'bg-white ring-slate-100'}`} />
                            <div className="text-[10px] font-bold text-center leading-tight text-slate-600">{item.goal}</div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {selectedCategory.timeline?.map((item: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-brand-green">{item.month}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.status === 'completed' ? 'bg-brand-green/10 text-brand-green' : 'bg-slate-200 text-slate-400'}`}>
                          {item.status === 'completed' ? '已完成' : '计划中'}
                        </span>
                      </div>
                      <p className="font-bold text-slate-800 text-sm mb-2">{item.goal}</p>
                      <ul className="space-y-1">
                        {item.tasks.map((t: string, i: number) => (
                          <li key={i} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                            <div className="w-1 h-1 bg-slate-300 rounded-full mt-1 shrink-0" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  {(selectedCategory as any).subCategories?.map((sub: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 col-span-2">
                      <h5 className="font-bold text-brand-dark mb-4 border-b pb-2">{sub.title}</h5>
                      <div className="grid md:grid-cols-3 gap-4">
                        {sub.tasks.map((task: any, i: number) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[11px] font-bold">
                              <span>{task.name}</span>
                              <span className="text-brand-green">{task.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-brand-green" style={{ width: `${task.progress}%` }} />
                            </div>
                            <p className="text-[9px] text-slate-400">{task.timeline}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="px-10 py-3 bg-slate-900 text-white font-bold rounded-full shadow-lg hover:bg-brand-dark transition-all"
                >
                  返 回
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
            道筑至诚 徳贯八方 数智养护 共创未来
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
          <span className="text-sm font-medium tracking-widest"> </span>
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
              {highlightText(REPORT_DATA.architecture.title, ["11N+AI"])}
            </h2>
          </div>

          {/* Centralized AI Architecture Layout - 2x2 Grid for 11N+AI */}
          <div className="relative max-w-6xl mx-auto">
            {/* Background Connecting Lines (Desktop) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none hidden md:flex">
               <div className="w-full h-px bg-brand-green" />
               <div className="h-full w-px bg-brand-green absolute" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {/* Component Pillars */}
              {REPORT_DATA.architecture.components.map((comp, idx) => (
                <motion.div
                  key={comp.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    if (comp.id === 'platform') {
                      setSelectedPlatformDetail(true);
                    }
                  }}
                  className={`bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4 group hover:border-brand-green transition-all ${comp.id === 'platform' ? 'cursor-pointer hover:shadow-brand-green/10' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all shadow-sm">
                       {comp.id === 'net' ? <BarChart3 className="w-6 h-6" /> : comp.id === 'platform' ? <Layers className="w-6 h-6" /> : <MapIcon className="w-6 h-6" />}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{comp.title}</h3>
                  </div>
                  <div className="flex-1 space-y-4">
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {highlightText(comp.content, (comp as any).highlights || [])}
                    </p>
                    {(comp as any).highlights && (comp as any).highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {(comp as any).highlights.map((h: string) => (
                          <span key={h} className="px-3 py-1 bg-slate-50 text-[10px] font-bold text-slate-400 rounded-full border border-slate-100">
                             #{h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* AI Pillar (The 4th Element) - Unified Style */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowAiEvolution(true)}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-4 group hover:border-brand-green transition-all relative overflow-hidden cursor-pointer"
              >
                <div className="absolute -top-4 -right-4 opacity-5 pointer-events-none">
                   <Cpu className="w-48 h-48 text-brand-green" />
                </div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all shadow-sm">
                     <Cpu className="w-6 h-6" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">AI 赋能：智能驱动引擎</h3>
                    <ChevronRight className="w-5 h-5 text-brand-green opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>
                <p className="relative z-10 text-slate-600 leading-relaxed font-medium">
                   {highlightText(REPORT_DATA.architecture.ai, ["以点连线、以线成面"], "text-red-500 font-bold")}
                </p>
                <div className="mt-2 text-[10px] font-black text-brand-green uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   点击查看演进路线图
                </div>
              </motion.div>
            </div>

            {/* Central Node for visual interest (Desktop) */}
            <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-20">
               <motion.div 
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  className="w-40 h-40 bg-white rounded-full border-4 border-brand-green shadow-2xl flex flex-col items-center justify-center text-brand-green scale-110"
               >
                  <div className="text-2xl font-black">数智养护</div>
               </motion.div>
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
              onClick={() => setSelectedPlanYear(plan)}
              className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col cursor-pointer hover:border-brand-green/40 hover:shadow-2xl transition-all group"
            >
              <div className="bg-brand-green p-6 text-white text-center group-hover:bg-brand-dark transition-colors">
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
                      <div 
                        key={ach.label} 
                        onClick={(e) => {
                          if (plan.year === '2026') {
                            e.stopPropagation();
                            handleAchievementClick(ach.label);
                          }
                        }}
                        className={`p-2 bg-slate-50 rounded-lg border border-slate-100 transition-all ${plan.year === '2026' ? 'hover:bg-brand-light hover:border-brand-green/30 cursor-help' : ''}`}
                      >
                        <span className="font-bold block text-slate-700">{ach.label}</span>
                        <span className="text-[10px] text-slate-400">{ach.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-center text-[10px] font-black text-slate-300 uppercase tracking-tighter group-hover:text-brand-green transition-colors">
                  点击查看年度详情计划
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2026 Details Redesign - High Contrast Light Theme */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border-2 border-brand-green/5 relative overflow-hidden mt-16"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-green pointer-events-none">
            <Rocket className="w-48 h-48" />
          </div>
          <div className="relative z-10 space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark italic">2026年 “数智养护” 我们准备这样干！</h3>
              <p className="text-slate-400 font-mono tracking-widest uppercase text-xs">Target & Execution Phase 2026</p>
            </div>

            <div className="space-y-12">
              {/* Tab Header */}
              <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-slate-50 rounded-[2rem] border border-slate-100 self-center mx-auto max-w-fit">
                {REPORT_DATA.year2026.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActive2026Tab(cat.id)}
                    className={`px-6 md:px-8 py-3 rounded-full text-xs md:text-sm font-black transition-all duration-300 flex items-center gap-2 ${
                      active2026Tab === cat.id 
                      ? 'bg-brand-green text-white shadow-lg' 
                      : 'text-slate-400 hover:text-brand-green hover:bg-brand-green/5'
                    }`}
                  >
                    {cat.id === 'platform' ? <Layers className="w-4 h-4" /> : 
                     cat.id === 'ai' ? <Cpu className="w-4 h-4" /> : 
                     cat.id === 'drone' ? <Rocket className="w-4 h-4" /> : 
                     cat.id === 'asphalt' ? <Factory className="w-4 h-4" /> :
                     <MapIcon className="w-4 h-4" />}
                    {cat.title}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {REPORT_DATA.year2026.categories.filter(c => c.id === active2026Tab).map((category) => (
                  <motion.div 
                    key={category.id} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-10"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-light rounded-[1.5rem] shadow-sm flex items-center justify-center text-brand-green border border-emerald-100">
                           {category.id === 'platform' ? <Layers className="w-8 h-8" /> : 
                            category.id === 'ai' ? <Cpu className="w-8 h-8" /> : 
                            category.id === 'drone' ? <Rocket className="w-8 h-8" /> : 
                            category.id === 'asphalt' ? <Factory className="w-8 h-8" /> :
                            <MapIcon className="w-8 h-8" />}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{category.title}</h4>
                            {category.label && (
                              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border shadow-sm ${
                                category.id === 'ai' ? 'bg-brand-green/10 text-brand-green border-brand-green/20' : 'bg-blue-50 text-blue-600 border-blue-100'
                              }`}>
                                {category.id === 'ai' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
                                <span>{category.label}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1.5">
                            {category.statusNote && (
                              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" /> {category.statusNote}
                              </span>
                            )}
                            {category.hint && (
                              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {category.hint}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 md:max-w-2xl bg-brand-light/40 p-5 rounded-2xl border border-emerald-100/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-5 text-brand-green pointer-events-none group-hover:scale-110 transition-transform">
                           <Target className="w-12 h-12" />
                        </div>
                        <div className="flex items-center gap-2 mb-2 relative z-10">
                          <Zap className="w-4 h-4 text-brand-green" />
                          <span className="text-[10px] font-black text-brand-green uppercase tracking-widest">今年主要内容</span>
                        </div>
                        <p className="text-sm md:text-base font-bold text-brand-dark leading-relaxed relative z-10">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-10">
                      <div className="space-y-8">
                        {/* Scrollable Timeline Area */}
                        <div className="relative">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                               <Calendar className="w-3 h-3" /> 关键节点时间轴
                            </h5>
                            <span className="text-[10px] font-black text-slate-300 animate-pulse hidden md:inline">← 左右滑动查看完整计划 →</span>
                          </div>
                          
                          <div className="overflow-x-auto pb-6 -mx-2 px-2 scrollbar-hide">
                            <div className="min-w-max flex gap-6 py-4 relative">
                              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2" />
                              {category.timeline.map((item, idx) => (
                                <div 
                                  key={idx} 
                                  onClick={() => setSelectedAiStep(item)}
                                  className={`relative z-10 w-44 p-4 bg-white rounded-2xl border transition-all cursor-pointer group/item
                                    ${item.status === 'completed' ? 'border-brand-green shadow-sm' : 'border-slate-100 hover:border-slate-200'}
                                    ${item.isMilestone ? 'ring-2 ring-brand-green/20 ring-offset-4 ring-offset-white' : ''}
                                  `}
                                >
                                  {/* Line Connector Node */}
                                  <div className={`absolute top-1/2 -left-3 w-4 h-4 rounded-full border-4 border-white shadow-sm -translate-y-1/2 -translate-x-full z-20 
                                    ${item.status === 'completed' ? 'bg-brand-green' : 'bg-slate-200'}
                                  `} />
                                  
                                  <div className="flex items-center justify-between mb-3">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.status === 'completed' ? 'bg-brand-green text-white' : 'bg-slate-100 text-slate-400'}`}>
                                      {item.month}
                                    </span>
                                    {item.isMilestone && <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />}
                                  </div>
                                  <h6 className="font-bold text-xs text-slate-900 mb-1 group-hover/item:text-brand-green transition-colors line-clamp-1">{item.goal}</h6>
                                  <div className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                                    {item.tasks[0]}
                                    {item.tasks.length > 1 && ` 等${item.tasks.length}项`}
                                  </div>
                                  {(item as any).specialEvent && (
                                    <div className="mt-3 pt-2 border-t border-slate-50 flex items-center gap-1.5 text-[9px] font-black text-blue-500">
                                      <TrendingUp className="w-2.5 h-2.5" /> {(item as any).specialEvent}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Subcategories (if any) */}
                        {(category as any).subCategories && (
                          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {(category as any).subCategories.map((sub: any) => (
                              <div key={sub.title} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col gap-6">
                                 <h5 className="font-bold text-lg text-brand-dark flex items-center gap-2">
                                    <div className="w-2 h-6 bg-brand-green rounded-full" />
                                    {sub.title}
                                 </h5>
                                 <div className="space-y-4">
                                    {sub.tasks.map((task: any) => (
                                      <div key={task.name} className="space-y-2">
                                         <div className="flex justify-between text-xs font-bold">
                                            <span className="text-slate-600">{task.name}</span>
                                            <span className="text-brand-dark">{task.progress}%</span>
                                         </div>
                                         <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div 
                                              initial={{ width: 0 }}
                                              whileInView={{ width: `${task.progress}%` }}
                                              className="h-full bg-brand-green"
                                            />
                                         </div>
                                         <p className="text-[10px] text-slate-400 text-right">{task.timeline}</p>
                                      </div>
                                    ))}
                                 </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
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
      <AnimatePresence>
        {showAiEvolution && (
          <AiEvolutionModal isOpen={showAiEvolution} onClose={() => setShowAiEvolution(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

const AiEvolutionModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const stages = [
    {
      num: "1",
      title: "单点攻坚",
      subtitle: "落地场景化AI助手",
      color: "bg-[#FF7A00]",
      borderColor: "border-[#FF7A00]",
      items: [
        { id: "1", label: "养护AI排班助手", desc: "聚焦日常与专项养护的集约化排班需求，优先优化模型算法，提升资源配置效率与利用率，缩短规划时间并降低成本。" },
        { id: "2", label: "AI知识库智能体", desc: "将法规标准、工艺工法历史事件数字化为\"数字专家\"，实现AI能力从外部辅助到业务内核的深度嵌入。" }
      ]
    },
    {
      num: "2",
      title: "以点连线",
      subtitle: "打造全链路AI能力",
      color: "bg-[#00D1FF]",
      borderColor: "border-[#00D1FF]",
      items: [
        { id: "3", label: "全链路数据闭环", desc: "接入公路巡检车、无人机等多渠道数据，定义\"巡检发现-智能排班-施工派单-病害反馈\"的自动化处理闭环。" },
        { id: "4", label: "高质量养护数据集", desc: "持续积累巡检、排班及施工反馈数据，构建行业领先的高质量数据集，为AI技术迭代提供坚实基础。" }
      ]
    },
    {
      num: "3",
      title: "以线成面",
      subtitle: "构建集团级综合AI体系",
      color: "bg-[#0057FF]",
      borderColor: "border-[#0057FF]",
      items: [
        { id: "5", label: "\"养护一张网\"整体布局", desc: "AI技术全面赋能养护多业务、多场景。推动养护行业技术升级，完成集团级AI能力覆盖。" },
        { id: "6", label: "跨区域资源调配", desc: "系统整合排班助手、AI知识库及各区域资源数据，打造集调度施工、规范作业、工艺匹配、能效管控于一体的综合体系。" }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-7xl bg-[#F4F7FA] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[95vh] border border-white"
      >
        <button onClick={onClose} className="absolute top-8 right-8 z-50 p-3 hover:bg-slate-200/50 rounded-full transition-colors text-slate-400 group">
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="p-8 md:p-12 overflow-y-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">养护AI能力演进路径：</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
               <h3 className="text-2xl md:text-3xl font-bold text-slate-800">· 从"单点攻坚"到"养护一张网"</h3>
            </div>
            <p className="text-slate-400 font-bold mt-4 text-sm md:text-lg">以点连线 · 以线成面 · 分阶段实现养护业务数字化转型与AI全场景覆盖</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Connector Arrows (Desktop) */}
            <div className="hidden lg:block absolute top-[25%] left-[31%] z-20 text-cyan-500 animate-pulse">
               <ChevronRight className="w-10 h-10" />
            </div>
            <div className="hidden lg:block absolute top-[25%] left-[65%] z-20 text-blue-600 animate-pulse">
               <ChevronRight className="w-10 h-10" />
            </div>

            {stages.map((stage) => (
              <div key={stage.num} className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 flex flex-col relative overflow-hidden border border-slate-100">
                <div className={`h-2 w-full ${stage.color}`} />
                <div className="p-8 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${stage.color} text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg`}>
                      {stage.num}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 leading-tight">{stage.title}</h4>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stage.subtitle}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 pt-2 space-y-6 flex-1">
                  {stage.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center font-black text-sm border border-slate-100 text-slate-400">
                        {item.id}
                      </div>
                      <div className={`flex flex-col gap-2 p-5 rounded-2xl border-l-[6px] ${stage.borderColor} bg-[#F8FAFC] flex-1`}>
                         <h5 className="font-black text-slate-900 text-lg leading-tight">{item.label}</h5>
                         <p className="text-[#64748B] text-xs leading-relaxed font-medium">
                           {item.desc}
                         </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Driving Force Section */}
          <div className="mt-12 bg-gradient-to-r from-[#0057FF]/10 via-[#0057FF]/5 to-transparent p-8 rounded-[2.5rem] border border-blue-100 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex items-center gap-5 lg:border-r lg:border-blue-200 lg:pr-12">
              <div className="bg-[#0057FF] text-white p-5 rounded-2xl shadow-xl">
                 <Cpu className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h5 className="font-black text-slate-900 text-2xl tracking-tight">核心驱动</h5>
                <p className="text-[#0057FF] font-black text-lg uppercase tracking-tighter">养护决策智能体</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 w-full">
              {[
                { icon: "A", title: "方案知识", desc: "预防性/修复性养护方案库、典型工程案例经验" },
                { icon: "B", title: "规范知识", desc: "JTG标准、指标阈值、养护程序要求" },
                { icon: "C", title: "专家知识", desc: "经验规则、决策策略、特殊工况处理经验" }
              ].map((k) => (
                <div key={k.icon} className="flex items-center gap-4 bg-white/80 p-5 rounded-2xl border border-white shadow-sm">
                  <div className="w-10 h-10 bg-[#0057FF] text-white rounded-xl flex items-center justify-center font-black text-lg shrink-0 shadow-lg shadow-blue-500/20">
                    {k.icon}
                  </div>
                  <div className="space-y-1">
                    <h6 className="font-black text-slate-900 text-base">{k.title}</h6>
                    <p className="text-slate-500 text-[11px] leading-snug font-medium italic">{k.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
