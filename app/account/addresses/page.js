"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function AddressesPage() {
  const { user, userProfile, loading, updateUserProfile } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    isDefault: false,
  });

  /* =========================
     LOAD ADDRESSES
  ========================= */
  // useEffect(() => {
  //   if (userProfile?.addresses) {
  //     setAddresses(userProfile.addresses);
  //   }
  // }, [userProfile]);




  useEffect(() => {
    if (!user) return;

    const fetchAddresses = async () => {
      const ref = collection(db, "users", user.uid, "addresses");
      const snap = await getDocs(ref);

      setAddresses(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    };

    fetchAddresses();
  }, [user]);


  /* =========================
     FORM HANDLING
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const required = ["name", "phone", "address", "city", "state", "pincode"];
    for (const field of required) {
      if (!formData[field]) {
        alert(`Please enter ${field}`);
        return false;
      }
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Enter a valid 10-digit phone number");
      return false;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      alert("Enter a valid 6-digit pincode");
      return false;
    }

    return true;
  };

  /* =========================
     SAVE / UPDATE ADDRESS
  ========================= */
const handleSave = async (e) => {
  e.preventDefault();
  if (!user || !validateForm()) return;

  setSaving(true);

  try {
    const ref = collection(db, "users", user.uid, "addresses");

    if (editingIndex !== null) {
      // 🔹 UPDATE EXISTING ADDRESS
      const addressId = addresses[editingIndex].id;

      await updateDoc(
        doc(db, "users", user.uid, "addresses", addressId),
        {
          ...formData,
          updatedAt: new Date().toISOString(),
        }
      );
    } else {
      // 🔹 ADD NEW ADDRESS
      await addDoc(ref, {
        ...formData,
        createdAt: new Date().toISOString(),
      });
    }

    // 🔹 RELOAD ADDRESSES
    const snap = await getDocs(ref);
    setAddresses(
      snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    );

    setShowForm(false);
    setEditingIndex(null);
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      isDefault: false,
    });
  } catch (error) {
    console.error(error);
    alert("Failed to save address. Please try again.");
  } finally {
    setSaving(false);
  }
};


const handleEdit = (index) => {
  setEditingIndex(index);
  setFormData(addresses[index]);
  setShowForm(true);
};


  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading addresses...</p>
      </div>
    );
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-pink-50 py-12">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Addresses</h1>
          <button
            onClick={() => {
              setShowForm((prev) => !prev);
              setEditingIndex(null);
            }}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            {showForm ? "Cancel" : "Add Address"}
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <form
            onSubmit={handleSave}
            className="space-y-4 mb-8 border p-4 rounded-lg"
          >
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />

            <div className="grid grid-cols-2 gap-4">
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2 rounded" />
              <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border p-2 rounded" />
            </div>

            <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="w-full border p-2 rounded" />
            <input name="landmark" placeholder="Landmark (Optional)" value={formData.landmark} onChange={handleChange} className="w-full border p-2 rounded" />

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
              Set as default
            </label>

            <button type="submit" disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              {saving ? "Saving..." : "Save Address"}
            </button>
          </form>
        )}

        {/* LIST */}
        <div className="space-y-4">
          {addresses.length === 0 && <p className="text-gray-600">No addresses added yet.</p>}

          {addresses.map((addr, index) => (
            <div key={addr.id} className="border p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{addr.name}</div>
                  <div className="text-sm">{addr.address}</div>
                  <div className="text-sm">{addr.city}, {addr.state} - {addr.pincode}</div>
                  <div className="text-sm">{addr.phone}</div>
                  {addr.isDefault && <div className="text-xs text-green-600 mt-1">Default Address</div>}
                </div>
                <button onClick={() => handleEdit(index)} className="text-sm text-pink-600 hover:underline">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
