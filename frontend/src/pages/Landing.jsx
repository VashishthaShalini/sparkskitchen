import { useEffect, useState } from "react";
import publicApi from "../services/publicApi"; 
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FoodCard from "../components/FoodCard";
import Footer from "../components/Footer";

function Landing() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi.get("/foods")
      .then((res) => {
        setFoods(res.data.slice(0, 6));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          🔥 Trending Foods
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading foods...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Landing;