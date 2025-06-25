"use client";

import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { InteractiveChart } from "./components/interactive-chart";
import { BondingCurveProgress } from "./components/bonding-curve-progress";
import { placeholderTokens as originalPlaceholderTokens } from "../lib/placeholder-data";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  BarChart2,
  ShoppingCart,
  CheckCircle,
  Info,
} from "lucide-react";
import { useToast } from "./components/ui/use-toast";
import type React from "react";
import { useRef, useState } from "react";

// Extended placeholder tokens (same as in explore page)
const extendedPlaceholderTokens = [
  ...originalPlaceholderTokens,
  // Additional tokens
  {
    id: "token-5",
    creatorName: "Crypto Wizard 🧙‍♂️",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Magic Token",
    tokenTicker: "MAGIC",
    price: 3.75,
    priceChange24h: 8.2,
    marketCap: 3750000,
    holders: 1800,
    bio: "Bringing magic to the blockchain. Join our mystical community!",
    category: "trending",
    bondingCurveProgress: 65,
  },
  {
    id: "token-6",
    creatorName: "Music Maestro 🎵",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Beat Coin",
    tokenTicker: "BEAT",
    price: 0.45,
    priceChange24h: 12.3,
    marketCap: 450000,
    holders: 3200,
    bio: "The token for music lovers and artists. Revolutionizing the music industry.",
    category: "new",
    milestones: ["1K Holders!", "Featured Token"],
    bondingCurveProgress: 40,
  },
  {
    id: "token-7",
    creatorName: "Sports Legend 🏆",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Champion Token",
    tokenTicker: "CHAMP",
    price: 1.85,
    priceChange24h: -1.2,
    marketCap: 1850000,
    holders: 950,
    bio: "For sports fans by sports fans. Exclusive access to athlete content and events.",
    category: "top",
    bondingCurveProgress: 70,
  },
  {
    id: "token-8",
    creatorName: "Food Guru 🍕",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Tasty Token",
    tokenTicker: "TASTY",
    price: 0.25,
    priceChange24h: 5.8,
    marketCap: 250000,
    holders: 2100,
    bio: "Connecting food lovers with exclusive restaurant experiences and recipes.",
    category: "new",
    milestones: ["Launch Success!", "500+ Holders"],
    bondingCurveProgress: 25,
  },
  {
    id: "token-9",
    creatorName: "Travel Explorer 🌍",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Journey Coin",
    tokenTicker: "JRNY",
    price: 1.05,
    priceChange24h: 3.2,
    marketCap: 1050000,
    holders: 780,
    bio: "Unlock exclusive travel experiences and discounts worldwide.",
    category: "trending",
    bondingCurveProgress: 55,
  },
  {
    id: "token-10",
    creatorName: "Fashion Icon 👗",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Style Token",
    tokenTicker: "STYLE",
    price: 2.15,
    priceChange24h: -0.8,
    marketCap: 2150000,
    holders: 1100,
    bio: "The future of fashion. Access exclusive designs and fashion events.",
    category: "top",
    milestones: ["1K Holders!"],
    bondingCurveProgress: 80,
  },
  {
    id: "token-11",
    creatorName: "Gaming Pro 🎮",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Gamer Coin",
    tokenTicker: "GAME",
    price: 0.95,
    priceChange24h: 7.5,
    marketCap: 950000,
    holders: 4200,
    bio: "By gamers for gamers. Exclusive in-game items and tournament access.",
    category: "trending",
    milestones: ["4K+ Community", "Trending"],
    bondingCurveProgress: 60,
  },
  {
    id: "token-12",
    creatorName: "Fitness Guru 💪",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Fit Token",
    tokenTicker: "FIT",
    price: 0.65,
    priceChange24h: 4.3,
    marketCap: 650000,
    holders: 1500,
    bio: "Join the fitness revolution. Access to premium workout content and health advice.",
    category: "new",
    bondingCurveProgress: 35,
  },
  {
    id: "token-13",
    creatorName: "Art Collector 🎨",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Canvas Coin",
    tokenTicker: "CNVS",
    price: 3.25,
    priceChange24h: 9.7,
    marketCap: 3250000,
    holders: 890,
    bio: "Supporting artists worldwide. Exclusive art drops and gallery access.",
    category: "top",
    milestones: ["Featured Creator"],
    bondingCurveProgress: 85,
  },
  {
    id: "token-14",
    creatorName: "Science Geek 🔬",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Discovery Token",
    tokenTicker: "DSCVR",
    price: 1.75,
    priceChange24h: -1.5,
    marketCap: 1750000,
    holders: 720,
    bio: "Funding the future of science and innovation. Join our curious community.",
    category: "trending",
    bondingCurveProgress: 50,
  },
  {
    id: "token-15",
    creatorName: "Comedy Star 😂",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Laugh Coin",
    tokenTicker: "LMAO",
    price: 0.35,
    priceChange24h: 20.1,
    marketCap: 350000,
    holders: 3800,
    bio: "Bringing laughter to the blockchain. Exclusive comedy content and shows.",
    category: "new",
    milestones: ["Viral Token!", "3K+ Holders"],
    bondingCurveProgress: 45,
  },
  {
    id: "token-16",
    creatorName: "Pet Lover 🐾",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Paw Token",
    tokenTicker: "PAW",
    price: 0.55,
    priceChange24h: 6.2,
    marketCap: 550000,
    holders: 2700,
    bio: "Supporting animal shelters and pet adoption. Exclusive pet products and services.",
    category: "trending",
    bondingCurveProgress: 40,
  },
  {
    id: "token-17",
    creatorName: "Book Worm 📚",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Story Token",
    tokenTicker: "STORY",
    price: 0.85,
    priceChange24h: 3.9,
    marketCap: 850000,
    holders: 1300,
    bio: "For book lovers and writers. Access to exclusive content and author events.",
    category: "new",
    bondingCurveProgress: 55,
  },
  {
    id: "token-18",
    creatorName: "Coffee Enthusiast ☕",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Brew Token",
    tokenTicker: "BREW",
    price: 0.75,
    priceChange24h: 5.3,
    marketCap: 750000,
    holders: 1900,
    bio: "Connecting coffee lovers with exclusive beans and cafe experiences.",
    category: "top",
    milestones: ["Growing Fast!"],
    bondingCurveProgress: 65,
  },
  {
    id: "token-19",
    creatorName: "Movie Buff 🎬",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Cinema Coin",
    tokenTicker: "CINE",
    price: 1.15,
    priceChange24h: 2.8,
    marketCap: 1150000,
    holders: 980,
    bio: "For film enthusiasts. Exclusive screenings and behind-the-scenes content.",
    category: "trending",
    bondingCurveProgress: 70,
  },
  {
    id: "token-20",
    creatorName: "Green Activist 🌱",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Eco Token",
    tokenTicker: "ECO",
    price: 1.45,
    priceChange24h: 8.7,
    marketCap: 1450000,
    holders: 1600,
    bio: "Supporting environmental initiatives. Join us in making the world greener.",
    category: "new",
    milestones: ["Impact Creator"],
    bondingCurveProgress: 75,
  },
  {
    id: "token-21",
    creatorName: "Tech Innovator 💡",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Innovation Token",
    tokenTicker: "INNOV",
    price: 4.25,
    priceChange24h: 10.5,
    marketCap: 4250000,
    holders: 650,
    bio: "Funding the next generation of tech breakthroughs. Be part of the future.",
    category: "top",
    bondingCurveProgress: 90,
  },
  {
    id: "token-22",
    creatorName: "DIY Expert 🔨",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Maker Token",
    tokenTicker: "MAKE",
    price: 0.95,
    priceChange24h: 4.1,
    marketCap: 950000,
    holders: 2200,
    bio: "For creators and DIY enthusiasts. Access exclusive tutorials and maker events.",
    category: "trending",
    bondingCurveProgress: 60,
  },
  {
    id: "token-23",
    creatorName: "History Buff 🏛️",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Heritage Token",
    tokenTicker: "HRTG",
    price: 1.35,
    priceChange24h: -0.7,
    marketCap: 1350000,
    holders: 870,
    bio: "Preserving history through blockchain. Access to exclusive historical content.",
    category: "new",
    bondingCurveProgress: 55,
  },
  {
    id: "token-24",
    creatorName: "Yoga Master 🧘",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Zen Coin",
    tokenTicker: "ZEN",
    price: 0.85,
    priceChange24h: 6.8,
    marketCap: 850000,
    holders: 1700,
    bio: "Finding balance in the crypto world. Access to exclusive wellness content.",
    category: "top",
    milestones: ["Wellness Choice"],
    bondingCurveProgress: 50,
  },
  {
    id: "token-25",
    creatorName: "Space Explorer 🚀",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Cosmos Token",
    tokenTicker: "COSM",
    price: 2.95,
    priceChange24h: 12.3,
    marketCap: 2950000,
    holders: 920,
    bio: "Taking crypto to the stars. Join our mission to explore the cosmos.",
    category: "trending",
    milestones: ["Rising Star"],
    bondingCurveProgress: 80,
  },
  {
    id: "token-26",
    creatorName: "Photography Pro 📸",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Capture Coin",
    tokenTicker: "CAPT",
    price: 1.65,
    priceChange24h: 3.5,
    marketCap: 1650000,
    holders: 1100,
    bio: "For photography enthusiasts. Access to exclusive photo collections and events.",
    category: "new",
    bondingCurveProgress: 65,
  },
  {
    id: "token-27",
    creatorName: "Culinary Artist 👨‍🍳",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Gourmet Token",
    tokenTicker: "GRMT",
    price: 1.95,
    priceChange24h: 7.2,
    marketCap: 1950000,
    holders: 830,
    bio: "Elevating the culinary experience. Exclusive recipes and dining events.",
    category: "top",
    bondingCurveProgress: 75,
  },
  {
    id: "token-28",
    creatorName: "Dance Prodigy 💃",
    creatorAvatar: "/placeholder.svg?width=40&height=40",
    tokenName: "Rhythm Token",
    tokenTicker: "RTHM",
    price: 0.75,
    priceChange24h: 9.8,
    marketCap: 750000,
    holders: 2500,
    bio: "Moving to the beat of blockchain. Exclusive dance tutorials and events.",
    category: "trending",
    milestones: ["Community Favorite"],
    bondingCurveProgress: 45,
  },
];

