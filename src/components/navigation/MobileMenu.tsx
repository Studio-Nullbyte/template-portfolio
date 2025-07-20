import { motion, AnimatePresence } from "framer-motion";
import { NavLinks } from "./NavLinks";
import type { NavItem } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
}

export function MobileMenu({ isOpen, items }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 bg-background/95 backdrop-blur-sm rounded-lg mt-2 border">
            <NavLinks
              items={items}
              orientation="vertical"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
