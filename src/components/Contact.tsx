import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    null | "success" | "error" | "loading"
  >(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwO80sbn-WO5GozoZ4UW81s0bMNgA2tNzrQTYbsj1y6n7Z9KAXzPhMHvigHt6drKSYS/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // reset status after 3s
        setTimeout(() => setFormStatus(null), 3000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: "Email",
      value: "rohitrsahu2000@gmail.com",
      link: "mailto:rohitrsahu2000@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: "Location",
      value: "Bhubaneswar, Odisha, India",
      link: "#",
    },
    // {
    //   icon: <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    //   title: "Phone",
    //   value: "+1 (555) 123-4567",
    //   link: "tel:+15551234567",
    // },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, link: "https://github.com/Rohit-R-Sahu" },
    {
      icon: <Linkedin size={20} />,
      link: "https://www.linkedin.com/in/rohit-roshan-sahu-",
    },
    { icon: <Twitter size={20} />, link: "https://x.com/eyex0_1" },
  ];

  return (
    <section id="contact" className="section">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title mx-auto">Get In Touch</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            Have a project in mind or just want to say hello? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="card p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Contact Information
              </h3>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-start hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <div className="mt-1 mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {item.title}
                      </h4>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  Connect on Social Media
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-colors"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Send Me a Message
              </h3>

              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg"
                >
                  Your message has been sent successfully!
                </motion.div>
              )}

              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg"
                >
                  There was an error sending your message. Please try again.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary"
                >
                  Send Message <Send size={16} className="ml-2" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
