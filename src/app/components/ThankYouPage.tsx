import { useNavigate } from "react-router";
import { Users, MessageCircle, ArrowRight, Trophy, BookOpen } from "lucide-react";

const B = import.meta.env.BASE_URL;

const nextSteps = [
  {
    icon: MessageCircle,
    title: "Acesse o Grupo do WhatsApp",
    description: "Você foi redirecionado para nosso grupo exclusivo. Caso não tenha conseguido acessar, clique no botão abaixo.",
  },
  {
    icon: BookOpen,
    title: "Apresente-se no Grupo",
    description: "Entre no grupo e diga olá! Compartilhe qual concurso você está visando para nossos professores poderem te ajudar melhor.",
  },
  {
    icon: Users,
    title: "Aguarde o Contato da Nossa Equipe",
    description: "Em breve nossa equipe entrará em contato pelo WhatsApp para apresentar os planos e materiais disponíveis para você.",
  },
];

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/L0WGWp68RRpFwC073zXnyM?mode=gi_t";

export function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white" style={{ background: "#000" }}>
      {/* Top red line */}
      <div className="w-full h-[3px] bg-[#CE1C1C]" />

      {/* Navbar */}
      <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <img src={`${B}marca.PNG`} alt="CP Preparação" className="h-8 w-auto" />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-[2px] bg-[#CE1C1C]" />
            <span className="text-[#CE1C1C] text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700 }}>
              Cadastro Realizado
            </span>
          </div>
          <h1 className="text-white uppercase leading-none mb-4" style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: "clamp(2.2rem, 6vw, 3.5rem)", fontWeight: 900 }}>
            Bem-vindo à<br />
            <span style={{ color: "#CE1C1C" }}>Família CP!</span>
          </h1>
          <p className="text-white/50 leading-relaxed" style={{ fontFamily: "'Saira', sans-serif" }}>
            Você deu o primeiro passo rumo à sua aprovação. Acesse o grupo exclusivo no WhatsApp e comece agora.
          </p>
        </div>

        {/* Next steps */}
        <div className="flex flex-col mb-10" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          {nextSteps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5"
              style={{ borderBottom: i < nextSteps.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", borderLeft: "3px solid #CE1C1C" }}
            >
              <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center" style={{ background: "rgba(206,28,28,0.12)" }}>
                <step.icon className="text-[#CE1C1C]" size={18} />
              </div>
              <div>
                <p className="text-white/30 text-xs uppercase mb-1" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700 }}>
                  Passo {i + 1}
                </p>
                <h3 className="text-white mb-1 uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Saira', sans-serif" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 mb-10" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          {[
            { value: "300+", label: "Aprovados" },
            { value: "98%", label: "Satisfação" },
            { value: "6+", label: "Professores" },
          ].map((stat, i) => (
            <div key={i} className="text-center py-5" style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <p style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 900, fontSize: "1.8rem", color: "#CE1C1C" }}>{stat.value}</p>
              <p className="text-white/30 text-xs uppercase tracking-widest" style={{ fontFamily: "'Saira', sans-serif" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-5 p-5 mb-10" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <img src={`${B}marcos.png`} alt="Prof. Marcos" className="w-20 h-24 object-cover object-top flex-shrink-0" style={{ borderLeft: "3px solid #CE1C1C" }} />
          <div>
            <p className="text-[#CE1C1C] text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700 }}>
              Mensagem do Fundador
            </p>
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Saira', sans-serif" }}>
              "Seja bem-vindo! Você acaba de dar o passo mais importante rumo à sua aprovação. Nossa equipe está pronta para te apoiar em cada etapa."
            </p>
            <p className="text-white/30 text-xs mt-2 uppercase" style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700 }}>— Prof. Marquinho Germano</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white uppercase transition-all hover:opacity-90 active:scale-95"
            style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.1em", background: "#CE1C1C", padding: "14px 28px" }}
          >
            <MessageCircle size={18} /> ACESSAR GRUPO DO WHATSAPP <ArrowRight size={16} />
          </a>
          <button
            onClick={() => navigate("/")}
            className="text-white/30 hover:text-white/60 text-sm transition-colors uppercase tracking-widest"
            style={{ fontFamily: "'Saira Condensed', sans-serif", fontWeight: 600 }}
          >
            Voltar ao início
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t px-6 py-6 text-center" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <p className="text-white/20 text-xs" style={{ fontFamily: "'Saira', sans-serif" }}>
          © 2025 CP Preparação · Tradição em Aprovação
        </p>
      </div>
    </div>
  );
}
