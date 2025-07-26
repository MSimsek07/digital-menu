import { meals, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CategoryMealsPage({ params }: { params: { category: string } }) {
  const category = categories.find((c) => c.id === params.category);
  const categoryMeals = meals.filter((meal) => meal.category === params.category);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm Kategoriler
          </Link>
        </Button>
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {category.name} kategorisindeki birbirinden lezzetli seçenekler.
        </p>
      </header>

      {categoryMeals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
          {categoryMeals.map((meal) => (
            <Link href={`/${category.id}/${meal.id}`} key={meal.id} className="group block">
              <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative h-56 w-full">
                    <Image
                      src={meal.imageUrl}
                      alt={meal.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={meal.name}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4">
                  <CardTitle className="font-headline text-2xl">{meal.name}</CardTitle>
                  <CardDescription className="mt-2 text-base text-muted-foreground">
                    {meal.description.substring(0, 100)}...
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-xl font-bold text-accent">
                    {meal.price.toFixed(2)} TL
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Bu kategoride henüz ürün bulunmamaktadır.</p>
        </div>
      )}
    </div>
  );
}
