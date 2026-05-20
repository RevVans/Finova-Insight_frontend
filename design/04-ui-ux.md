# Finova Insight: UI/UX & Frontend Standards

## 1. Project Overview
A professional Financial Management Application designed for tracking assets, investments, and savings. The frontend is built with **React**, communicating with a **Laravel** backend via **Axios**.

## 2. Technology Stack & Dependencies
Ensure these are installed in the frontend directory:
* **Framework:** React + Vite
* **Routing:** react-router-dom (v6+)
* **Styling:** Tailwind CSS + PostCSS + Autoprefixer
* **Icons:** react-icons (Lucide or Heroicons sets preferred)
* **Data Viz:** Recharts (for Dashboard & Keuangan analytics)
* **API Layer:** Axios (configured with base URL for Laravel API)

## 3. Design System (The "Finova" Palette)
Maintain high consistency. Do not use pure black (#000) for backgrounds or text.

| Element | Hex Code | Tailwind Usage |
| :--- | :--- | :--- |
| **Primary/Text** | `#1E293B` | `bg-slate-800` / `text-slate-800` |
| **Success** | `#10B981` | `text-emerald-500` (Pemasukan/ROI+) |
| **Danger** | `#F43F5E` | `text-rose-500` (Pengeluaran/ROI-) |
| **Background** | `#F8FAFC` | `bg-slate-50` |
| **Accent** | `#3B82F6` | `bg-blue-500` (Primary Buttons/Active States) |
| **Border** | `#E2E8F0` | `border-slate-200` |

### Typography
* **Primary Font:** Inter or Plus Jakarta Sans.
* **Weights:** 400 (Regular), 500 (Medium), 700 (Bold).

## 4. Component Architecture

### Sidebar (Navigation)
* **Visuals:** Fixed width (260px), background `#FFFFFF`, right-side border `1px #E2E8F0`.
* **Items:** Dashboard, Keuangan, Tabungan, Literasi, Investasi, Aset.
* **Active State:** Text changes to Accent Blue with a `3px` vertical bar on the left.

### Cards (Dashboard & Aset)
* **Style:** `bg-white`, `p-6`, `rounded-xl`, `border border-[#E2E8F0]`, `shadow-sm`.
* **Hover State:** Apply a subtle `shadow-md` transition.

## 5. Development Guidelines
1. **Dynamic Styling:** Use Template Literals for conditional colors (e.g., green for positive ROI, red for negative).
2. **Responsive Design:** Mobile-first approach. Sidebar should collapse into a Hamburger menu on screens `< 1024px`.
3. **Form Validation:** All Auth (Login/Daftar) and Transaction inputs must be validated before the Axios request.