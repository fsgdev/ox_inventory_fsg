import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import { FaShoppingBag } from "react-icons/fa";

const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{ inventory: Inventory; showHeader?: boolean }> = ({ inventory, showHeader = false }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);
  return (
    <>
    <div style={{ position: 'relative' }}>
      <div className="inventory-grid-wrapper" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
      {showHeader && (
          <div className="inventory-icon-row">
            <div className="inventory-icon-box">
              <FaShoppingBag className="inventory-icon" />
            </div>
            <div className="inventory-icon-text">
              <p>VIEWING</p>
              <h1>INVENTORY</h1>
            </div>
          </div>
        )}
        <div>
          <div className="inventory-grid-header-wrapper">
            <p>{inventory.label || '\u00A0'}</p>
          </div>
          <div className="inventory-weight-bar-wrapper">
            <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} />
            {inventory.maxWeight && (
              <p className="inventory-weight-text">
                {weight / 1000}/{inventory.maxWeight / 1000}kg
              </p>
            )}
          </div>
        </div>
        <div className="inventory-grid-container" ref={containerRef}>
          <>
            {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
              <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                inventoryType={inventory.type}
                inventoryGroups={inventory.groups}
                inventoryId={inventory.id}
              />
            ))}
          </>
        </div>
      </div>
      </div>
    </>
  );
};

export default InventoryGrid;
