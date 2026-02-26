import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import defaultFoodImage from "../utils/foodImages";
import { isLoggedIn } from "../utils/auth";

function FoodCard({ food }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!food) return null;

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");

      await api.post("/cart/add", {
        userId: Number(userId),
        foodId: food.id,
        quantity: quantity,
      });

      alert("Added to cart 🛒");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

//   const handleOrderNow = async () => {
//   if (!isLoggedIn()) {
//     navigate("/login");
//     return;
//   }

//   try {
//     setLoading(true);

//     const response = await api.post("/orders/place");

//     alert("Order Placed ✅");
//   } catch (err) {
//     console.error(err);
//     alert("Order failed");
//   } finally {
//     setLoading(false);
//   }
// };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden 
                    hover:shadow-xl transition duration-300">

      <img
        src={defaultFoodImage}
        alt={food.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-red-600">{food.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{food.description}</p>

        <p className="text-lg font-semibold text-orange-500 mb-3">
          ₹ {food.price}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-600">Qty:</span>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 border rounded px-2 py-1"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add to Cart
          </button>

          {/* <button
            onClick={handleOrderNow}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Order Now
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
