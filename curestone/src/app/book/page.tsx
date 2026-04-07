import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppointmentForm from "@/components/home/AppointmentForm";

export const metadata = {
  title: "Book Appointment | CureStone Kidney care expert",
  description: "Schedule your free consultation with India's leading kidney specialist at CureStone. Advanced FANS-RIRS laser treatment with 98% success rate.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col min-h-screen pt-[64px] lg:pt-[80px]">
      <Navbar />
      <main className="flex-grow">
        <AppointmentForm />
      </main>
      <Footer />
    </div>
  );
}
