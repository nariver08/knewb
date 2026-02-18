import { useState, useEffect, useRef } from "react";
import { Mail, ChevronDown, Briefcase, User, Award, Code2, Phone, Linkedin, Github, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const NAV = ["About", "Experience", "Skills", "Contact"];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const skills = [
    { label: "SAP", pct: 85 },
    { label: "Oracle ERP Cloud", pct: 90 },
    { label: "PMO", pct: 92 },
    { label: "会計知識", pct: 78 },
    { label: "VBA", pct: 72 },
    { label: "Microsoft Project", pct: 80 },
    { label: "Backlog", pct: 85 },
  ];

  const experiences = [
    {
      period: "2023 – 現在",
      title: "Oracle ERP Cloud 導入支援",
      company: "大手信託・カード会社",
      tags: ["UAT計画策定", "進捗管理", "VBA業務効率化"],
      desc: "UAT計画の策定から進捗管理、VBAによる業務効率化ツールの作成まで担当。品質確保と期限厳守を両立したプロジェクト推進を実現。"
    },
    {
      period: "2022 – 2023",
      title: "Oracle ERP Cloud 導入支援",
      company: "メガバンク",
      tags: ["UAT指摘管理", "経理業務支援", "チームリード"],
      desc: "UAT指摘管理及びリリース後の経理業務支援においてチームリードを担当。複雑なステークホルダー構造の中で円滑な調整を実現。"
    },
    {
      period: "2021 – 2022",
      title: "SAP 導入支援（PMO / 会計チーム）",
      company: "大手印刷会社",
      tags: ["PMO", "WBS作成", "ベンダーコントロール"],
      desc: "要件定義から本番稼働まで一貫して担当。WBS作成・ベンダーコントロール・進捗報告を通じプロジェクトを牽引。"
    },
  ];

  const certs = [
    "基本情報技術者",
    "日商簿記 3級",
    "普通自動車免許",
  ];

  return (
    <div style={{ fontFamily: "'Noto Serif JP', 'Georgia', serif", background: "#f8f9fb", color: "#1a2340", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;600;700&family=Montserrat:wght@300;400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0f2f5; }
        ::-webkit-scrollbar-thumb { background: #1e3a6e; border-radius: 3px; }
        .montserrat { font-family: 'Montserrat', sans-serif; }
        .skill-bar { height: 4px; background: #dde3ef; border-radius: 2px; overflow: hidden; margin-top: 6px; }
        .skill-fill { height: 100%; background: linear-gradient(90deg, #1e3a6e, #4a78c4); border-radius: 2px; transition: width 1.2s cubic-bezier(.4,0,.2,1); }
        .nav-link { position: relative; cursor: pointer; font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: inherit; transition: color .2s; }
        .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 2px; background: #4a78c4; transition: width .3s; }
        .nav-link:hover::after { width: 100%; }
        .timeline-dot { width: 14px; height: 14px; border-radius: 50%; background: #1e3a6e; flex-shrink: 0; margin-top: 6px; box-shadow: 0 0 0 4px rgba(30,58,110,.15); }
        input, textarea { outline: none; }
        input:focus, textarea:focus { border-color: #1e3a6e !important; }
        .tag { display: inline-block; padding: 3px 10px; background: rgba(30,58,110,.08); color: #1e3a6e; border-radius: 20px; font-size: 12px; font-family: 'Montserrat', sans-serif; font-weight: 600; margin: 3px 3px 3px 0; letter-spacing: .04em; }
        .btn-primary { background: #1e3a6e; color: #fff; border: none; cursor: pointer; font-family: 'Montserrat', sans-serif; font-weight: 700; letter-spacing: .08em; transition: background .2s, transform .2s; }
        .btn-primary:hover { background: #2d4f8f; transform: translateY(-1px); }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 5%", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(248,249,251,.96)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", borderBottom: scrolled ? "1px solid #e5e9f2" : "none", transition: "all .3s" }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: ".06em", color: "#1e3a6e" }}>
          NARIKAWA
        </div>
        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 36 }} className="desktop-nav">
          {NAV.map(n => <span key={n} className="nav-link" onClick={() => scrollTo(n.toLowerCase())}>{n}</span>)}
        </div>
        {/* Mobile hamburger */}
        <div style={{ display: "none", flexDirection: "column", gap: 5, cursor: "pointer" }} id="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {[0,1,2].map(i => <div key={i} style={{ width: 24, height: 2, background: "#1e3a6e", borderRadius: 2 }} />)}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            #hamburger { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, background: "rgba(248,249,251,.98)", zIndex: 99, padding: "24px 5%", display: "flex", flexDirection: "column", gap: 24, borderBottom: "1px solid #e5e9f2" }}>
          {NAV.map(n => <span key={n} className="nav-link" onClick={() => scrollTo(n.toLowerCase())} style={{ fontSize: 15 }}>{n}</span>)}
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0d1f42 0%, #1e3a6e 50%, #2a4f8a 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "0 5%" }}>
        {/* geometric decoration */}
        <div style={{ position: "absolute", top: "10%", right: "8%", width: 280, height: 280, border: "1px solid rgba(255,255,255,.06)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "15%", right: "11%", width: 200, height: 200, border: "1px solid rgba(255,255,255,.05)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 160, height: 160, border: "1px solid rgba(255,255,255,.04)", transform: "rotate(45deg)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 40%, rgba(74,120,196,.18) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", maxWidth: 760, position: "relative", zIndex: 1 }}>
          <div style={{ opacity: 0, animation: "fadeUp .9s ease .2s forwards" }}>
            <div className="montserrat" style={{ fontSize: 12, letterSpacing: ".3em", color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginBottom: 28 }}>Portfolio</div>
            <h1 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(42px, 8vw, 80px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-.01em", marginBottom: 12 }}>
              成川 理彦
            </h1>
            <p className="montserrat" style={{ fontSize: "clamp(12px, 2vw, 15px)", letterSpacing: ".25em", color: "rgba(255,255,255,.6)", textTransform: "uppercase", marginBottom: 32 }}>Masahiko Narikawa</p>
            <div style={{ width: 48, height: 2, background: "#4a78c4", margin: "0 auto 28px" }} />
            <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300, fontSize: "clamp(13px, 2.5vw, 17px)", color: "rgba(255,255,255,.75)", letterSpacing: ".08em", marginBottom: 20 }}>
              ITコンサルタント&nbsp;/&nbsp;ERP導入・PMOスペシャリスト
            </p>
            <p style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto 48px", fontWeight: 300 }}>
              「ユーザー視点の業務設計と確実なプロジェクト推進で、<br/>企業の変革を支える」
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ padding: "14px 36px", fontSize: 13, letterSpacing: ".1em", borderRadius: 4, display: "flex", alignItems: "center", gap: 8 }}>
                お問い合わせ <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo("experience")} style={{ padding: "14px 36px", fontSize: 13, letterSpacing: ".1em", borderRadius: 4, border: "1px solid rgba(255,255,255,.3)", background: "transparent", color: "#fff", cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontWeight: 600, transition: "border-color .2s" }}>
                職務経歴を見る
              </button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", opacity: 0, animation: "fadeUp .9s ease 1s forwards", cursor: "pointer" }} onClick={() => scrollTo("about")}>
          <ChevronDown size={24} color="rgba(255,255,255,.4)" style={{ animation: "bounce 2s infinite" }} />
        </div>
        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        `}</style>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel icon={<User size={14} />} label="About" />
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 42px)", color: "#1a2340", marginBottom: 56, letterSpacing: "-.02em" }}>
              プロフィール
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
            <FadeIn delay={0.1}>
              <div style={{ background: "#f8f9fb", borderRadius: 12, padding: "40px 36px", height: "100%", borderLeft: "4px solid #1e3a6e" }}>
                <div className="montserrat" style={{ fontSize: 12, letterSpacing: ".2em", color: "#4a78c4", textTransform: "uppercase", marginBottom: 20 }}>Background</div>
                <p style={{ lineHeight: 2, fontSize: 15, color: "#3a4568" }}>
                  1998年生まれ、兵庫県出身。<strong>関西学院大学 経済学部</strong>を2021年3月に卒業後、<strong>株式会社ベイカレント・コンサルティング</strong>に入社。SAP・Oracle ERP Cloudの大規模導入プロジェクトに携わり、PMO・UAT推進・経理業務支援を歴任してきました。
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ background: "#f8f9fb", borderRadius: 12, padding: "40px 36px", height: "100%", borderLeft: "4px solid #4a78c4" }}>
                <div className="montserrat" style={{ fontSize: 12, letterSpacing: ".2em", color: "#4a78c4", textTransform: "uppercase", marginBottom: 20 }}>Strengths</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {["プロジェクト管理能力（WBS・リスク・進捗）", "ユーザー視点の業務設計・要件定義", "ステークホルダー間の柔軟な調整力"].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <CheckCircle2 size={18} color="#1e3a6e" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, lineHeight: 1.7, color: "#3a4568" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ background: "linear-gradient(135deg, #1e3a6e, #2a4f8a)", borderRadius: 12, padding: "40px 36px", height: "100%" }}>
                <div className="montserrat" style={{ fontSize: 12, letterSpacing: ".2em", color: "rgba(255,255,255,.6)", textTransform: "uppercase", marginBottom: 20 }}>Career</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[["2021.3", "関西学院大学 経済学部 卒業"], ["2021.4", "ベイカレント・コンサルティング 入社"], ["2021–", "ERP導入PMOとして複数案件に従事"]].map(([yr, ev], i) => (
                    <div key={i} style={{ display: "flex", gap: 16 }}>
                      <span className="montserrat" style={{ fontSize: 11, color: "#4a78c4", fontWeight: 700, minWidth: 52, paddingTop: 2 }}>{yr}</span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,.8)", lineHeight: 1.6 }}>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 5%", background: "#f4f6fb" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel icon={<Briefcase size={14} />} label="Experience" />
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 42px)", color: "#1a2340", marginBottom: 56, letterSpacing: "-.02em" }}>
              職務経歴
            </h2>
          </FadeIn>
          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 6, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, #1e3a6e, #4a78c4, #dde3ef)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {experiences.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div style={{ display: "flex", gap: 24, position: "relative" }}>
                    <div className="timeline-dot" style={{ position: "absolute", left: -38, top: 6 }} />
                    <div style={{ background: "#fff", borderRadius: 12, padding: "32px 36px", flex: 1, boxShadow: "0 2px 20px rgba(30,58,110,.07)", border: "1px solid #eaeeF8", transition: "transform .2s, box-shadow .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(30,58,110,.12)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(30,58,110,.07)"; }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                        <span className="montserrat" style={{ fontSize: 11, color: "#4a78c4", fontWeight: 700, letterSpacing: ".1em" }}>{exp.period}</span>
                        <span style={{ fontSize: 12, color: "#8a94b0", fontFamily: "Montserrat, sans-serif" }}>{exp.company}</span>
                      </div>
                      <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a2340", marginBottom: 14 }}>{exp.title}</h3>
                      <p style={{ fontSize: 14, lineHeight: 1.85, color: "#4a5578", marginBottom: 18 }}>{exp.desc}</p>
                      <div>{exp.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel icon={<Code2 size={14} />} label="Skills & Certifications" />
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 42px)", color: "#1a2340", marginBottom: 56, letterSpacing: "-.02em" }}>
              スキル・資格
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
            <FadeIn delay={0.1}>
              <div>
                <h3 className="montserrat" style={{ fontWeight: 700, fontSize: 13, letterSpacing: ".15em", textTransform: "uppercase", color: "#1e3a6e", marginBottom: 32 }}>Technical Skills</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {skills.map((s, i) => (
                    <SkillBar key={i} label={s.label} pct={s.pct} delay={i * 0.08} />
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <h3 className="montserrat" style={{ fontWeight: 700, fontSize: 13, letterSpacing: ".15em", textTransform: "uppercase", color: "#1e3a6e", marginBottom: 32 }}>Certifications</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {certs.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, background: "#f8f9fb", borderRadius: 10, padding: "18px 24px", border: "1px solid #eaeeF8" }}>
                      <Award size={20} color="#1e3a6e" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#1a2340" }}>{c}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 40, background: "linear-gradient(135deg, #1e3a6e, #2a4f8a)", borderRadius: 12, padding: "28px 28px" }}>
                  <div className="montserrat" style={{ fontSize: 11, letterSpacing: ".15em", color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginBottom: 12 }}>所属</div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: 15, lineHeight: 1.7 }}>株式会社ベイカレント・コンサルティング</p>
                  <p className="montserrat" style={{ color: "rgba(255,255,255,.5)", fontSize: 12, marginTop: 6 }}>2021.4 – 現在</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 5%", background: "#0d1f42" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div className="montserrat" style={{ fontSize: 12, letterSpacing: ".25em", color: "#4a78c4", textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 42px)", color: "#fff", marginBottom: 20, letterSpacing: "-.02em" }}>お問い合わせ</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.9, marginBottom: 52 }}>ご相談・ご依頼はこちらよりお気軽にお問い合わせください。</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            {sent ? (
              <div style={{ background: "rgba(74,120,196,.15)", border: "1px solid rgba(74,120,196,.4)", borderRadius: 12, padding: "48px 32px", color: "#fff" }}>
                <CheckCircle2 size={48} color="#4a78c4" style={{ margin: "0 auto 20px" }} />
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>送信完了しました</h3>
                <p style={{ color: "rgba(255,255,255,.6)", fontSize: 14 }}>メッセージを受け取りました。お早めにご連絡いたします。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[{ id: "name", label: "お名前", type: "text", placeholder: "山田 太郎" }, { id: "email", label: "メールアドレス", type: "email", placeholder: "example@email.com" }].map(f => (
                  <div key={f.id} style={{ textAlign: "left" }}>
                    <label className="montserrat" style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", display: "block", marginBottom: 8 }}>{f.label}</label>
                    <input required type={f.type} placeholder={f.placeholder} value={formData[f.id]} onChange={e => setFormData({ ...formData, [f.id]: e.target.value })}
                      style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 8, color: "#fff", fontSize: 14, transition: "border-color .2s" }} />
                  </div>
                ))}
                <div style={{ textAlign: "left" }}>
                  <label className="montserrat" style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", display: "block", marginBottom: 8 }}>メッセージ</label>
                  <textarea required rows={5} placeholder="ご相談内容をご記入ください" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 8, color: "#fff", fontSize: 14, resize: "vertical", transition: "border-color .2s" }} />
                </div>
                <button type="submit" className="btn-primary" style={{ padding: "16px 40px", fontSize: 13, letterSpacing: ".1em", borderRadius: 8, display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginTop: 8 }}>
                  送信する <ArrowRight size={16} />
                </button>
              </form>
            )}
          </FadeIn>
          <FadeIn delay={0.25}>
            <div style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "center", gap: 24 }}>
              {[{ icon: <Mail size={20} />, label: "Email" }, { icon: <Linkedin size={20} />, label: "LinkedIn" }, { icon: <Phone size={20} />, label: "Phone" }].map(({ icon, label }) => (
                <div key={label} title={label} style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.6)", cursor: "pointer", transition: "border-color .2s, color .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#4a78c4"; e.currentTarget.style.color = "#4a78c4"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "rgba(255,255,255,.6)"; }}>
                  {icon}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
        <div style={{ textAlign: "center", marginTop: 72, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <p className="montserrat" style={{ fontSize: 11, color: "rgba(255,255,255,.25)", letterSpacing: ".12em" }}>© 2025 Masahiko Narikawa. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ icon, label }) {
  return (
    <div className="montserrat" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#4a78c4", fontWeight: 700, marginBottom: 16, background: "rgba(74,120,196,.08)", padding: "6px 14px", borderRadius: 20 }}>
      {icon}{label}
    </div>
  );
}

function SkillBar({ label, pct, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#1a2340" }}>{label}</span>
        <span className="montserrat" style={{ fontSize: 11, color: "#4a78c4", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: inView ? `${pct}%` : "0%", transitionDelay: `${delay}s` }} />
      </div>
    </div>
  );
}
