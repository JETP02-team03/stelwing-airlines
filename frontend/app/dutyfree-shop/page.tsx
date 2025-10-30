'use client';
import { Search, X } from 'lucide-react';
import { DFCategorySection } from './components/DFCategorySection';
import { DFProductCard } from './components/DFProductCard';
// import { ImageWithFallback } from './components/figma/ImageWithFallback'; // ❌ Hero已不需用這個

// ============================
// 1️⃣  Hero 區：Top + Pic
// ============================
function Word() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-end justify-center min-h-px min-w-px pb-0 pt-[20px] px-0 relative self-stretch shrink-0 z-[2] mr-[-30px]"
      data-name="word"
    >
      <div
        className="flex h-[calc(1px*((var(--transform-inner-width)*0.19129090011119843)+(var(--transform-inner-height)*0.9815333485603333)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.19129090011119843)+(var(--transform-inner-width)*0.9815333485603333)))]"
        style={
          {
            '--transform-inner-width': '94.515625',
            '--transform-inner-height': '33.5',
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[348.972deg]">
          <p className="font-['Homemade_Apple:Regular',_sans-serif] leading-[normal] not-italic relative text-[24px] text-black text-nowrap text-right whitespace-pre">
            Stelwing
          </p>
        </div>
      </div>
      <p className="font-['Fjalla_One:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-black text-nowrap text-right whitespace-pre">
        Duty Free
      </p>
    </div>
  );
}

function WhitePic() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start mr-[-30px] pb-0 pt-[80px] px-0 relative shrink-0 w-[900px] z-[1]"
      data-name="whitePic"
    >
      <div className="h-[119px] relative shrink-0 w-full">
        <img
          alt="Login visual"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src="/images/dutyfree/mainWhite.jpg"
        />
      </div>
    </div>
  );
}

function Top() {
  return (
    <div
      className="box-border content-stretch flex isolate items-start pl-0 pr-5 py-0 relative shrink-0 w-full pt-10"
      data-name="top"
    >
      <Word />
      <WhitePic />
    </div>
  );
}

function Pic() {
  return (
    <div
      className="content-stretch flex items-start relative shrink-0 w-full"
      data-name="pic"
    >
      <div
        className="basis-0 grow h-[450px] min-h-px min-w-px relative shrink-0"
        data-name="left"
      >
        <img
          alt="Left visual"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src="/images/dutyfree/mainLeft.jpg"
        />
      </div>
      <div
        className="basis-0 grow h-[450px] min-h-px min-w-px relative shrink-0"
        data-name="right"
      >
        <img
          alt="Right visual"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src="/images/dutyfree/mainRight.jpg"
        />
      </div>
    </div>
  );
}

// ============================
// 2️⃣  商品頁主架構（保留不動）
// ============================
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  subcategory?: string;
}

interface DFHomePageProps {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  selectedSubcategory: string;
  searchOpen: boolean;
  searchQuery: string;
  onCategoryClick: (category: string, subcategory: string) => void;
  onProductClick: (product: Product) => void;
  onSearchToggle: () => void;
  onSearchChange: (query: string) => void;
  onClearFilter: () => void;
}

export function DFHomePage({
  filteredProducts,
  selectedCategory,
  selectedSubcategory,
  searchOpen,
  searchQuery,
  onCategoryClick,
  onProductClick,
  onSearchToggle,
  onSearchChange,
  onClearFilter,
}: DFHomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section（改為新 Top + Pic） */}
      <div className="relative bg-white">
        <Top />
        <Pic />
      </div>

      {/* Category Section with Search */}
      <div className="bg-white border-b">
        <div className="mx-auto px-4 md:px-8 lg:px-16 py-4 md:py-8">
          {/* Category Boxes + Search Button */}
          <div className="flex flex-col md:flex-row gap-0.5">
            <div className="flex-1">
              <DFCategorySection onCategoryClick={onCategoryClick} />
            </div>

            {/* Search Button */}
            <button
              onClick={onSearchToggle}
              className="p-4 bg-[var(--df-accent-gold)] text-white hover:bg-white hover:text-[var(--df-accent-gold)] transition-all w-full md:w-auto"
            >
              <Search className="w-5 h-5 mx-auto md:mx-0" />
            </button>
          </div>

          {/* Search Input */}
          {searchOpen && (
            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-2 bg-white border border-[var(--df-accent-gold)] px-4 py-3 w-full md:min-w-[400px] md:w-auto">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜尋商品..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="flex-1 border-none outline-none bg-transparent"
                  autoFocus
                />
                <button
                  onClick={() => {
                    onSearchToggle();
                    onSearchChange('');
                  }}
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          )}

          {/* Active Filter Display */}
          {(selectedCategory || searchQuery) && (
            <div className="mt-4 text-center text-sm md:text-base">
              <span className="text-gray-600">
                {searchQuery
                  ? `搜尋: "${searchQuery}"`
                  : `${selectedCategory} > ${selectedSubcategory}`}
              </span>
              <button
                onClick={onClearFilter}
                className="ml-2 text-[var(--df-accent-gold)] hover:underline"
              >
                清除篩選
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <DFProductCard
              key={product.id}
              {...product}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            沒有找到符合的商品
          </div>
        )}
      </div>
    </div>
  );
}

