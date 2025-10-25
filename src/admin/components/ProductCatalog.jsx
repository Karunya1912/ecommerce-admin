import { useState, useEffect } from 'react';
import { ApiClient } from 'adminjs';
import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 30px;
  margin: -30px;
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 30px 40px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #667eea;
  margin: 0 0 10px 0;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 1.1rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  max-width: 1600px;
  margin: 0 auto;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.25);
  }
`;

const ProductImage = styled.div`
  height: 240px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  position: relative;
  border-bottom: 4px solid #667eea;
`;

const StockBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${p => p.inStock ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductInfo = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: 1.3rem;
  color: #1f2937;
  margin: 0 0 10px 0;
  font-weight: 700;
  line-height: 1.3;
`;

const ProductDesc = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 16px 0;
  line-height: 1.5;
  height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const SKU = styled.div`
  font-size: 0.85rem;
  color: #9ca3af;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  &:before {
    content: '🏷️';
    font-size: 1rem;
  }
`;

const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 14px;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-radius: 14px;
  border: 2px solid #e5e7eb;
`;

const QtyLabel = styled.span`
  font-size: 1rem;
  color: #1f2937;
  font-weight: 700;
  margin-right: 8px;
`;

const QtyButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
    transform: scale(1.15);
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
    border-color: #d1d5db;
  }
`;

const QtyDisplay = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  min-width: 35px;
  text-align: center;
  color: #1f2937;
`;

const TotalPrice = styled.div`
  margin-left: auto;
  font-size: 1.2rem;
  font-weight: 800;
  color: #667eea;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

const CartButton = styled.button`
  flex: 1;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 14px 18px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const BuyButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 18px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.35);

  &:hover:not(:disabled) {
    transform: scale(1.03);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.45);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-size: 1.5rem;
  color: white;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const getIcon = (name) => {
  if (name.includes('MacBook') || name.includes('iPhone')) return '💻';
  if (name.includes('TV') || name.includes('Headphones')) return '📱';
  if (name.includes('T-Shirt') || name.includes('Jeans') || name.includes('Jacket')) return '👕';
  if (name.includes('Book')) return '📚';
  if (name.includes('Coffee')) return '☕';
  if (name.includes('Yoga')) return '🧘';
  return '🛍️';
};

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = new ApiClient();
        const response = await api.resourceAction({
          resourceId: 'Product',
          actionName: 'list',
        });
        setProducts(response.data.records || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateQty = (id, change) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const product = products.find(p => p.id === id);
      const max = product?.params?.stock || 999;
      const newQty = Math.max(1, Math.min(current + change, max));
      return { ...prev, [id]: newQty };
    });
  };

  const addToCart = (product) => {
    const qty = quantities[product.id] || 1;
    alert(`✅ Added ${qty}x ${product.params.name} to cart!\n\nTotal: $${(product.params.price * qty).toFixed(2)}`);
  };

  const buyNow = (product) => {
    const qty = quantities[product.id] || 1;
    const total = product.params.price * qty;
    if (confirm(`🛒 Buy ${qty}x ${product.params.name}\n\nTotal: $${total.toFixed(2)}\n\nPayment Method: Cash on Delivery\n\nConfirm order?`)) {
      alert('✅ Order placed successfully!\n\n💵 Payment: Cash on Delivery\n📦 We will contact you shortly!');
    }
  };

  if (loading) {
    return (
      <Container>
        <Loading>Loading products...</Loading>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>🛍️ Product Catalog</Title>
        <Subtitle>Browse our premium collection - {products.length} amazing products available</Subtitle>
      </Header>

      <ProductGrid>
        {products.map(product => {
          const qty = quantities[product.id] || 1;
          const inStock = product.params.stock > 0;

          return (
            <ProductCard key={product.id}>
              <ProductImage>
                <span>{getIcon(product.params.name)}</span>
                <StockBadge inStock={inStock}>
                  {inStock ? `${product.params.stock} in stock` : 'Out of Stock'}
                </StockBadge>
              </ProductImage>

              <ProductInfo>
                <ProductName>{product.params.name}</ProductName>
                <ProductDesc>{product.params.description || 'Premium quality product with exceptional features and durability'}</ProductDesc>

                <Price>${parseFloat(product.params.price).toFixed(2)}</Price>
                <SKU>{product.params.sku}</SKU>

                {inStock && (
                  <>
                    <QuantityBox>
                      <QtyLabel>Qty:</QtyLabel>
                      <QtyButton onClick={() => updateQty(product.id, -1)} disabled={qty <= 1}>−</QtyButton>
                      <QtyDisplay>{qty}</QtyDisplay>
                      <QtyButton onClick={() => updateQty(product.id, 1)} disabled={qty >= product.params.stock}>+</QtyButton>
                      <TotalPrice>
                        ${(product.params.price * qty).toFixed(2)}
                      </TotalPrice>
                    </QuantityBox>

                    <ButtonGroup>
                      <CartButton onClick={() => addToCart(product)}>🛒 Add to Cart</CartButton>
                      <BuyButton onClick={() => buyNow(product)}>⚡ Buy Now</BuyButton>
                    </ButtonGroup>
                  </>
                )}

                {!inStock && (
                  <BuyButton disabled style={{ width: '100%' }}>
                    ❌ Out of Stock
                  </BuyButton>
                )}
              </ProductInfo>
            </ProductCard>
          );
        })}
      </ProductGrid>
    </Container>
  );
};

export default ProductCatalog;
