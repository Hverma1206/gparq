import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  X, Zap, Shield, Clock, Car, Eye, Users, MapPin 
} from "lucide-react";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  distance: number;
  features: {
    evCharging: boolean;
    covered: boolean;
    open24x7: boolean;
    cctv: boolean;
    valet: boolean;
    guard: boolean;
  };
}

const defaultFilters: FilterState = {
  priceRange: [0, 100],
  distance: 5,
  features: {
    evCharging: false,
    covered: false,
    open24x7: false,
    cctv: false,
    valet: false,
    guard: false,
  },
};

const FilterPanel = ({ isOpen, onClose, onApplyFilters }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1]] as [number, number],
    }));
  };

  const handleDistanceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      distance: value[0],
    }));
  };

  const handleFeatureToggle = (feature: keyof FilterState['features']) => {
    setFilters(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const featureOptions = [
    { key: 'evCharging' as const, label: 'EV Charging', icon: Zap },
    { key: 'covered' as const, label: 'Covered Parking', icon: Shield },
    { key: 'open24x7' as const, label: '24/7 Access', icon: Clock },
    { key: 'cctv' as const, label: 'CCTV Surveillance', icon: Eye },
    { key: 'valet' as const, label: 'Valet Service', icon: Users },
    { key: 'guard' as const, label: 'Security Guard', icon: Car },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Filter Parking Spots
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <h4 className="font-medium text-foreground">Price Range</h4>
          </div>
          <div className="px-2">
            <Slider
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
              max={100}
              step={5}
              onValueChange={handlePriceChange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{filters.priceRange[0]}/hr</span>
              <span>₹{filters.priceRange[1]}/hr</span>
            </div>
          </div>
        </div>

        {/* Distance */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h4 className="font-medium text-foreground">Maximum Distance</h4>
          </div>
          <div className="px-2">
            <Slider
              defaultValue={[filters.distance]}
              max={10}
              step={0.5}
              onValueChange={handleDistanceChange}
              className="mb-2"
            />
            <div className="flex justify-center text-sm text-muted-foreground">
              <span>Within {filters.distance} km</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Features</h4>
          <div className="grid grid-cols-2 gap-3">
            {featureOptions.map((feature) => (
              <div key={feature.key} className="flex items-center space-x-2">
                <Checkbox
                  id={feature.key}
                  checked={filters.features[feature.key]}
                  onCheckedChange={() => handleFeatureToggle(feature.key)}
                />
                <Label
                  htmlFor={feature.key}
                  className="text-sm text-muted-foreground cursor-pointer flex items-center gap-1"
                >
                  <feature.icon className="h-3 w-3" />
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
        <Button variant="ghost" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleApply}>
          Apply Filters
        </Button>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
