
import React, { createContext, useContext, useState, useEffect } from "react";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  cart: Cart | null;
  isLoadingCart: boolean;
  isCartOpen: boolean;
  cartItemCount: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "id" | "lineTotal">) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeCartItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock API functions - will be replaced with real API calls
const mockFetchCart = (): Promise<Cart> => {
  return Promise.resolve({
    items: [],
    subtotal: 0,
    currency: "VND",
  });
};

// Sample mock product data
const mockProducts = [
  {
    id: "1",
    name: "Eco-friendly Water Bottle",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    price: 250000,
    stock: 10,
  },
  {
    id: "2",
    name: "Bamboo Toothbrush",
    imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
    price: 35000,
    stock: 20,
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  const cartItemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // Fetch cart on initial load
  useEffect(() => {
    const loadCart = async () => {
      setIsLoadingCart(true);
      try {
        const cartData = await mockFetchCart();
        setCart(cartData);
      } catch (error) {
        console.error("Failed to load cart:", error);
        toast.error("Failed to load your cart. Please try again.");
      } finally {
        setIsLoadingCart(false);
      }
    };

    loadCart();
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = async (item: Omit<CartItem, "id" | "lineTotal">) => {
    if (!cart) return;
    
    try {
      // Mock API call to add to cart
      const newItem: CartItem = {
        ...item,
        id: `cart-item-${Date.now()}`,
        lineTotal: item.price * item.quantity,
      };
      
      // Mock successful response
      const updatedCart: Cart = {
        ...cart,
        items: [...cart.items, newItem],
        subtotal: cart.subtotal + newItem.lineTotal,
      };
      
      setCart(updatedCart);
      toast.success(`${item.name} added to cart`);
      openCart(); // Open the cart drawer when item is added
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    if (!cart) return;
    
    setUpdatingItemId(itemId);
    try {
      // Find the item
      const itemToUpdate = cart.items.find(item => item.id === itemId);
      if (!itemToUpdate) throw new Error("Item not found");
      
      if (quantity <= 0) {
        await removeCartItem(itemId);
        return;
      }
      
      if (quantity > itemToUpdate.stock) {
        toast.error(`Sorry, only ${itemToUpdate.stock} available`);
        return;
      }
      
      // Calculate new line total
      const newLineTotal = itemToUpdate.price * quantity;
      const oldLineTotal = itemToUpdate.lineTotal;
      
      // Update the cart
      const updatedItems = cart.items.map(item => 
        item.id === itemId 
          ? { ...item, quantity, lineTotal: newLineTotal } 
          : item
      );
      
      const updatedCart: Cart = {
        ...cart,
        items: updatedItems,
        subtotal: cart.subtotal - oldLineTotal + newLineTotal,
      };
      
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart item:", error);
      toast.error("Failed to update cart. Please try again.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const removeCartItem = async (itemId: string) => {
    if (!cart) return;
    
    setUpdatingItemId(itemId);
    try {
      const itemToRemove = cart.items.find(item => item.id === itemId);
      if (!itemToRemove) throw new Error("Item not found");
      
      const updatedItems = cart.items.filter(item => item.id !== itemId);
      const updatedCart: Cart = {
        ...cart,
        items: updatedItems,
        subtotal: cart.subtotal - itemToRemove.lineTotal,
      };
      
      setCart(updatedCart);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      toast.error("Failed to remove item. Please try again.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const clearCart = async () => {
    setCart({
      items: [],
      subtotal: 0,
      currency: cart?.currency || "VND",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoadingCart,
        isCartOpen,
        cartItemCount,
        openCart,
        closeCart,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
