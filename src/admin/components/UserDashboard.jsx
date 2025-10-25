import React, { useState, useEffect } from 'react';
import { Box, H3, H5, Text, Badge } from '@adminjs/design-system';
import { useCurrentAdmin } from 'adminjs';
import { ApiClient } from 'adminjs';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  margin: -30px;
  padding: 30px;
`;

const WelcomeSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%);
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 10px;
  font-weight: 700;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  border-left: 4px solid ${props => props.borderColor || '#667eea'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${props => props.bgColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: white;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
  font-weight: 500;
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  color: #1f2937;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OrderItem = styled.div`
  padding: 20px;
  border: 2px solid #f3f4f6;
  border-radius: 12px;
  margin-bottom: 15px;
  transition: all 0.3s;
  background: #fafbfc;

  &:hover {
    border-color: #667eea;
    background: white;
    transform: translateX(5px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const OrderNumber = styled.div`
  font-weight: 600;
  color: #667eea;
  font-size: 1.05rem;
`;

const OrderDate = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;

const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const QuickActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    color: white;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #9ca3af;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
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
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.2);
  }
`;

const ProductImageSection = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  position: relative;
  border-bottom: 3px solid #667eea;
`;

const ProductStockBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${p => p.inStock ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ProductInfo = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  color: #1f2937;
  margin: 0 0 8px 0;
  font-weight: 600;
  line-height: 1.3;
`;

const ProductDescription = styled.p`
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0 0 12px 0;
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const ProductSKU = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 16px;
  font-weight: 500;
`;

const ProductQuantityBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 12px;
`;

const QtyLabel = styled.span`
  font-size: 0.9rem;
  color: #1f2937;
  font-weight: 600;
`;

const QtyButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    border-color: #d1d5db;
  }
`;

const QtyDisplay = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
  color: #1f2937;
`;

const ProductTotalPrice = styled.div`
  margin-left: auto;
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
`;

const ProductButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

