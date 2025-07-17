import { useState } from "react";

export default function Index() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark">
      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <img
              src="https://cdn.builder.io/api/v1/assets/6cac5a504765458ea9034ccfe6de8d2b/logo-25dded?format=webp&width=800"
              alt="خطوة للدعاية والإعلان"
              className="h-16"
            />

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-8 text-brand-dark font-semibold">
              <li>
                <a
                  href="#home"
                  className="hover:text-brand-primary transition-colors"
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-brand-primary transition-colors"
                >
                  من نحن
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-brand-primary transition-colors"
                >
                  خدماتنا
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  className="hover:text-brand-primary transition-colors"
                >
                  الباقات
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="hover:text-brand-primary transition-colors"
                >
                  أعمالنا
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-brand-primary transition-colors"
                >
                  آراء العملاء
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-brand-primary transition-colors"
                >
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        className="relative min-h-[75vh] flex items-center justify-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/1600x900/?branding,identity')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center bg-white/85 p-8 rounded-xl max-w-2xl mx-4">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            نصنع لك هوية لا تُنسى
          </h1>
          <p className="text-xl mb-6 text-gray-700">
            بتصاميم احترافية وإعلانات مؤثرة تجعل علامتك تتألق
          </p>
          <a
            href="#contact"
            className="inline-block bg-brand-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-secondary transition-colors"
          >
            احجز استشارتك المجانية
          </a>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex-1 min-w-[300px]">
              <h2 className="text-3xl font-bold mb-6 text-brand-dark">
                من نحن
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                تأسست "خطوة" لتقديم حلول مبتكرة في مجال الدعاية والإعلان، بخبرة
                تجمع بين الإبداع والاحتراف. نعمل على بناء الهويات، وتنفيذ
                الحملات التسويقية، وإدارة المحتوى باحترافية.
              </p>
            </div>
            <div className="flex-1 min-w-[300px]">
              <img
                src="https://source.unsplash.com/600x400/?team,creative"
                alt="فريق العمل"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-dark">
            خدماتنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                image: "https://source.unsplash.com/300x200/?logo,design",
                title: "تصميم الشعارات والهويات",
                alt: "تصميم الشعارات",
              },
              {
                image: "https://source.unsplash.com/300x200/?social,media",
                title: "إدارة التواصل الاجتماعي",
                alt: "وسائل التواصل الاجتماعي",
              },
              {
                image: "https://source.unsplash.com/300x200/?print,design",
                title: "تصميم وطباعة",
                alt: "التصميم والطباعة",
              },
              {
                image: "https://source.unsplash.com/300x200/?digital,ads",
                title: "إعلانات ممولة",
                alt: "الإعلانات الرقمية",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white/90 p-6 rounded-xl shadow-sm text-center"
              >
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-brand-dark">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-dark">
            الباقات والعروض
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "باقة البداية",
                price: "10,000 ريال",
                description: "8 منشورات – تصميم احترافي",
              },
              {
                title: "باقة النمو",
                price: "17,500 ريال",
                description: "12 منشور + 4 ستوري",
              },
              {
                title: "باقة الاحتراف",
                price: "30,000 ريال",
                description: "تصميم + إدارة + حملة ممولة",
              },
            ].map((pkg, index) => (
              <div
                key={index}
                className="bg-white/90 p-6 rounded-xl shadow-sm text-center border"
              >
                <h3 className="text-xl font-semibold mb-4 text-brand-dark">
                  {pkg.title}
                </h3>
                <p className="text-2xl font-bold text-brand-primary mb-4">
                  {pkg.price}
                </p>
                <p className="text-gray-700">{pkg.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-dark">
            أعمالنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "https://source.unsplash.com/400x300/?advertising",
              "https://source.unsplash.com/400x300/?campaign",
              "https://source.unsplash.com/400x300/?graphic,design",
              "https://source.unsplash.com/400x300/?branding",
            ].map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-sm">
                <img
                  src={image}
                  alt={`مشروع ${index + 1}`}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-dark">
            آراء العملاء
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote: "خدمة رائ��ة وسرعة في التنفيذ.",
                author: "محمد العواضي",
              },
              {
                quote: "تصاميم احترافية ومميزة.",
                author: "شركة الرؤية الذهبية",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm text-center border"
              >
                <p className="text-lg italic mb-4 text-gray-700">
                  "{testimonial.quote}"
                </p>
                <h4 className="font-semibold text-brand-dark">
                  – {testimonial.author}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-12 text-brand-dark">
            تواصل معنا
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "واتساب", url: "https://wa.me/967784668027" },
              { name: "إنستقرام", url: "https://www.instagram.com/st._ep" },
              {
                name: "فيسبوك",
                url: "https://www.facebook.com/خطوة-للدعاية-والاعلان",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-secondary transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-6">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p>© 2025 خطوة للدعاية والإعلان</p>
        </div>
      </footer>
    </div>
  );
}
