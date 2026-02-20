"use client";

import { useEffect } from "react";

export function PrintButton() {
  useEffect(() => {
    // Auto-focus pour accessibility
    const btn = document.getElementById("print-btn");
    if (btn) {
      btn.focus();
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      id="print-btn"
      onClick={handlePrint}
      className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
    >
      🖨️ Imprimer
    </button>
  );
}
