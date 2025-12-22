import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TIP_CATEGORIES, TipCategory, TIPS } from "@/data/tips";
import { useWallpaperStore } from "@/hooks/useWallpaperStore";
import { Dices } from "lucide-react";
import React, { useState } from "react";
import { SectionHeader } from "./components/SectionHeader";

export const TipsControl: React.FC = () => {
  const { config, setTipsConfig } = useWallpaperStore();
  const { currentTips, selectedCategories } = config.tips;
  const [customTip, setCustomTip] = useState("");

  const handleRandomize = () => {
    let filteredTips = TIPS;
    if (selectedCategories.length > 0) {
      filteredTips = TIPS.filter((tip) =>
        selectedCategories.includes(tip.category)
      );
    }
    const shuffled = [...filteredTips].sort(() => 0.5 - Math.random());
    setTipsConfig({ currentTips: shuffled.slice(0, 3) }); // Default to 3 random tips
  };

  const handleAddCustomTip = () => {
    if (customTip.trim()) {
      // Replace existing tips with the custom one
      setTipsConfig({
        currentTips: [
          {
            content: customTip,
            category: "Productivité", // Default category for custom tips
            isCustom: true,
          },
        ],
      });
      setCustomTip("");
    }
  };

  const toggleCategory = (category: TipCategory) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setTipsConfig({ selectedCategories: newCategories });
  };

  return (
    <section className="space-y-4">
      <SectionHeader title="Conseils du mois" />

      <div className="space-y-4">
        <div className="space-y-3">
          <Label>Catégories</Label>
          <div className="grid grid-cols-2 gap-2">
            {TIP_CATEGORIES.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-xs font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Génération aléatoire</Label>
          <Button
            onClick={handleRandomize}
            disabled={selectedCategories.length === 0}
            variant="outline"
            className="w-full justify-start text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Dices className="mr-2 h-4 w-4" />
            Nouveaux conseils
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Ajouter un conseil personnalisé</Label>
          <div className="space-y-2">
            <Textarea
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              placeholder="Votre propre conseil..."
              className="min-h-20 bg-zinc-950/50 border-zinc-800 focus:border-white/20"
            />
            <Button
              onClick={handleAddCustomTip}
              disabled={!customTip.trim()}
              className="w-full"
              variant="secondary"
            >
              Remplacer la liste
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-zinc-500 underline">Conseils actuels</Label>
          <ul className="space-y-2 text-xs text-zinc-400">
            {currentTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="line-clamp-2">• {tip.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