const ProductCartButton = styled.button`
  flex: 1;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProductBuyButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover:not(:disabled) {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const getProductIcon = (name) => {
  if (name.includes('MacBook') || name.includes('iPhone')) return '💻';
  if (name.includes('TV') || name.includes('Headphones')) return '📱';
  if (name.includes('T-Shirt') || name.includes('Jeans') || name.includes('Jacket')) return '👕';
  if (name.includes('Book')) return '📚';
  if (name.includes('Coffee')) return '☕';
  if (name.includes('Yoga')) return '🧘';
  return '🛍️';
};

const UserDashboard = () => {
  const [currentAdmin] = useCurrentAdmin();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, totalSpent: 0 });
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchUserData();
    fetchProducts();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user's orders
      const response = await fetch('/admin/api/resources/Order/actions/list', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const userOrders = data.records || [];
        setOrders(userOrders.slice(0, 5)); // Show only 5 recent orders

        // Calculate stats
        const totalOrders = userOrders.length;
        const pendingOrders = userOrders.filter(o => o.params?.status === 'pending' || o.params?.status === 'processing').length;
        const totalSpent = userOrders.reduce((sum, order) => sum + parseFloat(order.params?.totalAmount || 0), 0);

        setStats({ totalOrders, pendingOrders, totalSpent });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

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
      setProductsLoading(false);
    }
  };

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

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: { bg: '#fef3c7', color: '#92400e', text: 'Pending' },
      processing: { bg: '#dbeafe', color: '#1e40af', text: 'Processing' },
      shipped: { bg: '#e0e7ff', color: '#4338ca', text: 'Shipped' },
      delivered: { bg: '#d1fae5', color: '#065f46', text: 'Delivered' },
      cancelled: { bg: '#fee2e2', color: '#991b1b', text: 'Cancelled' }
    };

    const config = statusColors[status] || statusColors.pending;

    return (
      <span style={{
        backgroundColor: config.bg,
        color: config.color,
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600'
      }}>
        {config.text}
      </span>
    );
  };

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome back, {currentAdmin?.name || 'User'}! 👋</WelcomeTitle>
        <WelcomeSubtitle>Here's what's happening with your account today.</WelcomeSubtitle>
      </WelcomeSection>

      <StatsGrid>
        <StatCard borderColor="#667eea">
          <StatIcon bgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            📦
          </StatIcon>
          <StatValue>{stats.totalOrders}</StatValue>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>

        <StatCard borderColor="#f59e0b">
          <StatIcon bgColor="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)">
            ⏳
          </StatIcon>
          <StatValue>{stats.pendingOrders}</StatValue>
          <StatLabel>Pending Orders</StatLabel>
        </StatCard>

        <StatCard borderColor="#10b981">
          <StatIcon bgColor="linear-gradient(135deg, #10b981 0%, #059669 100%)">
            💰
          </StatIcon>
          <StatValue>${stats.totalSpent.toFixed(2)}</StatValue>
          <StatLabel>Total Spent</StatLabel>
        </StatCard>
      </StatsGrid>

      <SectionCard>
        <SectionTitle>
          🛍️ Quick Actions
        </SectionTitle>
        <QuickActionGrid>
          <QuickActionButton href="/admin/resources/Product">
            <span>🏪</span> Browse Products
          </QuickActionButton>
          <QuickActionButton href="/admin/resources/Order/actions/new">
            <span>➕</span> Create New Order
          </QuickActionButton>
          <QuickActionButton href="/admin/resources/Order">
            <span>📋</span> View All Orders
          </QuickActionButton>
        </QuickActionGrid>
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          📦 Recent Orders
        </SectionTitle>
        {loading ? (
          <EmptyState>Loading orders...</EmptyState>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <OrderItem key={order.id}>
              <OrderHeader>
                <OrderNumber>Order #{order.params?.orderNumber || order.id}</OrderNumber>
                {getStatusBadge(order.params?.status)}
              </OrderHeader>
              <OrderDate>
                {order.params?.createdAt ? new Date(order.params.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'}
              </OrderDate>
              <OrderDetails>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  Payment: <strong style={{ color: '#1f2937' }}>{order.params?.paymentStatus || 'N/A'}</strong>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#667eea' }}>
                  ${parseFloat(order.params?.totalAmount || 0).toFixed(2)}
                </div>
              </OrderDetails>
            </OrderItem>
          ))
        ) : (
          <EmptyState>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🛒</div>
            <div style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#6b7280' }}>No orders yet</div>
            <div style={{ fontSize: '0.9rem' }}>Start shopping to see your orders here!</div>
          </EmptyState>
        )}
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          🛍️ Featured Products
        </SectionTitle>
        {productsLoading ? (
          <EmptyState>Loading products...</EmptyState>
        ) : products.length > 0 ? (
          <ProductsGrid>
            {products.map(product => {
              const qty = quantities[product.id] || 1;
              const inStock = product.params.stock > 0;

              return (
                <ProductCard key={product.id}>
                  <ProductImageSection>
                    <span>{getProductIcon(product.params.name)}</span>
                    <ProductStockBadge inStock={inStock}>
                      {inStock ? `${product.params.stock} in stock` : 'Out of Stock'}
                    </ProductStockBadge>
                  </ProductImageSection>

                  <ProductInfo>
                    <ProductName>{product.params.name}</ProductName>
                    <ProductDescription>
                      {product.params.description || 'Premium quality product'}
                    </ProductDescription>

                    <ProductPrice>${parseFloat(product.params.price).toFixed(2)}</ProductPrice>
                    <ProductSKU>SKU: {product.params.sku}</ProductSKU>

                    {inStock && (
                      <>
                        <ProductQuantityBox>
                          <QtyLabel>Qty:</QtyLabel>
                          <QtyButton onClick={() => updateQty(product.id, -1)} disabled={qty <= 1}>
                            −
                          </QtyButton>
                          <QtyDisplay>{qty}</QtyDisplay>
                          <QtyButton onClick={() => updateQty(product.id, 1)} disabled={qty >= product.params.stock}>
                            +
                          </QtyButton>
                          <ProductTotalPrice>
                            ${(product.params.price * qty).toFixed(2)}
                          </ProductTotalPrice>
                        </ProductQuantityBox>

                        <ProductButtonGroup>
                          <ProductCartButton onClick={() => addToCart(product)}>
                            🛒 Add to Cart
                          </ProductCartButton>
                          <ProductBuyButton onClick={() => buyNow(product)}>
                            ⚡ Buy Now
                          </ProductBuyButton>
                        </ProductButtonGroup>
                      </>
                    )}

                    {!inStock && (
                      <ProductBuyButton disabled style={{ width: '100%' }}>
                        Out of Stock
                      </ProductBuyButton>
                    )}
                  </ProductInfo>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        ) : (
          <EmptyState>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📦</div>
            <div style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#6b7280' }}>No products available</div>
            <div style={{ fontSize: '0.9rem' }}>Check back later for new products!</div>
          </EmptyState>
        )}
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          👤 Profile Information
        </SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '5px', fontWeight: '600' }}>Full Name</div>
            <div style={{ fontSize: '1.05rem', color: '#1f2937', fontWeight: '600' }}>{currentAdmin?.name || 'N/A'}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '5px', fontWeight: '600' }}>Email Address</div>
            <div style={{ fontSize: '1.05rem', color: '#1f2937', fontWeight: '600' }}>{currentAdmin?.email || 'N/A'}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '5px', fontWeight: '600' }}>Account Type</div>
            <div style={{ fontSize: '1.05rem', color: '#1f2937', fontWeight: '600', textTransform: 'capitalize' }}>
              {currentAdmin?.role || 'N/A'}
            </div>
          </div>
        </div>
      </SectionCard>
    </DashboardContainer>
  );
};

export default UserDashboard;
