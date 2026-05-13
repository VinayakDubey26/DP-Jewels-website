import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import Footer from "../sections/Footer";
import ShowroomExperience from "../sections/ShowroomExperience";

export default function HomePage() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <LoadingScreen done={done} />
      <ScrollProgress />
      <Navbar />
      <main>
        <ShowroomExperience />
      </main>
      <Footer />
    </div>
  );
}
