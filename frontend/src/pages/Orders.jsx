import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:9090/orders/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setOrders(res.data);
  } catch (err) {
    console.error("Failed to fetch orders", err);
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">

      {/* ✅ NAVBAR */}
      <Navbar />

      {/* ✅ ORDERS SECTION */}
      <div className="flex-grow max-w-5xl mx-auto px-4 py-10">

        <h2 className="text-3xl font-bold text-red-600 mb-8">
          Your Orders 🍔
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">
            You haven't placed any orders yet.
          </p>
        ) : (

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

            {orders.map(order => (

              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md border border-orange-200 p-6 hover:shadow-lg transition"
              >

                {/* ORDER HEADER */}
                <div className="flex justify-between items-center mb-4">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{order.id}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {new Date(order.orderDate)
                        .toLocaleString()}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="divide-y">

                  {order.items.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between py-3"
                    >
                      <div>
                        <p className="font-medium text-gray-700">
                          {item.foodName}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-orange-600">
                        ₹{item.subTotal}
                      </p>
                    </div>
                  ))}

                </div>

                {/* TOTAL */}
                <div className="flex justify-between mt-4 pt-4 border-t">

                  <span className="font-semibold text-gray-700">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-red-600">
                    ₹{order.totalAmount}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* ✅ FOOTER */}
      <Footer />

    </div>
  );
};

export default Orders;