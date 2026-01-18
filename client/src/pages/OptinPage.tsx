import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const OptinPage = (): JSX.Element => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 22,
    mins: 14,
    secs: 24,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, mins, secs } = prev;
        
        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                clearInterval(timer);
                return prev;
              }
            }
          }
        }
        
        return { days, hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownData = [
    { value: String(countdown.days).padStart(2, "0"), label: "Days" },
    { value: String(countdown.hours).padStart(2, "0"), label: "Hours" },
    { value: String(countdown.mins).padStart(2, "0"), label: "Mins" },
    { value: String(countdown.secs).padStart(2, "0"), label: "Secs" },
  ];

  const featureCards = [
    {
      image: "/figmaAssets/vecteezy-a-charming-3d-rendering-of-a-classic-mailbox-conveying-.png",
      title: "Email Strategy that helps Connect with your audience through our Email Strategy.",
    },
    {
      image: "/figmaAssets/vecteezy-conceptual-3d-render-of-a-messaging-icon-for-digital-60.png",
      title: "Step by step guide, How to assess customer journey stages and address pain points in their business.",
    },
    {
      image: "/figmaAssets/vecteezy-3d-cartoon-handshake-illustration-symbolizing-business-.png",
      title: "Build trust and turn subscribers into loyal, long-term customers.",
    },
  ];

  const faqData = [
    {
      question: "Isn't email marketing outdated with social media now?",
      answer: "Not at all! Email marketing remains one of the highest ROI channels with an average return of $42 for every $1 spent. Unlike social media where algorithms control your reach, email gives you direct access to your audience's inbox. It's personal, measurable, and completely within your control.",
    },
    {
      question: "Is your product free?",
      answer: "Yes! This resource is completely free. We believe in providing value first. You'll get instant access to our email strategy guide that has helped hundreds of businesses increase their conversions.",
    },
    {
      question: "How can I get the free resource?",
      answer: "Simply enter your name and email in the form above, and you'll receive instant access to download the resource. We'll also send you a welcome email with additional tips to get you started.",
    },
  ];

  const navigationLinks = ["Home", "Offer", "About", "FAQs"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and email are required.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Success! 🎉",
      description: "Check your email for the free resource!",
    });
    
    setName("");
    setEmail("");
    setIsSubmitting(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-900 overflow-x-hidden w-full min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-amber-500 font-bold text-xl">PYOW</span>
            <div className="hidden md:flex space-x-8">
              {navigationLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link.toLowerCase())}
                  className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
                >
                  {link}
                </button>
              ))}
            </div>
            <Button 
              onClick={() => scrollToSection("home")}
              className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
            <span className="text-gray-100">HOW TO </span>
            <span className="text-amber-500 italic">CONVERT </span>
            <span className="text-gray-100">YOUR </span>
            <span className="text-amber-500 italic">SALES </span>
            <span className="text-gray-100">FROM X TO Y USING THIS EMAIL SECRET METHOD</span>
          </h1>

          <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 my-8 sm:my-12">
            {countdownData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg p-3 sm:p-4 md:p-6 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
                  <span className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                    {item.value}
                  </span>
                </div>
                <span className="text-gray-400 text-sm sm:text-base md:text-lg mt-2">
                  {item.label}
                </span>
                {index < countdownData.length - 1 && (
                  <span className="hidden sm:block absolute text-white text-4xl font-bold" style={{ marginLeft: "120px" }}>:</span>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 mt-8">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 bg-gray-100 border-2 border-amber-500/50 focus:border-amber-500 text-gray-900 placeholder:text-gray-500 text-lg rounded-xl px-6"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 bg-gray-100 border-2 border-amber-500/50 focus:border-amber-500 text-gray-900 placeholder:text-gray-500 text-lg rounded-xl px-6"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-xl rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "SUBSCRIBE NOW"}
            </Button>
          </form>
        </div>
      </section>

      <section id="offer" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-gray-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed">
                Join now and discover how to connect with your audience, solve their pain points, and build lasting customer relationships.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl shadow-amber-500/20"
                alt="Email Marketing"
                src="/figmaAssets/image-1.png"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-12 md:mb-16">
            WHAT WILL YOU GET?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featureCards.map((card, index) => (
              <Card
                key={index}
                className="bg-gray-100 rounded-3xl border-0 overflow-hidden hover:scale-105 transition-transform duration-300 shadow-xl"
              >
                <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 mb-6 relative">
                    <img
                      className="w-full h-full object-contain"
                      alt={`Feature ${index + 1}`}
                      src={card.image}
                    />
                  </div>
                  <p className="text-gray-800 text-lg sm:text-xl font-medium leading-relaxed">
                    {card.title}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-900 rounded-2xl transform rotate-3"></div>
              <img
                className="relative w-full max-w-md mx-auto rounded-2xl border-4 border-blue-900 object-cover"
                alt="Profile portfolio"
                src="/figmaAssets/profile-portfolio-photoroom-png-photoroom-1.png"
              />
            </div>

            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-100 leading-tight">
                Hi, I'm Olympio, your friendly Digital Strategist.
              </h2>

              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300">
                Here's your welcome resource
              </p>

              <Button 
                onClick={() => {
                  toast({
                    title: "Download Started!",
                    description: "Your free resource is being prepared.",
                  });
                }}
                className="w-full sm:w-auto px-8 py-6 h-auto bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-bold italic text-xl sm:text-2xl text-white transition-all duration-300 hover:scale-105"
              >
                DOWNLOAD FREE RESOURCE
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-12">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-700 rounded-xl px-6 bg-gray-800/50"
              >
                <AccordionTrigger className="text-white text-lg sm:text-xl md:text-2xl font-medium hover:no-underline hover:text-amber-500 transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <img
                className="w-full max-w-[200px] rounded-lg"
                alt="Logo"
                src="/figmaAssets/image-2.png"
              />
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-xl mb-4">Navigation</h3>
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-xl mb-4">Contact Us</h3>
              <address className="text-gray-600 not-italic space-y-2">
                <p>Email: contact@pyowdigitals.com</p>
                <p>Phone: +63935725865</p>
              </address>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-xl mb-4">Socials</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors">
                  <img className="w-8 h-8 object-cover rounded" alt="Instagram" src="/figmaAssets/image-4.png" />
                  <span>@pyowdigitals</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors">
                  <img className="w-8 h-8 object-cover rounded" alt="Facebook" src="/figmaAssets/rectangle-9.png" />
                  <span>@pyowdigitals</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors">
                  <img className="w-8 h-8 object-cover rounded" alt="Twitter" src="/figmaAssets/rectangle-9.png" />
                  <span>@pyowdigitals</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} PYOW Digitals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