const getExtendedPlaceholderTokenById = (id: string) => {
  return extendedPlaceholderTokens.find((token) => token.id === id);
};

export default function TokenDetailPage() {
  const router = useNavigate();
  const params = useParams();
  const { toast } = useToast();
  const id = params.id as string;
  const token = getExtendedPlaceholderTokenById(id);

  const buyButtonRef = useRef<HTMLButtonElement>(null);
  const sellButtonRef = useRef<HTMLButtonElement>(null);

  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "CryptoEnthusiast",
      avatar: "/placeholder.svg?width=32&height=32",
      content:
        "This token has amazing potential! The community is growing fast 🚀",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      author: "TokenTrader",
      avatar: "/placeholder.svg?width=32&height=32",
      content: "Great project! Love the roadmap and the team behind it.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: 3,
      author: "DeFiExplorer",
      avatar: "/placeholder.svg?width=32&height=32",
      content: "Just bought some tokens. Excited to see where this goes!",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleRippleEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.classList.add("ripple"); // Defined in globals.css

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);
  };

  if (!token) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">Token not found 😢</h1>
        <Button onClick={() => router(-1)} variant="link" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const handleBuy = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleRippleEffect(event);
    // Simulate buy action
    toast({
      title: "🚀 Purchase Successful!",
      description: `You bought ${token.tokenName}. To the moon!`,
      action: <CheckCircle className="text-green-500" />,
    });
    // Potentially trigger confetti here
  };

  const handleSell = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleRippleEffect(event);
    // Simulate sell action
    toast({
      title: "💸 Sale Confirmed!",
      description: `You sold ${token.tokenName}.`,
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: "You", // In a real app, this would be the logged-in user
      avatar: "/placeholder.svg?width=32&height=32",
      content: newComment.trim(),
      timestamp: new Date(),
    };

    setComments([comment, ...comments]);
    setNewComment("");

    toast({
      title: "Comment Posted!",
      description: "Your comment has been added successfully.",
    });
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.timestamp.getTime() - a.timestamp.getTime();
    } else {
      return a.timestamp.getTime() - b.timestamp.getTime();
    }
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        onClick={() => router(-1)}
        variant="outline"
        size="sm"
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
      </Button>

      {/* Token Header */}
      <header className="mb-8 p-6 rounded-xl bg-card/50 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-20 w-20 border-4 border-primary">
            <AvatarImage
              src={token.creatorAvatar || "/placeholder.svg"}
              alt={token.creatorName}
            />
            <AvatarFallback className="text-3xl">
              {token.creatorName.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-brand-gradient mb-1">
              {token.tokenName} ({token.tokenTicker})
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Created by {token.creatorName}
            </p>
            <p className="text-sm text-foreground/80 max-w-xl">
              {token.bio} ✨
            </p>
          </div>
        </div>
        {token.milestones && token.milestones.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {token.milestones.map((milestone) => (
              <Badge
                key={milestone}
                variant="default"
                className="text-sm bg-primary/20 text-primary border-primary/30 py-1 px-3"
              >
                <TrendingUp className="h-4 w-4 mr-1.5" /> {milestone}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Chart & Info */}
        <div className="lg:col-span-2 space-y-8">
          <InteractiveChart tokenName={token.tokenName} />

          <Card className="bg-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-primary" /> About{" "}
                {token.tokenName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed description about the token, its utility, the creator's
                vision, roadmap, etc. This section can be populated with more
                specific data. For now, it's a placeholder. Join the community
                and be part of something special! 🎉
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">💬 Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this token..."
                  className="w-full min-h-[80px] p-3 rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {newComment.length}/500 characters
                  </span>
                  <Button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Post Comment
                  </Button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {sortedComments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  sortedComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage
                          src={comment.avatar || "/placeholder.svg"}
                          alt={comment.author}
                        />
                        <AvatarFallback>
                          {comment.author.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {comment.author}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/90 break-words">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Comment Stats */}
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  {comments.length}{" "}
                  {comments.length === 1 ? "comment" : "comments"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stats, Buy/Sell, Bonding Curve */}
        <div className="space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-primary" /> Live Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price (USD)</span>
                <span className="font-semibold text-lg">
                  ${token.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">24h Change</span>
                <span
                  className={`font-semibold ${
                    token.priceChange24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {token.priceChange24h.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-semibold">
                  ${token.marketCap.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Holders</span>
                <span className="font-semibold">
                  <Users className="inline h-4 w-4 mr-1 text-primary" />
                  {token.holders.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-primary" /> Trade
                Token
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Buy/Sell Toggle */}
              <div className="flex rounded-lg bg-muted p-1">
                <button
                  onClick={() => setTradeMode("buy")}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    tradeMode === "buy"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeMode("sell")}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    tradeMode === "sell"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Amount input */}
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="0.00"
                  className="input flex-1 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <span className="font-semibold text-primary">
                  {token.tokenTicker}
                </span>
              </div>

              {/* Dynamic Button */}
              {tradeMode === "buy" ? (
                <Button
                  ref={buyButtonRef}
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white ripple-button"
                  onClick={handleBuy}
                >
                  Buy {token.tokenTicker}
                </Button>
              ) : (
                <Button
                  ref={sellButtonRef}
                  size="lg"
                  className="w-full bg-red-600 hover:bg-red-700 text-white ripple-button"
                  onClick={handleSell}
                >
                  Sell {token.tokenTicker}
                </Button>
              )}
            </CardContent>
          </Card>

          {token.bondingCurveProgress !== undefined && (
            <Card className="bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-primary" />{" "}
                  Tokenomics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BondingCurveProgress value={token.bondingCurveProgress} />
                <p className="text-xs text-muted-foreground mt-2">
                  The bonding curve determines the token's price based on its
                  supply. As more tokens are bought, the price increases.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// import {
//   useAccount,
//   useWaitForTransactionReceipt,
//   useWriteContract,
// } from "wagmi";
// import { CONTRACTS, TOKEN_FACTORY } from "../constants";
// import { useToast } from "./use-toast";
// import { config } from "../App";

// export const useCreateToken = () => {
//   const { writeContractAsync } = useWriteContract();
//   const { address } = useAccount();
//   console.log("masuk");

//   const createToken = async (name: string, symbol: string) => {
//     const { toast } = useToast();

//     const initialSupply = BigInt(1000000 * 10 ** 18); // 1M token
//     const pairAmount = BigInt(500000 * 10 ** 18); // 500.000 token pair
//     const ethAmount = BigInt(0.01 * 10 ** 18); // 0.01 ETH

//     console.log("masuk create token");
//     try {
//       const hash = await writeContractAsync({
//         address: CONTRACTS.TOKEN_FACTORY as `0x${string}`,
//         abi: TOKEN_FACTORY,
//         functionName: "createTokenWithEthPair",
//         args: [name, symbol, initialSupply, pairAmount, ethAmount, address],
//         value: ethAmount, // This sends the actual ETH
//         account: address,
//       });

//       const receipt = useWaitForTransactionReceipt({
//         hash: hash,
//         config,
//       });

//       console.log("receipt", receipt);

//       console.log("succes token");
//       toast({
//         title: "🚀 Create Token Successful!",
//         // description: `You bought ${token.tokenName}. To the moon!`,
//         // action: <CheckCircle className="text-green-500" />,
//       });

//       return true;
//     } catch (error) {
//       console.log("error token");

//       toast({
//         title: "🚀 Create Token Failed!",
//         // description: `You bought ${token.tokenName}. To the moon!`,
//         // action: <CheckCircle className="text-green-500" />,
//       });
//       //   console.error("Create token failed:", error);
//       return false;
//     }
//   };

//   return { createToken };
// };
