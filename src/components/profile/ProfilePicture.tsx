
import { useState } from "react";
import { User, Upload, Edit } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ProfilePictureProps {
  avatarUrl?: string;
  userName: string;
  onAvatarChange: (url: string) => void;
}

const ProfilePicture = ({ avatarUrl, userName, onAvatarChange }: ProfilePictureProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { updateUserProfile } = useAuth();
  
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

      setIsLoading(true);
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (e.target?.result) {
            const dataUrl = e.target.result as string;
            
            // Update avatar locally
            onAvatarChange(dataUrl);
            
            // Save to Supabase profile
            const success = await updateUserProfile({ avatar: dataUrl });
            
            if (success) {
              toast({
                title: "Profile picture updated",
                description: "Your profile picture has been updated successfully"
              });
            } else {
              toast({
                variant: "destructive",
                title: "Update failed",
                description: "Failed to update profile picture in database"
              });
            }
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error updating profile picture:", error);
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "An error occurred while updating your profile picture"
        });
      } finally {
        setIsLoading(false);
      }
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
        {isLoading ? (
          <div className="text-white">
            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-white">
            <Edit className="w-6 h-6" />
            <span className="text-xs">Edit</span>
          </div>
        )}
        <input
          type="file"
          id="profile-picture"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          disabled={isLoading}
        />
      </label>
    </div>
  );
};

export default ProfilePicture;
