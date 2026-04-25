import { createContext, useContext, useState, ReactNode } from 'react';
import { router } from '@inertiajs/react';

interface CartContextType {
    cartCount: number;
    updateCartCount: (count: number) => void;
    incrementCart: () => void;
    decrementCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = (count: number) => {
        setCartCount(count);
    };

    const incrementCart = () => {
        setCartCount(prev => prev + 1);
    };

    const decrementCart = () => {
        setCartCount(prev => Math.max(0, prev - 1));
    };

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount, incrementCart, decrementCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
