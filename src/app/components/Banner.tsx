import { Button } from "./ui/button";

interface BannerProps {
  imageUrl: string;
}

export function Banner({ imageUrl }: BannerProps) {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="New Collection Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            New Collection
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Khám phá bộ sưu tập thời trang mới nhất
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
