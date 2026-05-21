import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { budgetingArticleContent } from '../../components/literacy/Artikel5KesalahanUmum';
import { investasiArticleContent } from '../../components/literacy/ArtikelWaktuInvestasi';
import { hutangArticleContent } from '../../components/literacy/ArtikelMelunasiHutang';
import { diversifikasiArticleContent } from '../../components/literacy/ArtikelDiversifikasi';

// SVG 1: Bank Building Illustration
const BankIcon = () => (
  <svg viewBox="0 0 100 100" className="w-28 h-28">
    <rect x="15" y="80" width="70" height="8" rx="2" fill="#E2E8F0" />
    <rect x="10" y="88" width="80" height="4" rx="1" fill="#CBD5E1" />
    <rect x="22" y="38" width="8" height="42" fill="#E2E8F0" />
    <rect x="36" y="38" width="8" height="42" fill="#E2E8F0" />
    <rect x="50" y="38" width="8" height="42" fill="#E2E8F0" />
    <rect x="64" y="38" width="8" height="42" fill="#E2E8F0" />
    <rect x="20" y="38" width="12" height="3" fill="#CBD5E1" />
    <rect x="34" y="38" width="12" height="3" fill="#CBD5E1" />
    <rect x="48" y="38" width="12" height="3" fill="#CBD5E1" />
    <rect x="62" y="38" width="12" height="3" fill="#CBD5E1" />
    <rect x="20" y="77" width="12" height="3" fill="#CBD5E1" />
    <rect x="34" y="77" width="12" height="3" fill="#CBD5E1" />
    <rect x="48" y="77" width="12" height="3" fill="#CBD5E1" />
    <rect x="62" y="77" width="12" height="3" fill="#CBD5E1" />
    <polygon points="10,38 90,38 50,15" fill="#E2E8F0" />
    <polygon points="12,38 88,38 50,18" fill="#CBD5E1" />
    <rect x="32" y="28" width="36" height="8" rx="1" fill="#94A3B8" />
    <text x="50" y="34" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">BANK</text>
  </svg>
);

// SVG 2: Chart & Coins Illustration
const ChartIcon = () => (
  <svg viewBox="0 0 100 100" className="w-28 h-28">
    <line x1="20" y1="20" x2="20" y2="80" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="80" x2="80" y2="80" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    <rect x="28" y="60" width="8" height="20" rx="1" fill="#4ade80" />
    <rect x="42" y="48" width="8" height="32" rx="1" fill="#22c55e" />
    <rect x="56" y="35" width="8" height="45" rx="1" fill="#16a34a" />
    <rect x="70" y="25" width="8" height="55" rx="1" fill="#15803d" />
    <path d="M 32 55 L 46 43 L 60 30 L 74 15" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="72,15 78,13 76,19" fill="#F59E0B" />
    <circle cx="32" cy="55" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
    <text x="32" y="57" fill="#854D0E" fontSize="5" fontWeight="bold" textAnchor="middle">$</text>
    <circle cx="46" cy="43" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
    <text x="46" y="45" fill="#854D0E" fontSize="5" fontWeight="bold" textAnchor="middle">$</text>
    <circle cx="74" cy="15" r="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
    <text x="74" y="17" fill="#854D0E" fontSize="6" fontWeight="bold" textAnchor="middle">$</text>
  </svg>
);

// SVG 3: Light Bulb Illustration
const BulbIcon = () => (
  <svg viewBox="0 0 100 100" className="w-28 h-28">
    <circle cx="50" cy="45" r="28" fill="#FEF08A" opacity="0.3" />
    <circle cx="50" cy="45" r="20" fill="#FEF08A" opacity="0.6" />
    <path d="M 32 45 C 32 25, 68 25, 68 45 C 68 55, 60 62, 58 68 L 42 68 C 40 62, 32 55, 32 45 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
    <path d="M 45 68 L 45 52 C 45 48, 55 48, 55 52 L 55 68" fill="none" stroke="#CA8A04" strokeWidth="2" />
    <circle cx="50" cy="48" r="3" fill="#CA8A04" />
    <rect x="42" y="68" width="16" height="4" rx="1" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
    <rect x="44" y="72" width="12" height="4" rx="1" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
    <path d="M 46 76 C 46 76, 50 80, 54 76" fill="none" stroke="#475569" strokeWidth="2" />
  </svg>
);

