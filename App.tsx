import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Droplet, 
  Home, 
  Hammer, 
  Pickaxe, 
  Route,
  Layers,
  Layout,
  Users,
  X,
  MessageCircle,
  Plus,
  Trash2,
  Edit2,
  Save,
  LogOut,
  Lock,
  Loader2,
  Image as ImageIcon,
  Settings as SettingsIcon,
  ChevronRight
} from "lucide-react";

// Project Details Type
interface Project {
  id?: string;
  title: string;
  category: string;
  img: string;
  description: string;
  details: string[];
  gallery: string[];
  order: number;
}

interface AppSettings {
  adminEmail: string;
  leadsEmail: string;
}

interface AppData {
  projects: Project[];
  settings: AppSettings;
}

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img 
          src="/Logo.png" 
          alt="TEJOMA Logo" 
          className="h-12 w-auto"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/200x60/046c31/f7b42b?text=TEJOMA";
          }}
        />
      </div>
      <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest text-gray-700">
        <a href="#inicio" className="hover:text-brand-green transition-colors">Início</a>
        <a href="#sobre" className="hover:text-brand-green transition-colors">Sobre Nós</a>
        <a href="#servicos" className="hover:text-brand-green transition-colors">Serviços</a>
        <a href="#portfolio" className="hover:text-brand-green transition-colors">Portfólio</a>
        <a href="#contacto" className="bg-brand-green text-white px-6 py-2 rounded-full hover:bg-brand-green/90 transition-colors">Contactar</a>
      </div>
    </div>
  </nav>
);

const SectionHeading = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-1 bg-brand-yellow" />
      <span className={`text-sm font-bold uppercase tracking-widest ${light ? 'text-gray-300' : 'text-brand-green'}`}>
        {subtitle}
      </span>
    </div>
    <h2 className={`text-4xl md:text-5xl font-display font-bold ${light ? 'text-white' : 'text-brand-dark'}`}>
      {title}
    </h2>
  </div>
);

