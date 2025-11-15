import React, { useState, useEffect } from "react";
import { LuPlus, LuDownload } from "react-icons/lu";
import DashboardLayout from "../../components/DashboardLayout";
import SavingsGoalCard from "../../components/SavingsGoalCard";
import CreateSavingsModal from "../../components/CreateSavingsModal";
import ManualContributionModal from "../../components/ManualContributionModal";
import AutoContributeModal from "../../components/AutoContributeModal";
import DeleteAlert from "../../components/DeleteAlert";
import LoadingPopup from "../../components/LoadingPopup";
import ErrorPopup from "../../components/ErrorPopup";
import SkeletonLoading from "../../components/SkeletonLoading";
import {
  getAllSavingsGoals,
  createSavingsGoal,
  addManualContribution,
  toggleAutoContribute,
  updateSavingsGoal,
  deleteSavingsGoal,
  downloadSavingsReport,
  formatCurrency,
} from "../../utils/savingsApi";
import toast from "react-hot-toast";

const Savings = () => {
  const [goals, setGoals] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showContributionModal, setShowContributionModal] = useState(false);
  const [showAutoModal, setShowAutoModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Load goals on mount
  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    setLoading(true);
    try {
      const data = await getAllSavingsGoals();
      setGoals(data.goals || []);
      setSummary(data.summary);
      setError("");
    } catch {
      setError("Gagal memuat data savings");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async (goalData, editId) => {
    if (editId) {
      await updateSavingsGoal(editId, goalData);
      toast.success("Goal berhasil diupdate!");
    } else {
      await createSavingsGoal(goalData);
      toast.success("Goal berhasil dibuat!");
    }
    await loadGoals();
    setEditingGoal(null);
  };

  const handleAddContribution = async (savingsId, amount, note) => {
    await addManualContribution(savingsId, amount, note);
    toast.success("Kontribusi berhasil ditambahkan!");
    await loadGoals();
  };

  const handleToggleAuto = async (savingsId, enabled, amount, frequency) => {
    await toggleAutoContribute(savingsId, enabled, amount, frequency);
    toast.success(
      enabled
        ? "Auto-contribute berhasil diaktifkan!"
        : "Auto-contribute berhasil dinonaktifkan!"
    );
    await loadGoals();
  };

  const handleDeleteGoal = async () => {
    setDeleting(true);
    try {
      await deleteSavingsGoal(selectedGoal._id);
      toast.success("Goal berhasil dihapus!");
      await loadGoals();
      setShowDeleteAlert(false);
      setSelectedGoal(null);
    } catch {
      setError("Gagal menghapus goal");
      setShowError(true);
    } finally {
      setDeleting(false);
    }
  };

  const handleDownloadReport = async () => {
    setDownloading(true);
    try {
      await downloadSavingsReport();
      toast.success("Report berhasil diunduh!");
    } catch {
      setError("Gagal mengunduh report");
      setShowError(true);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <DashboardLayout>
      <LoadingPopup show={downloading} text="Mengunduh report..." />
      <ErrorPopup
        show={showError}
        text={error}
        onClose={() => setShowError(false)}
      />
      <CreateSavingsModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingGoal(null);
        }}
        onSuccess={handleCreateGoal}
        editingGoal={editingGoal}
      />
      <ManualContributionModal
        isOpen={showContributionModal}
        onClose={() => {
          setShowContributionModal(false);
          setSelectedGoal(null);
        }}
        onSuccess={handleAddContribution}
        goal={selectedGoal}
      />
      <AutoContributeModal
        isOpen={showAutoModal}
        onClose={() => {
          setShowAutoModal(false);
          setSelectedGoal(null);
        }}
        onSuccess={handleToggleAuto}
        goal={selectedGoal}
      />
      <DeleteAlert
        isOpen={showDeleteAlert}
        title="Hapus Goal"
        message={`Apakah Anda yakin ingin menghapus goal "${selectedGoal?.goalName}"?`}
        onConfirm={handleDeleteGoal}
        onCancel={() => setShowDeleteAlert(false)}
        loading={deleting}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Savings & Goals
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola dan pantau target tabungan Anda dengan fitur kontribusi manual
          dan otomatis
        </p>
      </div>

      {/* Summary Cards */}
      {summary && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Total Goals
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {summary.totalGoals}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Terkumpul
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(summary.totalSaved)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Total Target
            </p>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              {formatCurrency(summary.totalTarget)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Completed
            </p>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {summary.completedGoals}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={() => {
            setEditingGoal(null);
            setShowCreateModal(true);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors flex-1 sm:flex-none"
        >
          <LuPlus className="w-5 h-5" />
          Goal Baru
        </button>
        <button
          onClick={handleDownloadReport}
          disabled={downloading}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-1 sm:flex-none disabled:opacity-50"
        >
          <LuDownload className="w-5 h-5" />
          Download Report
        </button>
      </div>

      {/* Goals List */}
      {loading ? (
        <div>
          {[...Array(6)].map((_, i) => (
            <SkeletonLoading key={i} height="60px" />
          ))}
        </div>
      ) : goals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Belum ada goals. Buat goal baru untuk memulai tabungan!
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
          >
            Buat Goal Pertama
          </button>
        </div>
      ) : (
        <div>
          {goals.map((goal) => (
            <SavingsGoalCard
              key={goal._id}
              goal={goal}
              onEdit={(g) => {
                setEditingGoal(g);
                setShowCreateModal(true);
              }}
              onDelete={(id, name) => {
                setSelectedGoal({ _id: id, goalName: name });
                setShowDeleteAlert(true);
              }}
              onAddContribution={(id) => {
                setSelectedGoal(goals.find((g) => g._id === id));
                setShowContributionModal(true);
              }}
              onAutoSettings={(g) => {
                setSelectedGoal(g);
                setShowAutoModal(true);
              }}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Savings;
