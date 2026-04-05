import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  CheckCircle2,
  Trophy,
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  User,
  ArrowRight,
  Flame,
} from "lucide-react";

const professorImages = [
  "/professor1.jpeg",
  "/professor2.jpeg",
  "/professor3.jpeg",
];

// ─── Slider de Aprovados ────────────────────────────────────────────────────
const approvedSlides = [
  { img: "/DanielJunior.jpeg",      name: "Daniel Junior",      cargo: "31º colocado geral * Policia Militar – PE" },
  { img: "/ArlonDavid.jpeg",        name: "Arllon David",       cargo: "Polícia Militar – RN"  },
  { img: "/AngelicaRose.jpeg",      name: "Angelica Rose",      cargo: "Policia Militar – PB" },
  { img: "/IgorCorreia.png",        name: "Igor Correia",       cargo: "Policia Militar – PE" },
  { img: "/JoaoLucas.jpeg",         name: "João Lucas",         cargo: "Policia Militar – PE" },
  { img: "/ShaydLucas.png",         name: "Shayd Lucas",        cargo: "Policia Militar – PB" },
  { img: "/JeffersonCoelho.jpeg",   name: "Jefferson Coelho",   cargo: "Policia Militar - PB" },
];
// ─────────────────────────────────────────────────────────────────────────────

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/L0WGWp68RRpFwC073zXnyM?mode=gi_t"; 

const stats = [
  { value: "300+", label: "Alunos Aprovados" },
  { value: "98%", label: "Taxa de Satisfação" },
  { value: "1000+", label: "Conteúdo em PDF" },
  { value: "200h+", label: "Conteúdo em Vídeo" },
];

// ─── Professores ─────────────────────────────────────────────────────────────
const professors = [
  { img: "/prof-adalis.png",    name: "Prof. Adalis",                             disciplina: "Legislação Penal Extravagante" },
  { img: "/prof-agricio.png",   name: "Prof. Agrício Neto",                       disciplina: "Informática" },
  { img: "/prof-bilunga.jpeg",  name: "Prof. Severino Lourenço",                  disciplina: "Raciocínio Lógico" },
  { img: "/prof-marquinho.png", name: "Prof. e Proprietário Marquinho Germano",   disciplina: "Direito Constitucional" },
  { img: "/prof-ramon.jpeg",    name: "Prof. Ramon",                              disciplina: "Língua Portuguesa" },
  { img: "/Prof-Neto.png",      name: "Prof. Neto",                               disciplina: "Direito Administrativo e Penal" },
];
// ─────────────────────────────────────────────────────────────────────────────
const infiniteProfs = [...professors, ...professors];

const approvals = [
  { name: "Igor Correia", cargo: "Policial Militar – PE", year: "2024" },
  { name: "Eduardo Pereira", cargo: "Polícia Militar – PE", year: "2024" },
  { name: "João Lucas", cargo: "Policial Militar – PE", year: "2024" },
  { name: "Thainná Christini", cargo: "Policial Militar – PE", year: "2024" },
  { name: "Gustavo Costa", cargo: "Policial Militar – AL", year: "2018" },
  { name: "Shayd Lucas", cargo: "Policial Militar – PB", year: "2023" },
];


