import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  icon: LucideIcon;
}

export function CategoryCard({ title, imageUrl, icon: Icon }: CategoryCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-600 rounded-full">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
