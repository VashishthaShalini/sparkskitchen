import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";

function Cart() {

  const token = localStorage.getItem("token");

  const [cart, setCart] = useState({
    items: [],
    totalAmount: 0,
  });

  const [quantities, setQuantities] = useState({});

  const userId = token ? jwtDecode(token).id : null;

  /* ================= FETCH CART ================= */

  const fetchCart = async () => {
    try {
      const res = await fetch(
        "http://localhost:9090/cart/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setCart(data);

      // store quantities separately
      const qtyMap = {};
      data.items.forEach(item => {
        qtyMap[item.foodId] = item.quantity;
      });

      setQuantities(qtyMap);

    } catch (err) {
      console.log("Cart fetch error", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  /* ================= UPDATE API ================= */

  const updateCartItem = async (foodId, newQty) => {

    if (newQty < 1) return;

    try {

      const body = {
        userId: userId,
        foodId: foodId,
        quantity: newQty,
      };

      const res = await fetch(
        "http://localhost:9090/cart/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const updatedCart = await res.json();

      // ✅ Update whole cart from backend calculation
      setCart(updatedCart);

      // sync quantities again
      const qtyMap = {};
      updatedCart.items.forEach(item => {
        qtyMap[item.foodId] = item.quantity;
      });

      setQuantities(qtyMap);

    } catch (err) {
      console.log("Update failed", err);
    }
  };

  /* ================= + BUTTON ================= */

  const increaseQty = (foodId) => {
    const newQty = (quantities[foodId] || 1) + 1;
    updateCartItem(foodId, newQty);
  };

  /* ================= - BUTTON ================= */

  const decreaseQty = (foodId) => {
    const newQty = (quantities[foodId] || 1) - 1;
    updateCartItem(foodId, newQty);
  };

  /* ================= PLACE ORDER ================= */

  const placeOrder = async () => {
    try {
      const res = await fetch(
        "http://localhost:9090/orders/place",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setCart({
        items: data.items || [],
        totalAmount: data.totalAmount || 0,
      });

      alert("Order Placed Successfully ✅");

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-orange-50 px-8 py-10">

        <h2 className="text-4xl font-bold text-center text-red-600 mb-10">
          🛒 Your Cart
        </h2>

        {cart.items.length === 0 ? (

          <div className="bg-white p-12 rounded-xl shadow text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-600">
              No Items Available
            </h3>
          </div>

        ) : (

          <div className="max-w-5xl mx-auto space-y-6">

            {cart.items.map((item) => (

              <div
                key={item.foodId}
                className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center border border-orange-200"
              >

                {/* FOOD INFO */}
                <div>
                  <h3 className="text-xl font-semibold">
                    {item.foodName}
                  </h3>

                  <p className="text-gray-500">
                    ₹{item.price} each
                  </p>

                  <p className="text-red-600 font-bold text-lg">
                    ₹{item.subTotal}
                  </p>
                </div>

                {/* QUANTITY CONTROL */}
                <div className="flex items-center gap-4">

                  <button
                    onClick={() => decreaseQty(item.foodId)}
                    className="bg-gray-200 px-3 py-1 rounded text-lg"
                  >
                    −
                  </button>

                  <span className="text-lg font-semibold">
                    {quantities[item.foodId]}
                  </span>

                  <button
                    onClick={() => increaseQty(item.foodId)}
                    className="bg-orange-500 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>

                </div>

              </div>
            ))}

            {/* TOTAL */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center border-t-4 border-red-500">

              <h3 className="text-2xl font-bold">
                Total Amount :
                <span className="text-red-600 ml-3">
                  ₹{cart.totalAmount}
                </span>
              </h3>

              <button
                onClick={placeOrder}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700"
              >
                Place Order 🚀
              </button>

            </div>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Cart;