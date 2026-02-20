export function PlayStyleSection({ styles }: { styles: string[] }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-deep">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Style de jeu
        </h2>
        <div className="space-y-4">
          {styles.map((style, i) => (
            <div
              key={i}
              className="flex gap-4 items-start p-4 rounded-xl bg-white dark:bg-gray-dark border border-gray-100 dark:border-white/5"
            >
              <span className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">{style}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
