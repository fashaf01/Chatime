'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  describeSelection,
  formatLKR,
  priceOf,
  type Selection,
} from './menu';
import { outlets, WHATSAPP_NUMBER } from './outlets';

export type OrderType = 'pickup' | 'dine-in';

export type CartLine = Selection & { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (selection: Selection, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Two cups only merge into one line when *every* option matches, so a regular
 * 50%-sugar and a large 100%-sugar of the same drink stay separate — which is
 * how the store has to make them.
 */
function keyFor(s: Selection): string {
  return [
    s.drink.slug,
    s.size,
    s.sugar,
    s.ice,
    s.milk,
    [...s.toppings].sort().join('+'),
  ].join('|');
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((selection: Selection, qty = 1) => {
    const id = keyFor(selection);
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { ...selection, id, qty }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + priceOf(l) * l.qty, 0),
    [lines],
  );

  const value = useMemo(
    () => ({ lines, count, subtotal, add, remove, setQty, clear, open, setOpen }),
    [lines, count, subtotal, add, remove, setQty, clear, open],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
}

export type OrderDetails = {
  name: string;
  phone: string;
  orderType: OrderType;
  notes: string;
};

/**
 * Builds the message the store receives. Kept plain-text and itemised so
 * whoever is on the counter can read it straight off the phone and make it.
 */
export function composeOrderMessage(
  lines: CartLine[],
  subtotal: number,
  details: OrderDetails,
): string {
  const outlet = outlets[0];
  const rows = lines.map((l, i) => {
    const each = priceOf(l);
    return [
      `${i + 1}. ${l.drink.name} × ${l.qty}`,
      `   ${describeSelection(l)}`,
      `   ${formatLKR(each * l.qty)}`,
    ].join('\n');
  });

  return [
    `*New Chatime order*`,
    ``,
    `*${details.orderType === 'pickup' ? 'PICK UP' : 'DINE IN'}* — ${outlet.name}`,
    ``,
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    details.notes ? `Notes: ${details.notes}` : '',
    ``,
    ...rows,
    ``,
    `*Total: ${formatLKR(subtotal)}*`,
    ``,
    // Deliberately not a domain — chatime.lk is not registered, and a message
    // claiming to come from it would be a lie the moment anyone checked.
    `Sent from the Chatime Sri Lanka website`,
  ]
    .filter((l) => l !== '')
    .join('\n');
}

/** `null` when the store has not configured a WhatsApp number yet. */
export function orderWhatsappUrl(message: string): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
