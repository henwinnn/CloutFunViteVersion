"use client";

import { useState, useMemo, useEffect } from "react";
// import { placeholderTokens as originalPlaceholderTokens } from "../lib/placeholder-data";
import { placeholderTokens as originalPlaceholderTokens } from "../lib/placeholder-data";

import {
  TrendingUp,
  Zap,
  Star,
  Search,
  ArrowUpDown,
  Grid,
  List,
} from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Badge } from "./components/ui/badge";
import { Card, CardContent } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

type SortOption = "price" | "marketCap" | "volume" | "holders" | "priceChange";
type ViewMode = "grid" | "list";

// Extended placeholder tokens for pagination testing
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

export default function ExplorePage() {
  const [filter, setFilter] = useState<"all" | "top" | "new" | "trending">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("marketCap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Fixed items per page

  // Enhanced token data with additional marketplace metrics
  const enhancedTokens = useMemo(() => {
    return extendedPlaceholderTokens.map((token) => ({
      ...token,
      volume24h: Math.floor(Math.random() * 500000) + 10000, // Random volume for demo
      liquidity: Math.floor(Math.random() * 1000000) + 50000, // Random liquidity
    }));
  }, []);

  // Filter and search logic
  const filteredTokens = useMemo(() => {
    let tokens = enhancedTokens;

    // Apply category filter
    if (filter !== "all") {
      tokens = tokens.filter((token) => token.category === filter);
    }

    // Apply search filter
    if (searchQuery) {
      tokens = tokens.filter(
        (token) =>
          token.tokenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.tokenTicker.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    tokens.sort((a, b) => {
      let aValue: number, bValue: number;

      switch (sortBy) {
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "marketCap":
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
        case "volume":
          aValue = a.volume24h;
          bValue = b.volume24h;
          break;
        case "holders":
          aValue = a.holders;
          bValue = b.holders;
          break;
        case "priceChange":
          aValue = a.priceChange24h;
          bValue = b.priceChange24h;
          break;
        default:
          return 0;
      }

      return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });

    return tokens;
  }, [enhancedTokens, filter, searchQuery, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTokens = filteredTokens.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const resetPagination = () => setCurrentPage(1);

  useEffect(() => {
    resetPagination();
  }, [filter, searchQuery, sortBy]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="w-full py-8 md:py-12 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Category Tabs with Search */}
          <Tabs
            value={filter}
            onValueChange={(value) => setFilter(value as any)}
            className="w-full mb-8"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-4">
              {/* Search Bar */}
              <div className="relative w-full lg:w-96 order-2 lg:order-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tokens, creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 rounded-full bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                />
              </div>

              {/* Tab List and Controls */}
              <div className="flex items-center gap-4 order-1 lg:order-2">
                {/* Sort Controls */}
                <Select
                  value={sortBy}
                  onValueChange={(value: SortOption) => setSortBy(value)}
                >
                  <SelectTrigger className="w-40 h-11 rounded-full bg-card/50 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketCap">Market Cap</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="volume">Volume 24h</SelectItem>
                    <SelectItem value="holders">Holders</SelectItem>
                    <SelectItem value="priceChange">Price Change</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSortOrder}
                  className="h-11 w-11 rounded-full bg-card/50 backdrop-blur-sm"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>

                {/* View Mode Toggle */}
                <div className="flex rounded-full bg-card/50 backdrop-blur-sm p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-9 w-9 rounded-full"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-9 w-9 rounded-full"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Tab List */}
                <TabsList className="grid grid-cols-4 bg-card/50 backdrop-blur-sm p-1 rounded-full">
                  <TabsTrigger
                    value="all"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="trending"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <TrendingUp className="mr-1 h-3 w-3" /> Trending
                  </TabsTrigger>
                  <TabsTrigger
                    value="new"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Zap className="mr-1 h-3 w-3" /> New
                  </TabsTrigger>
                  <TabsTrigger
                    value="top"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Star className="mr-1 h-3 w-3" /> Top
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </Tabs>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6 px-1">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTokens.length} tokens
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Live Data
            </Badge>
          </div>
        </div>
      </section>

      {/* Token Grid/List */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {viewMode === "grid" ? (
            <TokenGrid tokens={paginatedTokens} />
          ) : (
            <TokenList tokens={paginatedTokens} />
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-8">
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-full px-4"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {/* First page */}
                  {currentPage > 3 && totalPages > 5 && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        className="w-10 h-10 rounded-full"
                      >
                        1
                      </Button>
                      {currentPage > 4 && (
                        <span className="px-2 text-muted-foreground">...</span>
                      )}
                    </>
                  )}

                  {/* Page numbers around current page */}
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          "w-10 h-10 rounded-full",
                          currentPage === pageNum &&
                            "bg-primary text-primary-foreground"
                        )}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  {/* Last page */}
                  {currentPage < totalPages - 2 && totalPages > 5 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <span className="px-2 text-muted-foreground">...</span>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-10 h-10 rounded-full"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-full px-4"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function TokenGrid({ tokens }: { tokens: any[] }) {
  if (tokens.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-2">No tokens found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tokens.map((token) => (
        <EnhancedTokenCard key={token.id} token={token} />
      ))}
    </div>
  );
}

function TokenList({ tokens }: { tokens: any[] }) {
  if (tokens.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-2">No tokens found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border/40">
        <div className="col-span-4">Token</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">24h Change</div>
        <div className="col-span-2 text-right">Volume</div>
        <div className="col-span-2 text-right">Market Cap</div>
      </div>

      {/* Token Rows */}
      {tokens.map((token) => (
        <TokenListItem key={token.id} token={token} />
      ))}
    </div>
  );
}

function EnhancedTokenCard({ token }: { token: any }) {
  const isPositiveChange = token.priceChange24h >= 0;

  return (
    <Link to={`/token/${token.id}`} className="block group">
      <Card className="h-full overflow-hidden rounded-xl shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={token.creatorAvatar || "/placeholder.svg"}
                alt={token.creatorName}
              />
              <AvatarFallback>{token.tokenName.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                {token.tokenName}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {token.tokenTicker}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="font-bold">${token.price.toFixed(4)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">24h Change</span>
              <span
                className={cn(
                  "font-medium text-sm",
                  isPositiveChange ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositiveChange ? "+" : ""}
                {token.priceChange24h.toFixed(2)}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Volume</span>
              <span className="font-medium text-sm">
                ${(token.volume24h / 1000).toFixed(1)}K
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Market Cap</span>
              <span className="font-medium text-sm">
                ${(token.marketCap / 1000000).toFixed(2)}M
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Holders</span>
              <span className="font-medium text-sm">
                {token.holders.toLocaleString()}
              </span>
            </div>
          </div>

          {token.milestones && token.milestones.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {token.milestones.slice(0, 2).map((milestone) => (
                <Badge
                  key={milestone}
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary border-primary/20"
                >
                  {milestone}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

function TokenListItem({ token }: { token: any }) {
  const isPositiveChange = token.priceChange24h >= 0;

  return (
    <Link to={`/token/${token.id}`} className="block group">
      <Card className="hover:shadow-md transition-all duration-200 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Token Info */}
            <div className="md:col-span-4 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={token.creatorAvatar || "/placeholder.svg"}
                  alt={token.creatorName}
                />
                <AvatarFallback>
                  {token.tokenName.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                  {token.tokenName}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {token.tokenTicker} • {token.creatorName}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="md:col-span-2 md:text-right">
              <p className="font-bold">${token.price.toFixed(4)}</p>
            </div>

            {/* 24h Change */}
            <div className="md:col-span-2 md:text-right">
              <span
                className={cn(
                  "font-medium",
                  isPositiveChange ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositiveChange ? "+" : ""}
                {token.priceChange24h.toFixed(2)}%
              </span>
            </div>

            {/* Volume */}
            <div className="md:col-span-2 md:text-right">
              <p className="font-medium">
                ${(token.volume24h / 1000).toFixed(1)}K
              </p>
            </div>

            {/* Market Cap */}
            <div className="md:col-span-2 md:text-right">
              <p className="font-medium">
                ${(token.marketCap / 1000000).toFixed(2)}M
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
