'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DFHomePage } from './components/DFHomePage';
import { useDFStore } from './context/DFStoreContext';

export default function DutyFreeShopPage() {
  const router = useRouter(); // ✅ 要放在 component 內！
  const { products, addToCart } = useDFStore();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 篩選邏輯
  const filteredProducts = products.filter((product) => {
    if (searchQuery) {
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory && selectedSubcategory) {
      return (
        product.category === selectedCategory &&
        product.subcategory === selectedSubcategory
      );
    }
    return true;
  });

  // ✅ 這裡定義事件處理器
  const handleProductClick = (product: any) => {
    router.push(`/dutyfree-shop/product/${product.id}`);
  };

  return (
    <DFHomePage
      filteredProducts={filteredProducts}
      selectedCategory={selectedCategory}
      selectedSubcategory={selectedSubcategory}
      searchOpen={searchOpen}
      searchQuery={searchQuery}
      onCategoryClick={(cat, sub) => {
        setSelectedCategory(cat);
        setSelectedSubcategory(sub);
      }}
      onProductClick={handleProductClick}
      onAddToCart={(product) => addToCart(product, 1)}
      onSearchToggle={() => setSearchOpen(!searchOpen)}
      onSearchChange={setSearchQuery}
      onClearFilter={() => {
        setSelectedCategory('');
        setSelectedSubcategory('');
        setSearchQuery('');
      }}
    />
  );
}
