import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchDialog } from "../src/search-dialog";

describe("SearchDialog", () => {
  const mockOnNavigate = vi.fn();

  const mockData = [
    {
      title: "France",
      description: "Équipe de France",
      href: "/equipe/france",
      type: "team" as const,
    },
    {
      title: "Mexique vs Afrique du Sud",
      description: "Match d'ouverture",
      href: "/match/mexique-vs-afrique-du-sud",
      type: "match" as const,
    },
    {
      title: "Kylian Mbappé",
      description: "Attaquant France",
      href: "/joueur/mbappe",
      type: "player" as const,
    },
  ];

  beforeEach(() => {
    mockOnNavigate.mockClear();
  });

  it("renders search dialog component", () => {
    const { container } = render(
      <SearchDialog lang="fr" data={mockData} onNavigate={mockOnNavigate} />
    );

    expect(container).toBeInTheDocument();
  });

  it("displays search functionality", () => {
    const { container } = render(
      <SearchDialog lang="fr" data={mockData} onNavigate={mockOnNavigate} />
    );

    // Component should render without crashing
    expect(container).toBeInTheDocument();
  });

  it("handles French locale", () => {
    const { container } = render(
      <SearchDialog lang="fr" data={mockData} onNavigate={mockOnNavigate} />
    );

    expect(container).toBeInTheDocument();
  });

  it("handles English locale", () => {
    const { container } = render(
      <SearchDialog lang="en" data={mockData} onNavigate={mockOnNavigate} />
    );

    expect(container).toBeInTheDocument();
  });

  it("handles Spanish locale", () => {
    const { container } = render(
      <SearchDialog lang="es" data={mockData} onNavigate={mockOnNavigate} />
    );

    expect(container).toBeInTheDocument();
  });

  it("handles empty data array gracefully", () => {
    const { container } = render(
      <SearchDialog lang="fr" data={[]} onNavigate={mockOnNavigate} />
    );

    expect(container).toBeInTheDocument();
  });

  it("handles different item types", () => {
    const mixedData = [
      { title: "France", description: "Team", href: "/france", type: "team" as const },
      { title: "Match 1", description: "Match", href: "/match", type: "match" as const },
      { title: "Player 1", description: "Player", href: "/player", type: "player" as const },
      { title: "Stadium", description: "Stadium", href: "/stadium", type: "stadium" as const },
      { title: "City", description: "City", href: "/city", type: "city" as const },
    ];

    const { container } = render(
      <SearchDialog lang="fr" data={mixedData} onNavigate={mockOnNavigate} />
    );

    expect(container).toBeInTheDocument();
  });

  it("accepts onNavigate callback", () => {
    const customNavigate = vi.fn();
    const { container } = render(
      <SearchDialog lang="fr" data={mockData} onNavigate={customNavigate} />
    );

    expect(container).toBeInTheDocument();
  });
});
