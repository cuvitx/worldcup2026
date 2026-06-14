export type NewsCategory = "transferts" | "stades" | "billets" | "equipes" | "paris";

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: NewsCategory;
  tags: string[];
  imageEmoji: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: "la-magie-de-vini-frustre-un-maroc-seduisant-eurosport",
    title: "La magie de Vini frustre un Maroc séduisant - Eurosport",
    excerpt: "La magie de Vini frustre un Maroc séduisant - Eurosport — Source : Eurosport.",
    content: `La magie de Vini frustre un Maroc séduisant - Eurosport\n\nSource : Eurosport\n\nLien : https://news.google.com/rss/articles/CBMinAJBVV95cUxQQ2Z5eVk0UWFyaDlEUmYtNGlNNzdEQkJ3dG5fcTIwRnFucWN0LU9JQ1VHUXFQOXREdjVQZFZ6c1pma0Z4SUhxN0FhcEJoN3BWMmdZUkFFZ3kyMVB3MF9iUlp5WXc5SmUxQXdYTFcxT1RNRmhzMmFUejU4cXVsSUs3TXAxM256RktiQ1BLaENydklncll6bEctQnNRdmNlSXhudzNCM05UZndfR3cwenJvZTFSbmplaWJNMkFTYXJ4T29tVmgwdVVUNUVPMTJpS3RYRExhc192YkFhRktZaG11WldNcUhyc3V6QUdWazNsWkF6S01EUkJ3VmRSNmRicUp5RGlGODVXU19tOElybTdXRzlnTjF4Y2tLR2JBTQ?oc=5`,
    date: "2026-06-14",
    category: "equipes" as NewsCategory,
    tags: ["CDM 2026", "actualité"],
    imageEmoji: "📰",
  },
  {
    id: 2,
    slug: "coupe-du-monde-2026-un-choc-bresil-maroc-savoureux-mais-sans-vainqueur-l-ecosse-",
    title: "Coupe du monde 2026 : un choc Brésil-Maroc savoureux mais sans vainqueur, l'Ecosse fait le minimum face à Haïti, l'Australie fait plier la Turquie... Ce qu'il retenir des matchs de la nuit - franceinfo",
    excerpt: "Coupe du monde 2026 : un choc Brésil-Maroc savoureux mais sans vainqueur, l'Ecosse fait le minimum face à Haïti, l'Australie fait plier la Turquie... Ce qu'il retenir des matchs de la nuit - franceinfo — Source : franceinfo.",
    content: `Coupe du monde 2026 : un choc Brésil-Maroc savoureux mais sans vainqueur, l'Ecosse fait le minimum face à Haïti, l'Australie fait plier la Turquie... Ce qu'il retenir des matchs de la nuit - franceinfo\n\nSource : franceinfo\n\nLien : https://news.google.com/rss/articles/CBMiqAJBVV95cUxNUGV3T3NxbnhzQzhuTVppTUhET1BLcmpoam9nN3RUTXFORmF6QzkxSWJoaGk4YVpURnhUaTFtRnlIUjgtNWdKaTRLSzJOVDlXUzdmeWJDdDVBUndmdkp6dEV4ME1hX0s1UC10YUVtNWJrVFpEbUczOEl3MXlZanhyUk5FOXRNeF93VkRtSWRqcDU4U1o5amMwU0JYb003WG40cjlJa1RSeDBQSTg1WjVpTlZjbDJwVE8wTnluV3ZCc25JbUFiNXBKeTd1MEFDMmVpZzBkbm1pZTNaQjBEYjNYUnFuV0czUkpQTXBtdEF4Rk9tOExpcVZ3SjY4eXU2OFZKczRsUjFXbm5oRExqaU5NNmVHcmx4UFRLUk9MNDJIMzFSNEZITThhVQ?oc=5`,
    date: "2026-06-14",
    category: "equipes" as NewsCategory,
    tags: ["CDM 2026", "actualité"],
    imageEmoji: "📰",
  },
  {
    id: 3,
    slug: "coupe-du-monde-2026-ce-qu-il-faut-retenir-du-samedi-13-et-ce-qu-il-faudra-suivre",
    title: "Coupe du monde 2026 : ce qu’il faut retenir du samedi 13 et ce qu’il faudra suivre le dimanche 14 - Le Monde.fr",
    excerpt: "Coupe du monde 2026 : ce qu’il faut retenir du samedi 13 et ce qu’il faudra suivre le dimanche 14 - Le Monde.fr — Source : Le Monde.fr.",
    content: `Coupe du monde 2026 : ce qu’il faut retenir du samedi 13 et ce qu’il faudra suivre le dimanche 14 - Le Monde.fr\n\nSource : Le Monde.fr\n\nLien : https://news.google.com/rss/articles/CBMi8wFBVV95cUxNX0VZTVBnZkZQd3F1dlpvUWZ4bTJ1bTZqTmZpY1JydWVEU1JWM01waVdIaHpadmlyeFJNXzRtdGNBbGxaMjMxWFBoLXBkekRyZVpldVV0YzMzZHc5MXE2QTQ4ZlJxOGk1RUhWTUJaUkVUY3RpQmNLUm5jQ1pSeXdWRHpQS1dLN3dJZjdZb1hzZ3RFQVdqMFp1TWVablVjZDdiQU51WWQ3UGtxb05jeXduaEptUVptSzJxSXVsbnlZdDdNV3R1alB2eWFJRkVUNDRRdUVDYVByY0NmZGs5VHRPNUVNaWR0VEhYWkE1UEZtNlFVWG8?oc=5`,
    date: "2026-06-14",
    category: "equipes" as NewsCategory,
    tags: ["CDM 2026", "actualité"],
    imageEmoji: "📰",
  },
  {
    id: 4,
    slug: "direct-coupe-du-monde-2026-toutes-les-infos-l-equipe-iranienne-attendue-dimanche",
    title: "DIRECT. Coupe du monde 2026, toutes les infos: l'équipe iranienne attendue dimanche à Los Angeles - RMC Sport",
    excerpt: "DIRECT. Coupe du monde 2026, toutes les infos: l'équipe iranienne attendue dimanche à Los Angeles - RMC Sport — Source : RMC Sport.",
    content: `DIRECT. Coupe du monde 2026, toutes les infos: l'équipe iranienne attendue dimanche à Los Angeles - RMC Sport\n\nSource : RMC Sport\n\nLien : https://news.google.com/rss/articles/CBMikAJBVV95cUxOcDZWZllUbU52dUFCUXByTENGQlRSVXdnZzF2TDdOYVFKYlU0NDM0MXNoN1o0U0FWUWVoUFBRUzF6dlZKbzRwYVNaSXFlNElISU1waVlqWEkzZjlTMVZWYzFud2VycDZuaGw1cFZuVDNtaElhV2tGbDAyMXpPUkFLNjlKRlU4VWtJQ2dQRkV5VVFha0xGZWMzd3Z1dUNyQ010TVFMQldBN3NNa3pnenltRHNkU2d4OHQ2TmN5SVBYUHc5S1FDbmxxOGdqcHAtemxrS3lMX2JUdXMyZDVTTjBzdlpMYkE1OG1GVTFxcEgzUkZNT09VY2cwM1IwNkthNnpLNXRkYWl1ZzFpZXZNYjhhcA?oc=5`,
    date: "2026-06-12",
    category: "equipes" as NewsCategory,
    tags: ["CDM 2026", "actualité"],
    imageEmoji: "📰",
  },
  {
    id: 5,
    slug: "coupe-du-monde-2026-j1-l-australie-surprend-la-turquie-sports-orange-sports-oran",
    title: "Coupe du monde 2026 (J1) : L'Australie surprend la Turquie : Sports - Orange - Sports - Orange",
    excerpt: "Coupe du monde 2026 (J1) : L'Australie surprend la Turquie : Sports - Orange - Sports - Orange — Source : Sports - Orange.",
    content: `Coupe du monde 2026 (J1) : L'Australie surprend la Turquie : Sports - Orange - Sports - Orange\n\nSource : Sports - Orange\n\nLien : https://news.google.com/rss/articles/CBMi0wFBVV95cUxOYzMydjFLRFo4dURRMjF0Ukx5MGU4VDIzcTFTNDhMYVFMaW5TQ0NWWjZxUU9LajBDc0M5aml5eWMwNGZ4cm02QXlFRXNwbkRLaktEZW9NLWl6UmlodWxkdXgxSlJRRV9sel9jek9oVjNtOU1VeV9iMVhjd0NxVkpaS2FNc0FNbklXb3JNS0xYVG9ON25HemVscFBEekdRZnE4S2x0QS0xODdEVWNYb3JvMjFoSGdPRWpIczdnZ0YwVWI4eThqaWpCWTNxaVQ4QXhwcEFn0gHSAUFVX3lxTE43TFZ2UlZud21uSjdOeHI0T1JVR2E2ckVrTDgwSXZwMGhFNlhQMGtYc2ZBajBkaXRwWk9ZaHVKN05UamZFY1RSakFkQ0pMd3lNTlBSYkx1NkNkaW9ocmFCZ0gwOUZZbExVbjQtb1p4bnRsT045dm0xRVJ3RUxCZGZyX0EyOHNJOXZZUDJtSXVaS0ZFVDQtLU16MlJrVlVsMHZzSEh4Q203N25SZmNkajZmNUxvWHdqS2pYeEVtd1Q3SjJRa256cWhnTGNBaU9raGhEdw?oc=5`,
    date: "2026-06-14",
    category: "equipes" as NewsCategory,
    tags: ["CDM 2026", "actualité"],
    imageEmoji: "📰",
  },
];

export const newsCategories: Record<NewsCategory, string> = {
  transferts: "Transferts",
  stades: "Stades",
  billets: "Billets",
  equipes: "Équipes",
  paris: "Paris sportifs",
};

export const newsBySlug = Object.fromEntries(
  newsArticles.map((a) => [a.slug, a])
);

export const newsByCategory: Record<string, NewsArticle[]> = newsArticles.reduce<Record<string, NewsArticle[]>>((acc, a) => {
  (acc[a.category] ??= []).push(a);
  return acc;
}, {});
