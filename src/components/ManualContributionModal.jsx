import React, { useState } from "react";
import { LuX } from "react-icons/lu";
import Input from "./Input";
import LoadingPopup from "./LoadingPopup";
import ErrorPopup from "./ErrorPopup";
import { formatCurrency } from "../utils/savingsApi";

const ManualContributionModal = ({ isOpen, onClose, onSuccess, goal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Jumlah kontribusi harus lebih dari 0");
      setShowError(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSuccess(goal._id, Number(amount), note);
      setAmount("");
      setNote("");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambah kontribusi");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !goal) return null;

  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <>
      <LoadingPopup show={loading} text="Menambah kontribusi..." />
      <ErrorPopup
        show={showError}
        text={error}
        onClose={() => setShowError(false)}
      />

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {goal.icon} Kontribusi ke {goal.goalName}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LuX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Info */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 m-6 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Terkumpul</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(goal.currentAmount)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Target</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(goal.targetAmount)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600 dark:text-gray-400">Sisa Butuh</p>
                <p className="font-bold text-teal-600 dark:text-teal-400">
                  {formatCurrency(remaining)}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <Input
              label="Jumlah Kontribusi (Rp)"
              name="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Contoh: 500000"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Catatan (Opsional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tambahkan catatan untuk kontribusi ini..."
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
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
                Tambah Kontribusi
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManualContributionModal;
