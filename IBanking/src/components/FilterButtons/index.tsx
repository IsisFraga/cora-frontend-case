import React, { useCallback } from 'react';
import { useIBankingStore } from '../../store';
import './styles.css';
import { CloseIcon } from '../../assets/CloseIcon';
import { FilterType, FILTER_TYPES } from '../../constants';

export const FilterButtons: React.FC = () => {
  const filter = useIBankingStore(state => state.filter);
  const setFilter = useIBankingStore(state => state.setFilter);

  const handleFilterChange = useCallback((filterType: FilterType) => {
    setFilter(filterType);
  }, [setFilter]);

  const handleClearFilter = useCallback(() => {
    setFilter(FILTER_TYPES.ALL);
  }, [setFilter]);

  return (
    <div className="filter">
      <div className="filter__container">
        <div className="filter__buttons-group">
          <button 
            type="button"
            className={`filter__button ${filter === FILTER_TYPES.DEBIT ? 'filter__button--active' : ''}`}
            onClick={() => handleFilterChange(FILTER_TYPES.DEBIT)}
          >
            Débito
          </button>
          
          <button 
            type="button"
            className={`filter__button ${filter === FILTER_TYPES.CREDIT ? 'filter__button--active' : ''}`}
            onClick={() => handleFilterChange(FILTER_TYPES.CREDIT)}
          >
            Crédito
          </button>
          
          {filter !== FILTER_TYPES.ALL && (
            <button 
              type="button"
              className="filter__clear"
              onClick={handleClearFilter}
              aria-label="Limpar filtros"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default FilterButtons;