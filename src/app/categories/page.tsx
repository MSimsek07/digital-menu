import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground sm:text-5xl">
          Kategoriler
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Beğendiğiniz kategoriyi seçerek lezzetlerimizi keşfedin.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        {categories.map((category, index) => (
          <Link href={`/${category.id}`} key={category.id} className="group block">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/60">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={`${category.name.toLowerCase()} food`}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </CardHeader>
              <CardContent className="p-4 absolute bottom-0">
                <CardTitle className="font-headline text-2xl text-white">
                  {category.name}
                </CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