const WhatsAppButton = () => (
  <motion.a 
    href="https://wa.me/258879959127"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-colors"
  >
    <MessageCircle className="w-8 h-8" />
    <span className="absolute -top-2 -right-2 flex h-5 w-5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
      <span className="relative inline-flex rounded-full h-5 w-5 bg-brand-yellow"></span>
    </span>
  </motion.a>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-brand-yellow transition-colors z-10"
        >
          <X className="w-6 h-6 text-brand-dark" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="h-[400px] md:h-full">
            <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12">
            <span className="text-brand-green font-bold text-sm uppercase tracking-widest mb-4 inline-block">{project.category}</span>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-brand-dark">{project.title}</h3>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              {project.description}
            </p>
            
            <div className="mb-10">
              <h4 className="font-bold text-brand-dark mb-4 border-b pb-2 italic">Especificações do Projecto</h4>
              <ul className="grid grid-cols-1 gap-3">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow shrink-0 mt-1" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {project.gallery.map((img, idx) => (
                <img key={idx} src={img} alt="Gallery" className="rounded-xl h-32 w-full object-cover border border-gray-100 shadow-sm" />
              ))}
            </div>
            
            <button 
              onClick={() => {
                const element = document.getElementById('contacto');
                element?.scrollIntoView({ behavior: 'smooth' });
                onClose();
              }}
              className="mt-12 w-full bg-brand-green text-white py-4 rounded-xl font-bold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
            >
              Pedir Orçamento Similar <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<AppSettings>({ adminEmail: "", leadsEmail: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/db");
      const data: AppData = await res.json();
      setProjects(data.projects.sort((a, b) => a.order - b.order));
      setSettings(data.settings);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Check local storage for admin session
    if (localStorage.getItem("tejoma_admin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (password: string) => {
    if (password === "Tejoma2024") {
      setIsAdmin(true);
      localStorage.setItem("tejoma_admin", "true");
      setShowLogin(false);
      setShowAdmin(true);
    } else {
      alert("Palavra-passe incorrecta!");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("tejoma_admin");
    setShowAdmin(false);
  };

  const handleSaveProject = async (project: Project) => {
    const method = project.id ? "PUT" : "POST";
    const url = project.id ? `/api/projects/${project.id}` : "/api/projects";
    
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este projeto?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleSaveSettings = async (newSettings: AppSettings) => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings)
      });
      if (res.ok) {
        setSettings(newSettings);
        alert("Configurações salvas com sucesso!");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  const services = [
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Projectos",
      desc: "Idealizamos e elaboramos projectos de arquitectura com as respectivas especialidades, atendendo a todas as necessidades do cliente."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Execução de Obras",
      desc: "Equipe de profissionais preparados para a execução de todo tipo de obra, desde a implantação até ao design de interiores."
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: "Execução de Estradas",
      desc: "Elaboração de projectos com as respectivas especificações bem como a construção de todo tipo de estradas."
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "Piscinas & Furos",
      desc: "Construção de piscinas com acabamento de excelência e furos de água com alto controle de qualidade."
    }
  ];

  const stats = [
    { label: "Anos de Experiência", value: "6+" },
    { label: "Equipa Especializada", value: "20+" },
    { label: "Projectos Concluídos", value: "100+" },
    { label: "Alvará de Classe", value: "5ª" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/5 -skew-x-12 transform translate-x-1/4 -z-10" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                Inovação & Qualidade em Construção
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 leading-tight mb-8">
                Construindo o <span className="text-brand-green underline decoration-brand-yellow decoration-4">Futuro</span> de Moçambique
              </h1>
              <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                A TEJOMA Consultoria e Construções é uma empresa moçambicana comprometida com a excelência, 
                agregando valor através de soluções inteligentes e económicas.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#portfolio" className="bg-brand-green text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-brand-green/20 transition-all flex items-center gap-2">
                  Ver Portfólio <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#contacto" className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold hover:border-brand-green hover:text-brand-green transition-all">
                  Sobre Nós
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/Equipa.png" 
                  alt="Team" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000";
                  }}
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 p-6 bg-white rounded-2xl shadow-xl z-20 border border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-brand-yellow/20 rounded-lg text-brand-yellow">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase">Qualidade</p>
                    <p className="text-xl font-bold">Certificada</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-yellow rounded-full -z-10 blur-3xl opacity-30 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Nossa Identidade" subtitle="Sobre Nós" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Visão", 
                desc: "Sermos uma marca de expressão e reconhecimento nacional por nosso comportamento e histórico empresarial.",
                icon: <Users className="w-10 h-10 text-brand-green" />
              },
              { 
                title: "Missão", 
                desc: "Empreender soluções completas, inovadoras e de qualidade, reconhecida no mercado da construção civil.",
                icon: <Hammer className="w-10 h-10 text-brand-green" />
              },
              { 
                title: "Equipa", 
                desc: "Contamos com arquitectos, engenheiros e técnicos com vasta experiência e capacitação profissional.",
                icon: <Users className="w-10 h-10 text-brand-green" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-brand-green text-white rounded-3xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="text-5xl font-serif text-brand-yellow/30 absolute -top-4 -left-2 italic">"</div>
              <p className="text-xl md:text-2xl font-display font-medium leading-relaxed italic text-center md:text-left">
                O nosso lema é atrair, desenvolver e manter as melhores pessoas, reconhecendo em cada colaborador o activo principal.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-12 translate-x-10" />
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-display font-bold text-brand-green mb-2">{stat.value}</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="/EventsHall.jpg" 
                  alt="Salão de Eventos"
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000";
                  }}
                />
              </div>
            </div>
            
            <div>
              <SectionHeading title="Porquê nos escolher?" subtitle="Vantagens" />
              <div className="grid gap-6">
                {[
                  { title: "Qualidade Superior", desc: "Oferecemos garantias de qualidade nos serviços que prestamos, seguindo normas internacionais." },
                  { title: "Equipamento Moderno", desc: "Dispomos de equipamentos e maquinaria modernos que garantem a rapidez e precisão na execução de obras." },
                  { title: "Controle de Custos", desc: "Rígido controle de custos em busca de ganho de escala e transparência com nossos clientes." },
                  { title: "Alvará de 5ª Classe", desc: "A empresa possui alvará de 5ª classe que permite a execução de grandes obras públicas e privadas." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="mt-1">
                      <div className="w-6 h-6 rounded-full border-2 border-brand-yellow flex items-center justify-center group-hover:bg-brand-yellow transition-colors">
                        <div className="w-2 h-2 bg-brand-yellow rounded-full group-hover:bg-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <SectionHeading title="Soluções Completas" subtitle="Nossos Serviços" />
              <p className="text-lg text-gray-600">
                Oferecemos inovação de serviços, adequando-se a cada perfil e necessidade de nossos clientes, 
                antecipando tendências e oportunidades.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-brand-green transition-all hover:shadow-xl bg-white">
                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                <div className="w-8 h-1 bg-brand-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio/Gallery Section */}
      <section id="portfolio" className="py-24 bg-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Projectos de Destaque" subtitle="Portfólio" light />
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-brand-yellow" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Carregando Projectos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.length > 0 ? (
                projects.map((project, i) => (
                  <motion.div 
                    key={project.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-2">{project.category}</p>
                      <h4 className="text-xl font-bold">{project.title}</h4>
                      <div className="mt-4 flex items-center gap-2 text-sm font-bold text-white/80 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Ver detalhes <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-gray-400 mb-6">Nenhum projecto encontrado no portfólio.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>


      {/* Clients Section */}
      <section className="py-24 bg-gray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <SectionHeading title="Experiência em que pode confiar" subtitle="Nossos Clientes" />
        </div>
        
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
            {[
              { name: "IOM", logo: "/IOM.png" },
              { name: "Embaixada do Brasil", logo: "/EmbaixadadoBrasil.png" },
              { name: "SOS Aldeia", logo: "/SOSaldeias.jpg" },
              { name: "BCI", logo: "/BCI.png" },
              { name: "C.M. Maputo", logo: "/Municipio.jpg" },
              { name: "MADER", logo: "/Emblem_of_Mozambique.svg" },
              { name: "Ministério Indústria", logo: "/Emblem_of_Mozambique.svg" },
              { name: "ITRANMAR", logo: "/itransmar.png" },
            ].concat([
              { name: "IOM", logo: "/IOM.png" },
              { name: "Embaixada do Brasil", logo: "/EmbaixadadoBrasil.png" },
              { name: "SOS Aldeia", logo: "/SOSaldeias.jpg" },
              { name: "BCI", logo: "/BCI.png" },
              { name: "C.M. Maputo", logo: "/Municipio.jpg" },
              { name: "MADER", logo: "/Emblem_of_Mozambique.svg" },
              { name: "Ministério Indústria", logo: "/Emblem_of_Mozambique.svg" },
              { name: "ITRANMAR", logo: "/itransmar.png" },
            ]).map((client, i) => (
              <div key={i} className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-w-[240px] transition-transform hover:scale-105">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-brand-green rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
            
            <div className="grid md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Vamos construir o seu próximo projecto?</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Telefone</p>
                      <p className="font-bold">+258 87 995 9127</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Email</p>
                      <p className="font-bold">info@tejoma.co.mz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Localização</p>
                      <p className="font-bold">Av. Olof Palm, nº 1104, Banhine Shopping</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <form 
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const target = e.target as HTMLFormElement;
                  const formData = new FormData(target);
                  const payload = {
                    name: formData.get("name"),
                    email: formData.get("email"),
                    message: formData.get("message"),
                  };
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                      alert("Mensagem enviada com sucesso! Entraremos em contacto em breve.");
                      target.reset();
                    }
                  } catch (err) {
                    console.error("Error sending message:", err);
                    alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
                  }
                }}
              >
                <input name="name" type="text" required placeholder="Seu Nome" className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-brand-yellow placeholder:text-white/40" />
                <input name="email" type="email" required placeholder="Email" className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-brand-yellow placeholder:text-white/40" />
                <textarea name="message" required rows={4} placeholder="Sua Mensagem" className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-brand-yellow placeholder:text-white/40" />
                <button type="submit" className="w-full bg-brand-yellow text-brand-dark font-bold py-4 rounded-xl hover:bg-white transition-colors">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img 
              src="/Logo.png" 
              alt="TEJOMA Logo"
              className="h-10 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/150x45/046c31/f7b42b?text=TEJOMA";
              }}
            />
          </div>
          <p className="text-sm text-gray-500 font-bold">© {new Date().getFullYear()} TEJOMA Consultoria e Construções.</p>
          <div className="flex items-center gap-6">
            {!isAdmin ? (
              <button 
                onClick={() => setShowLogin(true)}
                className="text-gray-300 hover:text-brand-green transition-colors"
                title="Admin Login"
              >
                <Lock className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowAdmin(true)}
                  className="text-brand-green font-bold text-xs uppercase tracking-widest hover:underline"
                >
                  Painel Admin
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
            <a href="#" className="text-gray-400 hover:text-brand-green transition-colors font-bold text-xs uppercase">Linkedin</a>
            <a href="#" className="text-gray-400 hover:text-brand-green transition-colors font-bold text-xs uppercase">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-brand-green transition-colors font-bold text-xs uppercase">Facebook</a>
          </div>
        </div>
      </footer>

      <WhatsAppButton />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogin && (
          <LoginModal 
            onLogin={handleLogin} 
            onClose={() => setShowLogin(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdmin && isAdmin && (
          <AdminDashboard 
            projects={projects} 
            settings={settings}
            onSaveProject={handleSaveProject}
            onDeleteProject={handleDeleteProject}
            onSaveSettings={handleSaveSettings}
            onClose={() => setShowAdmin(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const LoginModal = ({ onLogin, onClose }: { onLogin: (pw: string) => void; onClose: () => void }) => {
  const [password, setPassword] = useState("");
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-brand-dark/95 flex items-center justify-center p-4 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-brand-dark">Acesso Restrito</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-gray-500 mb-8 text-sm">Insira a palavra-passe de administrador para acessar o painel de gestão.</p>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(password); }}>
          <input 
            type="password" 
            placeholder="Palavra-passe" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 rounded-xl border border-gray-100 mb-6 focus:border-brand-green outline-none"
            autoFocus
          />
          <button type="submit" className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-colors">
            Entrar
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const AdminDashboard = ({ 
  projects, 
  settings, 
  onSaveProject, 
  onDeleteProject, 
  onSaveSettings,
  onClose 
}: { 
  projects: Project[]; 
  settings: AppSettings;
  onSaveProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
  onSaveSettings: (s: AppSettings) => void;
  onClose: () => void 
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-gray-50 overflow-y-auto"
    >
      <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <SectionHeading title="Painel de Gestão" subtitle="TEJOMA" />
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeTab === 'projects' ? 'bg-brand-green text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Portfólio
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeTab === 'settings' ? 'bg-brand-green text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Configurações
          </button>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-brand-dark"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'projects' ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-brand-dark">Projectos no Portfólio ({projects.length})</h3>
              <button 
                onClick={() => setIsAdding(true)}
                className="bg-brand-yellow text-brand-dark px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white border border-transparent hover:border-brand-yellow transition-all"
              >
                <Plus className="w-5 h-5" /> Adicionar Projecto
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm group">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => setEditingProject(p)}
                        className="p-3 bg-white text-brand-dark rounded-full hover:bg-brand-yellow transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => p.id && onDeleteProject(p.id)}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-brand-green text-[10px] font-bold uppercase tracking-widest">{p.category}</span>
                    <h4 className="text-brand-dark font-bold text-lg mt-1">{p.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-brand-dark mb-8 flex items-center gap-3">
              <SettingsIcon className="text-brand-green" /> Configurações Gerais
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Email para Recepção de Leads</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                  <input 
                    type="email"
                    value={localSettings.leadsEmail}
                    onChange={e => setLocalSettings({ ...localSettings, leadsEmail: e.target.value })}
                    className="w-full pl-12 pr-6 py-4 rounded-xl border border-gray-100 focus:border-brand-green outline-none"
                    placeholder="exemplo@tejoma.co.mz"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">Este email receberá as submissões dos formulários de contacto do site.</p>
              </div>
              
              <div className="pt-6 border-t border-gray-50 flex justify-end">
                <button 
                  onClick={() => onSaveSettings(localSettings)}
                  className="bg-brand-green text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-dark transition-all flex items-center gap-2"
                >
                  <Save className="w-5 h-5" /> Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {(isAdding || editingProject) && (
        <ProjectForm 
          project={editingProject || undefined} 
          onSave={onSaveProject}
          onClose={() => {
            setIsAdding(false);
            setEditingProject(null);
          }} 
        />
      )}
    </motion.div>
  );
};

const ProjectForm = ({ project, onSave, onClose }: { project?: Project; onSave: (p: Project) => void; onClose: () => void }) => {
  const [formData, setFormData] = useState<Project>(
    project || {
      title: "",
      category: "Arquitectura",
      img: "",
      description: "",
      details: [""],
      gallery: ["", ""],
      order: 10
    }
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-brand-dark/80 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-display font-bold text-brand-dark">{project ? "Editar Projecto" : "Novo Projecto"}</h3>
          <button onClick={onClose} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Título do Projecto</label>
                <input 
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-brand-green outline-none"
                  placeholder="Ex: Condomínio Elite"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Categoria</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-brand-green outline-none bg-white"
                  >
                    <option>Arquitectura</option>
                    <option>Interiores</option>
                    <option>Estradas</option>
                    <option>Lazer</option>
                    <option>Reformas</option>
                    <option>Consultoria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Ordem</label>
                  <input 
                    type="number"
                    value={formData.order}
                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-brand-green outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Imagem Principal (URL)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                  <input 
                    required
                    value={formData.img}
                    onChange={e => setFormData({ ...formData, img: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 focus:border-brand-green outline-none font-mono text-xs"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Descrição Detalhada</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-brand-green outline-none text-sm leading-relaxed"
                  placeholder="Descreva o impacto e os objectivos do projecto..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Galeria de Imagens (URLs separadas por vírgula)</label>
                <textarea 
                  rows={3}
                  value={formData.gallery.join(', ')}
                  onChange={e => setFormData({ ...formData, gallery: e.target.value.split(',').map(s => s.trim()).filter(s => s !== "") })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-brand-green outline-none font-mono text-xs"
                  placeholder="link1, link2, link3..."
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-4">Especificações Técnicas (Tópicos separados por vírgula)</label>
            <textarea 
              rows={2}
              value={formData.details.join(', ')}
              onChange={e => setFormData({ ...formData, details: e.target.value.split(',').map(s => s.trim()).filter(s => s !== "") })}
              className="w-full px-4 py-3 rounded-xl border border-white focus:border-brand-green outline-none text-sm"
              placeholder="Ex: Fundações reforçadas, Acabamentos premium, Sistema fotovoltaico"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-8 py-4 font-bold text-gray-500 hover:text-brand-dark transition-colors"
            >
              Cancelar
            </button>
            <button 
              disabled={isSaving}
              className="bg-brand-green text-white px-12 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all disabled:opacity-50 shadow-lg shadow-brand-green/20"
            >
              {isSaving ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
              {project ? "Actualizar Projecto" : "Publicar Projecto"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
