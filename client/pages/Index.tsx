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

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: `linear-gradient(45deg, rgb(var(--brand-primary)), rgb(var(--brand-secondary)))`,
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.1 + Math.random() * 0.2,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, Math.random() + 0.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
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
      className="dark-mode-toggle"
      aria-label={
        isDarkMode ? "تبديل إلى الوضع الفاتح" : "تبديل إلى الوضع الداكن"
      }
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
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
    </motion.button>
  );
};

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="nav-professional"
      >
        <div className="container-padding">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="https://cdn.builder.io/api/v1/assets/6cac5a504765458ea9034ccfe6de8d2b/logo-25dded?format=webp&width=800"
                alt="خطوة للدعاية والإعلان"
                className="h-16 w-auto transition-opacity duration-300"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8 font-semibold">
              {[
                { href: "#home", text: "الرئيسية" },
                { href: "#about", text: "من نحن" },
                { href: "#services", text: "خدماتنا" },
                { href: "#stats", text: "إنجازاتنا" },
                { href: "#portfolio", text: "أعمالنا" },
                { href: "#team", text: "فريقنا" },
                { href: "#contact", text: "تواصل معنا" },
              ].map((item, index) => (
                <motion.li key={index} whileHover={{ y: -2 }}>
                  <a
                    href={item.href}
                    className="relative group transition-colors duration-300 hover:text-[rgb(var(--brand-primary))]"
                  >
                    {item.text}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))] group-hover:w-full transition-all duration-300"></span>
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
                className="hidden lg:inline-flex btn-primary"
              >
                احجز استشارتك المجانية
              </motion.a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 z-50 relative rounded-lg transition-colors duration-300 hover:bg-[rgb(var(--surface-variant))]"
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
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden glass"
          >
            <div className="py-4 space-y-4">
              {[
                { href: "#home", text: "الرئيسية" },
                { href: "#about", text: "من نحن" },
                { href: "#services", text: "خدماتنا" },
                { href: "#stats", text: "إنجازاتنا" },
                { href: "#portfolio", text: "أعمالنا" },
                { href: "#team", text: "فريقنا" },
                { href: "#contact", text: "تواصل معنا" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="block transition-colors duration-300 hover:text-[rgb(var(--brand-primary))] font-semibold py-2"
                >
                  {item.text}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{ delay: 0.7 }}
                onClick={() => setIsMenuOpen(false)}
                className="inline-block btn-primary mt-4"
              >
                احجز استشارتك المجانية
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--brand-primary))]/20 to-[rgb(var(--brand-secondary))]/20"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://source.unsplash.com/1920x1080/?creative,office,modern,workspace,team')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40"></div>
        </motion.div>

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Hero Content */}
        <div className="relative z-10 text-center container-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass p-8 md:p-12 rounded-professional-xl shadow-professional-lg"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="heading-primary mb-6 text-balance"
            >
              نصنع لك
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-gradient"
              >
                {" "}
                هوية{" "}
              </motion.span>
              لا تُنسى
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl mb-8 text-[rgb(var(--text-secondary))] leading-relaxed max-w-4xl mx-auto text-pretty"
            >
              بتصاميم احترافية وإعلانات مؤثرة تجعل علامتك تتألق في السوق
              العالمية مع أحدث التقنيات والأساليب الإبداعية
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                <span className="relative z-10">احجز استشارتك المجانية</span>
              </motion.a>

              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                شاهد أعمالنا
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
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
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cg fill-opacity="0.1"%3E%3Cpolygon fill="%23fff" points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E\')] bg-center animate-pulse'
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
            <h2 className="heading-secondary text-white mb-6">
              أرقامنا تتحدث عنا
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
              سجل حافل من النجاحات والإنجازات مع عملائنا في جميع أنحاء المنطقة
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid-professional grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                number: 500,
                suffix: "+",
                label: "عميل راضٍ",
                icon: "👥",
                description: "في جميع أنحاء المنطقة",
              },
              {
                number: 1200,
                suffix: "+",
                label: "مشروع مكتمل",
                icon: "🚀",
                description: "بجودة عالمية",
              },
              {
                number: 95,
                suffix: "%",
                label: "معدل الرضا",
                icon: "⭐",
                description: "تقييم عملائنا",
              },
              {
                number: 8,
                suffix: "",
                label: "سنوات خبرة",
                icon: "🏆",
                description: "في السوق",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass rounded-professional-lg p-8 text-center border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-5xl md:text-6xl font-bold mb-2 text-white">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-white/80">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[rgb(var(--brand-primary))]/5 to-[rgb(var(--brand-secondary))]/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[rgb(var(--brand-secondary))]/5 to-[rgb(var(--brand-primary))]/5 rounded-full translate-y-48 -translate-x-48"></div>

        <div className="container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">من نحن</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              قصة نجاح بدأت برؤية واضحة لتقديم أفضل الحلول الإبداعية
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
                تأسست "خطوة" لتقديم حل��ل مبتكرة في مجال الدعاية والإعلان، بخبرة
                تجمع بين الإبداع والاحتراف. نعمل على بناء الهويات التجارية
                القوية، وتنفيذ الحملات التسويقية المؤثرة، وإدارة المحتوى الرقمي
                باحترافية عالمية.
              </p>
              <p className="text-lg leading-relaxed mb-8 text-pretty">
                نؤمن بأن كل علامة تجارية لها قصة فريدة تستحق أن تُروى بطريقة
                إبداعية ومؤثرة تلامس قلوب الجمهور وتحقق النتائج المرجوة في عالم
                تتزايد فيه المنافسة يوماً بعد يوم.
              </p>

              <div className="grid-professional grid-cols-1 md:grid-cols-2">
                {[
                  {
                    title: "الإبداع",
                    desc: "تصاميم مبتكرة تعكس هويتك الفريدة",
                    icon: "🎨",
                  },
                  {
                    title: "الاحترافية",
                    desc: "جودة عالمية في كل مشروع",
                    icon: "⚡",
                  },
                  {
                    title: "السرعة",
                    desc: "تسليم في المواعيد المحددة",
                    icon: "🚀",
                  },
                  {
                    title: "الدعم",
                    desc: "مساندة مستمرة لنجاحك",
                    icon: "🤝",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="card p-4 hover:border-[rgb(var(--brand-primary))]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm leading-relaxed text-pretty">
                          {item.desc}
                        </p>
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
                  src="https://source.unsplash.com/700x600/?creative,team,modern,office,workspace"
                  alt="فريق العمل"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--brand-primary))]/30 to-transparent"></div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute top-6 right-6 card p-4 backdrop-blur-sm"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">500+</div>
                    <div className="text-xs">مشروع ناجح</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 left-6 card p-4 backdrop-blur-sm"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">8+</div>
                    <div className="text-xs">سنوات خبرة</div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="section-padding bg-[rgb(var(--surface-variant))] relative overflow-hidden"
      >
        <div className="container-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">خدماتنا الاحترافية</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              نقدم مجموعة شاملة من الخدمات المتخصصة لبناء علامتك التجارية وتحقيق
              أهدافك التسويقية بأحدث الأساليب والتقنيات
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid-professional grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: "🎨",
                title: "تصميم الهوية البصرية",
                description:
                  "شعارات وهويات بصرية متكاملة تعكس شخصية علامتك التجارية وتميزك عن المنافسين في السوق",
                features: [
                  "تصميم الشعار الاحترافي",
                  "دليل الهوية البصرية",
                  "القرطاسية والمطبوعات",
                  "التطبيقات الرقمية",
                ],
                image:
                  "https://source.unsplash.com/400x300/?logo,design,branding,creative",
                color: "from-blue-500 to-[rgb(var(--brand-primary))]",
              },
              {
                icon: "📱",
                title: "إدارة وسائل التواصل",
                description:
                  "استراتيجيات محتوى مدروسة وإدارة احترافية لحساباتك على منصات التواصل الاجتماعي لزيادة التفاعل",
                features: [
                  "استراتيجية المحتوى",
                  "التصميم والإبداع",
                  "النشر والتفاعل",
                  "التحليل والتقارير",
                ],
                image:
                  "https://source.unsplash.com/400x300/?social,media,phone,digital",
                color: "from-pink-500 to-red-500",
              },
              {
                icon: "🖨️",
                title: "التصميم والطباعة",
                description:
                  "مواد طباعية عالية الجودة من الكروت الشخصية إلى اللافتات الكبيرة بأحدث التقنيات والمواد",
                features: [
                  "الكروت الشخصية",
                  "البروشورات والكتيبات",
                  "اللافتات الإعلانية",
                  "التغليف والعبوات",
                ],
                image:
                  "https://source.unsplash.com/400x300/?printing,design,business,cards",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: "📈",
                title: "الإعلانات الممولة",
                description:
                  "حملات إعلانية مدروسة ومستهدفة عبر جميع المنصات الرقمية لضمان أفضل عائد استثمار وتحقيق الأهداف",
                features: [
                  "فيسبوك وإنستقرام",
                  "جوجل أدوردز",
                  "سناب شات وتيك توك",
                  "يوتيوب ولينكد إن",
                ],
                image:
                  "https://source.unsplash.com/400x300/?digital,marketing,ads,analytics",
                color: "from-orange-500 to-yellow-500",
              },
              {
                icon: "🎬",
                title: "إنتاج المحتوى المرئي",
                description:
                  "فيديوهات احترافية وموشن جرافيك مبتكر يحكي قصة علامتك التجارية بطريقة جذابة ومؤثرة",
                features: [
                  "إنتاج الفيديو",
                  "الموشن جرافيك",
                  "التصوير الفوتوغرافي",
                  "المونتاج والإخراج",
                ],
                image:
                  "https://source.unsplash.com/400x300/?video,production,camera,filming",
                color: "from-purple-500 to-indigo-500",
              },
              {
                icon: "🌐",
                title: "تطوير المواقع",
                description:
                  "مواقع إلكترونية عصرية ومتجاوبة مع جميع الأجهزة مع أفضل تجربة مستخدم وتحسين محركات البحث",
                features: [
                  "التصميم المتجاوب",
                  "التطوير البرمجي",
                  "تحسين السيو",
                  "الاستضافة والصيانة",
                ],
                image:
                  "https://source.unsplash.com/400x300/?website,development,coding,computer",
                color: "from-cyan-500 to-blue-500",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  y: -10,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                }}
                className="card rounded-professional-xl overflow-hidden hover:shadow-professional-lg transition-all duration-500 cursor-pointer group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`}
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                    {service.icon}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {service.title}
                    </h3>
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
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${service.color} text-white hover:shadow-lg`}
                  >
                    اطلب الخدمة الآن
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding">
        <div className="container-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">معرض أعمالنا</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              اكتشف مجموعة من أفضل أعمالنا التي نفخر بتقديمها لعملائنا في مختلف
              القطاعات والمجالات
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid-professional grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: "مطعم الأصالة العربية",
                category: "هوية بصرية شاملة",
                image:
                  "https://source.unsplash.com/600x400/?restaurant,branding,arabic,food",
                color: "from-orange-500 to-red-500",
                description: "تصميم هوية متكاملة تعكس التراث العربي الأصيل",
              },
              {
                title: "شركة التقنية الذكية",
                category: "موقع إلكتروني متقدم",
                image:
                  "https://source.unsplash.com/600x400/?tech,website,modern,digital",
                color: "from-blue-500 to-[rgb(var(--brand-primary))]",
                description: "منصة تقنية حديثة بتصميم عصري وتجربة مستخدم مميزة",
              },
              {
                title: "معرض الفن المعاصر",
                category: "حملة إعلانية متكاملة",
                image:
                  "https://source.unsplash.com/600x400/?art,gallery,exhibition,modern",
                color: "from-purple-500 to-pink-500",
                description: "حملة إبداعية شاملة لترويج المعرض الفني",
              },
              {
                title: "عيادة النخبة الطبية",
                category: "تصميم شامل ومتكامل",
                image:
                  "https://source.unsplash.com/600x400/?medical,clinic,healthcare,modern",
                color: "from-green-500 to-teal-500",
                description: "هوية طبية احترافية تعكس الثقة والجودة",
              },
              {
                title: "متجر الأزياء العصرية",
                category: "إدارة سوشيال ميديا",
                image:
                  "https://source.unsplash.com/600x400/?fashion,clothing,store,boutique",
                color: "from-pink-500 to-[rgb(var(--brand-secondary))]",
                description: "استراتيجية محتوى جذابة لعلامة أزياء عصرية",
              },
              {
                title: "شركة الاستثمار العقاري",
                category: "هوية وموقع إلكتروني",
                image:
                  "https://source.unsplash.com/600x400/?real,estate,building,architecture",
                color: "from-gray-600 to-gray-800",
                description: "حلول متكاملة لشركة عقارية رائدة",
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
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}
                  />

                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-sm text-white/80 mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-pretty">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect Icon */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xl">👁️</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              عرض جميع الأعمال
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        className="section-padding bg-[rgb(var(--surface-variant))]"
      >
        <div className="container-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">فريق الخبراء</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              نخبة من المبدعين والمتخصصين في مجالات التصميم والتسويق الرقمي
              والتطوير
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid-professional grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          >
            {[
              {
                name: "يوسف محمد البرطي",
                role: "المدير التنفيذي",
                experience: "المدير التنفيذي",
                image:
                  "https://source.unsplash.com/300x300/?professional,man,portrait,business,executive",
                social: ["linkedin", "twitter", "instagram"],
                color: "from-blue-500 to-[rgb(var(--brand-primary))]",
                specialties: ["القيادة", "الإدارة", "الاستراتيجية"],
              },
              {
                name: "عبدالاله النهاري",
                role: "مدير إبداعي",
                experience: "خبير إبداعي",
                image:
                  "https://source.unsplash.com/300x300/?professional,man,portrait,creative,designer",
                social: ["behance", "dribbble", "linkedin"],
                color:
                  "from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))]",
                specialties: ["الإبداع", "التصميم", "الابتكار"],
              },
              {
                name: "محمد مقبل نعمان",
                role: "مختص تسويق رقمي",
                experience: "خبير تسويقي",
                image:
                  "https://source.unsplash.com/300x300/?professional,man,portrait,marketing,business",
                social: ["linkedin", "twitter", "facebook"],
                color: "from-green-500 to-teal-500",
                specialties: ["التسويق", "الحملات", "التحليل"],
              },
              {
                name: "محمود عبدالغني الشرفي",
                role: "مطور ومصمم مواقع",
                experience: "خبير تقني",
                image:
                  "https://source.unsplash.com/300x300/?professional,man,portrait,developer,tech",
                social: ["github", "linkedin", "behance"],
                color: "from-purple-500 to-blue-500",
                specialties: ["التطوير", "التصميم", "التقنية"],
              },
              {
                name: "عبدالله مناع",
                role: "أخصائي علاقات عامة",
                experience: "خبير تواصل",
                image:
                  "https://source.unsplash.com/300x300/?professional,man,portrait,business,communication",
                social: ["linkedin", "twitter", "instagram"],
                color: "from-orange-500 to-red-500",
                specialties: ["العلاقات", "التواصل", "الإعلام"],
              },
              {
                name: "اسيد محمد البرعي",
                role: "مصمم جرافيك",
                experience: "مصمم محترف",
                image:
                  "https://source.unsplash.com/300x300/?professional,man,portrait,graphic,designer",
                social: ["behance", "dribbble", "instagram"],
                color: "from-pink-500 to-[rgb(var(--brand-secondary))]",
                specialties: ["التصميم", "الجرافيك", "الهوية"],
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -15, scale: 1.02 }}
                className="card rounded-professional-xl overflow-hidden hover:shadow-professional-lg transition-all duration-500 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-3 justify-center mb-3">
                      {member.social.map((platform, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-sm"
                        >
                          🔗
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/20 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-1 text-balance">
                    {member.name}
                  </h3>
                  <p className="text-[rgb(var(--brand-primary))] font-medium mb-2 text-sm">
                    {member.role}
                  </p>
                  <p className="text-xs">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-brand mx-auto mb-6"
            />
            <h2 className="heading-secondary mb-6">آراء عملائنا</h2>
            <p className="text-xl max-w-3xl mx-auto text-pretty">
              ما يقوله عملاؤنا عن تجربتهم معنا وجودة خدماتنا ومستوى الإبداع
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid-professional grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                name: "محمد العواضي",
                company: "شركة النخبة التجارية",
                text: "خدمة رائعة وسرعة في التنفيذ. الفريق محترف جداً وملتزم بالمواعيد. التصاميم فاقت توقعاتي بمراحل والنتائج كانت مذهلة.",
                rating: 5,
                image:
                  "https://source.unsplash.com/100x100/?businessman,portrait,man,professional",
                project: "هوية بصرية شاملة",
              },
              {
                name: "فاطمة الشمري",
                company: "مطعم الأصالة العربية",
                text: "تصاميم احترافية ومميزة حولت علامتي التجارية لمستوى جديد. أنصح الجميع بالتعامل معهم. الإبداع والجودة في أعلى مستوياتهما.",
                rating: 5,
                image:
                  "https://source.unsplash.com/100x100/?businesswoman,portrait,woman,professional",
                project: "تصميم هوية وإدارة محتوى",
              },
              {
                name: "عبدالله المطيري",
                company: "عيادة الرعاية الطبية",
                text: "إدارة احترافية لحساباتنا في السوشيال ميديا. زادت المتابعين والتفاعل بشكل ملحوظ. النتائج تحدثت عن نفسها.",
                rating: 5,
                image:
                  "https://source.unsplash.com/100x100/?doctor,professional,man,medical",
                project: "إدارة وسائل التواصل الاجتماعي",
              },
              {
                name: "نورا سالم",
                company: "متجر الأزياء العصرية",
                text: "حملة إعلانية ناجحة جداً زادت من مبيعاتنا بنسبة 300%. الفريق فهم رؤيتنا وترجمها لواقع مذهل.",
                rating: 5,
                image:
                  "https://source.unsplash.com/100x100/?fashion,woman,designer,business",
                project: "حملة إعلانية ممولة",
              },
              {
                name: "خالد الأحمدي",
                company: "شركة التقنية الذكية",
                text: "موقع إلكتروني متطور وسريع مع تجربة مستخدم ممتازة. العمل كان احترافي من البداية للنهاية.",
                rating: 5,
                image:
                  "https://source.unsplash.com/100x100/?tech,ceo,man,business",
                project: "تطوير موقع إلكتروني",
              },
              {
                name: "سارة القحطاني",
                company: "مؤسسة التنمية الخيرية",
                text: "ساعدونا في إيصال رسالتنا الإنسانية بطريقة مؤثرة ومبدعة. التفاعل مع حملاتنا تضاعف عدة مرات.",
                rating: 5,
                image:
                  "https://source.unsplash.com/100x100/?nonprofit,woman,charity,professional",
                project: "حملة توعوية شاملة",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -5 }}
                className="card rounded-professional-xl border-[rgb(var(--outline-variant))] hover:border-[rgb(var(--brand-primary))] transition-all duration-500"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-yellow-400 text-xl"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                <p className="text-lg leading-relaxed italic mb-6 text-pretty">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[rgb(var(--brand-primary))]/20"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm mb-1">{testimonial.company}</p>
                    <span className="text-xs bg-[rgb(var(--brand-primary))]/10 text-[rgb(var(--brand-primary))] px-2 py-1 rounded-full">
                      {testimonial.project}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="section-padding bg-gradient-brand relative overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cg fill-opacity="0.1"%3E%3Cpolygon fill="%23fff" points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E\')] bg-center animate-pulse'
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
            <h2 className="heading-secondary text-white mb-6">
              ابدأ مشروعك معنا اليوم
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
              تواصل معنا الآن واحصل على استشارة مجانية لبناء علامتك التجارية
              وتحقيق أهدافك التسويقية
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-white/80 mx-auto mt-6"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid-professional grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12"
          >
            {[
              {
                platform: "واتساب",
                icon: "💬",
                url: "https://wa.me/967784668027",
                color: "from-green-400 to-green-600",
                description: "تواصل فوري",
              },
              {
                platform: "إنستقرام",
                icon: "📷",
                url: "https://www.instagram.com/st._ep",
                color: "from-pink-400 to-purple-600",
                description: "تابع أعمالنا",
              },
              {
                platform: "فيسبوك",
                icon: "👥",
                url: "https://www.facebook.com/خطوة-للدعاية-والاعلان",
                color: "from-blue-400 to-blue-600",
                description: "انضم للمجتمع",
              },
              {
                platform: "البريد الإلكتروني",
                icon: "✉️",
                url: "mailto:info@stepagency.com",
                color: "from-gray-600 to-gray-800",
                description: "راسلنا مباشرة",
              },
            ].map((contact, index) => (
              <motion.a
                key={index}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`group bg-gradient-to-r ${contact.color} text-white p-8 rounded-professional-xl shadow-professional hover:shadow-professional-lg transition-all duration-500 text-center block`}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl mb-4"
                >
                  {contact.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">
                  {contact.platform}
                </h3>
                <p className="text-sm opacity-90">{contact.description}</p>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center glass rounded-professional-xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              معلومات التواصل
            </h3>
            <div className="grid-professional grid-cols-1 md:grid-cols-3 text-white/90">
              <div>
                <h4 className="font-semibold mb-2">📞 الهاتف</h4>
                <p>+967 78 466 8027</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✉️ البريد الإلكتروني</h4>
                <p>info@stepagency.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📍 الموقع</h4>
                <p>صنعاء، الجمهورية اليمنية</p>
              </div>
            </div>
            <p className="text-white/80 text-lg mt-6">
              🕐 متاحون على مدار الساعة لخدمتك وتحقيق رؤيتك
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(var(--surface))] border-t border-[rgb(var(--outline-variant))] py-16 relative overflow-hidden transition-colors duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cg fill-opacity="0.1"%3E%3Cpolygon fill="%23000" points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E\')] bg-center'
            }
          ></div>
        </div>

        <div className="container-padding relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://cdn.builder.io/api/v1/assets/6cac5a504765458ea9034ccfe6de8d2b/logo-25dded?format=webp&width=800"
                alt="خطوة للدعاية والإعلان"
                className="h-16 mb-6 transition-opacity duration-300"
              />
              <p className="leading-relaxed mb-6 text-lg text-pretty">
                وكالة إبداعية متخصصة في بناء الهويات التجارية والتسويق الرقمي
                بمعايير عالمية. نحن نؤمن بقوة الإبداع في تحويل الأفكار إلى واقع
                مذهل يحقق النجاح.
              </p>
              <div className="flex gap-4 flex-wrap">
                {[
                  { icon: "🌟", text: "إبداع لا محدود" },
                  { icon: "🚀", text: "نتائج مضمونة" },
                  { icon: "⚡", text: "سرعة في التنفيذ" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-[rgb(var(--brand-primary))]">
                خدماتنا المميزة
              </h3>
              <ul className="space-y-3">
                {[
                  "تصميم الهوية ��لبصرية",
                  "إدارة وسائل التواصل",
                  "الإعلانات الممولة",
                  "تطوير المواقع",
                  "إنتاج المحتوى المرئي",
                  "الاستشارات التسويقية",
                ].map((service, index) => (
                  <motion.li
                    key={index}
                    whileHover={{
                      x: 10,
                      color: "rgb(var(--brand-primary))",
                    }}
                    className="cursor-pointer transition-colors duration-300"
                  >
                    → {service}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-[rgb(var(--brand-primary))]">
                تواصل معنا
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[rgb(var(--brand-primary))]">📞</span>
                  <div>
                    <p className="font-semibold">هاتف</p>
                    <p className="text-sm">+967 78 466 8027</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[rgb(var(--brand-primary))]">✉️</span>
                  <div>
                    <p className="font-semibold">إيميل</p>
                    <p className="text-sm">info@stepagency.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[rgb(var(--brand-primary))]">📍</span>
                  <div>
                    <p className="font-semibold">الموقع</p>
                    <p className="text-sm">صنعاء، اليمن</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[rgb(var(--outline-variant))] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-center md:text-right">
                © 2025 خطوة للدعاية والإعلان. جميع الحقوق محفوظة.
              </p>
              <div className="flex gap-6 text-sm">
                <a
                  href="#"
                  className="hover:text-[rgb(var(--brand-primary))] transition-colors"
                >
                  سياسة الخصوصية
                </a>
                <a
                  href="#"
                  className="hover:text-[rgb(var(--brand-primary))] transition-colors"
                >
                  شروط الاستخدام
                </a>
                <a
                  href="#"
                  className="hover:text-[rgb(var(--brand-primary))] transition-colors"
                >
                  اتفاقية الخدمة
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
