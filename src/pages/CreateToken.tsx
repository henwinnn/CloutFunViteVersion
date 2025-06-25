"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import {
  Sparkles,
  LinkIcon,
  PlusCircle,
  Trash2,
  Twitter,
  Send,
  Globe,
} from "lucide-react";
// import { useToast } from "../hooks/use-toast;
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { useWriteCreateToken } from "../hooks/useCreateToken";
import { useAccount } from "wagmi";

interface SocialLink {
  id: string;
  platform: "twitter" | "telegram" | "website" | "other";
  url: string;
}

const initialSocialLink: SocialLink = {
  id: Date.now().toString(),
  platform: "twitter",
  url: "",
};

export default function CreateTokenPage() {
  const [tokenName, setTokenName] = useState("");
  const [tokenTicker, setTokenTicker] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    initialSocialLink,
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { CreateToken, error } = useWriteCreateToken();
  const { address } = useAccount();

  const { toast } = useToast();
  const router = useNavigate();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!address) return;
    setIsSubmitting(true);

    // Basic Validation
    if (!tokenName || !tokenTicker || !description || !imageFile) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please fill out all required fields and upload an image.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (tokenTicker.length > 5 || !/^[A-Z0-9]+$/.test(tokenTicker)) {
      toast({
        title: "⚠️ Invalid Ticker",
        description:
          "Ticker must be 1-5 uppercase letters or numbers (e.g., CLOUT, MEME1).",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    console.log("Form Data:", {
      tokenName,
      tokenTicker,
      description,
      imageFile,
      socialLinks,
    });

    await CreateToken(
      tokenName,
      tokenTicker,
      description
      // BigInt(1000000000000000000000000),
      // BigInt(500000000000000000000000),
      // BigInt(10000000000000000),
      // address
    );

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

    toast({
      title: "🎉 Token Creation Initiated!",
      description: `Your token ${tokenName} (${tokenTicker}) is being created. You'll be notified upon completion.`,
      className: "bg-green-600 text-white", // Custom toast for success
    });

    // Reset form or redirect
    // setTokenName(""); setTokenTicker(""); setDescription(""); setImagePreview(null); setImageFile(null); setSocialLinks([initialSocialLink]);
    setIsSubmitting(false);
    router("/"); // Redirect to homepage after successful submission
  };

  const getSocialIcon = (platform: SocialLink["platform"]) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-5 w-5 text-sky-500" />;
      case "telegram":
        return <Send className="h-5 w-5 text-blue-500" />;
      case "website":
        return <Globe className="h-5 w-5 text-gray-500" />;
      default:
        return <LinkIcon className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="bg-card/70 backdrop-blur-md shadow-xl">
        <CardHeader className="text-center">
          <div className="inline-block mx-auto mb-4 p-3 bg-primary/10 rounded-full">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-brand-gradient">
            Create Your Token
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Launch your own token on Clout.fun! Fill in the details below to get
            started.
            <br />
            Connect your social account (e.g., Twitter via ZK-TLS/OAuth) to
            auto-fill your name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Token Image */}
            <div className="space-y-2 text-center">
              <Label
                htmlFor="token-image"
                className="text-lg font-semibold block mb-2"
              >
                Token Image / Logo ✨
              </Label>
              <Avatar className="w-32 h-32 mx-auto rounded-full border-4 border-primary/50 shadow-lg cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage
                  src={
                    imagePreview ||
                    "/placeholder.svg?width=128&height=128&query=token+logo"
                  }
                  alt="Token image"
                />
                <AvatarFallback className="text-4xl bg-muted">
                  {tokenName ? tokenName.substring(0, 1).toUpperCase() : "T"}
                </AvatarFallback>
              </Avatar>
              <Input
                id="token-image"
                type="file"
                accept="image/png, image/jpeg, image/gif, image/webp"
                onChange={handleImageChange}
                className="block w-full max-w-xs mx-auto text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: Square image, PNG/JPG/GIF/WEBP, &lt;2MB.
              </p>
            </div>

            {/* Token Name */}
            <div className="space-y-2">
              <Label htmlFor="token-name" className="text-lg font-semibold">
                Token Name 📛
              </Label>
              <Input
                id="token-name"
                placeholder="e.g., My Awesome Project (from Twitter/Social)"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                required
                className="h-12 text-base"
              />
              <p className="text-xs text-muted-foreground">
                This will be the official name of your token.
              </p>
            </div>

            {/* Token Ticker */}
            <div className="space-y-2">
              <Label htmlFor="token-ticker" className="text-lg font-semibold">
                Token Ticker 💲
              </Label>
              <Input
                id="token-ticker"
                placeholder="e.g., MAP (3-5 uppercase letters/numbers)"
                value={tokenTicker}
                onChange={(e) => setTokenTicker(e.target.value.toUpperCase())}
                maxLength={5}
                required
                className="h-12 text-base"
              />
              <p className="text-xs text-muted-foreground">
                A short, unique symbol for your token (e.g., BTC, ETH).
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-semibold">
                Description 📝
              </Label>
              <Textarea
                id="description"
                placeholder="Tell everyone about your token, its purpose, and vision..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                A compelling description will attract more users. Emojis are
                welcome!
              </p>
            </div>

            {/* Social Links */}
            {/* <div className="space-y-4">
              <Label className="text-lg font-semibold block">
                Social Links 🔗
              </Label>
              {socialLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="flex items-center gap-2 p-3 border rounded-lg bg-background/50"
                >
                  <div className="flex-none w-28">
                    <select
                      value={link.platform}
                      onChange={(e) =>
                        updateSocialLink(link.id, "platform", e.target.value)
                      }
                      className="input h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full"
                    >
                      <option value="twitter">Twitter</option>
                      <option value="telegram">Telegram</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex-none mr-1">
                    {getSocialIcon(link.platform)}
                  </div>
                  <Input
                    type="url"
                    placeholder="https://twitter.com/yourprofile"
                    value={link.url}
                    onChange={(e) =>
                      updateSocialLink(link.id, "url", e.target.value)
                    }
                    className="h-10"
                  />
                  {socialLinks.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSocialLink(link.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSocialLink}
                className="w-full"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Another Social Link
              </Button>
            </div> */}

            <CardFooter className="p-0 pt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full text-lg font-semibold bg-brand-gradient hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Token...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" /> Launch My Token!
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
