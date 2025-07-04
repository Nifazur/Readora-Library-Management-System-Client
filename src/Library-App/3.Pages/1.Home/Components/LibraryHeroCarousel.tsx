import { useState, useEffect } from 'react';
import { BookOpen, Users, Search, TrendingUp } from 'lucide-react';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const LibraryHeroCarousel = () => {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Discover Your Next Great Read",
            subtitle: "Explore thousands of books in our digital library",
            description: "From classic literature to modern bestsellers, find your perfect book match with our advanced search and recommendation system.",
            icon: BookOpen,
            gradient: "from-blue-600 via-purple-600 to-blue-800",
            image: "https://i.ibb.co/PZ1cB8G4/many-books-on-a-shelf-in-a-library-photo.jpg"
        },
        {
            id: 2,
            title: "Join Our Reading Community",
            subtitle: "Connect with fellow book lovers",
            description: "Share reviews, join book clubs, and discover new authors through our vibrant community of readers and literary enthusiasts.",
            icon: Users,
            gradient: "from-emerald-600 via-teal-600 to-cyan-800",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&crop=center"
        },
        {
            id: 3,
            title: "Smart Search & Discovery",
            subtitle: "Find exactly what you're looking for",
            description: "Use our intelligent search system to find books by genre, author, rating, or even mood. Get personalized recommendations based on your reading history.",
            icon: Search,
            gradient: "from-orange-600 via-red-600 to-pink-800",
            image: "https://i.ibb.co/3G1S8Fw/blurred-view-of-a-warmly-lit-home-library-showcasing-wooden-bookshelves-filled-with-colorful-books-h.jpg"
        },
        {
            id: 4,
            title: "Track Your Reading Journey",
            subtitle: "Monitor your progress and achievements",
            description: "Set reading goals, track your progress, and celebrate milestones. View detailed statistics about your reading habits and discover new genres to explore.",
            icon: TrendingUp,
            gradient: "from-violet-600 via-indigo-600 to-purple-800",
            image: "https://i.ibb.co/cSnnCQsj/abstract-blurred-background-of-school-library-bookshelves-and-table-photo.jpg"
        }
    ];

    useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    // Auto-play functionality
    useEffect(() => {
        if (!api) return;

        const autoPlay = setInterval(() => {
            api.scrollNext();
        }, 5000);

        return () => clearInterval(autoPlay);
    }, [api]);

    return (
        <div className="relative w-full">
            <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {slides.map((slide) => {
                        const IconComponent = slide.icon;
                        return (
                            <CarouselItem key={slide.id}>
                                <div className="relative min-h-[800px] flex items-center justify-center overflow-hidden">
                                    {/* Background Image with Overlay */}
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                        style={{ backgroundImage: `url(${slide.image})` }}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-40`} />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10 container mx-auto px-4 py-16">
                                        <div className="max-w-4xl mx-auto text-center text-white">
                                            {/* Icon */}
                                            <div className="mb-8 flex justify-center">
                                                <div className="p-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                                    <IconComponent className="h-12 w-12 text-white" />
                                                </div>
                                            </div>
                                            
                                            {/* Title */}
                                            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                                                {slide.title}
                                            </h1>
                                            
                                            {/* Subtitle */}
                                            <h2 className="text-xl md:text-2xl mb-6 text-white/90 font-medium">
                                                {slide.subtitle}
                                            </h2>
                                            
                                            {/* Description */}
                                            <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto leading-relaxed">
                                                {slide.description}
                                            </p>
                                            
                                            {/* CTA Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                <Button size="lg" variant="outline" className="border-white/30 text-black hover:bg-white/10 hover:text-white font-semibold px-8 py-3">
                                                    Get Started
                                                </Button>
                                                <Button size="lg" variant="outline" className="border-white/30 text-black hover:bg-white/10 hover:text-white font-semibold px-8 py-3">
                                                    Learn More
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                
                {/* Custom Navigation */}
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
            </Carousel>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            current === index + 1
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default LibraryHeroCarousel;