"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";

export default function Home() {
  const [isLight, setIsLight] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typingText, setTypingText] = useState("Développeur Web");
  
  const modalRef = useRef(null);

  // 1. Gestion du Thème Sombre / Clair
  const toggleTheme = () => setIsLight(!isLight);

  useEffect(() => {
    if (isLight) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [isLight]);

  // 2. Menu Mobile
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 3. Modale WhatsApp
  const openModal = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Fermer la modale si on clique à côté
  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) closeModal();
  };

  const WA_NUM = "237683242487";
  const whatsappMessage = "Bonjour Godwin ! J'ai visité votre landing page et je suis intéressé par vos services. J'ai une idée digitale que j'aimerais concrétiser et j'aurais besoin de votre aide. Pouvons-nous en parler ?";
  const whatsappUrl = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(whatsappMessage)}`;

  // 4. Effet d'écriture (Typing Effect)
  useEffect(() => {
    const words = ["Développeur Web", "Créateur SaaS", "Builder Africain", "Étudiant Passionné"];
    let wi = 0, ci = 0, del = false;
    let timeoutId;

    function type() {
      const w = words[wi];
      if (!del) {
        setTypingText(w.slice(0, ++ci));
        if (ci === w.length) {
          del = true;
          timeoutId = setTimeout(type, 1900);
          return;
        }
      } else {
        setTypingText(w.slice(0, --ci));
        if (ci === 0) {
          del = false;
          wi = (wi + 1) % words.length;
        }
      }
      timeoutId = setTimeout(type, del ? 55 : 100);
    }

    timeoutId = setTimeout(type, 900);
    return () => clearTimeout(timeoutId);
  }, []);

  // 5. Effets 3D Tilt (Souris desktop uniquement)
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;

    const cards = document.querySelectorAll(".tilt-card");
    const avatar = document.querySelector(".hero-avatar"); // Correction de la classe ici (.hero-avatar)

    // Déclaration propre des gestionnaires pour pouvoir les supprimer au démontage
    const createCardMoveHandler = (card) => (e) => {
      const r = card.getBoundingClientRect();
      const rx = ((r.height / 2 - (e.clientY - r.top)) / r.height) * 12;
      const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 12;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
      card.style.boxShadow = "0 18px 50px rgba(108,99,255,.18)";
    };

    const createCardLeaveHandler = (card) => () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
      card.style.boxShadow = "";
    };

    const handleMouseMoveAvatar = (e) => {
      if (!avatar) return;
      const r = avatar.getBoundingClientRect();
      const rx = ((r.height / 2 - (e.clientY - r.top)) / r.height) * 20;
      const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 20;
      avatar.style.transform = `perspective(400px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.06)`;
    };

    const handleMouseLeaveAvatar = () => {
      if (avatar) avatar.style.transform = "";
    };

    // Tableaux pour stocker les références des fonctions créées
    const cardHandlers = [];

    cards.forEach((card) => {
      const onMove = createCardMoveHandler(card);
      const onLeave = createCardLeaveHandler(card);
      
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      
      cardHandlers.push({ card, onMove, onLeave });
    });

    if (avatar) {
      avatar.addEventListener("mousemove", handleMouseMoveAvatar);
      avatar.addEventListener("mouseleave", handleMouseLeaveAvatar);
    }

    // Nettoyage strict et efficace des écouteurs d'événements
    return () => {
      cardHandlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
      if (avatar) {
        avatar.removeEventListener("mousemove", handleMouseMoveAvatar);
        avatar.removeEventListener("mouseleave", handleMouseLeaveAvatar);
      }
    };
  }, []);

  // 6. Scroll Fade Animation (Intersection Observer)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".fade-in").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // SCROLL SMOOTH FONCTION
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Script Spline chargé par Next.js */}
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />

      <div className="grid-bg"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      {/* MODAL WHATSAPP */}
      <div 
        className={`modal-overlay ${isModalOpen ? "open" : ""}`} 
        ref={modalRef} 
        onClick={handleOverlayClick}
      >
        <div className="modal">
          <div className="modal-ico">💬</div>
          <div className="modal-title">Envoyer un message WhatsApp</div>
          <p className="modal-sub">Ce message sera envoyé directement à Godwin :</p>
          <div className="modal-preview">"{whatsappMessage}"</div>
          <div className="modal-btns">
            <a className="btn-wa" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-whatsapp"></i> Oui, envoyer
            </a>
            <button className="btn-cancel" onClick={closeModal}>Non, annuler</button>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav>
        <img className="hero-avatar" src="/marc.jpeg" alt="Marc Godwin" />
        <ul className="nav-links">
          <li><a onClick={() => scrollToSection("projects")}>Projets</a></li>
          <li><a onClick={() => scrollToSection("skills")}>Compétences</a></li>
          <li><a onClick={() => scrollToSection("services")}>Services</a></li>
          <li><a onClick={() => scrollToSection("contact")}>Contact</a></li>
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme} title="Thème">
            <i id="themeIcon" className={isLight ? "ti ti-sun" : "ti ti-moon"}></i>
          </button>
          <button className="nav-cta" onClick={() => scrollToSection("contact")}>
            Me contacter
          </button>
          <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* MENU MOBILE CORRIGÉ */}
      <div className={`mobile-menu-wrapper ${isMenuOpen ? "open" : ""}`} onClick={() => setIsMenuOpen(false)}>
        <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <a onClick={() => scrollToSection("projects")}>Projets</a>
          <a onClick={() => scrollToSection("skills")}>Compétences</a>
          <a onClick={() => scrollToSection("services")}>Services</a>
          <a onClick={() => scrollToSection("contact")}>Contact</a>
          <a onClick={openModal}>Démarrer un projet</a>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-text fade-in">
            <div className="hero-badge-container">
              <div className="hero-badge">
                <span className="badge-dot"></span>Disponible pour des projets
              </div>
            </div>
            <h1 className="hero-title">
              Bonjour, je suis<br />
              <span className="hero-name">Marc Godwin</span>
            </h1>
            <p className="hero-subtitle">
              <span>{typingText}</span> &amp; Créateur Digital
            </p>
            <p className="hero-desc">
              Étudiant en informatique à l'Université de Dschang, Cameroun.
              Je construis des plateformes web modernes, des applications SaaS
              et des expériences digitales qui ont un impact réel.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollToSection("projects")}>
                <i className="ti ti-code"></i> <span className="social-label">Voir mes projets</span>
              </button>
              <a className="btn-secondary" href="https://github.com/Godwin296" target="_blank" rel="noopener noreferrer">
                <i className="ti ti-brand-github"></i> <span className="social-label">GitHub</span>
              </a>
              <a className="btn-secondary" href="https://www.tiktok.com/@marc_godwin" target="_blank" rel="noopener noreferrer">
                <i className="ti ti-brand-tiktok"></i> <span className="social-label">TikTok</span>
              </a>
              <a className="btn-secondary" href="https://youtube.com/@marc_godwin" target="_blank" rel="noopener noreferrer">
                <i className="ti ti-brand-youtube"></i> <span className="social-label">YouTube</span>
              </a>
            </div>
          </div>

          {/* ROBOT 3D AVEC ANTI-WATERMARK EN DUR */}
          <div className="hero-robot fade-in">
            <spline-viewer
              url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              loading-anim-type="spinner-small-dark"
            ></spline-viewer>
            <div className="robot-fade"></div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-bar">
          <div className="stat">
            <div className="stat-num num-purple">3</div>
            <div className="stat-label">Projets actifs</div>
          </div>
          <div className="stat">
            <div className="stat-num num-teal">Bac C</div>
            <div className="stat-label">Mention Bien · 2025</div>
          </div>
          <div className="stat">
            <div className="stat-num num-red">∞</div>
            <div className="stat-label">Passion du code</div>
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section className="section fade-in" id="projects">
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">Projets en cours</h2>
        <div className="divider"></div>
        <p className="section-desc">Des plateformes conçues pour résoudre des problèmes réels au Cameroun et en Afrique.</p>
        <div className="projects-grid">
          <div className="project-card tilt-card">
            <span className="project-status status-active"><span className="status-dot"></span>En dev</span>
            <div className="project-icon icon-purple">
              <i className="ti ti-pill" style={{ color: "#9D97FF", fontSize: "20px" }}></i>
            </div>
            <div className="project-name">PHARMACIE+</div>
            <p className="project-desc">Plateforme de gestion automatique de pharmacie avec suivi du stock en temps réel, intégration IA, déploiement Docker et gestion des comptes clients.</p>
            <div className="project-tags">
              <span className="tag tag-purple">SaaS</span>
              <span className="tag tag-teal">IA</span>
              <span className="tag tag-blue">Docker</span>
              <span className="tag tag-orange">Temps réel</span>
            </div>
          </div>

          <div className="project-card tilt-card">
            <span className="project-status status-active"><span className="status-dot"></span>En dev</span>
            <div className="project-icon icon-teal">
              <i className="ti ti-school" style={{ color: "#00D4AA", fontSize: "20px" }}></i>
            </div>
            <div className="project-name">FAXETUDIANT</div>
            <p className="project-desc">Archive académique pour étudiants : épreuves d'examen, TDs, supports de cours, simulation d'examens et entraînement pour booster les performances.</p>
            <div className="project-tags">
              <span className="tag tag-teal">EdTech</span>
              <span className="tag tag-blue">Archivage</span>
              <span className="tag tag-purple">Simulation</span>
            </div>
          </div>

          <div className="project-card tilt-card">
            <span className="project-status status-active"><span className="status-dot"></span>En dev</span>
            <div className="project-icon icon-orange">
              <i className="ti ti-map-pin" style={{ color: "#FF6B6B", fontSize: "20px" }}></i>
            </div>
            <div className="project-name">INDIGO</div>
            <p className="project-desc">App mobile de mise en contact entre clients et travailleurs. Géolocalisation des talents, messagerie, appels, système de notation et écosystème professionnel.</p>
            <div className="project-tags">
              <span className="tag tag-orange">Mobile</span>
              <span className="tag tag-teal">Géoloc</span>
              <span className="tag tag-blue">Marketplace</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <div className="skills-section" id="skills">
        <div className="skills-inner fade-in">
          <div className="section-label">Compétences</div>
          <h2 className="section-title">Stack technique</h2>
          <div className="divider"></div>
          <p className="section-desc">Les technologies que j'utilise pour construire des produits modernes.</p>
          <div className="skills-grid">
            <div className="skill-card tilt-card">
              <div className="skill-icon icon-purple"><i className="ti ti-brand-javascript" style={{ color: "#9D97FF", fontSize: "17px" }}></i></div>
              <div><div className="skill-name">JS · TS · HTML5 · CSS3</div><div className="skill-level">Frontend</div></div>
            </div>
            <div className="skill-card tilt-card">
              <div className="skill-icon icon-teal"><i className="ti ti-brand-react" style={{ color: "#00D4AA", fontSize: "17px" }}></i></div>
              <div><div className="skill-name">React · Next.js · Tailwind</div><div className="skill-level">Applications web</div></div>
            </div>
            <div className="skill-card tilt-card">
              <div className="skill-icon icon-purple"><i className="ti ti-server" style={{ color: "#9D97FF", fontSize: "17px" }}></i></div>
              <div><div className="skill-name">Node.js · Django · FastAPI</div><div className="skill-level">API &amp; Backend</div></div>
            </div>
            <div className="skill-card tilt-card">
              <div className="skill-icon icon-teal"><i className="ti ti-database" style={{ color: "#00D4AA", fontSize: "17px" }}></i></div>
              <div><div className="skill-name">PostgreSQL · MongoDB</div><div className="skill-level">Bases de données</div></div>
            </div>
            <div className="skill-card tilt-card">
              <div className="skill-icon icon-orange"><i className="ti ti-brand-docker" style={{ color: "#FF6B6B", fontSize: "17px" }}></i></div>
              <div><div className="skill-name">Docker · Vercel · Netlify</div><div className="skill-level">Déploiement</div></div>
            </div>
            <div className="skill-card tilt-card">
              <div className="skill-icon icon-purple"><i className="ti ti-brand-python" style={{ color: "#9D97FF", fontSize: "17px" }}></i></div>
              <div><div className="skill-name">Python · Scripts &amp; IA</div><div className="skill-level">Automatisation</div></div>
            </div>
            <div className="skill-card tilt-card">
              <div className="skill-icon icon-teal"><i className="ti ti-device-mobile" style={{ color: "#00D4AA", fontSize: "17px" }}></i></div>
              <div><div className="skill-name">React Native · Flutter</div><div className="skill-level">Mobile cross-platform</div></div>
            </div>
            <div className="skill-card tilt-card">
              <div className="skill-icon icon-orange"><i className="ti ti-brand-github" style={{ color: "#FF6B6B", fontSize: "17px" }}></i></div>
              <div><div className="skill-name">Git · GitHub</div><div className="skill-level">Versioning</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="section fade-in" id="services">
        <div className="section-label">Services</div>
        <h2 className="section-title">Ce que je peux faire pour toi</h2>
        <div className="divider"></div>
        <div className="services-grid">
          <div className="service-card tilt-card">
            <div className="service-num">01</div>
            <div className="service-name">Applications SaaS</div>
            <p className="service-desc">Plateformes web complètes avec authentification, tableau de bord, abonnements et API robuste.</p>
          </div>
          <div className="service-card tilt-card">
            <div className="service-num">02</div>
            <div className="service-name">Sites vitrines</div>
            <p className="service-desc">Sites modernes, rapides et optimisés pour présenter votre activité et convertir vos visiteurs.</p>
          </div>
          <div className="service-card tilt-card">
            <div className="service-num">03</div>
            <div className="service-name">Landing pages</div>
            <p className="service-desc">Pages de conversion percutantes avec design immersif, animations soignées et CTA efficaces.</p>
          </div>
          <div className="service-card tilt-card">
            <div className="service-num">04</div>
            <div className="service-name">Portfolios</div>
            <p className="service-desc">Portfolios personnalisés pour développeurs, designers — votre identité, votre style.</p>
          </div>
          <div className="service-card tilt-card">
            <div className="service-num">05</div>
            <div className="service-name">Applications web</div>
            <p className="service-desc">Applications React/Next.js performantes avec interfaces modernes et UX optimale.</p>
          </div>
          <div className="service-card tilt-card">
            <div className="service-num">06</div>
            <div className="service-name">Apps mobiles</div>
            <p className="service-desc">Applications React Native adaptées aux réalités réseau africaines.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="cta-section fade-in" id="contact">
        <div className="cta-box tilt-card">
          <div className="cta-glow"></div>
          <h2 className="cta-title">Travaillons ensemble</h2>
          <p className="cta-desc">
            Je suis à mes débuts mais je donne tout ce que j'ai dans chaque projet.
            Si tu as une idée, un problème à résoudre ou un produit à construire — je suis là.
          </p>
          <div className="cta-actions">
            <button className="btn-primary" onClick={openModal}>
              <i className="ti ti-brand-whatsapp"></i> Démarrer un projet
            </button>
            <a className="btn-gh" href="https://github.com/Godwin296" target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-github"></i> Voir GitHub
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="footer-wrap" id="footer">
        <footer>
          <p className="footer-copy">© 2026 <span>SIGNING DONGMO Marc Godwin</span> · Dschang, Cameroun</p>
          <div className="footer-links">
            <a href="https://github.com/Godwin296" target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-github"></i> GitHub
            </a>
            <a href="mailto:marcgodwinsigningdongmo@gmail.com">
              <i className="ti ti-mail"></i> Email
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-whatsapp"></i> WhatsApp
            </a>
            <a href="tel:+237640415518">
              <i className="ti ti-phone-call"></i> Orange
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}