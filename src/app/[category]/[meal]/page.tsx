import { meals } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AiSommelier from './ai-sommelier';

export default function MealDetailPage({ params }: { params: { category: string; meal: string } }) {
  const meal = meals.find((m) => m.id === params.meal && m.category === params.category);

  if (!meal) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href={`/${params.category}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="fade-in">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={meal.imageUrl}
              alt={meal.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              data-ai-hint={meal.name}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center fade-in" style={{animationDelay: '0.2s'}}>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {meal.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-accent">
            {meal.price.toFixed(2)} TL
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            {meal.description}
          </p>

          <div className="mt-6">
            <h2 className="text-xl font-headline font-semibold text-foreground">
              İçindekiler
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {meal.ingredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="text-base">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <AiSommelier mealName={meal.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
