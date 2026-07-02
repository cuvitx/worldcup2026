/**
 * ANJ responsible gambling banner — Legal requirement for French betting sites.
 * Displays the mandatory warning about gambling risks and helpline number.
 */
export function ANJBanner() {
  return (
    <div className="flex items-center justify-center bg-gray-100 py-2 px-4">
      <p className="text-xs text-gray-500 text-center">
        🔞 Les jeux d&apos;argent et de hasard peuvent être dangereux : pertes d&apos;argent,
        conflits familiaux, addiction… Retrouvez nos conseils sur{" "}
        <a
          href="https://www.joueurs-info-service.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-gray-700 hover:underline"
        >
          joueurs-info-service.fr
        </a>{" "}
        (<a href="tel:0974751313" className="font-bold text-gray-700 hover:underline">09 74 75 13 13</a>{" "}
        – appel non surtaxé).
      </p>
    </div>
  );
}
