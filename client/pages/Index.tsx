import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

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
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            background: `linear-gradient(45deg, #3cd2f5, #7beaff)`,
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, Math.random() + 0.5, 1],
            opacity: [0.2, 0.8, 0.2],
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

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div className="min-h-screen bg-white text-brand-dark overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 shadow-lg border-b border-gray-100"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="https://cdn.builder.io/api/v1/assets/6cac5a504765458ea9034ccfe6de8d2b/logo-25dded?format=webp&width=800"
                alt="خطوة للدعاية والإعلان"
                className="h-16 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8 text-brand-dark font-semibold">
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
                    className="hover:text-brand-primary transition-all duration-300 relative group"
                  >
                    {item.text}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(60, 210, 245, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:inline-block bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              احجز استشارتك المجانية
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 z-50 relative"
            >
              <div className="w-6 h-6 flex flex-col justify-around">
                <motion.span
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 8 : 0,
                  }}
                  className="block h-0.5 w-6 bg-brand-dark transform transition-all duration-300"
                />
                <motion.span
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  className="block h-0.5 w-6 bg-brand-dark transition-all duration-300"
                />
                <motion.span
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -8 : 0,
                  }}
                  className="block h-0.5 w-6 bg-brand-dark transform transition-all duration-300"
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-lg"
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
                  className="block text-brand-dark hover:text-brand-primary transition-colors duration-300 font-semibold py-2"
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
                className="inline-block bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full font-semibold shadow-lg"
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
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20"></div>
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
        <div className="relative z-10 text-center max-w-6xl mx-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-dark mb-6 leading-tight"
            >
              نصنع لك
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent"
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
              className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-600 leading-relaxed max-w-4xl mx-auto"
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
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(60, 210, 245, 0.5)",
                  background:
                    "linear-gradient(135deg, #3CD2F5 0%, #7BEAFF 100%)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-4 rounded-full text-xl font-semibold shadow-xl transition-all duration-500 hover:shadow-2xl"
              >
                <span className="relative z-10">احجز استشارتك المجانية</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.a>

              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-full text-xl font-semibold hover:bg-brand-primary hover:text-white transition-all duration-300 backdrop-blur-sm"
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center relative"
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
        className="py-20 bg-gradient-to-br from-brand-primary to-brand-secondary relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cg fill-opacity="0.1"%3E%3Cpolygon fill="%23fff" points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E\')] bg-center'
            }
          ></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              أرقامنا تتحدث عنا
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              سجل حافل من النجاحات والإنجازات مع عملائنا في جميع أنحاء المنطقة
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/30 hover:bg-white/30 transition-all duration-300"
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
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5 rounded-full translate-y-48 -translate-x-48"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
              className="h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              من نحن
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <h3 className="text-3xl font-bold text-brand-dark mb-6">
                رؤيتنا للمستقبل
              </h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                تأسست "خطوة" لتقديم حلول مبتكرة في مجال الدعاية والإعلان، بخبرة
                تجمع بين الإبداع والاحتراف. نعمل على بناء الهويات التجارية
                القوية، وتنفيذ الحملات التسويقي�� المؤثرة، وإدارة المحتوى الرقمي
                باحترافية عالمية.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                نؤمن بأن كل علامة تجارية لها قصة فريدة تستحق أن تُروى بطريقة
                إبداعية ومؤثرة تلامس قلوب الجمهور وتحقق النتائج المرجوة في عالم
                تتزايد فيه المنافسة يوماً بعد يوم.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-brand-dark mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
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
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://source.unsplash.com/700x600/?creative,team,modern,office,workspace"
                  alt="فريق العمل"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/30 to-transparent"></div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute top-6 right-6 bg-white p-4 rounded-2xl shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-primary">
                      500+
                    </div>
                    <div className="text-xs text-gray-600">مشروع ناجح</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 left-6 bg-white p-4 rounded-2xl shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-primary">
                      8+
                    </div>
                    <div className="text-xs text-gray-600">سنوات خبرة</div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full opacity-70"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full opacity-70"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-gray-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-7xl">
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
              className="h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              خدماتنا الاحترافية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات المتخصصة لبناء علامتك التجارية وتحقيق
              أهدافك التسويقية بأحدث الأساليب والتقنيات
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                color: "from-blue-500 to-purple-600",
              },
              {
                icon: "📱",
                title: "إدارة وسائل التواصل",
                description:
                  "استراتيجيات محتوى مدروسة وإدا��ة احترافية لحساباتك على منصات التواصل الاجتماعي لزيادة التفاعل",
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
                  "حملات إعلانية مدروسة ومستهدفة عبر جميع المنصات الرقمية لضمان ��فضل عائد استثمار وتحقيق الأهداف",
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
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
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
                  <p className="text-gray-600 mb-6 leading-relaxed">
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
                        <div className="w-2 h-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
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
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
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
              className="h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              معرض أعمالنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف مجموعة من أفضل أعمالنا التي نفخر بتقديمها لعملائنا في مختلف
              القطاعات والمجالات
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "مطعم الأصالة العربية",
                category: "هوية بصرية شاملة",
                image:
                  "https://source.unsplash.com/600x400/?restaurant,branding,arabic,food",
                color: "from-orange-500 to-red-500",
                description: "تص��يم هوية متكاملة تعكس التراث العربي الأصيل",
              },
              {
                title: "شركة التقنية الذكية",
                category: "موقع إلكتروني متقدم",
                image:
                  "https://source.unsplash.com/600x400/?tech,website,modern,digital",
                color: "from-blue-500 to-purple-500",
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
                color: "from-pink-500 to-purple-500",
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
                <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
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
                      <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
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
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(60, 210, 245, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              عرض جميع الأعمال
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
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
              className="h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              فريق الخبراء
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نخبة من المبدعين والمتخصصين في مجالات التصميم والتسويق الرقمي
              والتطوير
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                name: "يوسف محمد البرطي",
                role: "المدير التنفيذي",
                experience: "المدير التنفيذي",
                image:
                  "https://source.unsplash.com/300x300/?professional,man,portrait,business,executive",
                social: ["linkedin", "twitter", "instagram"],
                color: "from-blue-500 to-brand-primary",
                specialties: ["القيادة", "الإدارة", "الاستراتيجية"],
              },
              {
                name: "عبدالاله النهاري",
                role: "مدير إبداعي",
                experience: "خبير إبداعي",
                image:
                  "https://source.unsplash.com/300x300/?professional,man,portrait,creative,designer",
                social: ["behance", "dribbble", "linkedin"],
                color: "from-brand-primary to-brand-secondary",
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
                color: "from-pink-500 to-brand-secondary",
                specialties: ["التصميم", "الجرافيك", "الهوية"],
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
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
                  <h3 className="text-xl font-bold text-brand-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-primary font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
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
              className="h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              آراء عملائنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ما يقوله عملاؤنا عن تجربتهم معنا وجودة خدماتنا ومستوى الإبداع
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                text: "حملة إعلانية ��اجحة جداً زادت من مبيعاتنا بنسبة 300%. الفريق فهم رؤيتنا وترجمها لواقع مذهل.",
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
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
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

                <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-brand-primary/20"
                  />
                  <div>
                    <h4 className="font-bold text-brand-dark text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      {testimonial.company}
                    </p>
                    <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-full">
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
        className="py-20 bg-gradient-to-br from-brand-primary to-brand-secondary relative overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cg fill-opacity="0.1"%3E%3Cpolygon fill="%23fff" points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E\')] bg-center animate-pulse'
            }
          ></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ابدأ مشروعك معنا اليوم
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
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
                className={`bg-gradient-to-r ${contact.color} text-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center block group`}
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
            className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              معلومات التواصل
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
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
      <footer className="bg-brand-dark text-white py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cg fill-opacity="0.1"%3E%3Cpolygon fill="%23fff" points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E\')] bg-center'
            }
          ></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://cdn.builder.io/api/v1/assets/6cac5a504765458ea9034ccfe6de8d2b/logo-25dded?format=webp&width=800"
                alt="خطوة للدعاية والإعلان"
                className="h-16 mb-6 filter brightness-0 invert"
              />
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                وكالة إبداعية متخصصة في بناء الهويات التجارية والتسويق الرقمي
                بمعايير عالمية. نحن نؤمن بقوة الإبداع في تحويل الأفكار إلى واقع
                مذهل يحقق النجاح.
              </p>
              <div className="flex gap-4">
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
              <h3 className="text-xl font-bold mb-6 text-brand-primary">
                خدماتنا المميزة
              </h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  "تصميم الهوية البصرية",
                  "إدارة وسائل التواصل",
                  "الإعلانات الممولة",
                  "تطوير المواقع",
                  "إنتاج المحتوى المرئي",
                  "الاستشارات التسويقية",
                ].map((service, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 10, color: "#3CD2F5" }}
                    className="cursor-pointer transition-colors duration-300"
                  >
                    → {service}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-brand-primary">
                تواصل معنا
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-3">
                  <span className="text-brand-primary">📞</span>
                  <div>
                    <p className="font-semibold">هاتف</p>
                    <p>+967 78 466 8027</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-primary">✉️</span>
                  <div>
                    <p className="font-semibold">إيميل</p>
                    <p>info@stepagency.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-primary">📍</span>
                  <div>
                    <p className="font-semibold">الموقع</p>
                    <p>صنعاء، اليمن</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-300 text-center md:text-right">
                © 2025 خطوة للدعاية والإعلان. جميع الحقوق محفوظة.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  سياسة الخصوصية
                </a>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  شروط الاستخدام
                </a>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-colors"
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
