import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useDarkMode } from "../hooks/use-dark-mode";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const slideFromRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const slideFromLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const rotateIn = {
  initial: { opacity: 0, rotate: -10, scale: 0.8 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  transition: { duration: 0.7, ease: "easeOut" },
};

// Components
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Advanced floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 300 - 150],
            y: [0, Math.random() * 300 - 150],
            scale: [1, Math.random() + 0.5, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: `linear-gradient(45deg, rgb(var(--brand-primary)), rgb(var(--brand-secondary)))`,
              opacity: 0.15 + Math.random() * 0.2,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Advanced background gradient animation
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(125, 211, 252, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Dark mode toggle component
const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <motion.button
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="dark-mode-toggle relative overflow-hidden"
      aria-label={
        isDarkMode ? "تبديل إلى الوضع الفاتح" : "تبديل إلى الوضع الداكن"
      }
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {isDarkMode ? (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))] opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-[rgb(var(--brand-primary))]/20 rounded-full animate-spin">
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-[rgb(var(--brand-primary))] rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* SEO Meta Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "خطوة للدعاية والإعلان",
            description:
              "وكالة إبداعية متخصصة في تصميم الهويات البصرية والتسويق الرقمي",
            url: "https://stepagency.com",
            logo: "https://cdn.builder.io/api/v1/assets/6cac5a504765458ea9034ccfe6de8d2b/logo-25dded",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+967-78-466-8027",
              contactType: "Customer Service",
            },
          }),
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="nav-professional"
      >
        <div className="container-padding">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <img
                src="https://cdn.builder.io/api/v1/assets/6cac5a504765458ea9034ccfe6de8d2b/logo-25dded?format=webp&width=800"
                alt="خطوة للدعاية والإعلان"
                className="h-12 md:h-14 lg:h-16 w-auto max-w-[200px] transition-opacity duration-300"
                loading="eager"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))] opacity-0 rounded-lg"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold">
              {[
                { href: "#home", text: "الرئيسية", icon: "🏠" },
                { href: "#about", text: "من نحن", icon: "ℹ️" },
                { href: "#services", text: "خدماتنا", icon: "⚙️" },
                { href: "#stats", text: "إنجازاتنا", icon: "📊" },
                { href: "#portfolio", text: "أعمالن💰", icon: "💼" },
                { href: "#team", text: "فريقنا", icon: "👥" },
                { href: "#suggestions", text: "اقتراحاتك", icon: "💡" },
                { href: "#contact", text: "تواصل معنا", icon: "📞" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative touch-target"
                >
                  <a
                    href={item.href}
                    className="relative flex items-center gap-2 transition-colors duration-300 hover:text-[rgb(var(--brand-primary))] py-2 px-3 rounded-lg mobile-optimized text-responsive-sm"
                  >
                    <span className="text-sm opacity-70">{item.icon}</span>
                    <span className="hidden lg:inline">{item.text}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))] group-hover:w-full transition-all duration-300"></span>
                    <motion.div
                      className="absolute inset-0 bg-[rgb(var(--brand-primary))]/10 rounded-lg opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <DarkModeToggle
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />

              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:inline-flex btn-primary relative overflow-hidden touch-target text-responsive-sm"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--brand-secondary))] to-[rgb(var(--brand-primary))] opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 hidden lg:inline">
                  احجز استشارتك المجانية
                </span>
                <span className="relative z-10 lg:hidden">احجز الآن</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-3 z-50 relative rounded-lg transition-colors duration-300 hover:bg-[rgb(var(--surface-variant))] touch-target mobile-optimized"
                aria-label="القائمة"
              >
                <div className="w-6 h-6 flex flex-col justify-around">
                  <motion.span
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 8 : 0,
                    }}
                    className="block h-0.5 w-6 bg-[rgb(var(--text-primary))] transform transition-all duration-300"
                  />
                  <motion.span
                    animate={{ opacity: isMenuOpen ? 0 : 1 }}
                    className="block h-0.5 w-6 bg-[rgb(var(--text-primary))] transition-all duration-300"
                  />
                  <motion.span
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? -8 : 0,
                    }}
                    className="block h-0.5 w-6 bg-[rgb(var(--text-primary))] transform transition-all duration-300"
                  />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden glass rounded-professional mt-4 safe-area-top"
          >
            <div className="py-4 space-y-2 scroll-area max-h-96 overflow-y-auto">
              {[
                { href: "#home", text: "الرئيسية", icon: "🏠" },
                { href: "#about", text: "من نحن", icon: "ℹ️" },
                { href: "#services", text: "خدماتنا", icon: "⚙️" },
                { href: "#stats", text: "إنجازاتنا", icon: "📊" },
                { href: "#portfolio", text: "أعمالنا", icon: "💼" },
                { href: "#team", text: "فريقنا", icon: "👥" },
                { href: "#suggestions", text: "اقتراحاتك", icon: "💡" },
                { href: "#contact", text: "تواصل معنا", icon: "📞" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 transition-colors duration-300 hover:text-[rgb(var(--brand-primary))] font-semibold py-3 px-4 rounded-lg hover:bg-[rgb(var(--surface-variant))] touch-target mobile-optimized text-responsive-base w-full"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1">{item.text}</span>
                  <motion.span
                    className="text-[rgb(var(--brand-primary))] opacity-0 group-hover:opacity-100"
                    whileHover={{ x: 5 }}
                  >
                    ←
                  </motion.span>
                </motion.a>
              ))}

              <div className="border-t border-[rgb(var(--outline-variant))] pt-4 mt-4">
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="block btn-primary text-center touch-target mx-4 text-responsive-base"
                >
                  احجز استشارتك المجانية 🚀
                </motion.a>

                {/* Social links in mobile menu */}
                <div className="flex justify-center gap-4 mt-4 px-4">
                  {["📘", "📸", "💼", "💬"].map((icon, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-[rgb(var(--surface-variant))] rounded-full flex items-center justify-center text-lg hover:bg-[rgb(var(--brand-primary))] hover:text-white transition-colors duration-300 touch-target"
                    >
                      {icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Animated Background */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--brand-primary))]/20 to-[rgb(var(--brand-secondary))]/20"></div>
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/50"></div>
          <AnimatedBackground />
        </motion.div>

        {/* Enhanced Floating Particles */}
        <FloatingParticles />

        {/* Hero Content */}
        <div className="relative z-10 text-center container-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass p-8 md:p-12 rounded-professional-xl shadow-professional-lg border border-white/20"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-[rgb(var(--brand-primary))]/20 text-[rgb(var(--brand-primary))] rounded-full text-sm font-semibold backdrop-blur-sm">
                🚀 وكالة إبداعية رائدة في اليمن
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 text-balance leading-tight"
            >
              نصنع لك
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                whileHover={{ scale: 1.05 }}
                className="text-gradient relative inline-block cursor-pointer"
              >
                {" "}
                هوية{" "}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))] opacity-20 blur-lg"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.span>
              لا تُنسى
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 text-white/90 leading-relaxed max-w-4xl mx-auto text-pretty px-4"
            >
              بتصاميم احترافية وإعلانات مؤثرة تجعل علامتك تتألق في الأسواق
              العالمية مع أحدث التقنيات والأساليب الإبداعية
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 px-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group btn-primary text-responsive-lg px-6 sm:px-8 py-3 sm:py-4 relative overflow-hidden touch-target mobile-optimized w-full sm:w-auto text-center"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--brand-secondary))] to-[rgb(var(--brand-primary))] opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-xl">🎯</span>
                  <span className="hidden sm:inline">
                    احجز استشارتك المجانية
                  </span>
                  <span className="sm:hidden">احجز الآن</span>
                </span>
              </motion.a>

              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-responsive-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 touch-target mobile-optimized w-full sm:w-auto"
              >
                <span className="text-xl">👁️</span>
                <span className="hidden sm:inline">شاهد أعمالنا</span>
                <span className="sm:hidden">أعمالنا</span>
              </motion.a>
            </motion.div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/70 px-4"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm border border-white/20 touch-target"
              >
                <span className="text-lg">⭐</span>
                <span className="hidden sm:inline">تقييم 4.9/5</span>
                <span className="sm:hidden">4.9/5</span>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm border border-white/20 touch-target"
              >
                <span className="text-lg">🏆</span>
                <span className="hidden sm:inline">أكثر من 500 عميل راضٍ</span>
                <span className="sm:hidden">500+ عميل</span>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm border border-white/20 touch-target"
              >
                <span className="text-lg">🚀</span>
                <span className="hidden sm:inline">أكثر من 1200 مشروع</span>
                <span className="sm:hidden">1200+ مشروع</span>
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center relative mx-auto"
          >
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
          <p className="text-white text-sm mt-2 opacity-70">مرر للأسفل</p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="section-padding bg-gradient-brand relative overflow-hidden"
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cg fill-opacity="0.1"%3E%3Cpolygon fill="%23fff" points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E\')] bg-center'
            }
          ></div>
        </div>

        <div className="container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-3 bg-white/20 rounded-full mb-6"
            >
              <span className="text-4xl">📈</span>
            </motion.div>
            <h2 className="heading-secondary text-white mb-6">
              أرقامنا تتحدث عنا
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
              سجل حافل من النجاحات والإنجازات مع عملائنا في جميع أنحاء المنطقة
              والعالم العربي
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              {
                number: 500,
                suffix: "+",
                label: "عميل راضٍ",
                icon: "👥",
                description: "في جميع أنحاء المنطقة",
                color: "from-green-400 to-green-600",
              },
              {
                number: 1200,
                suffix: "+",
                label: "مشروع مكتمل",
                icon: "🚀",
                description: "بجودة عالمية",
                color: "from-blue-400 to-blue-600",
              },
              {
                number: 95,
                suffix: "%",
                label: "معدل الرضا",
                icon: "⭐",
                description: "تقييم عملائنا",
                color: "from-yellow-400 to-orange-500",
              },
              {
                number: 5,
                suffix: "",
                label: "سنوات خبرة",
                icon: "🏆",
                description: "في السوق",
                color: "from-purple-400 to-purple-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass rounded-professional-lg p-8 text-center border border-white/30 hover:bg-white/30 transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-5xl mb-4 inline-block"
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-5xl md:text-6xl font-bold mb-2 text-white">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-xl font-semibold text-white mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-white/80">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Awards Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              شهادات وجوائز تقديرية
            </h3>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              {[
                "🏅 أفضل وكالة إبداعية",
                "🎖️ جائزة الابتكار",
                "⭐ تقييم 5 نجوم",
              ].map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-white/80 text-lg"
                >
                  {award}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding relative overflow-hidden">
        {/* Enhanced Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[rgb(var(--brand-primary))]/5 to-[rgb(var(--brand-secondary))]/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[rgb(var(--brand-secondary))]/5 to-[rgb(var(--brand-primary))]/5 rounded-full translate-y-48 -translate-x-48"></div>
        <AnimatedBackground />

        <div className="container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-3 bg-[rgb(var(--brand-primary))]/10 rounded-full mb-6"
            >
              <span className="text-4xl">ℹ️</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">من نحن</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              قصة نجاح بدأت برؤية واضحة لتقديم أفضل الحلول الإبداعية في المنطقة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideFromLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6">رؤيتنا للمستقبل</h3>
              <p className="text-lg leading-relaxed mb-6 text-pretty">
                تأسست "خطوة" لتقديم حلول مبتكرة في مجال الدعاية والإعلان، بخبرة
                تجمع بين الإبداع والاحتراف العالمي. نعمل على بناء الهويات
                التجارية القوية، وتنفيذ الحملات التسويقية المؤثرة، وإدارة
                المحتوى الرقمي باحترافية تضاهي المعايير العالمية.
              </p>
              <p className="text-lg leading-relaxed mb-8 text-pretty">
                نؤمن بأن كل علامة تجارية لها قصة فريدة تستحق أن تُروى بطريقة
                إبداعية ومؤثرة تلامس قلوب الجمهور وتحقق النتائج المرجوة في عالم
                تتزايد فيه المنافسة والتحديات يوماً بعد يوم.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {[
                  {
                    title: "الإبداع اللامحدود",
                    desc: "تصام💰م مبتكرة تعكس هويتك الف💰يدة وتميزك",
                    icon: "🎨",
                    color: "from-pink-500 to-rose-500",
                  },
                  {
                    title: "الاحترافية العالمية",
                    desc: "جودة عالمية في كل مشروع نقوم به",
                    icon: "⚡",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "السرعة والدقة",
                    desc: "تسليم في المواعيد المحددة بأعلى جودة",
                    icon: "🚀",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    title: "الدعم المتواصل",
                    desc: "مساندة مستمرة لضمان نجاحك وتميزك",
                    icon: "🤝",
                    color: "from-purple-500 to-violet-500",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="card p-6 hover:border-[rgb(var(--brand-primary))] group relative overflow-hidden"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="text-3xl"
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <h4 className="font-semibold mb-2 text-lg">
                            {item.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-pretty">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideFromRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-professional-xl shadow-professional-lg">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
                  alt="فريق العمل"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--brand-primary))]/40 to-transparent"></div>

                {/* Enhanced Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute top-6 right-6 card p-4 backdrop-blur-sm border border-white/20"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient flex items-center gap-2">
                      🚀 500+
                    </div>
                    <div className="text-xs">مشروع ناجح</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 left-6 card p-4 backdrop-blur-sm border border-white/20"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient flex items-center gap-2">
                      🏆 8+
                    </div>
                    <div className="text-xs">سنوات خبرة</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute top-1/2 left-6 transform -translate-y-1/2 card p-3 backdrop-blur-sm border border-white/20"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-gradient">
                      ⭐ 4.9
                    </div>
                    <div className="text-xs">تقييم العملاء</div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-brand rounded-full opacity-70"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-brand rounded-full opacity-70"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 -right-2 w-4 h-4 bg-[rgb(var(--brand-secondary))] rounded-full opacity-60"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section
        id="services"
        className="section-padding bg-[rgb(var(--surface-variant))] relative overflow-hidden"
      >
        <AnimatedBackground />
        <div className="container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-3 bg-[rgb(var(--brand-primary))]/10 rounded-full mb-6"
            >
              <span className="text-4xl">⚙️</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">خدماتنا الاحترافية</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              نقدم مج💰وعة شاملة من الخدمات المتخصصة لبناء علامتك التجارية
              وتحقيق أهدافك التسويقية بأحدث الاستراتيجيات والتقنيات العالمية
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              {
                icon: "🎨",
                title: "تصميم الهوية البصرية",
                description:
                  "شعارات وهويات بصرية متكاملة تعكس شخصية علامتك التجارية وتميزك عن المنافسين في السوق المحلي والعالمي",
                features: [
                  "تصميم الشعار الاحترافي",
                  "دليل الهوية البصرية الشامل",
                  "القرطاسية والمطبوعات التجارية",
                  "التطبيقات الرقمية والتفاعلية",
                ],
                image:
                  "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "from-blue-500 to-[rgb(var(--brand-primary))]",
                pricing: "ابتداءً من 3$",
              },
              {
                icon: "📱",
                title: "إدارة وسائل التواصل",
                description:
                  "استراتيجيات محتوى مدروسة وإدارة احترافية لحساباتك على منصات التواصل الاجتماعي لزيادة التفاعل والمتابعين",
                features: [
                  "استراتيجية المحتوى المتخصصة",
                  "التصميم والإبداع المستمر",
                  "النشر والتفاعل اليومي",
                  "التحليل والتقارير الشهرية",
                ],
                image:
                  "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "from-pink-500 to-red-500",
                pricing: "ابتداءً من 5$/شهر",
              },
              {
                icon: "🖨️",
                title: "التصميم والطباعة",
                description:
                  "مواد طب💰عية عالية الجودة من الكروت الشخصية إلى اللافتات الكبيرة بأحدث التقنيات والمواد المتطورة",
                features: [
                  "الكروت الشخصية الفاخرة",
                  "البروشورات والكتيبات التفاعلية",
                  "اللافتات الإعلانية الكبيرة",
                  "التغليف والعبوات المبتكرة",
                ],
                image:
                  "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "from-green-500 to-teal-500",
                pricing: "حسب الكمية والنوع",
              },
              {
                icon: "📈",
                title: "الإعلانات الممولة",
                description:
                  "حملات إعلانية مدروسة ومستهدفة عبر جميع المنصات الرقمية لضمان أفضل عائد استثمار وتحقيق الأهداف المحددة",
                features: [
                  "فيسبوك وإنستقرام المتقدم",
                  "💰وجل أدوردز المتخصص",
                  "سناب شات وتيك توك الحديث",
                  "يوتيوب ولينكد إن الاحترافي",
                ],
                image:
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "from-orange-500 to-yellow-500",
                pricing: "15% من ميزانية الإعلان",
              },
              {
                icon: "🎬",
                title: "إنتاج المحتوى المرئي",
                description:
                  "محتوى مرئي احترافي وموشن جرافيك مبدع يحكي قصة علامتك التجارية بطريقة جذابة ومؤثرة تصل إلى قلب جمهورك",
                features: [
                  "إنتاج الفيديو الاحترافي",
                  "الموشن جرافيك المتقدم",
                  "التصوير الفوتوغرافي الإبداعي",
                  "المونتاج والإخراج الفني",
                ],
                image:
                  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "from-purple-500 to-indigo-500",
                pricing: "ابتداءً من 10$/فيديو",
              },
              {
                icon: "🌐",
                title: "تطوير المواقع",
                description:
                  "مواقع إلكترونية عصرية ومتجاوبة مع جميع الأجهزة مع أفضل تجربة مستخدم وتحسين محركات البحث المتقدم",
                features: [
                  "التصميم المتجاوب الحديث",
                  "التطوير البرمجي المتقدم",
                  "تحسين السيو والأداء",
                  "الاستضافة والصيانة المستمرة",
                ],
                image:
                  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                color: "from-cyan-500 to-blue-500",
                pricing: "ابتداءً من 10$",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  y: -15,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                }}
                className="card rounded-professional-xl overflow-hidden hover:shadow-professional-lg transition-all duration-500 cursor-pointer group relative"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`}
                  />
                  <div className="absolute top-4 right-4 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl">
                    {service.icon}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm text-white backdrop-blur-sm">
                      {service.pricing}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="mb-6 leading-relaxed text-pretty">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-gradient-brand rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${service.color} text-white hover:shadow-lg relative overflow-hidden group touch-target mobile-optimized text-responsive-base`}
                  >
                    <motion.div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>اطلب الخدمة الآن</span>
                      <span className="text-lg">🚀</span>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Portfolio Section */}
      <section
        id="portfolio"
        className="section-padding relative overflow-hidden"
      >
        <AnimatedBackground />
        <div className="container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-3 bg-[rgb(var(--brand-primary))]/10 rounded-full mb-6"
            >
              <span className="text-4xl">💼</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">معرض أعمالنا المتميزة</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              اكتشف مجموعة من أفضل أعمالنا التي نفخر بتقديمها لعملائنا في مختلف
              القطاعات والمجالات التجارية والخدمية
            </p>
          </motion.div>

          {/* Portfolio Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              "الكل",
              "هوية بصرية",
              "مواقع إلكترونية",
              "حملات إعلانية",
              "محتوى مرئي",
            ].map((filter, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full border border-[rgb(var(--brand-primary))] text-[rgb(var(--brand-primary))] hover:bg-[rgb(var(--brand-primary))] hover:text-white transition-all duration-300"
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              {
                title: "مطعم الأصالة العربية",
                category: "هوية بصرية شاملة",
                image:
                  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                color: "from-orange-500 to-red-500",
                description: "تصميم هوية متكاملة تعكس التراث العربي الأصيل",
                client: "مطعم الأصالة",
                year: "2024",
                tags: ["هوية", "مطاعم", "تراث"],
              },
              {
                title: "شركة التقنية الذكية",
                category: "موقع إلكتروني متقدم",
                image:
                  "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                color: "from-blue-500 to-[rgb(var(--brand-primary))]",
                description: "منصة تقنية حديثة بتصميم عصري وتجربة مستخدم مميزة",
                client: "TechSmart",
                year: "2024",
                tags: ["تقنية", "موقع", "تطبيق"],
              },
              {
                title: "معرض الفن المعاصر",
                category: "حملة إعلانية متكاملة",
                image:
                  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                color: "from-purple-500 to-pink-500",
                description: "حملة إبداعية شاملة لترويج المعرض الفني",
                client: "معرض الإبداع",
                year: "2023",
                tags: ["فن", "إعلان", "ثقافة"],
              },
              {
                title: "عيادة النخبة الطبية",
                category: "تصميم شامل ومتكامل",
                image:
                  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                color: "from-green-500 to-teal-500",
                description: "هوية طبية احترافية تعكس الثقة والجودة",
                client: "عيادة النخبة",
                year: "2024",
                tags: ["طبي", "صحة", "احتراف"],
              },
              {
                title: "متجر الأزياء العصرية",
                category: "إدارة سوشيال ميديا",
                image:
                  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                color: "from-pink-500 to-[rgb(var(--brand-secondary))]",
                description: "استراتيجية محتوى جذابة لعلامة أزياء عصرية",
                client: "Fashion Plus",
                year: "2024",
                tags: ["أزياء", "تسويق", "موضة"],
              },
              {
                title: "شركة الاستثمار العقاري",
                category: "هوية وموقع إلكتروني",
                image:
                  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                color: "from-gray-600 to-gray-800",
                description: "حلول رقمية متكاملة لشركة عقارية رائدة",
                client: "العقارية الذهبية",
                year: "2023",
                tags: ["عقارات", "استثمار", "أعمال"],
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-professional-xl shadow-professional hover:shadow-professional-lg transition-all duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}
                  />

                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-white/80 mb-2">
                        {project.category} • {project.year}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-pretty mb-2">
                        {project.description}
                      </p>
                      <div className="text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        العميل: {project.client}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Hover Effect Icon */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                  >
                    <span className="text-white text-xl">👁️</span>
                  </motion.div>

                  {/* Project Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              عرض جميع الأعمال (50+ مشروع)
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Rest of sections remain the same but with enhanced images and animations... */}
      {/* I'll continue with the remaining sections in the same enhanced style */}

      {/* Team Section */}
      <section
        id="team"
        className="section-padding bg-[rgb(var(--surface-variant))] relative overflow-hidden"
      >
        <AnimatedBackground />
        <div className="container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-3 bg-[rgb(var(--brand-primary))]/10 rounded-full mb-6"
            >
              <span className="text-4xl">👥</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">فريق الخبراء المتميز</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              نخبة من المبدعين والمتخصصين في مجالات التصميم والتسويق الرقمي
              والتطوير التقني
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6"
          >
            {[
              {
                name: "يوسف محمد البرطي",
                role: "المدير التنفيذي",
                experience: "قائد الفريق والرؤية الاستراتيجية",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F6cac5a504765458ea9034ccfe6de8d2b%2F6c7456068af848219559eaa784d241f7",
                social: ["linkedin", "twitter", "instagram"],
                color: "from-blue-500 to-[rgb(var(--brand-primary))]",
                specialties: ["القيادة", "الإدارة", "الاستراتيجية"],
                quote: "نؤمن بقوة الإبداع في تحويل الأحلام إلى واقع",
              },
              {
                name: "عبدالاله النهاري",
                role: "مدير إبداعي",
                experience: "خبير في التصميم والابتكار",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F6cac5a504765458ea9034ccfe6de8d2b%2F93479ab707c04af6abe521a574d24ff3",
                social: ["behance", "dribbble", "linkedin"],
                color:
                  "from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))]",
                specialties: ["الإبداع", "التصميم", "الابتكار"],
                quote: "كل تصميم يحكي قصة، ونحن نكتب أجمل القصص",
              },
              {
                name: "محمد مقبل نعمان",
                role: "مختص تسويق رقمي",
                experience: "استراتيجي التسويق الرقمي",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F6cac5a504765458ea9034ccfe6de8d2b%2F07f3061b142043b482f427d689ddeaa1",
                social: ["linkedin", "twitter", "facebook"],
                color: "from-green-500 to-teal-500",
                specialties: ["التسويق", "الحملات", "التحليل"],
                quote: "التسويق الناجح يبدأ بفهم عميق لاحتياجات العملاء",
              },
              {
                name: "محمود عبدالغني الشرفي",
                role: "مطور ومصمم مواقع",
                experience: "خبير التقنية والتطوير",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2F6cac5a504765458ea9034ccfe6de8d2b%2Fe600234db88349078d9ae78a2b881deb",
                social: ["github", "linkedin", "behance"],
                color: "from-purple-500 to-blue-500",
                specialties: ["التطوير", "التصميم", "التقنية"],
                quote: "نحول الأفكار إلى تجارب رقمية مذهلة",
              },
              {
                name: "عبدالله مناع",
                role: "أخصائي علاقات عامة",
                experience: "خبير التواصل والعلاقا��",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                social: ["linkedin", "twitter", "instagram"],
                color: "from-orange-500 to-red-500",
                specialties: ["العلاقات", "التواصل", "الإعلام"],
                quote: "التواصل الفعال هو الجسر بين الأحلام والواقع",
              },
              {
                name: "اسيد محمد البرعي",
                role: "مصمم جرافيك",
                experience: "فنان الرسوميات والإبداع البصري",
                image:
                  "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                social: ["behance", "dribbble", "instagram"],
                color: "from-pink-500 to-[rgb(var(--brand-secondary))]",
                specialties: ["التصميم", "الجرافيك", "الهوية"],
                quote: "الفن الحقيقي يكمن في البساطة المعبرة",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -15, scale: 1.02 }}
                className="card rounded-professional-xl overflow-hidden hover:shadow-professional-lg transition-all duration-500 group relative"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-center mb-3">
                      <p className="text-xs italic opacity-90 mb-3">
                        "{member.quote}"
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center mb-3">
                      {member.social.map((platform, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xs border border-white/30"
                        >
                          🔗
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Team member number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm border border-white/30">
                    {index + 1}
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-1 text-balance">
                    {member.name}
                  </h3>
                  <p className="text-[rgb(var(--brand-primary))] font-medium mb-2 text-sm">
                    {member.role}
                  </p>
                  <p className="text-xs opacity-70">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Team Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { number: "25+", label: "سنوات خبرة جماعية", icon: "🏆" },
                { number: "15+", label: "شهادة احترافية", icon: "📜" },
                { number: "100%", label: "التزام بالجودة", icon: "✨" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-[rgb(var(--brand-primary))] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm opacity-70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section
        id="testimonials"
        className="section-padding relative overflow-hidden"
      >
        <AnimatedBackground />
        <div className="container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-3 bg-[rgb(var(--brand-primary))]/10 rounded-full mb-6"
            >
              <span className="text-4xl">💬</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">آراء عملائنا الكرام</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              شهادات حقيقية من عملائنا الذين حققوا النجاح معنا وشهدوا نمواً
              ملحوظاً في أعمالهم ومبيعاتهم
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              {
                name: "أحمد محمد الأسود",
                company: "مطعم البركة",
                role: "المدير العام",
                content:
                  "تعامل راقي ومهني، حق��وا لنا زيادة في المبيعات بنسبة 150% خلال 6 أشهر. فريق محترف وإبداعي حقاً.",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                date: "منذ شهرين",
                project: "تصميم هوية بصرية شاملة",
              },
              {
                name: "فاطمة عبدالله السالم",
                company: "عيادة النور الطبية",
                role: "مديرة العيادة",
                content:
                  "خدمة استثنائية! ساعدونا في بناء ثقة المرضى من خلال التصميم المتميز وإدارة الحسابات الا💰تماعية بشكل احترافي.",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1494790108755-2616c999db1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                date: "منذ 3 أشهر",
                project: "هوية طبية + إدارة سوشيال ميديا",
              },
              {
                name: "خالد يوسف النجار",
                company: "شركة التميز للتجارة",
                role: "المدير التنفيذي",
                content:
                  "أفضل استثمار قمنا به! الموقع الإلكتروني الجديد زاد من مبيعاتنا الأونلاين بشكل كبير. شكراً لفريق خطوة المبدع.",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                date: "منذ شهر",
                project: "تطوير موقع إلكتروني متكامل",
              },
              {
                name: "سارة أحمد الحداد",
                company: "معهد الإبداع التعليمي",
                role: "مؤسسة الم💰هد",
                content:
                  "تصاميم رائعة وأفكار مبتكرة! ساعدونا في جذب الطلاب الجدد وبناء سمعة قوية في السوق التعليمي.",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                date: "منذ 4 أشهر",
                project: "حملة تسويقية شاملة",
              },
              {
                name: "محمد علي الشامي",
                company: "مؤسسة الشامي التجا��ية",
                role: "صاحب المؤسسة",
                content:
                  "فريق متفهم لاحتياجاتنا، سرعة في التنفيذ وجودة عالية في العمل. نوصي بهم بشدة لكل من يريد التميز.",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                date: "منذ شهرين",
                project: "تصميم هوية + مطبوعات",
              },
              {
                name: "ليلى محمد القاسم",
                company: "صالون الأناقة",
                role: "مالكة الصالون",
                content:
                  "تحسن كبير في حضور🎨�ا الرقمي! زبائن جدد كل يوم بفضل ا💰حملات الإعلانية المدروسة والمحتوى الجذاب.",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                date: "منذ 5 أشهر",
                project: "إدارة سوشيال ميديا + إعلانات",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card rounded-professional-xl p-6 hover:shadow-professional-lg transition-all duration-500 relative overflow-hidden group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--brand-primary))]/5 to-[rgb(var(--brand-secondary))]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Stars Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        className="text-yellow-400 text-lg"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="mb-6">
                    <p className="text-lg leading-relaxed text-pretty italic">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-start gap-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[rgb(var(--brand-primary))]/20"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-[rgb(var(--brand-primary))] font-medium text-sm mb-1">
                        {testimonial.role}
                      </p>
                      <p className="text-sm opacity-70 mb-2">
                        {testimonial.company}
                      </p>
                      <div className="flex items-center justify-between text-xs opacity-60">
                        <span>{testimonial.date}</span>
                        <span className="bg-[rgb(var(--brand-primary))]/10 px-2 py-1 rounded-full">
                          {testimonial.project}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="absolute top-4 left-4 text-[rgb(var(--brand-primary))]/20 text-4xl font-bold">
                  "
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "98%", label: "معدل رضا العملاء", icon: "😊" },
                { number: "500+", label: "عميل راضٍ", icon: "👥" },
                { number: "4.9/5", label: "متوسط التقييم", icon: "⭐" },
                { number: "24/7", label: "دعم فني مستمر", icon: "🔧" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-[rgb(var(--brand-primary))] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm opacity-70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Suggestions Section */}
      <section
        id="suggestions"
        className="section-padding bg-[rgb(var(--surface-variant))] relative overflow-hidden"
      >
        <AnimatedBackground />
        <div className="container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-3 bg-[rgb(var(--brand-primary))]/10 rounded-full mb-6"
            >
              <span className="text-4xl">💡</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">اقتراحاتك تهمنا</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              نسعد بتلقي آرائكم واقتراحاتكم لتطوير خدماتنا وتحسين تجربتكم معنا
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Suggestion Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                شاركنا اقتراحك
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium">الاسم</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-[rgb(var(--outline-variant))] rounded-lg focus:outline-none focus:border-[rgb(var(--brand-primary))] transition-colors"
                      placeholder="أدخل اسمك"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-[rgb(var(--outline-variant))] rounded-lg focus:outline-none focus:border-[rgb(var(--brand-primary))] transition-colors"
                      placeholder="example@domain.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium">
                    نوع الاقتراح
                  </label>
                  <select className="w-full px-4 py-3 border border-[rgb(var(--outline-variant))] rounded-lg focus:outline-none focus:border-[rgb(var(--brand-primary))] transition-colors">
                    <option value="">اختر نوع الاقتراح</option>
                    <option value="service">تحسين الخدمات</option>
                    <option value="design">تطوير التصاميم</option>
                    <option value="website">تحسين الموقع</option>
                    <option value="support">خدمة العملاء</option>
                    <option value="pricing">الأسعار والعروض</option>
                    <option value="other">أخرى</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium">التفاصيل</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-[rgb(var(--outline-variant))] rounded-lg focus:outline-none focus:border-[rgb(var(--brand-primary))] transition-colors resize-none"
                    placeholder="اكتب اقتراحك بالتفصيل..."
                  ></textarea>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 text-responsive-base touch-target mobile-optimized"
                >
                  <span className="flex items-center justify-center gap-2">
                    💡 إرسال الاقتراح
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Suggestion Categories */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-8">
                كيف يمكننا تحسين خدماتنا؟
              </h3>

              {[
                {
                  icon: "🎨",
                  title: "التصاميم والإبداع",
                  description: "اقتراحات حول جودة التصاميم وأساليب الإبداع",
                  color: "from-pink-500 to-rose-500",
                },
                {
                  icon: "⚡",
                  title: "سرعة التنفيذ",
                  description: "أفكار لتحسين أوقات التسليم وكفاءة العمل",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: "💰",
                  title: "الأسعار والعروض",
                  description: "اقتراحات حول الباقات والأسعار والعروض الخاصة",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: "🤝",
                  title: "خدمة العملاء",
                  description: "تحسين تجربة التعامل والدعم الفني",
                  color: "from-purple-500 to-violet-500",
                },
                {
                  icon: "🌐",
                  title: "الموقع والتجربة",
                  description: "تطوير الموقع وتحسين تجربة المستخدم",
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: "📈",
                  title: "خدمات جديدة",
                  description: "اقتراحات لخدمات وم💰تجات جديدة",
                  color: "from-indigo-500 to-blue-500",
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="card p-6 hover:shadow-professional-lg transition-all duration-300 group relative overflow-hidden cursor-pointer"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <div className="relative z-10 flex items-start gap-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-12 h-12 bg-[rgb(var(--brand-primary))]/10 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    >
                      {category.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        {category.title}
                      </h4>
                      <p className="text-sm opacity-70 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Suggestion Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { number: "250+", label: "اقتراح تم تنفيذه", icon: "✅" },
                { number: "95%", label: "من الاقتراحات مفيدة", icon: "💡" },
                { number: "48", label: "ساعة متوسط الرد", icon: "⚡" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-[rgb(var(--brand-primary))] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm opacity-70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section
        id="contact"
        className="section-padding bg-gradient-brand relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cg fill-opacity="0.1"%3E%3Cpolygon fill="%23fff" points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E\')] bg-center'
            }
          ></div>
        </div>

        <div className="container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block p-3 bg-white/20 rounded-full mb-6"
            >
              <span className="text-4xl">📞</span>
            </motion.div>
            <h2 className="heading-secondary text-white mb-6">
              تواصل معنا الآن
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
              جاهزون لتحويل أفكارك إلى واقع مبهر. تواصل معنا ال💰وم واحصل على
              استشارة مجانية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              variants={slideFromLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="glass rounded-professional-xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                احجز استشارتك المجانية
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-white text-sm font-medium">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors backdrop-blur-sm"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="block text-white text-sm font-medium">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors backdrop-blur-sm"
                      placeholder="+967 XX XXX XXXX"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="block text-white text-sm font-medium">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors backdrop-blur-sm"
                    placeholder="example@domain.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="block text-white text-sm font-medium">
                    نوع الخدمة المطلوبة
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition-colors backdrop-blur-sm">
                    <option value="" className="bg-gray-800">
                      اختر نوع ��لخدمة
                    </option>
                    <option value="branding" className="bg-gray-800">
                      تصميم الهوية البصرية
                    </option>
                    <option value="social" className="bg-gray-800">
                      إدارة وسائل التواصل
                    </option>
                    <option value="printing" className="bg-gray-800">
                      التصميم والطباعة
                    </option>
                    <option value="ads" className="bg-gray-800">
                      الإعلانات الممولة
                    </option>
                    <option value="video" className="bg-gray-800">
                      إنتاج المحتوى المرئي
                    </option>
                    <option value="web" className="bg-gray-800">
                      تطوير المواقع
                    </option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label className="block text-white text-sm font-medium">
                    تفاصيل المشروع
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors backdrop-blur-sm resize-none"
                    placeholder="اكتب تفاصيل مشروعك وما تريد تحقيقه..."
                  ></textarea>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-white text-[rgb(var(--brand-primary))] rounded-lg font-bold text-lg hover:bg-white/90 transition-colors relative overflow-hidden group"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    🚀 إرسال الطلب
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={slideFromRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid gap-6">
                {[
                  {
                    icon: "📱",
                    title: "رقم الهاتف",
                    info: "+967-78-466-8027",
                    description: "متاح 24/7 للرد على استفساراتك",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: "📧",
                    title: "البريد الإلكتروني",
                    info: "stepdesign.agency@gmail.com",
                    description: "نرد خلال ساعة واحدة",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: "📍",
                    title: "العنوان",
                    info: "صنعاء، اليمن",
                    description: "نخدم العملاء في جميع أنحاء العالم العربي",
                    color: "from-purple-500 to-violet-500",
                  },
                  {
                    icon: "⏰",
                    title: "ساعات العمل",
                    info: "السبت - الخميس",
                    description: "من 9 صباحاً إلى 6 مساءً",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="glass rounded-professional-lg p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group relative overflow-hidden"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <div className="relative z-10 flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                      >
                        {contact.icon}
                      </motion.div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-1">
                          {contact.title}
                        </h4>
                        <p className="text-white/90 font-medium mb-2">
                          {contact.info}
                        </p>
                        <p className="text-white/70 text-sm">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass rounded-professional-lg p-6 border border-white/20"
              >
                <h4 className="text-white font-bold text-lg mb-4">
                  تابعنا على وسائل الت��اصل
                </h4>
                <div className="flex gap-4">
                  {[
                    {
                      platform: "Facebook",
                      icon: "📘",
                      color: "from-blue-600 to-blue-700",
                    },
                    {
                      platform: "Instagram",
                      icon: "📸",
                      color: "from-pink-500 to-purple-600",
                    },
                    {
                      platform: "Twitter",
                      icon: "🐦",
                      color: "from-sky-400 to-sky-600",
                    },
                    {
                      platform: "LinkedIn",
                      icon: "💼",
                      color: "from-blue-700 to-blue-800",
                    },
                    {
                      platform: "WhatsApp",
                      icon: "💬",
                      color: "from-green-500 to-green-600",
                    },
                  ].map((social, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center text-white text-xl hover:shadow-lg transition-all duration-300`}
                    >
                      {social.icon}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-[rgb(var(--surface-primary))] border-t border-[rgb(var(--outline-variant))] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cg fill-opacity="0.1"%3E%3Cpolygon fill="%23000" points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E\')] bg-center'
            }
          ></div>
        </div>

        <div className="container-padding relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <img
                  src="https://cdn.builder.io/api/v1/assets/6cac5a504765458ea9034ccfe6de8d2b/logo-25dded?format=webp&width=400"
                  alt="خطوة للدعاية والإعلان"
                  className="h-12 w-auto mb-4"
                  loading="lazy"
                />
                <p className="leading-relaxed text-pretty mb-6">
                  وكالة إبداعية رائدة متخصصة في تصميم الهويات البصرية والتسويق
                  الرقمي، نساعدك في بناء علامة تجارية قوية ومؤثرة.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[rgb(var(--brand-primary))]">📱</span>
                  <span className="font-medium">+967-78-466-8027</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[rgb(var(--brand-primary))]">📧</span>
                  <span>stepdesign.agency@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[rgb(var(--brand-primary))]">📍</span>
                  <span>صنعاء، اليمن</span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold mb-6 text-[rgb(var(--brand-primary))]">
                خدماتنا
              </h4>
              <ul className="space-y-3">
                {[
                  "تصميم الهوية البصرية",
                  "إدارة وسائل التواصل",
                  "التصميم والطباعة",
                  "الإعلانات الممولة",
                  "إنتاج المحتوى المرئي",
                  "تطوير المواقع",
                ].map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="#services"
                      className="hover:text-[rgb(var(--brand-primary))] transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-[rgb(var(--brand-primary))] rounded-full"></span>
                      {service}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold mb-6 text-[rgb(var(--brand-primary))]">
                روابط سريعة
              </h4>
              <ul className="space-y-3">
                {[
                  { text: "من نحن", href: "#about" },
                  { text: "أعمالنا", href: "#portfolio" },
                  { text: "فريقنا", href: "#team" },
                  { text: "آراء العملاء", href: "#testimonials" },
                  { text: "اقتراحاتك", href: "#suggestions" },
                  { text: "تواصل معنا", href: "#contact" },
                  { text: "سياسة الخصوصية", href: "#privacy" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="hover:text-[rgb(var(--brand-primary))] transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-[rgb(var(--brand-primary))] rounded-full"></span>
                      {link.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold mb-6 text-[rgb(var(--brand-primary))]">
                ابق على اطلاع
              </h4>
              <p className="mb-4 text-sm leading-relaxed">
                اشترك في نشرتنا البريدية للحصول على آخر الأخبار والعروض الحصرية.
              </p>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="flex-1 px-4 py-3 border border-[rgb(var(--outline-variant))] rounded-lg focus:outline-none focus:border-[rgb(var(--brand-primary))] transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-brand text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    اشتراك
                  </motion.button>
                </div>

                <div className="flex gap-4 pt-4">
                  {[
                    {
                      platform: "Facebook",
                      icon: "📘",
                      color: "hover:text-blue-600",
                    },
                    {
                      platform: "Instagram",
                      icon: "📸",
                      color: "hover:text-pink-500",
                    },
                    {
                      platform: "Twitter",
                      icon: "🐦",
                      color: "hover:text-sky-500",
                    },
                    {
                      platform: "LinkedIn",
                      icon: "💼",
                      color: "hover:text-blue-700",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href="#"
                      className={`text-2xl transition-all duration-300 ${social.color}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-[rgb(var(--outline-variant))] py-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-right">
                <p>&copy; 2024 خطوة للدعاية والإعلان. جميع الحقوق محفوظة.</p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <a
                  href="#privacy"
                  className="hover:text-[rgb(var(--brand-primary))] transition-colors"
                >
                  سياسة الخصوصية
                </a>
                <a
                  href="#terms"
                  className="hover:text-[rgb(var(--brand-primary))] transition-colors"
                >
                  شروط الاستخدام
                </a>
                <a
                  href="#sitemap"
                  className="hover:text-[rgb(var(--brand-primary))] transition-colors"
                >
                  خريطة الموقع
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Floating Action Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-50 safe-area-bottom"
          style={{ direction: "ltr" }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-brand rounded-full flex items-center justify-center text-white text-xl sm:text-2xl shadow-professional-lg hover:shadow-professional-xl transition-all duration-300 touch-target mobile-optimized group relative overflow-hidden"
          >
            <motion.div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">💬</span>

            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-brand rounded-full opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.a>

          {/* Tooltip for desktop */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="hidden lg:block absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap backdrop-blur-sm"
          >
            تواصل معنا
            <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 border-4 border-transparent border-l-black/80"></div>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}
