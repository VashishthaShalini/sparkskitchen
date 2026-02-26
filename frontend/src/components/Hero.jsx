import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-28 text-center">

      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Delicious Food,
          <br />
          Delivered To Your Door 🚀
        </h1>

        <p className="text-lg mb-8 text-gray-100">
          Fresh. Fast. Flavorful. Order your favorites anytime.
        </p>
        
        <Link to="/category" className="bg-white text-red-600 px-5 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Explore Menu
          </Link>

      </div>

    </section>
  );
}

export default Hero;