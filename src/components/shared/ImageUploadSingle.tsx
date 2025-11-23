import { Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ImageUploadSingleProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  alt?: string;
}

export function ImageUploadSingle({ label, value, onChange, alt = "Uploaded image" }: ImageUploadSingleProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
            <img src={value} alt={alt} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <label className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-xs text-muted-foreground mt-2">Upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}
