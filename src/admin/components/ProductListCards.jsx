import { useState } from 'react';
import { useRecords, useTranslation } from 'adminjs';
import styled from 'styled-components';

const Container = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  background: white;
  padding: 20px 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #111;
  margin: 0 0 5px 0;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.95rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e5e5;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-color: #d5d5d5;
  }
`;

const ProductImage = styled.div`
  height: 220px;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  position: relative;
  border-bottom: 1px solid #e5e5e5;
`;

const StockBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${p => p.$inStock ? '#067d62' : '#cc0c39'};
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProductInfo = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  color: #111;
  margin: 0 0 8px 0;
  font-weight: 500;
  line-height: 1.3;
`;

const ProductDesc = styled.p`
  color: #666;
  font-size: 0.85rem;
  margin: 0 0 12px 0;
  line-height: 1.4;
  height: 38px;
  overflow: hidden;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 4px;
`;

const SKU = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 16px;
`;

const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const QtyLabel = styled.span`
  font-size: 0.9rem;
  color: #111;
  font-weight: 500;
  margin-right: 5px;
`;

const QtyButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #d5d5d5;
  background: white;
  color: #111;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f0f0f0;
    border-color: #999;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const QtyDisplay = styled.div`
  font-size: 1rem;
  font-weight: 500;
  min-width: 30px;
  text-align: center;
  color: #111;
`;

const TotalPrice = styled.div`
  margin-left: auto;
  font-size: 1rem;
  font-weight: 600;
  color: #111;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

const CartButton = styled.button`
  flex: 1;
  background: white;
  color: #111;
  border: 1px solid #d5d5d5;
  padding: 12px 16px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7f7f7;
    border-color: #111;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BuyButton = styled.button`
  flex: 1;
  background: #ffd814;
  color: #111;
  border: 1px solid #fcd200;
  padding: 12px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7ca00;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const getIcon = (name) => {
  if (!name) return '🛍️';
  if (name.includes('MacBook') || name.includes('iPhone')) return '💻';
  if (name.includes('TV') || name.includes('Headphones')) return '📱';
  if (name.includes('T-Shirt') || name.includes('Jeans') || name.includes('Jacket')) return '👕';
  if (name.includes('Book')) return '📚';
  if (name.includes('Coffee')) return '☕';
  if (name.includes('Yoga')) return '🧘';
  return '🛍️';
};

const ProductListCards = () => {
  const { records, loading } = useRecords();
  const [quantities, setQuantities] = useState({});
  const { translateMessage } = useTranslation();

  const updateQty = (id, change) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const product = records.find(r => r.id === id);
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
        <Header>
          <Title>Product Catalog</Title>
          <Subtitle>Loading products...</Subtitle>
        </Header>
      </Container>
    );
  }

  if (!records || records.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Product Catalog</Title>
          <Subtitle>No products available</Subtitle>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Product Catalog</Title>
        <Subtitle>Browse our collection - {records.length} products available</Subtitle>
      </Header>

      <ProductGrid>
        {records.map(product => {
          const qty = quantities[product.id] || 1;
          const inStock = product.params.stock > 0;

          return (
            <ProductCard key={product.id}>
              <ProductImage>
                <span>{getIcon(product.params.name)}</span>
                <StockBadge $inStock={inStock}>
                  {inStock ? `In Stock: ${product.params.stock}` : 'Out of Stock'}
                </StockBadge>
              </ProductImage>

              <ProductInfo>
                <ProductName>{product.params.name}</ProductName>
                <ProductDesc>{product.params.description || 'Premium quality product'}</ProductDesc>

                <Price>${parseFloat(product.params.price).toFixed(2)}</Price>
                <SKU>SKU: {product.params.sku}</SKU>

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
                      <CartButton onClick={() => addToCart(product)}>Add to Cart</CartButton>
                      <BuyButton onClick={() => buyNow(product)}>Buy Now</BuyButton>
                    </ButtonGroup>
                  </>
                )}

                {!inStock && (
                  <BuyButton disabled style={{ width: '100%' }}>
                    Out of Stock
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

export default ProductListCards;
