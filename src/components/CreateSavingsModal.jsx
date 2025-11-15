import React, { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import Input from "./Input";
import Select from "./Select";
import LoadingPopup from "./LoadingPopup";
import ErrorPopup from "./ErrorPopup";

const EMOJI_ICONS = ["💰", "✈️", "🎓", "🏠", "💊", "🚗", "📱", "🎮", "🎵"];
const CATEGORIES = [
  { value: "vacation", label: "Liburan" },
  { value: "education", label: "Pendidikan" },
  { value: "emergency", label: "Dana Darurat" },
  { value: "investment", label: "Investasi" },
  { value: "other", label: "Lainnya" },
];

const CreateSavingsModal = ({ isOpen, onClose, onSuccess, editingGoal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    goalName: "",
    targetAmount: "",
    icon: "💰",
    description: "",
    targetDate: "",
    category: "other",
    autoContribute: false,
    autoAmount: "",
    frequency: "monthly",
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        goalName: editingGoal.goalName,
        targetAmount: editingGoal.targetAmount.toString(),
        icon: editingGoal.icon,
        description: editingGoal.description || "",
        targetDate: editingGoal.targetDate
          ? editingGoal.targetDate.split("T")[0]
          : "",
        category: editingGoal.category,
        autoContribute: editingGoal.autoContribute?.enabled || false,
        autoAmount: editingGoal.autoContribute?.amount?.toString() || "",
        frequency: editingGoal.autoContribute?.frequency || "monthly",
      });
    } else {
      setFormData({
        goalName: "",
        targetAmount: "",
        icon: "💰",
        description: "",
        targetDate: "",
        category: "other",
        autoContribute: false,
        autoAmount: "",
        frequency: "monthly",
      });
    }
    setError("");
  }, [isOpen, editingGoal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.goalName.trim()) {
      setError("Nama goal tidak boleh kosong");
      return false;
    }
    if (!formData.targetAmount || Number(formData.targetAmount) <= 0) {
      setError("Target amount harus lebih dari 0");
      return false;
    }
    if (formData.autoContribute && !formData.autoAmount) {
      setError("Jumlah auto-contribute harus diisi");
      return false;
    }
    if (formData.autoContribute && Number(formData.autoAmount) <= 0) {
      setError("Jumlah auto-contribute harus lebih dari 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowError(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        goalName: formData.goalName,
        targetAmount: Number(formData.targetAmount),
        icon: formData.icon,
        description: formData.description,
        targetDate: formData.targetDate || null,
        category: formData.category,
      };

      if (formData.autoContribute) {
        payload.autoContribute = true;
        payload.autoAmount = Number(formData.autoAmount);
        payload.frequency = formData.frequency;
      }

      await onSuccess(payload, editingGoal?._id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan goal");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <LoadingPopup show={loading} text="Menyimpan goal..." />
      <ErrorPopup
        show={showError}
        text={error}
        onClose={() => setShowError(false)}
      />

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 z-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {editingGoal ? "Edit Goal" : "Buat Goal Baru"}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LuX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Icon Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon
              </label>
              <div className="flex gap-2 flex-wrap">
                {EMOJI_ICONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, icon: emoji }));
                    }}
                    className={`text-2xl p-2 rounded-lg transition-colors ${
                      formData.icon === emoji
                        ? "bg-emerald-100 dark:bg-emerald-900/30"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Name */}
            <Input
              label="Nama Goal"
              name="goalName"
              value={formData.goalName}
              onChange={handleChange}
              placeholder="Contoh: Liburan ke Bali"
            />

            {/* Target Amount */}
            <Input
              label="Target Amount (Rp)"
              name="targetAmount"
              type="number"
              value={formData.targetAmount}
              onChange={handleChange}
              placeholder="Contoh: 5000000"
            />

            {/* Target Date */}
            <Input
              label="Target Tanggal (Opsional)"
              name="targetDate"
              type="date"
              value={formData.targetDate}
              onChange={handleChange}
            />

            {/* Category */}
            <Select
              label="Kategori"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={CATEGORIES}
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deskripsi (Opsional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tambahkan catatan..."
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
            </div>

            {/* Auto Contribute Section */}
            <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  name="autoContribute"
                  checked={formData.autoContribute}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-emerald-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Aktifkan Auto-Contribute
                </span>
              </label>

              {formData.autoContribute && (
                <div className="space-y-4 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <Input
                    label="Jumlah Per Kontribusi (Rp)"
                    name="autoAmount"
                    type="number"
                    value={formData.autoAmount}
                    onChange={handleChange}
                    placeholder="Contoh: 500000"
                  />

                  <Select
                    label="Frekuensi"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    options={[
                      { value: "daily", label: "Setiap Hari" },
                      { value: "weekly", label: "Setiap Minggu" },
                      { value: "monthly", label: "Setiap Bulan" },
                    ]}
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-medium rounded-lg transition-colors"
              >
                {editingGoal ? "Update" : "Buat"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateSavingsModal;