// ============================
// Default Page Export（含假資料）
// ============================
export default function Page() {
  const dummy = () => {};

  const mockProducts = [
    // 美妝保養
    {
      id: 'b1',
      name: '雅詩蘭黛 特潤超導修護露',
      description: '100ml 經典修護精華',
      price: 8800,
      image:
        'https://media.istockphoto.com/id/1139151316/photo/shiba-inu-dog.jpg?s=1024x1024&w=is&k=20&c=WzdvP6rDSJt9xJZE83zaA9Gms5hYMOa8GfMbC3gyfvY=',
      category: '美妝保養',
      subcategory: '精華液',
    },
    {
      id: 'b2',
      name: 'SK-II 青春露',
      description: '230ml 經典神仙水',
      price: 7200,
      image:
        'https://media.istockphoto.com/id/1139151316/photo/shiba-inu-dog.jpg?s=1024x1024&w=is&k=20&c=WzdvP6rDSJt9xJZE83zaA9Gms5hYMOa8GfMbC3gyfvY=',
      category: '美妝保養',
      subcategory: '化妝水',
    },

    // 香氛花園
    {
      id: 'f1',
      name: 'Dior Sauvage 男香',
      description: '50ml 經典香水',
      price: 5200,
      image:
        'https://media.istockphoto.com/id/1139151316/photo/shiba-inu-dog.jpg?s=1024x1024&w=is&k=20&c=WzdvP6rDSJt9xJZE83zaA9Gms5hYMOa8GfMbC3gyfvY=',
      category: '香氛花園',
      subcategory: '男香',
    },
    {
      id: 'f2',
      name: 'Jo Malone 英國梨與小蒼蘭',
      description: '30ml 淡香水',
      price: 3800,
      image:
        'https://media.istockphoto.com/id/1139151316/photo/shiba-inu-dog.jpg?s=1024x1024&w=is&k=20&c=WzdvP6rDSJt9xJZE83zaA9Gms5hYMOa8GfMbC3gyfvY=',
      category: '香氛花園',
      subcategory: '女香',
    },

    // 時尚精品
    {
      id: 'l1',
      name: 'Gucci Marmont 鏈包',
      description: '真皮小包・經典款',
      price: 49500,
      image:
        'https://media.istockphoto.com/id/1139151316/photo/shiba-inu-dog.jpg?s=1024x1024&w=is&k=20&c=WzdvP6rDSJt9xJZE83zaA9Gms5hYMOa8GfMbC3gyfvY=',
      category: '時尚精品',
      subcategory: '包款',
    },
    {
      id: 'l2',
      name: 'Prada 太陽眼鏡',
      description: '義大利製設計師款',
      price: 15800,
      image:
        'https://media.istockphoto.com/id/1139151316/photo/shiba-inu-dog.jpg?s=1024x1024&w=is&k=20&c=WzdvP6rDSJt9xJZE83zaA9Gms5hYMOa8GfMbC3gyfvY=',
      category: '時尚精品',
      subcategory: '配件',
    },

    // 品味生活
    {
      id: 'ls1',
      name: 'Le Creuset 馬克杯',
      description: '350ml 琺瑯陶瓷杯',
      price: 1200,
      image:
        'https://media.istockphoto.com/id/1139151316/photo/shiba-inu-dog.jpg?s=1024x1024&w=is&k=20&c=WzdvP6rDSJt9xJZE83zaA9Gms5hYMOa8GfMbC3gyfvY=',
      category: '品味生活',
      subcategory: '餐具',
    },
    {
      id: 'ls2',
      name: 'Aesop 室內香氛噴霧',
      description: '室內香氛・伊蘭香調',
      price: 2100,
      image:
        'https://media.istockphoto.com/id/1139151316/photo/shiba-inu-dog.jpg?s=1024x1024&w=is&k=20&c=WzdvP6rDSJt9xJZE83zaA9Gms5hYMOa8GfMbC3gyfvY=',
      category: '品味生活',
      subcategory: '家居',
    },
  ];

  return (
    <DFHomePage
      products={mockProducts}
      filteredProducts={mockProducts}
      selectedCategory=""
      selectedSubcategory=""
      searchOpen={false}
      searchQuery=""
      onCategoryClick={dummy}
      onProductClick={dummy}
      onSearchToggle={dummy}
      onSearchChange={dummy}
      onClearFilter={dummy}
    />
  );
}
