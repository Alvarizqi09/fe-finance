import {
  LuHandCoins,
  LuLayoutDashboard,
  LuLogOut,
  LuWalletMinimal,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

// Income source options
export const INCOME_SOURCES = [
  { value: "Gaji", label: "Gaji" },
  { value: "Freelance", label: "Freelance" },
  { value: "Investasi", label: "Investasi" },
  { value: "Saham", label: "Saham" },
  { value: "Dividen", label: "Dividen" },
  { value: "Hadiah", label: "Hadiah" },
  { value: "Lainnya", label: "Lainnya" },
];

// Expense source options
export const EXPENSE_SOURCES = [
  { value: "Makanan", label: "Makanan" },
  { value: "Transportasi", label: "Transportasi" },
  { value: "Belanja", label: "Belanja" },
  { value: "Hiburan", label: "Hiburan" },
  { value: "Kesehatan", label: "Kesehatan" },
  { value: "Aplikasi", label: "Aplikasi" },
  { value: "Tagihan", label: "Tagihan" },
  { value: "Lainnya", label: "Lainnya" },
];