// SVG 4: Diversification Illustration
const DiversificationIcon = () => (
  <svg viewBox="0 0 100 100" className="w-28 h-28">
    <rect x="62" y="60" width="18" height="20" rx="1" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
    <line x1="62" y1="67" x2="80" y2="67" stroke="#16A34A" strokeWidth="1" />
    <line x1="62" y1="74" x2="80" y2="74" stroke="#16A34A" strokeWidth="1" />
    <circle cx="71" cy="70" r="3" fill="#16A34A" />
    <rect x="50" y="68" width="18" height="12" rx="1" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
    <line x1="50" y1="74" x2="68" y2="74" stroke="#16A34A" strokeWidth="1" />
    <circle cx="59" cy="74" r="2" fill="#16A34A" />
    <path d="M 20 80 L 40 60 L 60 50 L 78 30" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="74,30 82,26 80,34" fill="#3B82F6" />
    <circle cx="38" cy="40" r="5" fill="#FDBA74" stroke="#C2410C" strokeWidth="1" />
    <line x1="38" y1="45" x2="44" y2="58" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
    <path d="M 38 48 L 48 44" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    <path d="M 44 58 L 40 70 M 44 58 L 52 68" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const articles = [
  {
    title: '5 Kesalahan Umum dalam Budgeting',
    category: 'Budgeting',
    duration: '5 menit',
    description: 'Hindari kesalahan-kesalahan ini agar anggaran Anda lebih efektif',
    icon: <BankIcon />,
    content: budgetingArticleContent
  },
  {
    title: 'Kapan Waktu Tepat Mulai Investasi?',
    category: 'Investasi',
    duration: '7 menit',
    description: 'Pelajari timing yang tepat untuk memulai perjalanan investasi Anda',
    icon: <ChartIcon />,
    content: investasiArticleContent
  },
  {
    title: 'Strategi Melunasi Hutang dengan Metode Snowball',
    category: 'Hutang',
    duration: '6 menit',
    description: 'Teknik efektif untuk melunasi hutang secara bertahap',
    icon: <BulbIcon />,
    content: hutangArticleContent
  },
  {
    title: 'Diversifikasi: Kunci Investasi Sukses',
    category: 'Investasi',
    duration: '8 menit',
    description: 'Mengapa anda tidak boleh menaruh semua telur dalam satu keranjang',
    icon: <DiversificationIcon />,
    content: diversifikasiArticleContent
  }
];

export default function LiteracyHub() {
  const [activeArticle, setActiveArticle] = useState(null);

  const handleReadArticle = (article) => {
    if (article.content) {
      setActiveArticle(article.content);
    } else {
      // Nice premium placeholder for other articles
      setActiveArticle({
        title: article.title,
        date: 'Wednesday, August 20, 2025       10:00 WIB',
        author: 'Tim Finova Insight',
        paragraphs: [
          `Ini adalah konten lengkap untuk artikel "${article.title}".`,
          article.description,
          "Perencanaan dan pengelolaan aset secara komprehensif sangat penting untuk masa depan finansial Anda. Pelajari instrumen keuangan dengan bijak, kendalikan pengeluaran bulanan Anda, dan pastikan untuk selalu melakukan diversifikasi portofolio investasi demi meminimalisasi risiko yang mungkin terjadi.",
          "Nantikan pembaruan artikel edukatif lainnya hanya di portal Finova Insight!"
        ]
      });
    }
    // Scroll to top when opening article
    window.scrollTo({ top: 0 });
  };

  // Fullscreen Article Page Render
  if (activeArticle) {
    return (
      <ArticleReader 
        article={activeArticle} 
        onBack={() => {
          setActiveArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  // Gallery view
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Page Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-1">Literasi Keuangan</h1>
          <p className="text-[#9CA3AF] text-lg font-medium">Tingkatkan pengetahuan finansial anda</p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px]">
          {articles.map((article, idx) => (
            <div key={idx} className="bg-white rounded-[24px] shadow-sm border border-gray-150 overflow-hidden flex flex-col items-center p-6 transition-all hover:shadow-md">
              {/* Header Image Section */}
              <div className="bg-[#0B478E] w-full rounded-2xl h-[170px] flex items-center justify-center mb-6">
                {article.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-black text-center mb-4 px-2 line-clamp-1">
                {article.title}
              </h3>

              {/* Tags Row */}
              <div className="flex gap-4 mb-6">
                <span className="bg-[#0052B4] text-white text-xs font-semibold px-4 py-1.5 rounded-md">
                  {article.category}
                </span>
                <span className="bg-[#0D3B66] text-white text-xs font-semibold px-4 py-1.5 rounded-md">
                  {article.duration}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm text-center mb-8 px-4 flex-1 line-clamp-2 leading-relaxed">
                {article.description}
              </p>

              {/* Button */}
              <button 
                onClick={() => handleReadArticle(article)}
                className="bg-[#0B478E] text-white font-semibold py-3 w-full rounded-xl hover:bg-[#093d7a] transition-colors text-sm tracking-wide"
              >
                Baca Artikel
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Local premium Article Reader component
function ArticleReader({ article, onBack }) {
  if (!article) return null;

  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-[850px] flex flex-col">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="mb-10 flex items-center gap-2 text-gray-500 hover:text-black font-semibold text-sm transition-colors group self-start"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Kembali ke Literasi
        </button>

        {/* Article Header */}
        <div className="mb-10 pb-8 border-b border-gray-150">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-4 text-justify">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-semibold">
            <span className="text-[#0B478E] font-bold">{article.author}</span>
            <span className="text-gray-300">•</span>
            <span>{article.date}</span>
          </div>
        </div>

        {/* Article Body (Fully Justified & Straight Margins) */}
        <div className="text-gray-800 space-y-6 text-lg md:text-xl leading-relaxed font-serif text-justify">
          {article.paragraphs.map((para, index) => {
            const isSectionHeader = /^[1-6]\.\s/.test(para);
            const isSubSectionHeader = /^[a-z]\.\s/.test(para);
            const isBulletPoint = para.startsWith('- ');
            
            if (isSectionHeader) {
              return (
                <h2 key={index} className="text-2xl md:text-3xl font-extrabold text-[#0B478E] pt-8 pb-3 font-sans tracking-tight text-left">
                  {para}
                </h2>
              );
            }
            
            if (isSubSectionHeader) {
              return (
                <h3 key={index} className="text-xl md:text-2xl font-bold text-gray-800 pt-6 pb-2 font-sans tracking-tight text-left">
                  {para}
                </h3>
              );
            }

            if (isBulletPoint) {
              return (
                <ul key={index} className="list-disc pl-8 md:pl-12 space-y-1 text-gray-700 leading-relaxed text-justify text-lg md:text-xl font-serif">
                  <li>{para.substring(2)}</li>
                </ul>
              );
            }
            
            return (
              <p key={index} className="text-gray-700 leading-relaxed text-justify indent-8 md:indent-12">
                {para}
              </p>
            );
          })}
        </div>

        {/* Signature & Finished Reading */}
        <div className="mt-16 pt-8 border-t border-gray-150 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-semibold text-gray-500 italic">
            Penulis: <span className="text-[#0B478E] font-bold">{article.author}</span>
          </p>
          <button 
            onClick={onBack}
            className="bg-[#0B478E] text-white hover:bg-[#093d7a] font-bold px-8 py-3.5 rounded-xl transition-all shadow-md text-sm tracking-wide w-full sm:w-auto text-center"
          >
            Selesai Membaca
          </button>
        </div>
      </div>
    </div>
  );
}
