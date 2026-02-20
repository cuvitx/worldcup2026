import Image from "next/image";

/**
 * TeamFlagImage component — Displays a country flag image from flagcdn.com.
 * 
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., "fr", "br")
 * @param name - Country name for alt text
 * @param size - Flag width in pixels (default: 32, auto 3:4 aspect ratio)
 * 
 * @example
 * ```tsx
 * <TeamFlagImage countryCode="fr" name="France" size={48} />
 * ```
 */
export function TeamFlagImage({ countryCode, name, size = 32 }: { countryCode: string; name: string; size?: number }) {
  return (
    <Image
      src={`https://flagcdn.com/w${size * 2}/${countryCode.toLowerCase()}.png`}
      alt={`${name} flag`}
      width={size}
      height={Math.round(size * 0.75)}
      className="inline-block rounded-sm"
      unoptimized
    />
  );
}
