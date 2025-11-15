import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LuPlus, LuDownload } from "react-icons/lu";
import DashboardLayout from "../../components/DashboardLayout";
import SavingsGoalCard from "../../components/SavingsGoalCard";
import AddSavingsForm from "../../components/AddSavingsForm";
import ManualContributionModal from "../../components/ManualContributionModal";
import AutoContributeModal from "../../components/AutoContributeModal";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";
import LoadingPopup from "../../components/LoadingPopup";
import ErrorPopup from "../../components/ErrorPopup";
import SkeletonLoading from "../../components/SkeletonLoading";
import FailedContributionsNotifier from "../../components/FailedContributionsNotifier";
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
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showContributionModal, setShowContributionModal] = useState(false);
  const [showAutoModal, setShowAutoModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  // Fetch goals
  const { data: goalsData, isPending: isLoading } = useQuery({
    queryKey: ["savingsGoals"],
    queryFn: getAllSavingsGoals,
  });

  const goals = goalsData?.goals || [];
  const summary = goalsData?.summary || null;

  // Create goal mutation
  const createMutation = useMutation({
    mutationFn: (goalData) => createSavingsGoal(goalData),
    onSuccess: () => {
      toast.success("Goal berhasil dibuat!");
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      setShowCreateModal(false);
    },
    onError: () => {
      toast.error("Gagal membuat goal");
    },
  });

  // Update goal mutation
  const updateMutation = useMutation({
    mutationFn: ({ goalId, goalData }) => updateSavingsGoal(goalId, goalData),
    onSuccess: () => {
      toast.success("Goal berhasil diupdate!");
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      setShowCreateModal(false);
      setEditingGoal(null);
    },
    onError: () => {
      toast.error("Gagal mengupdate goal");
    },
  });

  // Add contribution mutation
  const contributionMutation = useMutation({
    mutationFn: ({ savingsId, amount, note }) =>
      addManualContribution(savingsId, amount, note),
    onSuccess: () => {
      toast.success("Kontribusi berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      setShowContributionModal(false);
      setSelectedGoal(null);
    },
    onError: () => {
      toast.error("Gagal menambahkan kontribusi");
    },
  });

  // Toggle auto-contribute mutation
  const autoMutation = useMutation({
    mutationFn: ({ savingsId, enabled, amount, frequency }) =>
      toggleAutoContribute(savingsId, enabled, amount, frequency),
    onSuccess: (_, variables) => {
      toast.success(
        variables.enabled
          ? "Auto-contribute berhasil diaktifkan!"
          : "Auto-contribute berhasil dinonaktifkan!"
      );
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      setShowAutoModal(false);
      setSelectedGoal(null);
    },
    onError: () => {
      toast.error("Gagal mengubah auto-contribute");
    },
  });

  // Delete goal mutation
  const deleteMutation = useMutation({
    mutationFn: (goalId) => deleteSavingsGoal(goalId),
    onSuccess: () => {
      toast.success("Goal berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      setShowDeleteAlert(false);
      setSelectedGoal(null);
    },
    onError: () => {
      setError("Gagal menghapus goal");
      setShowError(true);
    },
  });

  // Download report mutation
  const downloadMutation = useMutation({
    mutationFn: downloadSavingsReport,
    onSuccess: () => {
      toast.success("Report berhasil diunduh!");
    },
    onError: () => {
      setError("Gagal mengunduh report");
      setShowError(true);
    },
  });

  const handleCreateGoal = async (goalData, editId) => {
    if (editId) {
      updateMutation.mutate({ goalId: editId, goalData });
    } else {
      createMutation.mutate(goalData);
    }
  };

  const handleAddContribution = async (savingsId, amount, note) => {
    contributionMutation.mutate({ savingsId, amount, note });
  };

  const handleToggleAuto = async (savingsId, enabled, amount, frequency) => {
    autoMutation.mutate({ savingsId, enabled, amount, frequency });
  };

  const handleDeleteGoal = async () => {
    deleteMutation.mutate(selectedGoal._id);
  };

  const handleDownloadReport = async () => {
    downloadMutation.mutate();
  };

  return (
    <DashboardLayout>
      <LoadingPopup
        show={downloadMutation.isPending}
        text="Mengunduh report..."
      />
      <ErrorPopup
        show={showError}
        text={error}
        onClose={() => setShowError(false)}
      />
      <AddSavingsForm
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
      <Modal
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        title="Hapus Goal"
      >
        <DeleteAlert
          content={`Apakah Anda yakin ingin menghapus goal "${selectedGoal?.goalName}"?`}
          onDelete={handleDeleteGoal}
        />
      </Modal>

      {/* Header */}
      <div className="mb-2 mt-4">
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6"
          loading="eager"
        >
          Savings Overview
        </h1>
      </div>

      {/* Failed Contributions Alert */}
      {goals.length > 0 && <FailedContributionsNotifier goals={goals} />}

      {/* Summary Cards */}
      {summary && !isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Total Goals
            </p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {summary.totalGoals}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Terkumpul
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(summary.totalSaved)}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Total Target
            </p>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              {formatCurrency(summary.totalTarget)}
            </p>
          </div>
          <div className="card">
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
          disabled={downloadMutation.isPending}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-1 sm:flex-none disabled:opacity-50"
        >
          <LuDownload className="w-5 h-5" />
          Download Report
        </button>
      </div>

      {/* Goals List */}
      {isLoading ? (
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
        <div className="space-y-3">
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
