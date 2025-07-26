'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { enhanceMealDescription } from '@/ai/flows/enhance-meal-descriptions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';

function AiEnhanceForm() {
    const searchParams = useSearchParams();
    const initialMealName = searchParams.get('mealName') || '';
    const initialDescription = searchParams.get('description') || '';

    const [mealName, setMealName] = useState(initialMealName);
    const [description, setDescription] = useState(initialDescription);
    const [enhancedDescription, setEnhancedDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setEnhancedDescription('');

        try {
            const result = await enhanceMealDescription({
                mealName: mealName,
                existingDescription: description,
            });
            setEnhancedDescription(result.enhancedDescription);
        } catch (err) {
            setError('Açıklama oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                        <Sparkles className="h-6 w-6 text-primary" />
                        AI Destekli Menü Geliştirici
                    </CardTitle>
                    <CardDescription>
                        Yemek açıklamalarınızı daha çekici hale getirin veya yeni fikirler edinin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="mealName" className="font-headline text-lg">Yemek Adı</Label>
                            <Input
                                id="mealName"
                                value={mealName}
                                onChange={(e) => setMealName(e.target.value)}
                                placeholder="Örn: Adana Kebab"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="font-headline text-lg">Mevcut Açıklama</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Yemeğinizin kısa bir açıklamasını veya ana malzemelerini yazın."
                                required
                                rows={4}
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Oluşturuluyor...
                                </>
                            ) : (
                                'Açıklamayı Geliştir'
                            )}
                        </Button>
                    </form>

                    {error && <p className="mt-4 text-center text-destructive">{error}</p>}

                    {enhancedDescription && (
                        <div className="mt-8">
                            <h3 className="font-headline text-xl font-semibold">Oluşturulan Yeni Açıklama:</h3>
                            <p className="mt-2 rounded-md border bg-muted p-4 text-muted-foreground">{enhancedDescription}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function AiEnhancePage() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <AiEnhanceForm />
        </Suspense>
    );
}
