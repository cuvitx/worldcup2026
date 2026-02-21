import { AutoLinkedText } from "../../lib/auto-linker";

interface Props {
  text: string;
  currentPath?: string;
  className?: string;
}

/**
 * Server Component that renders a paragraph with auto-linked entity mentions.
 * Replaces teams, stadiums, cities, and top players with internal links.
 *
 * @example
 * <AutoLinkedParagraph
 *   text="La France affrontera le Brésil au MetLife Stadium"
 *   currentPath="/equipe/france"
 * />
 */
export default function AutoLinkedParagraph({
  text,
  currentPath,
  className,
}: Props) {
  return (
    <AutoLinkedText
      text={text}
      currentPath={currentPath}
      className={className}
    />
  );
}
