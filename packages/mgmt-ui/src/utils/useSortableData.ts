import { useMemo, useState } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig<T> {
  key: keyof T | string;
  direction: SortDirection;
}

export function useSortableData<T>(items: T[], config: SortConfig<T> = { key: '', direction: null }) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig.direction !== null) {
      sortableItems.sort((a, b) => {
        const aValue = (a as any)[sortConfig.key];
        const bValue = (b as any)[sortConfig.key];

        // Handle null/undefined values to prevent crashes
        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        // Numeric Sort (e.g., Badges Earned, Lessons Completed)
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }

        // Boolean Sort (e.g., Account Created, Status)
        // Descending puts True/Yes at the top
        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return sortConfig.direction === 'asc' 
            ? (aValue === bValue ? 0 : aValue ? 1 : -1)
            : (aValue === bValue ? 0 : aValue ? -1 : 1);
        }

        // Date Sort (e.g., Last Active)
        if (aValue instanceof Date && bValue instanceof Date) {
          return sortConfig.direction === 'asc' 
            ? aValue.getTime() - bValue.getTime() 
            : bValue.getTime() - aValue.getTime();
        }

        // Default String Sort (e.g., Student Name, Class Name)
        // Uses localeCompare for safe alphabetical sorting
        return sortConfig.direction === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
}