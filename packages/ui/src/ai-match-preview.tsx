interface AiMatchPreviewProps {
  content: string;
  grounded: boolean;
}

export function AiMatchPreview({ content, grounded }: AiMatchPreviewProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Analyse du match</h2>
        {grounded && (
          <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
            Verifie
          </span>
        )}
      </div>
      <div
        className="prose prose-sm max-w-none text-gray-700 prose-headings:text-gray-900 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
