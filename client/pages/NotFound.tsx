import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--brand-primary))]/10 to-[rgb(var(--brand-secondary))]/10 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[rgb(var(--brand-primary))]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold text-gradient mb-4">
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[rgb(var(--text-primary))]">
            عذراً، الصفحة غير موجودة
          </h1>
          <p className="text-lg md:text-xl text-[rgb(var(--text-secondary))] mb-8 max-w-md mx-auto">
            يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse md:flex md:justify-center"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3 text-base md:text-lg mb-4 md:mb-0"
          >
            <span>🏠</span>
            العودة للرئيسية
          </motion.a>

          <motion.a
            href="https://wa.me/967784668027?text=مرحباً%20أحتاج%20مساعدة%20في%20الموقع"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 btn-secondary px-6 py-3 text-base md:text-lg"
          >
            <span>💬</span>
            تواصل معنا
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 text-sm text-[rgb(var(--text-tertiary))]"
        >
          <p>أو يمكنك زيارة:</p>
          <div className="flex justify-center gap-4 mt-4">
            {[
              { href: "/#services", text: "خدماتنا", icon: "⚙️" },
              { href: "/#portfolio", text: "أعمالنا", icon: "💼" },
              { href: "/#contact", text: "تواصل معنا", icon: "📞" },
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-[rgb(var(--brand-primary))] hover:text-[rgb(var(--brand-secondary))] transition-colors"
              >
                <span>{link.icon}</span>
                <span className="hidden md:inline">{link.text}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
