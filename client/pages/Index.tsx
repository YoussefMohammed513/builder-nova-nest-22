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
        className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 shadow-lg"
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
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(60, 210, 245, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:inline-block bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-full font-semibold shadow-lg"
            >
              احجز استشارتك المجانية
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-around">
                <span
                  className={`block h-0.5 w-6 bg-brand-dark transform transition ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-brand-dark transition ${isMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-brand-dark transform transition ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
                ></span>
              </div>
            </button>
          </div>
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
                "url('https://source.unsplash.com/1920x1080/?branding,modern,office,creative')",
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-brand-primary/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-lg p-12 rounded-3xl shadow-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-brand-dark mb-6 leading-tight"
            >
              نصنع لك
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                {" "}
                هوية{" "}
              </span>
              لا تُنسى
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl md:text-3xl mb-8 text-gray-600 leading-relaxed"
            >
              بتصاميم احترافية وإعلانات مؤثرة تجعل علامتك تتألق في السوق
              العالمية
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
                  boxShadow: "0 20px 40px rgba(60, 210, 245, 0.4)",
                  background:
                    "linear-gradient(135deg, #3CD2F5 0%, #7BEAFF 100%)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-4 rounded-full text-xl font-semibold shadow-xl transition-all duration-300"
              >
                احجز استشارتك المجانية
              </motion.a>

              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-full text-xl font-semibold hover:bg-brand-primary hover:text-white transition-all duration-300"
              >
                شاهد أعمالنا
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="py-20 bg-gradient-to-br from-brand-primary to-brand-secondary"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white"
          >
            {[
              { number: 500, suffix: "+", label: "عميل راضٍ" },
              { number: 1200, suffix: "+", label: "مشروع مكتمل" },
              { number: 95, suffix: "%", label: "معدل الرضا" },
              { number: 8, suffix: "", label: "سنوات خبرة" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="p-6">
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              من نحن
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-brand-dark mb-6">
                رؤيتنا للمستقبل
              </h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                تأسست "خطوة" لتقديم حلول مبتكرة في مجال الدعاية والإعلان، بخبرة
                تجمع بين الإبداع والاحتراف. نعمل على بناء الهويات التجارية
                القوية، وتنفيذ الحملات التسويقية المؤثرة، وإدارة المحتوى الرقمي
                باحترافية عالمية.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                نؤمن بأن كل علامة تجارية لها قصة فريدة تستحق أن تُروى بطريقة
                إبداعية ومؤثرة تلامس قلوب الجمهور وتحقق النتائج المرجوة.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "الإبداع", desc: "تصاميم مبتكرة تعكس هويتك" },
                  { title: "الاحترافية", desc: "جودة عالمية في كل مشروع" },
                  { title: "السرعة", desc: "تسليم في المواعيد المحددة" },
                  { title: "الدعم", desc: "مساندة مستمرة لنجاحك" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-3 h-3 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-brand-dark">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://source.unsplash.com/600x500/?team,creative,modern,office"
                  alt="فريق العمل"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-primary">
                    8+
                  </div>
                  <div className="text-sm text-gray-600">سنوات خبرة</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              خدماتنا الاحترافية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات المتخصصة لبناء علامتك التجارية وتحقيق
              أهدافك التسويقية
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-6"></div>
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
                  "شعارات وهويات بصرية متكاملة تعكس شخصية علامتك التجارية وتميزك عن المنافسين",
                features: [
                  "تصميم الشعار",
                  "دليل الهوية",
                  "القرطاسية",
                  "التطبيقات",
                ],
                image:
                  "https://source.unsplash.com/400x300/?logo,design,branding",
              },
              {
                icon: "📱",
                title: "إدارة وسائل التواصل",
                description:
                  "استراتيجيات محتوى مدروسة وإدارة احترافية لحساباتك على منصات التواصل الاجتماعي",
                features: ["استراتيجية المحتوى", "التصميم", "النشر", "التحليل"],
                image:
                  "https://source.unsplash.com/400x300/?social,media,phone",
              },
              {
                icon: "🖨️",
                title: "التصميم والطباعة",
                description:
                  "مواد طباعية عالية الجودة من الكروت الشخصية إلى اللافتات الكبيرة بأحدث التقنيات",
                features: [
                  "الكروت الشخصية",
                  "المطبوعات",
                  "اللافتات",
                  "التغليف",
                ],
                image:
                  "https://source.unsplash.com/400x300/?printing,design,business",
              },
              {
                icon: "📈",
                title: "الإعلانات الممولة",
                description:
                  "حملات إعلانية مدروسة ومستهدفة عبر جميع المنصات الرقمية لضمان أفضل عائد استثمار",
                features: [
                  "فيسبوك وإنستقرام",
                  "جوجل أدز",
                  "سناب شات",
                  "تيك توك",
                ],
                image:
                  "https://source.unsplash.com/400x300/?digital,marketing,ads",
              },
              {
                icon: "🎬",
                title: "إنتاج المحتوى المرئي",
                description:
                  "فيديوهات احترافية وموشن جرافيك مبتكر يحكي قصة علامتك التجارية بطريقة جذابة",
                features: ["الفيديو", "الموشن جرافيك", "التصوير", "المونتاج"],
                image:
                  "https://source.unsplash.com/400x300/?video,production,camera",
              },
              {
                icon: "🌐",
                title: "تطوير المواقع",
                description:
                  "مواقع إلكترونية عصرية ومتجاوبة مع جميع الأجهزة مع أفضل تجربة مستخدم",
                features: ["التصميم", "التطوير", "الاستضافة", "الصيانة"],
                image:
                  "https://source.unsplash.com/400x300/?website,development,coding",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                    {service.icon}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-dark mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    اطلب الخدمة
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
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              معرض أعمالنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف مجموعة من أفضل أعمالنا التي نفخر بتقديمها لعملائنا في مختلف
              القطاعات
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-6"></div>
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
                title: "مطعم الأصالة",
                category: "هوية بصرية",
                image:
                  "https://source.unsplash.com/600x400/?restaurant,branding,logo",
              },
              {
                title: "شركة التقنية الذكية",
                category: "موقع إلكتروني",
                image:
                  "https://source.unsplash.com/600x400/?tech,website,modern",
              },
              {
                title: "معرض الفن المعاصر",
                category: "حملة إعلانية",
                image:
                  "https://source.unsplash.com/600x400/?art,gallery,exhibition",
              },
              {
                title: "عيادة النخبة الطبية",
                category: "تصميم شامل",
                image:
                  "https://source.unsplash.com/600x400/?medical,clinic,healthcare",
              },
              {
                title: "متجر الأزياء العصرية",
                category: "إدارة سوشيال ميديا",
                image:
                  "https://source.unsplash.com/600x400/?fashion,clothing,store",
              },
              {
                title: "شركة الاستثمار العقاري",
                category: "هوية وموقع",
                image:
                  "https://source.unsplash.com/600x400/?real,estate,building",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-sm text-brand-secondary mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
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
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
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
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              فريق الخبراء
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نخبة من المبدعين والمتخصصين في مجالات التصميم والتسويق الرقمي
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-6"></div>
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
                name: "أحمد محمد",
                role: "مدير إبداعي",
                image:
                  "https://source.unsplash.com/300x300/?professional,man,portrait,business",
                social: ["linkedin", "behance"],
              },
              {
                name: "فاطمة أحمد",
                role: "مصممة جرافيك",
                image:
                  "https://source.unsplash.com/300x300/?professional,woman,portrait,designer",
                social: ["instagram", "dribbble"],
              },
              {
                name: "محمد عبدالله",
                role: "مطور مواقع",
                image:
                  "https://source.unsplash.com/300x300/?developer,man,coding,tech",
                social: ["github", "linkedin"],
              },
              {
                name: "نورا سالم",
                role: "أخصائية تسويق",
                image:
                  "https://source.unsplash.com/300x300/?marketing,woman,professional,business",
                social: ["twitter", "linkedin"],
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-3 justify-center">
                      {member.social.map((platform, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                        >
                          <span className="text-xs">📱</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-brand-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-primary font-medium">
                    {member.role}
                  </p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              آراء عملائنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ما يقوله عملاؤنا عن تجربتهم معنا وجودة خدماتنا
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mt-6"></div>
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
                text: "خدمة رائعة وسرعة في التنفيذ. الفريق محترف جداً وملتزم بالمواعيد. التصاميم فاقت توقعاتي بمراحل.",
                rating: 5,
                image:
                  "https://source.unsplash.com/100x100/?businessman,portrait,man",
              },
              {
                name: "فاطمة الشمري",
                company: "مطعم الأصالة",
                text: "تصاميم احترافية ومميزة حولت علامتي التجارية لمستوى جديد. أنصح الجميع بالتعامل معهم.",
                rating: 5,
                image:
                  "https://source.unsplash.com/100x100/?businesswoman,portrait,woman",
              },
              {
                name: "عبدالله المطيري",
                company: "عيادة الرعاية الطبية",
                text: "إدارة احترافية لحساباتنا في السوشيال ميديا. زادت المتابعين والتفاعل بشكل ملحوظ.",
                rating: 5,
                image:
                  "https://source.unsplash.com/100x100/?doctor,professional,man",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-brand-dark">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.company}
                    </p>
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
        className="py-20 bg-gradient-to-br from-brand-primary to-brand-secondary"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ابدأ مشروعك معنا
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              تواصل معنا الآن واحصل على استشارة مجانية لبناء علامتك التجارية
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                platform: "واتساب",
                icon: "💬",
                url: "https://wa.me/967784668027",
                color: "from-green-400 to-green-600",
              },
              {
                platform: "إنستقرام",
                icon: "📷",
                url: "https://www.instagram.com/st._ep",
                color: "from-pink-400 to-purple-600",
              },
              {
                platform: "فيسبوك",
                icon: "👥",
                url: "https://www.facebook.com/خطوة-للدعاية-والاعلان",
                color: "from-blue-400 to-blue-600",
              },
              {
                platform: "البريد الإلكتروني",
                icon: "✉️",
                url: "mailto:info@stepagency.com",
                color: "from-gray-400 to-gray-600",
              },
            ].map((contact, index) => (
              <motion.a
                key={index}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r ${contact.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center block`}
              >
                <div className="text-4xl mb-3">{contact.icon}</div>
                <h3 className="text-lg font-semibold">{contact.platform}</h3>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/80 text-lg">
              🕐 متاحون على مدار الساعة لخدمتك
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img
                src="https://cdn.builder.io/api/v1/assets/6cac5a504765458ea9034ccfe6de8d2b/logo-25dded?format=webp&width=800"
                alt="خطوة للدعاية والإعلان"
                className="h-16 mb-4 filter brightness-0 invert"
              />
              <p className="text-gray-300 leading-relaxed">
                وكالة إبداعية متخصصة في بناء الهويات التجارية والتسويق الرقمي
                بمعايير عالمية.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">خدماتنا</h3>
              <ul className="space-y-2 text-gray-300">
                <li>تصميم الهوية البصرية</li>
                <li>إدارة وسائل التواصل</li>
                <li>الإعلانات الممولة</li>
                <li>تطوير المواقع</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
              <div className="space-y-2 text-gray-300">
                <p>📞 هاتف: +967 78 466 8027</p>
                <p>✉️ إيميل: info@stepagency.com</p>
                <p>📍 الموقع: صنعاء، اليمن</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 خطوة للدعاية والإعلان. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
