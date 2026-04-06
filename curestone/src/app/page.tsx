import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import DoctorProfile from "@/components/home/DoctorProfile";
import ExpertVideos from "@/components/home/ExpertVideos";
import PatientMosaic from "@/components/home/PatientMosaic";
import GoogleReviews from "@/components/home/GoogleReviews";
import GlobalReach from "@/components/home/GlobalReach";
import Services from "@/components/home/Services";
import WhyRIRS from "@/components/home/WhyRIRS";
import TreatmentTracker from "@/components/home/TreatmentTracker";
import PatientStories from "@/components/home/PatientStories";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Marquee />
        <DoctorProfile />
        <ExpertVideos />
        <PatientMosaic />
        <GoogleReviews />
        <GlobalReach />
        <Services />
        <WhyRIRS />
        <TreatmentTracker />
      </main>
      <Footer />
    </div>
  );
}
