'use client';

import { useState } from 'react';
import { suggestPairing } from '@/ai/flows/suggest-drink-pairing';
import { Button } from '@/components/ui/button';
import { Bot, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { meals } from '@/lib/data';

export default function AiGurme({ mealName }: { mealName: string }) {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCard, setShowCard] = useState(false);

  // Exclude the current meal from suggestions
  const availableItems = meals
    .filter((item) => item.name !== mealName)
    .map((item) => item.name);

  const handleSuggestion = async () => {
    setIsLoading(true);
    setError('');
    setSuggestion('');
    setShowCard(true);

    try {
      const result = await suggestPairing({ mealName, availableItems });
      setSuggestion(result.pairingSuggestion);
    } catch (err) {
      setError('Öneri alınırken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowCard(false);
    setSuggestion('');
    setError('');
  };

  if (!showCard) {
    return (
      <Button onClick={handleSuggestion}>
        <Bot className="mr-2 h-4 w-4" />
        AI'dan Öneri Al
      </Button>
    );
  }

  return (
    <Card className="mt-4 bg-secondary/50">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-xl">AI Gurme</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>Kapat</Button>
        </div>
        <CardDescription>
          Yapay zeka, "{mealName}" için öneride bulunuyor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Öneri oluşturuluyor...</span>
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {suggestion && <p className="text-foreground">{suggestion}</p>}
      </CardContent>
    </Card>
  );
}
