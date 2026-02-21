"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Building2, RotateCcw, ArrowRight, Check, X, Trophy, MapPin } from "lucide-react";

interface Stadium {
  name: string;
  city: string;
  capacity: string;
  hint: string;
}

const stadiums: Stadium[] = [
  { name: "MetLife Stadium", city: "East Rutherford, NJ", capacity: "82 500", hint: "Le plus grand stade de la CDM 2026, situé dans le New Jersey, accueillera la finale. Domicile des NY Giants et NY Jets (NFL)." },
  { name: "SoFi Stadium", city: "Inglewood, CA", capacity: "70 240", hint: "Stade ultramoderne ouvert en 2020 en Californie, doté d'un toit translucide innovant. A accueilli le Super Bowl 2022." },
  { name: "AT&T Stadium", city: "Arlington, TX", capacity: "80 000", hint: "Surnommé 'Jerry World', ce stade texan possède le plus grand écran vidéo de la NFL. Domicile des Dallas Cowboys." },
  { name: "Hard Rock Stadium", city: "Miami, FL", capacity: "65 326", hint: "Situé en Floride, ce stade a accueilli 6 Super Bowls. Domicile des Miami Dolphins et du Miami Open de tennis." },
  { name: "NRG Stadium", city: "Houston, TX", capacity: "72 220", hint: "Premier stade NFL avec toit rétractable, situé au Texas. Domicile des Houston Texans." },
  { name: "Mercedes-Benz Stadium", city: "Atlanta, GA", capacity: "71 000", hint: "Stade géorgien avec un toit en 'pétales' unique. Connu pour ses prix de nourriture abordables. Domicile des Atlanta Falcons." },
  { name: "Lincoln Financial Field", city: "Philadelphie, PA", capacity: "69 796", hint: "Domicile des Philadelphia Eagles, dans la ville de l'Independence Hall et du Liberty Bell." },
  { name: "Lumen Field", city: "Seattle, WA", capacity: "69 000", hint: "Réputé pour être le stade le plus bruyant de la NFL, situé dans le nord-ouest des USA. Domicile des Seattle Seahawks et Sounders." },
  { name: "Arrowhead Stadium", city: "Kansas City, MO", capacity: "76 416", hint: "Détenteur du record Guinness du stade le plus bruyant au monde (142.2 dB). Domicile des Kansas City Chiefs de Patrick Mahomes." },
  { name: "Gillette Stadium", city: "Foxborough, MA", capacity: "65 878", hint: "Situé près de Boston, c'est la maison de la dynastie des New England Patriots de Tom Brady." },
  { name: "Levi's Stadium", city: "Santa Clara, CA", capacity: "68 500", hint: "Au cœur de la Silicon Valley en Californie. Domicile des San Francisco 49ers. A accueilli le Super Bowl 50." },
  { name: "BC Place", city: "Vancouver, Canada", capacity: "54 500", hint: "Stade canadien avec toit rétractable. A accueilli la cérémonie d'ouverture des JO 2010. En Colombie-Britannique." },
  { name: "BMO Field", city: "Toronto, Canada", capacity: "30 000", hint: "Plus petit stade de la CDM 2026, situé dans la plus grande ville du Canada. Domicile du Toronto FC (MLS)." },
  { name: "Estadio Azteca", city: "Mexico, Mexique", capacity: "87 523", hint: "Le seul stade à avoir accueilli 2 finales de CDM (1970 et 1986). C'est ici que Maradona a marqué la 'Main de Dieu'. Altitude : 2 200 m." },
  { name: "Estadio BBVA", city: "Monterrey, Mexique", capacity: "53 500", hint: "Stade mexicain moderne inauguré en 2015, dominé par la silhouette de la montagne Cerro de la Silla. Domicile des Rayados." },
  { name: "Estadio Akron", city: "Guadalajara, Mexique", capacity: "49 850", hint: "Stade volcanique au design unique à Guadalajara, avec une structure extérieure rappelant un volcan. Domicile des Chivas." },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function getChoices(correct: Stadium, all: Stadium[]): string[] {
  const others = all.filter((s) => s.name !== correct.name);
  const wrong = shuffle(others).slice(0, 3).map((s) => s.name);
  return shuffle([correct.name, ...wrong]);
}

export default function QuizStadesPage() {
  const [shuffled] = useState(() => shuffle(stadiums));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const choices = useMemo(() => {
    if (current < shuffled.length) return getChoices(shuffled[current]!, shuffled);
    return [];
  }, [current, shuffled]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (selected) return;
      setSelected(answer);
      if (answer === shuffled[current]!.name) setScore((s) => s + 1);
      setTimeout(() => {
        if (current + 1 >= shuffled.length) {
          setFinished(true);
        } else {
          setCurrent((c) => c + 1);
          setSelected(null);
        }
      }, 1500);
    },
    [selected, current, shuffled]
  );

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <Trophy className="h-16 w-16 text-secondary mx-auto" />
          <h1 className="text-3xl font-extrabold text-primary">Quiz terminé !</h1>
          <p className="text-5xl font-black text-accent">{score}/{shuffled.length}</p>
          <p className="text-gray-600">
            {pct >= 80 ? "Bravo ! Vous connaissez les stades de la CDM 2026 !" : pct >= 50 ? "Pas mal ! Révisez un peu et retentez." : "Vous avez du travail ! Visitez notre page stades pour apprendre."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={restart} className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
              <RotateCcw className="h-4 w-4" /> Rejouer
            </button>
            <Link href="/quiz/drapeaux" className="inline-flex items-center gap-2 border border-gray-300 rounded-xl py-3.5 px-8 font-semibold hover:bg-gray-50 transition-colors">
              Quiz Drapeaux <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stadium = shuffled[current]!;

  return (
    <div className="min-h-[80vh] flex flex-col">
      <div className="bg-primary text-white py-4 px-4">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-secondary" />
            <span className="font-bold">Quiz Stades CDM 2026</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>Question {current + 1}/{shuffled.length}</span>
            <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">{score} pts</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-200 h-1.5">
        <div className="bg-accent h-1.5 transition-all duration-300" style={{ width: `${((current + 1) / shuffled.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full text-center space-y-8">
          <div>
            <p className="text-sm text-gray-500 mb-2">Quel est ce stade ?</p>
            <div className="rounded-xl bg-gray-50gray-800 border border-gray-200 p-6 text-left space-y-3">
              <p className="text-sm text-gray-700 leading-relaxed">{stadium.hint}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {stadium.city}</span>
                <span>Capacité : {stadium.capacity}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {choices.map((choice) => {
              let cls = "border border-gray-200 hover:border-accent";
              if (selected) {
                if (choice === stadium.name) cls = "border-2 border-green-500 bg-green-50green-900/20";
                else if (choice === selected) cls = "border-2 border-red-500 bg-red-50red-900/20";
                else cls = "border border-gray-200 opacity-50";
              }
              return (
                <button key={choice} onClick={() => handleAnswer(choice)} disabled={!!selected} className={`rounded-xl py-3 px-4 font-medium text-sm transition-all flex items-center justify-center gap-2 ${cls}`}>
                  {selected && choice === stadium.name && <Check className="h-4 w-4 text-green-600" />}
                  {selected && choice === selected && choice !== stadium.name && <X className="h-4 w-4 text-red-600" />}
                  {choice}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
