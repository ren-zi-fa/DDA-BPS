"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TilesComponent: React.FC<{
  className?: string;
  tileSize?: number;
  rows?: number;
  cols?: number;
}> = ({ className, tileSize = 48, rows: fixedRows, cols: fixedCols }) => {
  const [grid, setGrid] = useState({
    rows: fixedRows || 0,
    cols: fixedCols || 0,
  });

  useEffect(() => {
    function calc() {
      if (fixedRows && fixedCols) {
        setGrid({ rows: fixedRows, cols: fixedCols });
        return;
      }

      const cols = Math.ceil(window.innerWidth / tileSize) + 1;
      const rows = Math.ceil(window.innerHeight / tileSize) + 1;
      setGrid({ rows, cols });
    }

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [tileSize, fixedRows, fixedCols]);

  const total = grid.rows * grid.cols;

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none grid overflow-hidden",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, ${tileSize}px)`,
        gridAutoRows: `${tileSize}px`,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -10, scale: 1.02, backgroundColor: "var(--tile)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="border-r border-t dark:border-neutral-900 border-neutral-200"
          style={{
            width: tileSize,
            height: tileSize,
            willChange: "transform, background-color",
          }}
        />
      ))}
    </div>
  );
};

export const Tiles = React.memo(TilesComponent);
