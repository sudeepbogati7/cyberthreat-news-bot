import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturedThreats } from "@/components/featured-threats";
import { FeatureSection } from "@/components/feature-section";
import { ChatbotSection } from "@/components/chatbot-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedThreats />
        <FeatureSection />
        <ChatbotSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
