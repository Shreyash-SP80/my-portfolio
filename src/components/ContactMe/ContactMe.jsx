import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const ContactMe = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const socialRef = useRef(null);
  const footerRef = useRef(null);
  const separatorRef = useRef(null);
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });

      // Heading animation with more dramatic effect
      const chars = gsap.utils.toArray(".char");
      gsap.from(chars, {
        y: "random(-50, 50)",
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.05,
          from: "random"
        },
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Form container animation with scaling
      gsap.from(formRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      // Form elements staggered animation
      gsap.from(".form-element", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      // Info container animation with 3D rotation effect
      gsap.from(infoRef.current, {
        opacity: 0,
        x: -50,
        rotationY: 15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      // Contact info items animation
      gsap.from(".contact-info-item", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 65%",
          toggleActions: "play none none none"
        }
      });

      // Social container animation
      gsap.from(socialRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: socialRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Social icons animation
      gsap.from(".social-icon", {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: socialRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Background elements animation
      gsap.from(".bg-element", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        stagger: 0.3,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Separator line animation
      gsap.from(separatorRef.current, {
        scaleX: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: separatorRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Footer animation
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });

      // Footer columns staggered animation
      gsap.from(".footer-column", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Tech stack items animation
      gsap.from(".tech-stack-item", {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log(result.text);
        setSubmitStatus('success');
        
        const successElement = document.querySelector('.success-message');
        if (successElement) {
          gsap.from(successElement, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        }
        
        form.current.reset();
      }, (error) => {
        console.log(error.text);
        setSubmitStatus('error');
        
        const errorElement = document.querySelector('.error-message');
        if (errorElement) {
          gsap.from(errorElement, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  const renderAnimatedTitle = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <>
      <section
        ref={containerRef}
        className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-100 dark:from-gray-900 dark:to-gray-900"
        id="contact"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-100/20 dark:bg-indigo-900/10 mix-blend-multiply blur-3xl bg-element"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-lg bg-teal-100/20 dark:bg-teal-900/10 mix-blend-multiply blur-3xl bg-element"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-10 md:mb-16" ref={headingRef}>
            <h2 style={{ fontFamily: "'Exo', cursive" }} className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {renderAnimatedTitle("Get In Touch")}
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              style={{ fontFamily: "'Source Sans Pro', sans-serif"}}
            >
              Questions, <span className="text-green-500 dark:text-green-400"> ideas </span>, thoughts, or just a 
              <span className="text-blue-500 dark:text-blue-400"> friendly hello</span> – I'm 
              <span className="text-red-500 dark:text-red-400"> always here</span>.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              ref={formRef}
              className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 transform-style-preserve-3d"
            >
              <h3 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Send me a message</h3>
              <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-6">
                <div className="form-element">
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    id="name"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    id="email"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
                    placeholder="youremail@gmail.com"
                    required
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
                    placeholder="Write your message here"
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center sm:justify-start">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>

                  <div className="flex justify-center sm:justify-end">
                    {submitStatus === 'success' && (
                      <motion.div 
                        className="success-message text-xs sm:text-sm text-green-600 dark:text-green-400 flex items-center text-center sm:text-left"
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Message sent!
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div 
                        className="error-message text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center text-center sm:text-left"
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Failed to send
                      </motion.div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div
                ref={infoRef}
                className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl 
                          p-5 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
              >
                <h3 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                  Contact Information
                </h3>

                <div className="space-y-4 sm:space-y-5">
                  {/* Email */}
                  <div className="contact-info-item flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 p-2 sm:p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                      <a
                        href="mailto:shreyashpatil8078@gmail.com"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm sm:text-base"
                      >
                        contact@example.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="contact-info-item flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 p-2 sm:p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Phone</h4>
                      <a
                        href="tel:+918956501934"
                        className="text-amber-600 dark:text-amber-400 hover:underline text-sm sm:text-base"
                      >
                        +918956XXXXXX
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="contact-info-item flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 p-2 sm:p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Location</h4>
                      <p className="text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">Sangola, Solapur, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div 
                ref={socialRef}
                className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
              >
                <h3 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">Social Media I Exist On</h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { 
                      name: "GitHub", 
                      icon: "github", 
                      color: "gray", 
                      url: "https://github.com/Shreyash-SP80" 
                    },
                    { 
                      name: "LinkedIn", 
                      icon: "linkedin", 
                      color: "blue", 
                      url: "https://linkedin.com/in/shreyash-patil-sp7213" 
                    },
                    { 
                      name: "WhatsApp", 
                      icon: "whatsapp", 
                      color: "green", 
                      url: "https://wa.me/8956501934" 
                    },
                    { 
                      name: "Instagram", 
                      icon: "instagram", 
                      color: "pink", 
                      url: "https://instagram.com/patilshreyash638" 
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon flex items-center justify-center p-3 rounded-full bg-${social.color}-100 dark:bg-${social.color}-900/50 text-${social.color}-600 dark:text-${social.color}-400 hover:bg-${social.color}-200 dark:hover:bg-${social.color}-800 transition-colors duration-200`}
                      aria-label={social.name}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        {social.icon === "github" && (
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        )}
                        {social.icon === "linkedin" && (
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        )}
                        {social.icon === "whatsapp" && (
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        )}
                        {social.icon === "instagram" && (
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        )}
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Separator Line */}
      <div className="bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div 
            ref={separatorRef} 
            className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
          ></div>
        </div>
      </div>

      {/* Enhanced Footer Section */}
      <footer 
        ref={footerRef}
        className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white"
      >
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Brand Section */}
            <div className="footer-column">
              <motion.div 
                className="flex items-center space-x-3 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white">SP</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Exo', cursive" }} className="text-xl font-bold text-gray-900 dark:text-white">
                    Shreyash Patil
                  </h3>
                  <p style={{ fontFamily: "'Source Sans Pro', sans-serif" }} className="text-sm text-gray-600 dark:text-gray-400">
                    Full Stack Developer
                  </p>
                </div>
              </motion.div>
              <p style={{ fontFamily: "'Source Sans Pro', sans-serif" }} className="text-gray-700 dark:text-gray-300 mb-6">
                Building modern cloud-ready applications with clean, scalable code.
                Focused on performance, security, and real-world solutions.
              </p>
              <div className="flex space-x-3">
                {[
                  { name: "GitHub", icon: "github", url: "https://github.com/Shreyash-SP80", color: "hover:bg-gray-800 dark:hover:bg-gray-700" },
                  { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/in/shreyash-patil-sp7213", color: "hover:bg-blue-600" },
                  { name: "Instagram", icon: "instagram", url: "https://instagram.com/patilshreyash638", color: "hover:bg-pink-600" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm transition-colors duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon === "github" && <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>}
                      {social.icon === "linkedin" && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>}
                      {social.icon === "instagram" && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Tech Stack with Icons */}
            <div className="footer-column">
              <h4 style={{ fontFamily: "'Exo', cursive" }} className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Tech Stack
              </h4>
              <div style={{ fontFamily: "'Source Sans Pro', sans-serif" }} className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: 'React', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
                  { name: 'Node.js', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
                  { name: 'MongoDB', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
                  { name: 'Express', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' },
                  { name: 'Azure', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' },
                  { name: 'Firebase', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
                  { name: 'Appwrite', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
                  { name: 'Python', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' },
                  { name: 'SQL', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
                  { name: 'MySQL', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
                  { name: 'Docker', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' },
                  { name: 'Kubernetes', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' }
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    className={`tech-stack-item flex items-center space-x-2 px-3 py-2 rounded-lg ${tech.color} shadow-sm`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tech.icon} />
                    </svg>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider with Animation */}
          <motion.div 
            className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "power3.out" }}
          ></motion.div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-gray-300 dark:border-gray-700 mt-8">
            <p style={{ fontFamily: "'Source Sans Pro', sans-serif" }} 
              className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              &copy; {new Date().getFullYear()} Shreyash Patil. All rights reserved.
            </p>
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 text-xs">
              <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Created with pain... to understand peace.</span>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
        </motion.button>
      </footer>
    </>
  );
};

export default ContactMe;



// import React, { useRef, useEffect, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { motion } from "framer-motion";
// import emailjs from "@emailjs/browser";

// gsap.registerPlugin(ScrollTrigger);

// const ContactMe = () => {
//   const containerRef = useRef(null);
//   const headingRef = useRef(null);
//   const formRef = useRef(null);
//   const infoRef = useRef(null);
//   const socialRef = useRef(null);
//   const form = useRef();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Section entrance animation
//       gsap.from(containerRef.current, {
//         opacity: 0,
//         y: 50,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 90%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Heading animation with more dramatic effect
//       const chars = gsap.utils.toArray(".char");
//       gsap.from(chars, {
//         y: "random(-50, 50)",
//         opacity: 0,
//         duration: 0.8,
//         ease: "back.out(1.7)",
//         stagger: {
//           each: 0.05,
//           from: "random"
//         },
//         scrollTrigger: {
//           trigger: headingRef.current,
//           start: "top 80%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Form container animation with scaling
//       gsap.from(formRef.current, {
//         opacity: 0,
//         y: 80,
//         scale: 0.95,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: formRef.current,
//           start: "top 75%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Form elements staggered animation
//       gsap.from(".form-element", {
//         opacity: 0,
//         y: 30,
//         duration: 0.6,
//         stagger: 0.15,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: formRef.current,
//           start: "top 75%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Info container animation with 3D rotation effect
//       gsap.from(infoRef.current, {
//         opacity: 0,
//         x: -50,
//         rotationY: 15,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: infoRef.current,
//           start: "top 75%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Contact info items animation
//       gsap.from(".contact-info-item", {
//         opacity: 0,
//         x: -30,
//         duration: 0.6,
//         stagger: 0.2,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: infoRef.current,
//           start: "top 65%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Social container animation
//       gsap.from(socialRef.current, {
//         opacity: 0,
//         y: 50,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: socialRef.current,
//           start: "top 85%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Social icons animation
//       gsap.from(".social-icon", {
//         opacity: 0,
//         y: 20,
//         scale: 0.8,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: "back.out(1.7)",
//         scrollTrigger: {
//           trigger: socialRef.current,
//           start: "top 80%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Background elements animation
//       gsap.from(".bg-element", {
//         opacity: 0,
//         scale: 0.8,
//         duration: 1.5,
//         stagger: 0.3,
//         ease: "elastic.out(1, 0.5)",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 80%",
//           toggleActions: "play none none none"
//         }
//       });

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   // const sendEmail = (e) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true);
//   //   setSubmitStatus(null);

//   //   // const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
//   //   // const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
//   //   // const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

//   //   // Try both Vite and CRA environment variable patterns
//   //   const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.REACT_APP_EMAILJS_SERVICE_ID;
//   //   const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
//   //   const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

//   //   // Debug: Check if environment variables are loaded
//   //   console.log("EmailJS Config:", {
//   //     hasServiceId: !!serviceId,
//   //     hasTemplateId: !!templateId,
//   //     hasPublicKey: !!publicKey
//   //   });

//   //   emailjs.sendForm(
//   //     // process.env.REACT_APP_EMAILJS_SERVICE_ID,
//   //     // process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
//   //     serviceId,
//   //     templateId,
//   //     form.current,
//   //     // process.env.REACT_APP_EMAILJS_PUBLIC_KEY
//   //     publicKey
//   //   )
//   //   .then((result) => {
//   //     console.log(result.text);
//   //     setSubmitStatus('success');
//   //     // Success animation
//   //     gsap.from(".success-message", {
//   //       y: 20,
//   //       opacity: 0,
//   //       duration: 0.5,
//   //       ease: "back.out(1.7)"
//   //     });
//   //     form.current.reset();
//   //   }, (error) => {
//   //     console.log(error.text);
//   //     setSubmitStatus('error');
//   //     // Error animation
//   //     gsap.from(".error-message", {
//   //       y: 20,
//   //       opacity: 0,
//   //       duration: 0.5,
//   //       ease: "back.out(1.7)"
//   //     });
//   //   })
//   //   .finally(() => {
//   //     setIsSubmitting(false);
//   //     setTimeout(() => setSubmitStatus(null), 5000);
//   //   });
//   // };

//   const sendEmail = (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setSubmitStatus(null);

//   const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
//   const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
//   const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

//   emailjs.sendForm(serviceId, templateId, form.current, publicKey)
//     .then((result) => {
//       console.log(result.text);
//       setSubmitStatus('success');
      
//       // Only animate if element exists
//       const successElement = document.querySelector('.success-message');
//       if (successElement) {
//         gsap.from(successElement, {
//           y: 20,
//           opacity: 0,
//           duration: 0.5,
//           ease: "back.out(1.7)"
//         });
//       }
      
//       form.current.reset();
//     }, (error) => {
//       console.log(error.text);
//       setSubmitStatus('error');
      
//       // Only animate if element exists
//       const errorElement = document.querySelector('.error-message');
//       if (errorElement) {
//         gsap.from(errorElement, {
//           y: 20,
//           opacity: 0,
//           duration: 0.5,
//           ease: "back.out(1.7)"
//         });
//       }
//     })
//     .finally(() => {
//       setIsSubmitting(false);
//       setTimeout(() => setSubmitStatus(null), 5000);
//     });
// };

//   const renderAnimatedTitle = (text) =>
//     text.split("").map((char, i) => (
//       <span key={i} className="char inline-block">
//         {char === " " ? "\u00A0" : char}
//       </span>
//     ));

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-100 dark:from-gray-900 dark:to-gray-900"
//       id="contact"
//     >
//       {/* Background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-100/20 dark:bg-indigo-900/10 mix-blend-multiply blur-3xl bg-element"></div>
//         <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-lg bg-teal-100/20 dark:bg-teal-900/10 mix-blend-multiply blur-3xl bg-element"></div>
//       </div>

//       <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
//         <div className="text-center mb-10 md:mb-16" ref={headingRef}>
//           <h2 style={{ fontFamily: "'Exo', cursive" }} className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
//             {renderAnimatedTitle("Get In Touch")}
//           </h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4 }}
//             className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
//             style={{ fontFamily: "'Source Sans Pro', sans-serif"}}
//           >
//             Questions, <span className="text-green-500 dark:text-green-400"> ideas </span>, thoughts, or just a 
//             <span className="text-blue-500 dark:text-blue-400"> friendly hello</span> – I’m 
//             <span className="text-red-500 dark:text-red-400"> always here</span>.
//           </motion.p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

//           {/* Contact Form */}
//           <div 
//             ref={formRef}
//             className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 transform-style-preserve-3d"
//           >
//             <h3 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Send me a message</h3>
//             <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-6">
//               <div className="form-element">
//                 <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   name="user_name"
//                   id="name"
//                   className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
//                   placeholder="Your Name"
//                   required
//                 />
//               </div>

//               <div className="form-element">
//                 <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="user_email"
//                   id="email"
//                   className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
//                   placeholder="youremail@gmail.com"
//                   required
//                 />
//               </div>

//               <div className="form-element">
//                 <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
//                   Your Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="4"
//                   className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
//                   placeholder="Write your message here"
//                   required
//                 ></textarea>
//               </div>

//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
//                 >
//                   {isSubmitting ? (
//                     <span className="flex items-center justify-center sm:justify-start">
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Message"
//                   )}
//                 </motion.button>

//                 <div className="flex justify-center sm:justify-end">
//                   {submitStatus === 'success' && (
//                     <motion.div 
//                       className="success-message text-xs sm:text-sm text-green-600 dark:text-green-400 flex items-center text-center sm:text-left"
//                     >
//                       <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                       Message sent!
//                     </motion.div>
//                   )}
//                   {submitStatus === 'error' && (
//                     <motion.div 
//                       className="error-message text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center text-center sm:text-left"
//                     >
//                       <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                       </svg>
//                       Failed to send
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-8">
            
//             <div className="space-y-6 sm:space-y-8">
//               <div
//                 ref={infoRef}
//                 className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl 
//                           p-5 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
//               >
//                 <h3 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
//                   Contact Information
//                 </h3>

//                 <div className="space-y-4 sm:space-y-5">
//                   {/* Email */}
//                   <div className="contact-info-item flex items-start space-x-3 sm:space-x-4">
//                     <div className="flex-shrink-0 p-2 sm:p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
//                       <svg
//                         className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Email</h4>
//                       <a
//                         href="mailto:shreyashpatil8078@gmail.com"
//                         className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm sm:text-base"
//                       >
//                         contact@example.com
//                       </a>
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="contact-info-item flex items-start space-x-3 sm:space-x-4">
//                     <div className="flex-shrink-0 p-2 sm:p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
//                       <svg
//                         className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Phone</h4>
//                       <a
//                         href="tel:+918956501934"
//                         className="text-amber-600 dark:text-amber-400 hover:underline text-sm sm:text-base"
//                       >
//                         +918956XXXXXX
//                       </a>
//                     </div>
//                   </div>

//                   {/* Location */}
//                   <div className="contact-info-item flex items-start space-x-3 sm:space-x-4">
//                     <div className="flex-shrink-0 p-2 sm:p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
//                       <svg
//                         className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Location</h4>
//                       <p className="text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">Sangola, Solapur, India</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>


//             {/* Social Links */}
//             <div 
//               ref={socialRef}
//               className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
//             >
//               <h3 style={{ fontFamily: "'Dancing Script', cursive"}} className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">Social Media I Exist On</h3>
//               <div className="flex flex-wrap gap-4">
//                 {[
//                   { 
//                     name: "GitHub", 
//                     icon: "github", 
//                     color: "gray", 
//                     url: "https://github.com/Shreyash-SP80" 
//                   },
//                   { 
//                     name: "LinkedIn", 
//                     icon: "linkedin", 
//                     color: "blue", 
//                     url: "https://linkedin.com/in/shreyash-patil-sp7213" 
//                   },
//                   { 
//                     name: "WhatsApp", 
//                     icon: "whatsapp", 
//                     color: "green", 
//                     url: "https://wa.me/8956501934" 
//                   },
//                   { 
//                     name: "Instagram", 
//                     icon: "instagram", 
//                     color: "pink", 
//                     url: "https://instagram.com/patilshreyash638" 
//                   },
//                 ].map((social, index) => (
//                   <motion.a
//                     key={index}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`social-icon flex items-center justify-center p-3 rounded-full bg-${social.color}-100 dark:bg-${social.color}-900/50 text-${social.color}-600 dark:text-${social.color}-400 hover:bg-${social.color}-200 dark:hover:bg-${social.color}-800 transition-colors duration-200`}
//                     aria-label={social.name}
//                   >
//                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                       {social.icon === "github" && (
//                         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                       )}
//                       {social.icon === "linkedin" && (
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                       )}
//                       {social.icon === "whatsapp" && (
//                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//                       )}
//                       {social.icon === "instagram" && (
//                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
//                       )}
//                     </svg>
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactMe;


// import React, { useRef, useEffect, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { motion } from "framer-motion";
// import emailjs from "@emailjs/browser";

// gsap.registerPlugin(ScrollTrigger);


// const ContactMe = () => {
//   const containerRef = useRef(null);
//   const headingRef = useRef(null);
//   const formRef = useRef(null);
//   const infoRef = useRef(null);
//   const socialRef = useRef(null);
//   const form = useRef();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Section entrance animation
//       gsap.from(containerRef.current, {
//         opacity: 0,
//         y: 50,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 90%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Heading animation with more dramatic effect
//       const chars = gsap.utils.toArray(".char");
//       gsap.from(chars, {
//         y: "random(-50, 50)",
//         opacity: 0,
//         duration: 0.8,
//         ease: "back.out(1.7)",
//         stagger: {
//           each: 0.05,
//           from: "random"
//         },
//         scrollTrigger: {
//           trigger: headingRef.current,
//           start: "top 80%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Form container animation with scaling
//       gsap.from(formRef.current, {
//         opacity: 0,
//         y: 80,
//         scale: 0.95,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: formRef.current,
//           start: "top 75%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Form elements staggered animation
//       gsap.from(".form-element", {
//         opacity: 0,
//         y: 30,
//         duration: 0.6,
//         stagger: 0.15,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: formRef.current,
//           start: "top 75%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Info container animation with 3D rotation effect
//       gsap.from(infoRef.current, {
//         opacity: 0,
//         x: -50,
//         rotationY: 15,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: infoRef.current,
//           start: "top 75%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Contact info items animation
//       gsap.from(".contact-info-item", {
//         opacity: 0,
//         x: -30,
//         duration: 0.6,
//         stagger: 0.2,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: infoRef.current,
//           start: "top 65%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Social container animation
//       gsap.from(socialRef.current, {
//         opacity: 0,
//         y: 50,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: socialRef.current,
//           start: "top 85%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Social icons animation
//       gsap.from(".social-icon", {
//         opacity: 0,
//         y: 20,
//         scale: 0.8,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: "back.out(1.7)",
//         scrollTrigger: {
//           trigger: socialRef.current,
//           start: "top 80%",
//           toggleActions: "play none none none"
//         }
//       });

//       // Background elements animation
//       gsap.from(".bg-element", {
//         opacity: 0,
//         scale: 0.8,
//         duration: 1.5,
//         stagger: 0.3,
//         ease: "elastic.out(1, 0.5)",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 80%",
//           toggleActions: "play none none none"
//         }
//       });

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);



//   const sendEmail = (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setSubmitStatus(null);

//   const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
//   const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
//   const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

//   emailjs.sendForm(serviceId, templateId, form.current, publicKey)
//     .then((result) => {
//       console.log(result.text);
//       setSubmitStatus('success');
      
//       // Only animate if element exists
//       const successElement = document.querySelector('.success-message');
//       if (successElement) {
//         gsap.from(successElement, {
//           y: 20,
//           opacity: 0,
//           duration: 0.5,
//           ease: "back.out(1.7)"
//         });
//       }
      
//       form.current.reset();
//     }, (error) => {
//       console.log(error.text);
//       setSubmitStatus('error');
      
//       // Only animate if element exists
//       const errorElement = document.querySelector('.error-message');
//       if (errorElement) {
//         gsap.from(errorElement, {
//           y: 20,
//           opacity: 0,
//           duration: 0.5,
//           ease: "back.out(1.7)"
//         });
//       }
//     })
//     .finally(() => {
//       setIsSubmitting(false);
//       setTimeout(() => setSubmitStatus(null), 5000);
//     });
// };

//   const renderAnimatedTitle = (text) =>
//     text.split("").map((char, i) => (
//       <span key={i} className="char inline-block">
//         {char === " " ? "\u00A0" : char}
//       </span>
//     ));

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-100 dark:from-gray-900 dark:to-gray-900"
//       id="contact"
//     >
//       {/* Background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-100/20 dark:bg-indigo-900/10 mix-blend-multiply blur-3xl bg-element"></div>
//         <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-lg bg-teal-100/20 dark:bg-teal-900/10 mix-blend-multiply blur-3xl bg-element"></div>
//       </div>

//       <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
//         <div className="text-center mb-10 md:mb-16" ref={headingRef}>
//           <h2 className="text-3xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
//             {renderAnimatedTitle("Get In Touch")}
//           </h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4 }}
//             className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
//           >
//             Questions, <span className="text-green-500 dark:text-green-400"> ideas </span>, thoughts, or just a 
//             <span className="text-blue-500 dark:text-blue-400"> friendly hello</span> – I’m 
//             <span className="text-red-500 dark:text-red-400"> always here</span>.
//           </motion.p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

//           {/* Contact Form */}
//           <div 
//             ref={formRef}
//             className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 transform-style-preserve-3d"
//           >
//             <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Send me a message</h3>
//             <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-6">
//               <div className="form-element">
//                 <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   name="user_name"
//                   id="name"
//                   className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
//                   placeholder="Your Name"
//                   required
//                 />
//               </div>

//               <div className="form-element">
//                 <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="user_email"
//                   id="email"
//                   className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
//                   placeholder="youremail@gmail.com"
//                   required
//                 />
//               </div>

//               <div className="form-element">
//                 <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
//                   Your Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="4"
//                   className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
//                   placeholder="Write your message here"
//                   required
//                 ></textarea>
//               </div>

//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
//                 >
//                   {isSubmitting ? (
//                     <span className="flex items-center justify-center sm:justify-start">
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Message"
//                   )}
//                 </motion.button>

//                 <div className="flex justify-center sm:justify-end">
//                   {submitStatus === 'success' && (
//                     <motion.div 
//                       className="success-message text-xs sm:text-sm text-green-600 dark:text-green-400 flex items-center text-center sm:text-left"
//                     >
//                       <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                       Message sent!
//                     </motion.div>
//                   )}
//                   {submitStatus === 'error' && (
//                     <motion.div 
//                       className="error-message text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center text-center sm:text-left"
//                     >
//                       <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                       </svg>
//                       Failed to send
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-8">
            
//             <div className="space-y-6 sm:space-y-8">
//               <div
//                 ref={infoRef}
//                 className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl 
//                           p-5 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
//               >
//                 <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
//                   Contact Information
//                 </h3>

//                 <div className="space-y-4 sm:space-y-5">
//                   {/* Email */}
//                   <div className="contact-info-item flex items-start space-x-3 sm:space-x-4">
//                     <div className="flex-shrink-0 p-2 sm:p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
//                       <svg
//                         className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Email</h4>
//                       <a
//                         href="mailto:shreyashpatil8078@gmail.com"
//                         className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm sm:text-base"
//                       >
//                         contact@example.com
//                       </a>
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="contact-info-item flex items-start space-x-3 sm:space-x-4">
//                     <div className="flex-shrink-0 p-2 sm:p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
//                       <svg
//                         className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Phone</h4>
//                       <a
//                         href="tel:+918956501934"
//                         className="text-amber-600 dark:text-amber-400 hover:underline text-sm sm:text-base"
//                       >
//                         +918956XXXXXX
//                       </a>
//                     </div>
//                   </div>

//                   {/* Location */}
//                   <div className="contact-info-item flex items-start space-x-3 sm:space-x-4">
//                     <div className="flex-shrink-0 p-2 sm:p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
//                       <svg
//                         className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
//                       </svg>
//                     </div>
//                     <div>
//                       <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Location</h4>
//                       <p className="text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">Sangola, Solapur, India</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>


//             {/* Social Links */}
//             <div 
//               ref={socialRef}
//               className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
//             >
//               <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">Social Media I Exist On</h3>
//               <div className="flex flex-wrap gap-4">
//                 {[
//                   { 
//                     name: "GitHub", 
//                     icon: "github", 
//                     color: "gray", 
//                     url: "https://github.com/Shreyash-SP80" 
//                   },
//                   { 
//                     name: "LinkedIn", 
//                     icon: "linkedin", 
//                     color: "blue", 
//                     url: "https://linkedin.com/in/shreyash-patil-sp7213" 
//                   },
//                   { 
//                     name: "WhatsApp", 
//                     icon: "whatsapp", 
//                     color: "green", 
//                     url: "https://wa.me/+918956501934" 
//                   },
//                   { 
//                     name: "Instagram", 
//                     icon: "instagram", 
//                     color: "pink", 
//                     url: "https://instagram.com/patilshreyash638" 
//                   },
//                 ].map((social, index) => (
//                   <motion.a
//                     key={index}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`social-icon flex items-center justify-center p-3 rounded-full bg-${social.color}-100 dark:bg-${social.color}-900/50 text-${social.color}-600 dark:text-${social.color}-400 hover:bg-${social.color}-200 dark:hover:bg-${social.color}-800 transition-colors duration-200`}
//                     aria-label={social.name}
//                   >
//                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                       {social.icon === "github" && (
//                         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                       )}
//                       {social.icon === "linkedin" && (
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                       )}
//                       {social.icon === "whatsapp" && (
//                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//                       )}
//                       {social.icon === "instagram" && (
//                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
//                       )}
//                     </svg>
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


// export default ContactMe;






