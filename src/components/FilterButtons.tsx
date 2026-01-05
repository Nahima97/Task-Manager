import type { FilterType } from "../types/task";
import { Button } from "./ui/button";

interface FilterButtonsProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const FilterButtons = ({currentFilter, onFilterChange}: FilterButtonsProps) => {
    
    const filters: {value: FilterType; label: string}[] = [
        {value: 'all', label: 'All'},
        {value: 'pending', label: 'Pending'},
        {value: 'completed', label: 'Completed'},
    ];
 
    return (
    <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
            <Button key={filter.value}
            variant={currentFilter === filter.value ? "default" : "secondary"}
            onClick={() => onFilterChange(filter.value)}
            size="sm"
            className="transition-all duration-200"
            >
                {filter.label}
            </Button>
        ))}

    </div>
  );
};

export default FilterButtons;