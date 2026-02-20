import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FAQSection } from "../src/faq-section";

describe("FAQSection", () => {
  const mockItems = [
    {
      question: "Quand commence la Coupe du Monde 2026 ?",
      answer: "Le tournoi débute le 11 juin 2026.",
    },
    {
      question: "Combien d'équipes participent ?",
      answer: "48 équipes participeront pour la première fois.",
    },
    {
      question: "Où se déroule la finale ?",
      answer: "La finale aura lieu au MetLife Stadium à New York/New Jersey.",
    },
  ];

  it("renders FAQ section with items", () => {
    render(<FAQSection items={mockItems} />);

    expect(
      screen.getByText("Quand commence la Coupe du Monde 2026 ?")
    ).toBeInTheDocument();
    expect(screen.getByText("Combien d'équipes participent ?")).toBeInTheDocument();
    expect(screen.getByText("Où se déroule la finale ?")).toBeInTheDocument();
  });

  it("renders default title when no title prop provided", () => {
    render(<FAQSection items={mockItems} />);

    expect(screen.getByText("❓ Questions fréquentes")).toBeInTheDocument();
  });

  it("renders custom title when provided", () => {
    render(<FAQSection title="FAQ Personnalisée" items={mockItems} />);

    expect(screen.getByText("FAQ Personnalisée")).toBeInTheDocument();
  });

  it("renders all FAQ items", () => {
    render(<FAQSection items={mockItems} />);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    });
  });

  it("renders JSON-LD schema for SEO", () => {
    const { container } = render(<FAQSection items={mockItems} />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    if (script) {
      const schemaData = JSON.parse(script.innerHTML);
      expect(schemaData["@context"]).toBe("https://schema.org");
      expect(schemaData["@type"]).toBe("FAQPage");
      expect(schemaData.mainEntity).toHaveLength(mockItems.length);

      schemaData.mainEntity.forEach((entity: any, index: number) => {
        expect(entity["@type"]).toBe("Question");
        expect(entity.name).toBe(mockItems[index].question);
        expect(entity.acceptedAnswer["@type"]).toBe("Answer");
        expect(entity.acceptedAnswer.text).toBe(mockItems[index].answer);
      });
    }
  });

  it("renders details elements for accordion behavior", () => {
    const { container } = render(<FAQSection items={mockItems} />);

    const details = container.querySelectorAll("details");
    expect(details).toHaveLength(mockItems.length);
  });

  it("renders summary elements with questions", () => {
    const { container } = render(<FAQSection items={mockItems} />);

    const summaries = container.querySelectorAll("summary");
    expect(summaries).toHaveLength(mockItems.length);

    summaries.forEach((summary, index) => {
      expect(summary.textContent).toContain(mockItems[index].question);
    });
  });

  it("handles empty items array gracefully", () => {
    const { container } = render(<FAQSection items={[]} />);

    const details = container.querySelectorAll("details");
    expect(details).toHaveLength(0);

    // JSON-LD should still be present but with empty mainEntity
    const script = container.querySelector('script[type="application/ld+json"]');
    if (script) {
      const schemaData = JSON.parse(script.innerHTML);
      expect(schemaData.mainEntity).toHaveLength(0);
    }
  });

  it("applies correct CSS classes for styling", () => {
    const { container } = render(<FAQSection items={mockItems} />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-gray-50");
    expect(section).toHaveClass("dark:bg-slate-900/60");

    const h2 = screen.getByText("❓ Questions fréquentes");
    expect(h2).toHaveClass("text-2xl");
    expect(h2).toHaveClass("font-bold");
  });

  it("renders collapse indicator (arrow)", () => {
    const { container } = render(<FAQSection items={mockItems} />);

    const arrows = container.querySelectorAll("summary span");
    expect(arrows.length).toBeGreaterThan(0);

    arrows.forEach((arrow) => {
      expect(arrow.textContent).toBe("▼");
    });
  });
});
