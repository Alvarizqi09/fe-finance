import React from "react";
import { LuX } from "react-icons/lu";
import { MdWarningAmber } from "react-icons/md";

const FailedContributionAlert = ({ contribution, onDismiss }) => {
  if (
    !contribution ||
    contribution.amount !== 0 ||
    contribution.type !== "auto"
  ) {
    return null;
  }

  // Parse balance info dari note
  const parseBalanceInfo = (note) => {
    const match = note.match(/Required: (\d+), Available: (\d+)/);
    if (match) {
      return {
        required: parseInt(match[1]),
        available: parseInt(match[2]),
      };
    }
    return null;
  };

  const balanceInfo = parseBalanceInfo(contribution.note);
  const shortageAmount = balanceInfo
    ? balanceInfo.required - balanceInfo.available
    : 0;

  return (
    <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-4">
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <MdWarningAmber className="w-5 h-5 text-red-600 dark:text-red-400" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-1">
          Kontribusi Otomatis Gagal
        </p>
        <p className="text-xs text-red-800 dark:text-red-300 mb-2">
          Saldo tidak cukup untuk melakukan auto-contribution.
        </p>

        {balanceInfo && (
          <div className="space-y-1 text-xs text-red-700 dark:text-red-400 mb-3 bg-red-100/50 dark:bg-red-900/30 p-2 rounded">
            <div className="flex justify-between">
              <span>Jumlah yang dibutuhkan:</span>
              <span className="font-semibold">
                Rp {balanceInfo.required.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Saldo tersedia:</span>
              <span className="font-semibold text-red-600 dark:text-red-300">
                Rp {balanceInfo.available.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between border-t border-red-200 dark:border-red-700 pt-1 mt-1">
              <span>Kekurangan:</span>
              <span className="font-bold text-red-700 dark:text-red-300">
                Rp {shortageAmount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        )}

        <p className="text-xs text-red-700 dark:text-red-400 mb-2">
          Sistem akan mencoba kembali pada periode berikutnya. Pastikan saldo
          Anda mencukupi untuk melanjutkan kontribusi otomatis.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onDismiss}
            className="px-3 py-1.5 text-xs font-medium bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 text-red-800 dark:text-red-200 rounded transition-colors"
          >
            Mengerti
          </button>
          <a
            href="/income"
            className="px-3 py-1.5 text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors"
          >
            Tambah Income
          </a>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onDismiss}
        className="flex-shrink-0 p-1 hover:bg-red-100 dark:hover:bg-red-800 rounded transition-colors"
      >
        <LuX className="w-4 h-4 text-red-600 dark:text-red-400" />
      </button>
    </div>
  );
};

export default FailedContributionAlert;
