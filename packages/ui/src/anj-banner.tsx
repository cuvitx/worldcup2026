/**
 * ANJ responsible gambling banner — Legal requirement for French betting sites.
 * Displays the mandatory warning about gambling risks and helpline number.
 */
export function ANJBanner() {
  return (
    <div className="flex items-center justify-center bg-gray-100 py-2 px-4">
      <p className="text-xs text-gray-500 text-center">
        🔞 Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques :
        endettement, isolement, dépendance. Pour être aidé, appelez le{" "}
        <a href="tel:0974751313" className="font-bold text-gray-700 hover:underline">
          09 74 75 13 13
        </a>{" "}
        (appel non surtaxé).
      </p>
    </div>
  );
}
