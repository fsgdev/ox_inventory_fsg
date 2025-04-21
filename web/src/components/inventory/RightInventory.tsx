import InventoryGrid from './InventoryGrid';
import { useAppSelector } from '../../store';
import { selectRightInventory } from '../../store/inventory';
import { fetchNui } from '../../utils/fetchNui';

const RightInventory: React.FC = () => {
  const rightInventory = useAppSelector(selectRightInventory);

  return (
    <div style={{ position: 'relative' }}>
      <div className="close-button-wrapper">
        <div className="close-button-label">
          Exit<br /><p>Inventory</p>
        </div>
        <button className="close-button" onClick={() => fetchNui('exit')}>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
          </svg>
        </button>
      </div>
      <InventoryGrid inventory={rightInventory} />
    </div>
  );
};

export default RightInventory;