export function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProfSlide, setCurrentProfSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxSlide = Math.max(0, approvedSlides.length - visibleCount);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const nextProfSlide = useCallback(() => {
    setCurrentProfSlide((prev) => (prev + 1) % professorImages.length);
  }, []);

  const prevProfSlide = () => {
    setCurrentProfSlide((prev) => (prev - 1 + professorImages.length) % professorImages.length);
  };

  // ── Professor cards – infinite scroll ─────────────────────────────────────
  const [profCardVisible, setProfCardVisible] = useState(5);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setProfCardVisible(2);
      else if (window.innerWidth < 1024) setProfCardVisible(3);
      else setProfCardVisible(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  // ──────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const timer = setInterval(nextProfSlide, 4000);
    return () => clearInterval(timer);
  }, [nextProfSlide]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    concurso: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.phone.trim()) newErrors.phone = "WhatsApp é obrigatório";
    else if (!/^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/.test(formData.phone.replace(/\s/g, "")))
      newErrors.phone = "Número inválido";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail inválido";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      window.open(WHATSAPP_GROUP_LINK, "_blank");
      navigate("/obrigado");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <div className="min-h-screen bg-[#1B1B1A] text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10" style={{ background: "#000" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "64px" }}>
          {/* Logo */}
          <a href="#">
            <img src="/marca.PNG" alt="CP Preparação" className="h-9 w-auto" />
          </a>

          {/* Nav links – desktop */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Aprovados", href: "#aprovados" },
              { label: "O Curso", href: "#features" },
              { label: "Inscrição", href: "#inscricao" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.1em" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#inscricao"
            className="flex items-center gap-2 text-white text-sm uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
            style={{
              fontFamily: "'Saira Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.12em",
              background: "#CE1C1C",
              padding: "10px 22px",
            }}
          >
            QUERO SER POLICIAL <ChevronRight size={15} />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col" style={{ background: "#000", paddingTop: "64px" }}>

        {/* Red top accent line */}
        <div className="w-full h-1 bg-[#CE1C1C]" />

        <div className="relative flex-1 flex items-center">
          {/* Subtle diagonal texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)",
            }}
          />

          <div className="relative w-full max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16 items-center" style={{ direction: "ltr" }}>

            {/* ── LEFT ── */}
            <div>
              {/* Tag */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-[2px] bg-[#CE1C1C]" />
                <span
                  className="text-[#CE1C1C] text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700 }}
                >
                  <Flame size={11} className="inline mr-1" />
                  Inscrições Abertas — 2025
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-white uppercase mb-6 leading-none"
                style={{
                  fontFamily: "'Saira Condensed', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                }}
              >
                A preparação
                <br />
                mais completa
                <br />
                para a{" "}
                <span style={{ color: "#CE1C1C" }}>PMAL 2026</span>
              </h1>

              {/* Sub */}
              <p
                className="text-white/50 mb-10 leading-relaxed"
                style={{ fontFamily: "'Saira', sans-serif", fontSize: "1rem", maxWidth: "480px" }}
              >
                O ciclo de aulões mais completo de Alagoas. Metodologia focada
                na banca CEBRASPE, professores especialistas e material
                atualizado para o edital 2026.
              </p>

              {/* Benefits */}
              <div className="flex flex-col gap-3 mb-10">
                {[
                  "Aulas ao vivo + gravadas sem limite de acesso",
                  "Material focado no edital PMAL 2026",
                  "Grupo exclusivo com professores especialistas",
                  "Simulados estilo CEBRASPE",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center" style={{ color: "#CE1C1C" }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span
                      className="text-white/70 text-sm"
                      style={{ fontFamily: "'Saira', sans-serif" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#inscricao"
                  className="inline-flex items-center gap-2 text-white uppercase transition-all hover:opacity-90 active:scale-95"
                  style={{
                    fontFamily: "'Saira Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                    background: "#CE1C1C",
                    padding: "14px 32px",
                  }}
                >
                  QUERO SER POLICIAL <ArrowRight size={18} />
                </a>
                <a
                  href="#aprovados"
                  className="text-white/40 text-sm uppercase hover:text-white/70 transition-colors"
                  style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  Ver aprovados →
                </a>
              </div>
            </div>

            {/* ── RIGHT – photo ── */}
            <div className="relative flex justify-end order-first lg:order-last">
              {/* Red glow behind image */}
              <div
                className="absolute inset-0 opacity-20 blur-3xl"
                style={{ background: "radial-gradient(ellipse at center, #CE1C1C 0%, transparent 70%)" }}
              />

              <div className="relative overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <img
                  src="/design.png"
                  alt="Professor Marcos Germano"
                  className="w-full object-cover object-top"
                  style={{ height: "520px", display: "block", filter: "brightness(0.92)" }}
                />
                {/* Bottom gradient */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 0%, transparent 40%)" }} />

                {/* Name tag at bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p
                        className="text-white uppercase"
                        style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.05em" }}
                      >
                        Prof. Marcos Germano
                      </p>
                      <p className="text-white/40 text-xs" style={{ fontFamily: "'Saira', sans-serif" }}>
                        Proprietário CP Preparação
                      </p>
                    </div>
                    <img src="/logo.jpeg" alt="CP" className="w-12 h-12 object-cover" style={{ border: "2px solid #CE1C1C" }} />
                  </div>
                </div>
              </div>

              {/* Floating badge — aprovados */}
              <div
                className="hidden lg:flex absolute -left-6 top-1/3 items-center gap-3 px-4 py-3 shadow-2xl"
                style={{ background: "#CE1C1C", border: "none" }}
              >
                <Trophy size={20} className="text-white flex-shrink-0" />
                <div>
                  <p className="text-white text-sm leading-tight" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800 }}>
                    300+ APROVADOS
                  </p>
                  <p className="text-white/70 text-xs" style={{ fontFamily: "'Saira', sans-serif" }}>
                    em concursos policiais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10" style={{ background: "#0a0a0a" }}>
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center py-2"
                style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
              >
                <p
                  className="text-white"
                  style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontSize: "2rem", color: "#CE1C1C" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-white/40 text-xs uppercase tracking-widest mt-0.5"
                  style={{ fontFamily: "'Saira', sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSORES */}
      <section id="features" className="py-24" style={{ background: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[2px] bg-[#CE1C1C]" />
              <span
                className="text-[#CE1C1C] text-xs uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700 }}
              >
                Corpo Docente
              </span>
            </div>
            <h2
              className="text-white uppercase leading-none"
              style={{
                fontFamily: "'Saira Condensed', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 900,
              }}
            >
              Os Melhores<br />
              <span style={{ color: "#CE1C1C" }}>Professores</span>
            </h2>
          </div>

          {/* Professor carousel – infinite auto-scroll */}
          <style>{`
            @keyframes profScroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .prof-track {
              animation: profScroll ${professors.length * 3}s linear infinite;
            }
            .prof-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="overflow-hidden">
            <div
              className="prof-track flex"
              style={{ width: `${(infiniteProfs.length / profCardVisible) * 100}%` }}
            >
              {infiniteProfs.map((prof, i) => (
                <div
                  key={`${prof.img}-${i}`}
                  className="group relative overflow-hidden flex-shrink-0"
                  style={{ width: `${100 / infiniteProfs.length}%`, aspectRatio: "3/4", padding: "0 6px" }}
                >
                  <img
                    src={prof.img}
                    alt={prof.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.35) 55%, transparent 100%)" }}
                  />
                  <div className="absolute top-0 left-[6px] right-[6px] h-[3px] bg-[#CE1C1C]" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p
                      className="text-white uppercase leading-tight"
                      style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: "0.95rem" }}
                    >
                      {prof.name}
                    </p>
                    <p
                      className="text-[#CE1C1C] text-xs mt-1 uppercase tracking-wider"
                      style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600 }}
                    >
                      {prof.disciplina}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* MATERIAL SECTION */}
      <section className="py-24" style={{ background: "#000" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Carousel */}
          <div className="relative overflow-hidden" style={{ height: "400px" }}>
            {professorImages.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Foto ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: i === currentProfSlide ? 1 : 0, filter: "brightness(0.85)" }}
              />
            ))}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#CE1C1C]" />
            <button
              onClick={prevProfSlide}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white transition-all hover:bg-[#CE1C1C]"
              style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextProfSlide}
              aria-label="Próxima"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white transition-all hover:bg-[#CE1C1C]"
              style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {professorImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentProfSlide(i)}
                  className="transition-all"
                  style={{
                    width: i === currentProfSlide ? "24px" : "8px",
                    height: "8px",
                    background: i === currentProfSlide ? "#CE1C1C" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[2px] bg-[#CE1C1C]" />
              <span
                className="text-[#CE1C1C] text-xs uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700 }}
              >
                Material Didático
              </span>
            </div>
            <h2
              className="text-white uppercase leading-none mb-5"
              style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}
            >
              Material Atualizado<br />
              <span style={{ color: "#CE1C1C" }}>e Focado na Aprovação</span>
            </h2>
            <p className="text-white/50 mb-8 leading-relaxed" style={{ fontFamily: "'Saira', sans-serif" }}>
              Nosso material é desenvolvido por professores concursados que
              conhecem as bancas por dentro. Cada apostila é atualizada de
              acordo com os editais mais recentes.
            </p>

            <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                "Apostilas completas por disciplina",
                "Mapas mentais para revisão rápida",
                "Questões elaboradas por especialistas",
                "Videoaulas explicativas para cada tema",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-1.5 h-1.5 bg-[#CE1C1C] flex-shrink-0" />
                  <span className="text-white/70 text-sm" style={{ fontFamily: "'Saira', sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APROVADOS – multi-card slider */}
      <section className="py-24" style={{ background: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[2px] bg-[#CE1C1C]" />
              <span
                className="text-[#CE1C1C] text-xs uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700 }}
              >
                Aprovados CP Preparação
              </span>
            </div>
            <h2
              className="text-white uppercase leading-none"
              style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900 }}
            >
              Alguns Aprovados<br />
              <span style={{ color: "#CE1C1C" }}>CP Preparação</span>
            </h2>
            <p className="text-white/40 mt-3 text-sm uppercase tracking-widest" style={{ fontFamily: "'Saira', sans-serif" }}>
              Eles passaram pelo CP e hoje são policiais.{" "}
              <span className="text-[#CE1C1C]">O próximo será você.</span>
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex"
                style={{
                  width: `${(approvedSlides.length / visibleCount) * 100}%`,
                  transform: `translateX(-${(currentSlide / approvedSlides.length) * 100}%)`,
                  transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                {approvedSlides.map((slide, i) => (
                  <div key={slide.img} className="px-2" style={{ width: `${100 / approvedSlides.length}%` }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                      <img src={slide.img} alt={slide.name} className="w-full h-full object-cover" />
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#CE1C1C]" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white leading-tight uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: "0.95rem" }}>
                          {slide.name}
                        </p>
                        <p className="text-[#CE1C1C] text-xs mt-0.5 uppercase tracking-wide" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600 }}>
                          {slide.cargo}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {currentSlide > 0 && (
              <button
                onClick={prevSlide}
                aria-label="Anterior"
                className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white transition-all hover:bg-[#CE1C1C] z-10"
                style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {currentSlide < maxSlide && (
              <button
                onClick={nextSlide}
                aria-label="Próximo"
                className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white transition-all hover:bg-[#CE1C1C] z-10"
                style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          <div className="flex justify-start gap-2 mt-6">
            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="transition-all"
                style={{
                  width: i === currentSlide ? "24px" : "8px",
                  height: "8px",
                  background: i === currentSlide ? "#CE1C1C" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="inscricao" className="py-24 relative" style={{ background: "#000" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)" }} />
        <div className="relative max-w-2xl mx-auto px-6">

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[2px] bg-[#CE1C1C]" />
              <span className="text-[#CE1C1C] text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700 }}>
                Inscrição Gratuita
              </span>
            </div>
            <h2 className="text-white uppercase leading-none mb-3" style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900 }}>
              Entre para o<br />
              <span style={{ color: "#CE1C1C" }}>Grupo de Estudos</span>
            </h2>
            <p className="text-white/40 text-sm" style={{ fontFamily: "'Saira', sans-serif" }}>
              Preencha os campos abaixo e acesse agora nosso grupo no WhatsApp com materiais, dicas e suporte diário dos professores.
            </p>
          </div>

          <div style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0a0a0a", padding: "40px" }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div>
                <label className="text-white/50 text-xs mb-2 flex items-center gap-2 uppercase tracking-widest" style={{ fontFamily: "'Saira', sans-serif" }}>
                  <User size={13} className="text-[#CE1C1C]" /> Nome completo *
                </label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Seu nome completo"
                  className={`w-full text-white placeholder-white/20 px-4 py-3 focus:outline-none transition-colors text-sm`}
                  style={{ background: "#000", border: `1px solid ${errors.name ? "#CE1C1C" : "rgba(255,255,255,0.12)"}`, fontFamily: "'Saira', sans-serif" }}
                />
                {errors.name && <p className="text-[#CE1C1C] text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-white/50 text-xs mb-2 flex items-center gap-2 uppercase tracking-widest" style={{ fontFamily: "'Saira', sans-serif" }}>
                  <Phone size={13} className="text-[#CE1C1C]" /> WhatsApp *
                </label>
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="(00) 99999-9999"
                  className="w-full text-white placeholder-white/20 px-4 py-3 focus:outline-none transition-colors text-sm"
                  style={{ background: "#000", border: `1px solid ${errors.phone ? "#CE1C1C" : "rgba(255,255,255,0.12)"}`, fontFamily: "'Saira', sans-serif" }}
                />
                {errors.phone && <p className="text-[#CE1C1C] text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-white/50 text-xs mb-2 flex items-center gap-2 uppercase tracking-widest" style={{ fontFamily: "'Saira', sans-serif" }}>
                  <Mail size={13} className="text-[#CE1C1C]" /> E-mail *
                </label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full text-white placeholder-white/20 px-4 py-3 focus:outline-none transition-colors text-sm"
                  style={{ background: "#000", border: `1px solid ${errors.email ? "#CE1C1C" : "rgba(255,255,255,0.12)"}`, fontFamily: "'Saira', sans-serif" }}
                />
                {errors.email && <p className="text-[#CE1C1C] text-xs mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 mt-2"
                style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "0.1em", background: "#CE1C1C", padding: "16px" }}
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin" /> REDIRECIONANDO...</>
                ) : (
                  <>ENTRAR NO GRUPO DO WHATSAPP <ArrowRight size={18} /></>
                )}
              </button>

              <p className="text-center text-white/20 text-xs" style={{ fontFamily: "'Saira', sans-serif" }}>
                🔒 Seus dados estão seguros. Não enviamos spam.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="w-full h-[3px] bg-[#CE1C1C]" />
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/marca.PNG" alt="CP Preparação" className="h-8 w-auto brightness-90" />
          <p className="text-white/20 text-xs text-center" style={{ fontFamily: "'Saira', sans-serif" }}>
            © 2025 CP Preparação. Todos os direitos reservados.
          </p>
          <p className="text-white/20 text-xs uppercase tracking-widest" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600 }}>
            Tradição em Aprovação
          </p>
        </div>
      </footer>
    </div>
  );
}
