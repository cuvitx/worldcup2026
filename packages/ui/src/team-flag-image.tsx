import Image from "next/image";

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
