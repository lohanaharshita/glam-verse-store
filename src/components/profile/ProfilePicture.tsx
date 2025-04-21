
import { useState } from "react";
import { User, Upload, Edit } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProfilePictureProps {
  avatarUrl?: string;
  userName: string;
  onAvatarChange: (url: string) => void;
}

const ProfilePicture = ({ avatarUrl, userName, onAvatarChange }: ProfilePictureProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image under 5MB"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onAvatarChange(e.target.result as string);
          toast({
            title: "Profile picture updated",
            description: "Your profile picture has been updated successfully"
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="relative w-24 h-24 mx-auto"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Avatar className="w-full h-full">
        <AvatarImage src={avatarUrl} alt={userName} className="object-cover" />
        <AvatarFallback>
          <User className="w-12 h-12 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      
      <label 
        htmlFor="profile-picture"
        className={`absolute inset-0 flex items-center justify-center rounded-full cursor-pointer
          transition-opacity duration-200 bg-black/50
          ${isHovering ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-center gap-1 text-white">
          <Edit className="w-6 h-6" />
          <span className="text-xs">Edit</span>
        </div>
        <input
          type="file"
          id="profile-picture"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ProfilePicture;
