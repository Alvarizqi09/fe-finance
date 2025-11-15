import React, { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import Input from "./Input";
import Select from "./Select";
import LoadingPopup from "./LoadingPopup";
import ErrorPopup from "./ErrorPopup";

const AutoContributeModal = ({ isOpen, onClose, onSuccess, goal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");

  useEffect(() => {
    if (isOpen && goal) {
      setEnabled(goal.autoContribute?.enabled || false);
      setAmount(goal.autoContribute?.amount?.toString() || "");
      setFrequency(goal.autoContribute?.frequency || "monthly");
    }
  }, [isOpen, goal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enabled && (!amount || Number(amount) <= 0)) {
      setError("Jumlah auto-contribute harus lebih dari 0");
      setShowError(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSuccess(goal._id, enabled, Number(amount), frequency);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengubah auto-contribute");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !goal) return null;

  return (
    <>
      <LoadingPopup show={loading} text="Mengubah pengaturan..." />
      <ErrorPopup
        show={showError}
        text={error}
        onClose={() => setShowError(false)}
      />

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {goal.icon} Pengaturan Auto-Contribute
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
            {/* Enable Toggle */}
            <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-emerald-500 cursor-pointer"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Aktifkan Auto-Contribute
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Kontribusi otomatis sesuai jadwal
                </p>
              </div>
            </label>

            {enabled && (
              <div className="space-y-4 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                <Input
                  label="Jumlah Per Kontribusi (Rp)"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Contoh: 500000"
                />

                <Select
                  label="Frekuensi"
                  name="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  options={[
                    { value: "daily", label: "Setiap Hari" },
                    { value: "weekly", label: "Setiap Minggu" },
                    { value: "monthly", label: "Setiap Bulan" },
                  ]}
                />

                {goal.autoContribute?.nextContributionDate && (
                  <div className="bg-white dark:bg-gray-800 p-3 rounded border border-emerald-200 dark:border-emerald-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Kontribusi berikutnya:
                    </p>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {new Date(
                        goal.autoContribute.nextContributionDate
                      ).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                )}
              </div>
            )}

            {!enabled && goal.autoContribute?.enabled && (
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded border border-amber-200 dark:border-amber-700">
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Auto-contribute saat ini <strong>diaktifkan</strong>. Jika
                  Anda menonaktifkannya, kontribusi otomatis akan berhenti.
                </p>
              </div>
            )}

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
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AutoContributeModal;
