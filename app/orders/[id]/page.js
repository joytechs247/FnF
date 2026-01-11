'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiHome,
  FiPhone,
  FiPrinter,
  FiMessageCircle,
  FiChevronRight,
} from "react-icons/fi";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function OrderDetailPage() {
    const { id } = useParams();
    const { user } = useAuth();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    /* =========================
       FETCH ORDER FROM DB
    ========================= */
    useEffect(() => {
        if (!user || !id) return;

        const fetchOrder = async () => {
            try {
                const ref = doc(db, "orders", id);
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    setOrder({ id: snap.id, ...snap.data() });
                } else {
                    setOrder(null);
                }
            } catch (err) {
                console.error("Failed to fetch order:", err);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [user, id]);

    /* =========================
       LOADING / NOT FOUND
    ========================= */
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-24" />
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold">Order not found</h2>
            </div>
        );
    }

    /* =========================
       DERIVED DATA
    ========================= */
    const createdAt =
        order.createdAt?.toDate?.() ||
        (order.createdAt ? new Date(order.createdAt) : null);

    const orderedDate = createdAt
        ? createdAt.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "";


    const timelineSteps = [
        { key: "processing", label: "Order placed" },
        { key: "processing", label: "Processing" },
        { key: "shipped", label: "Shipped" },
        { key: "delivered", label: "Delivered" },
    ];

    const currentIndex = timelineSteps.findIndex(
        (s) => s.key === order.status
    );

    /* =========================
       WHATSAPP MESSAGE
    ========================= */
    const whatsappMessage = encodeURIComponent(
        `Hello FibresNFools 👋\n\nOrder ID: ${order.id}\nTotal: ₹${order.total}\nStatus: ${order.status}\n\nPlease assist.`
    );

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-8">
                <div className="container-responsive section-padding max-w-6xl mx-auto">

                    {/* Breadcrumb */}
                    <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
                        <a href="/account">Account</a>
                        <FiChevronRight className="w-4 h-4" />
                        <a href="/orders">Orders</a>
                        <FiChevronRight className="w-4 h-4" />
                        <span className="text-pink-600 font-medium">
                            Order #{order.id}
                        </span>
                    </div>

                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6 mb-8 flex justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
                            <p className="text-sm text-gray-600">Placed on {orderedDate}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-pink-600">
                                ₹{order.total.toLocaleString()}
                            </div>
                            <span className="text-sm capitalize">{order.status}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Items */}
                            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6">
                                <h2 className="text-xl font-semibold mb-6">
                                    Order Items ({order.items?.length || 0})

                                </h2>

                                {order.items?.map((item, i) => (
                                    <div key={i} className="flex justify-between mb-6">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-sm">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="font-bold">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Timeline */}
                            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6">
                                <h2 className="text-xl font-semibold mb-6">Order Timeline</h2>

                                {timelineSteps.map((step, i) => (
                                    <div key={i} className="flex gap-4 mb-4">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= currentIndex
                                                    ? "bg-pink-500 text-white"
                                                    : "bg-pink-100 text-pink-600"
                                                }`}
                                        >
                                            {i + 1}
                                        </div>
                                        <div className="font-medium">{step.label}</div>
                                    </div>
                                ))}

                                {order.status === "shipped" && order.trackingLink && (
                                    <button
                                        onClick={() =>
                                            window.open(order.trackingLink, "_blank")
                                        }
                                        className="mt-4 px-6 py-3 bg-blue-50 text-blue-600 rounded-lg font-semibold"
                                    >
                                        Track Shipment
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-8">

                            {/* Address */}
                            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6">
                                <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                                <p>
                                    {typeof order.address === "string"
                                        ? order.address
                                        : order.address?.address}
                                </p>

                            </div>

                            {/* Payment */}
                            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6">
                                <h2 className="text-xl font-semibold mb-4">Payment</h2>
                                <p className="capitalize">{order.paymentMethod}</p>
                            </div>

                            {/* Actions */}
                            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6 space-y-3">
                                <button className="w-full py-3 bg-pink-50 text-pink-600 rounded-lg font-semibold">
                                    <FiPrinter className="inline mr-2 w-5 h-5" />
                                    Download Invoice
                                </button>

                                <button
                                    onClick={() =>
                                        window.open(
                                            `https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`,
                                            "_blank"
                                        )
                                    }
                                    className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold"
                                >
                                    <FiMessageCircle className="inline mr-2 w-5 h-5" />
                                    Chat on WhatsApp
                                </button>

                                <a
                                    href="/orders"
                                    className="block text-center py-3 border-2 border-pink-200 text-pink-600 rounded-lg font-semibold"
                                >
                                    Back to Orders
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ ProtectedRoute>
    );
}
