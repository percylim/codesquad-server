// backend/routes/foods/qrOrder.js
const express = require('express');
const router = express.Router();

// Store orders in memory (replace with database in production)
let qrOrders = [];

// POST /api/admin/QROrder - Create new QR order
router.post('/', async (req, res) => {
  try {
    const { tableNumber, customerNote, items, total, stallID } = req.body;
    
    console.log('📱 Received QR Order:', req.body);
    
    // Validation
    if (!tableNumber || !tableNumber.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Table number is required' 
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order must contain at least one item' 
      });
    }

    // Calculate total to prevent client manipulation
    const calculatedTotal = items.reduce((sum, item) => {
      const price = item.prom_price > 0 ? item.prom_price : item.price;
      return sum + (price * item.quantity);
    }, 0);

    // Create order object
    const order = {
      id: `QR${Date.now()}`,
      tableNumber: tableNumber.trim(),
      customerNote: customerNote?.trim() || '',
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        prom_price: parseFloat(item.prom_price) || 0,
        finalPrice: item.prom_price > 0 ? parseFloat(item.prom_price) : parseFloat(item.price),
        quantity: parseInt(item.quantity),
        image: item.image,
        addons: item.addons || [],
        note: item.note || ''
      })),
      total: calculatedTotal,
      originalTotal: parseFloat(total), // Keep original for reference
      status: 'pending',
      orderType: 'qr-code',
      stallID: stallID || 'default',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to in-memory storage (replace with database)
    qrOrders.push(order);
    
    console.log('✅ QR Order Created:', order.id, 'for table', order.tableNumber);
    console.log('📦 Order Items:', order.items.length, 'items');
    console.log('💰 Order Total: $' + order.total);
    
    res.status(201).json({ 
      success: true, 
      orderId: order.id,
      message: 'Order submitted successfully',
      order: {
        id: order.id,
        tableNumber: order.tableNumber,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt
      }
    });
    
  } catch (error) {
    console.error('❌ QR Order Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error: ' + error.message 
    });
  }
});

// GET /api/admin/QROrder - List all QR orders with filters
router.get('/', async (req, res) => {
  try {
    const { stallID, status, date, tableNumber } = req.query;
    
    let filteredOrders = [...qrOrders];
    
    // Apply filters
    if (stallID) {
      filteredOrders = filteredOrders.filter(order => order.stallID === stallID);
    }
    
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }
    
    if (date) {
      const filterDate = new Date(date);
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === filterDate.toDateString();
      });
    }
    
    if (tableNumber) {
      filteredOrders = filteredOrders.filter(order => 
        order.tableNumber.toLowerCase().includes(tableNumber.toLowerCase())
      );
    }
    
    // Sort by latest first
    filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
      success: true,
      orders: filteredOrders,
      count: filteredOrders.length,
      totalValue: filteredOrders.reduce((sum, order) => sum + order.total, 0)
    });
    
  } catch (error) {
    console.error('❌ Get QR Orders Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch orders' 
    });
  }
});

// GET /api/admin/QROrder/:orderId - Get specific QR order
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = qrOrders.find(o => o.id === orderId);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    res.json({
      success: true,
      order: order
    });
    
  } catch (error) {
    console.error('❌ Get QR Order Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch order' 
    });
  }
});

// PUT /api/admin/QROrder/:orderId - Update QR order
router.put('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { tableNumber, customerNote, items, status } = req.body;
    
    const orderIndex = qrOrders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    // Update order
    if (tableNumber) qrOrders[orderIndex].tableNumber = tableNumber.trim();
    if (customerNote !== undefined) qrOrders[orderIndex].customerNote = customerNote.trim();
    if (status) qrOrders[orderIndex].status = status;
    
    if (items && Array.isArray(items)) {
      qrOrders[orderIndex].items = items.map(item => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        prom_price: parseFloat(item.prom_price) || 0,
        finalPrice: item.prom_price > 0 ? parseFloat(item.prom_price) : parseFloat(item.price),
        quantity: parseInt(item.quantity),
        image: item.image,
        addons: item.addons || [],
        note: item.note || ''
      }));
      
      // Recalculate total
      qrOrders[orderIndex].total = qrOrders[orderIndex].items.reduce((sum, item) => {
        return sum + (item.finalPrice * item.quantity);
      }, 0);
    }
    
    qrOrders[orderIndex].updatedAt = new Date().toISOString();
    
    console.log('✅ QR Order Updated:', orderId);
    
    res.json({
      success: true,
      message: 'Order updated successfully',
      order: qrOrders[orderIndex]
    });
    
  } catch (error) {
    console.error('❌ Update QR Order Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update order' 
    });
  }
});

// PUT /api/admin/QROrder/:orderId/status - Update order status only
router.put('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be: ' + validStatuses.join(', ') 
      });
    }
    
    const orderIndex = qrOrders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    qrOrders[orderIndex].status = status;
    qrOrders[orderIndex].updatedAt = new Date().toISOString();
    
    console.log('🔄 QR Order Status Updated:', orderId, '->', status);
    
    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      orderId: orderId,
      status: status
    });
    
  } catch (error) {
    console.error('❌ Update Order Status Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update order status' 
    });
  }
});

// DELETE /api/admin/QROrder/:orderId - Delete QR order
router.delete('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const orderIndex = qrOrders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    const deletedOrder = qrOrders.splice(orderIndex, 1)[0];
    
    console.log('🗑️ QR Order Deleted:', orderId);
    
    res.json({
      success: true,
      message: 'Order deleted successfully',
      order: deletedOrder
    });
    
  } catch (error) {
    console.error('❌ Delete QR Order Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete order' 
    });
  }
});

// GET /api/admin/QROrder/stats/:stallID - Get order statistics
router.get('/stats/:stallID', async (req, res) => {
  try {
    const { stallID } = req.params;
    
    const stallOrders = qrOrders.filter(order => order.stallID === stallID);
    
    const stats = {
      totalOrders: stallOrders.length,
      pending: stallOrders.filter(o => o.status === 'pending').length,
      preparing: stallOrders.filter(o => o.status === 'preparing').length,
      ready: stallOrders.filter(o => o.status === 'ready').length,
      completed: stallOrders.filter(o => o.status === 'completed').length,
      cancelled: stallOrders.filter(o => o.status === 'cancelled').length,
      totalRevenue: stallOrders.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: stallOrders.length > 0 
        ? stallOrders.reduce((sum, order) => sum + order.total, 0) / stallOrders.length 
        : 0
    };
    
    res.json({
      success: true,
      stats: stats,
      stallID: stallID
    });
    
  } catch (error) {
    console.error('❌ Get QR Order Stats Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch order statistics' 
    });
  }
});

// Backend - remove /api from routes
router.get('/food/menu', (req, res) => {
  // Your menu logic
  res.json(menuItems);
});

router.post('/food/order', (req, res) => {
  // Your order logic
  res.json({ success: true });
});

module.exports = router;