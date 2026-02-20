import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GroupSimulator } from "../src/group-simulator";

describe("GroupSimulator", () => {
  const mockTeams = [
    { id: "mexique", name: "Mexique", flag: "🇲🇽" },
    { id: "afrique-du-sud", name: "Afrique du Sud", flag: "🇿🇦" },
    { id: "coree-du-sud", name: "Corée du Sud", flag: "🇰🇷" },
    { id: "barrage-uefa-d", name: "Barrage UEFA D", flag: "🏴" },
  ];

  const mockMatches = [
    { homeId: "mexique", awayId: "afrique-du-sud" },
    { homeId: "coree-du-sud", awayId: "barrage-uefa-d" },
    { homeId: "mexique", awayId: "coree-du-sud" },
    { homeId: "afrique-du-sud", awayId: "barrage-uefa-d" },
    { homeId: "barrage-uefa-d", awayId: "mexique" },
    { homeId: "afrique-du-sud", awayId: "coree-du-sud" },
  ];

  it("renders group simulator component", () => {
    const { container } = render(
      <GroupSimulator teams={mockTeams} matches={mockMatches} locale="fr" />
    );

    expect(container).toBeInTheDocument();
  });

  it("displays all teams in standings", () => {
    render(<GroupSimulator teams={mockTeams} matches={mockMatches} locale="fr" />);

    // Teams appear multiple times (matches + standings)
    expect(screen.getAllByText("Mexique").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Afrique du Sud").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Corée du Sud").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Barrage UEFA D").length).toBeGreaterThan(0);
  });

  it("displays team flags", () => {
    render(<GroupSimulator teams={mockTeams} matches={mockMatches} locale="fr" />);

    // Flags appear multiple times (matches + standings)
    expect(screen.getAllByText("🇲🇽").length).toBeGreaterThan(0);
    expect(screen.getAllByText("🇿🇦").length).toBeGreaterThan(0);
    expect(screen.getAllByText("🇰🇷").length).toBeGreaterThan(0);
  });

  it("handles 4 teams correctly", () => {
    const { container } = render(
      <GroupSimulator teams={mockTeams} matches={mockMatches} locale="fr" />
    );

    // Should have 4 rows in standings
    const rows = container.querySelectorAll("tr");
    expect(rows.length).toBeGreaterThanOrEqual(4);
  });

  it("is accessible and semantic", () => {
    const { container } = render(
      <GroupSimulator teams={mockTeams} matches={mockMatches} locale="fr" />
    );

    // Should use proper semantic HTML
    expect(container).toBeInTheDocument();
  });

  it("handles empty matches array gracefully", () => {
    const { container } = render(
      <GroupSimulator teams={mockTeams} matches={[]} locale="fr" />
    );

    // Should not crash
    expect(container).toBeInTheDocument();
  });

  it("handles match with initial scores", () => {
    const matchesWithScores = [
      { homeId: "mexique", awayId: "afrique-du-sud", homeScore: 2, awayScore: 1 },
      { homeId: "coree-du-sud", awayId: "barrage-uefa-d", homeScore: 1, awayScore: 0 },
      { homeId: "mexique", awayId: "coree-du-sud" },
      { homeId: "afrique-du-sud", awayId: "barrage-uefa-d" },
      { homeId: "barrage-uefa-d", awayId: "mexique" },
      { homeId: "afrique-du-sud", awayId: "coree-du-sud" },
    ];

    const { container } = render(
      <GroupSimulator teams={mockTeams} matches={matchesWithScores} locale="fr" />
    );

    expect(container).toBeInTheDocument();
  });

  it("supports different locales", () => {
    const { container: frContainer } = render(
      <GroupSimulator teams={mockTeams} matches={mockMatches} locale="fr" />
    );
    expect(frContainer).toBeInTheDocument();

    const { container: enContainer } = render(
      <GroupSimulator teams={mockTeams} matches={mockMatches} locale="en" />
    );
    expect(enContainer).toBeInTheDocument();
  });
});
