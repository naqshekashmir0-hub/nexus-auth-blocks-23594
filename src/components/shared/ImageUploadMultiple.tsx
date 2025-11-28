import { Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ImageUploadMultipleProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  onFilesChange?: (files: File[]) => void;
}

export function ImageUploadMultiple({ label, values, onChange, onFilesChange }: ImageUploadMultipleProps) {
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => URL.createObjectURL(file));
    onChange([...values, ...newImages]);
    onFilesChange?.(files);
  };

  const handleRemoveImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-4">
        {values.map((img, idx) => (
          <div key={idx} className="relative w-24 h-24 border rounded-lg overflow-hidden">
            <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemoveImage(idx)}
              className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <label className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <Upload className="h-6 w-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground mt-1">Add</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFilesChange}
          />
        </label>
      </div>
    </div>
  );
}
