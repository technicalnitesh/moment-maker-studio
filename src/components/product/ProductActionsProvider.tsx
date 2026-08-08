import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/types";
import { track } from "@/lib/analytics";
import { GrabModal } from "@/components/product/GrabModal";
import { ShareModal } from "@/components/product/ShareModal";
import { PreviewOverlay } from "@/components/product/PreviewOverlay";

interface ProductActionsContextValue {
  openPreview: (product: Product) => void;
  openGrab: (product: Product) => void;
  openShare: (product: Product) => void;
}

const ProductActionsContext = createContext<ProductActionsContextValue | null>(null);

export function useProductActions() {
  const ctx = useContext(ProductActionsContext);
  if (!ctx) {
    throw new Error("useProductActions must be used inside <ProductActionsProvider>");
  }
  return ctx;
}

/**
 * Single mount point for the preview overlay, grab modal and share modal so
 * every card / detail page triggers the exact same experience.
 */
export function ProductActionsProvider({ children }: { children: ReactNode }) {
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [grabProduct, setGrabProduct] = useState<Product | null>(null);
  const [shareProduct, setShareProduct] = useState<Product | null>(null);

  const openPreview = useCallback((product: Product) => {
    track("preview_click", { slug: product.slug });
    setPreviewProduct(product);
  }, []);

  const openGrab = useCallback((product: Product) => {
    track("grab_click", { slug: product.slug });
    setGrabProduct(product);
  }, []);

  const openShare = useCallback((product: Product) => {
    setShareProduct(product);
  }, []);

  const value = useMemo(
    () => ({ openPreview, openGrab, openShare }),
    [openPreview, openGrab, openShare],
  );

  return (
    <ProductActionsContext.Provider value={value}>
      {children}
      <PreviewOverlay
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
        onShare={openShare}
        onGrab={(p) => {
          setPreviewProduct(null);
          openGrab(p);
        }}
      />
      <GrabModal product={grabProduct} onClose={() => setGrabProduct(null)} />
      <ShareModal product={shareProduct} onClose={() => setShareProduct(null)} />
    </ProductActionsContext.Provider>
  );
}
