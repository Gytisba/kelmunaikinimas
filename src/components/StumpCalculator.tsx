
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const StumpCalculator = () => {
  const [diameter, setDiameter] = useState<number>(10);
  const [area, setArea] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  
  const PRICE_PER_SQ_CM = 1.5;

  useEffect(() => {
    // Calculate area in square centimeters (πr²)
    const radius = diameter / 2;
    const calculatedArea = Math.PI * Math.pow(radius, 2);
    setArea(calculatedArea);
    
    // Calculate price
    const calculatedPrice = calculatedArea * PRICE_PER_SQ_CM;
    setPrice(calculatedPrice);
  }, [diameter]);

  const handleSliderChange = (value: number[]) => {
    setDiameter(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setDiameter(Math.min(Math.max(value, 1), 100)); // Limit between 1 and 100
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold text-forest-700 mb-4">Kelmo šalinimo kainos skaičiuoklė</h3>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Kelmo skersmuo</span>
          <div className="flex items-center">
            <Input
              type="number"
              value={diameter}
              onChange={handleInputChange}
              className="w-16 text-center mr-2"
              min={1}
              max={100}
            />
            <span className="text-gray-700">cm</span>
          </div>
        </div>
        
        <Slider
          defaultValue={[10]}
          value={[diameter]}
          onValueChange={handleSliderChange}
          max={100}
          min={1}
          step={1}
          className="my-4"
        />
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>1 cm</span>
          <span>50 cm</span>
          <span>100 cm</span>
        </div>
      </div>
      
      <div className="space-y-4 bg-forest-50 p-4 rounded-md">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Kelmo plotas:</span>
          <span className="font-semibold text-forest-700">{area.toFixed(2)} cm²</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Apytikslė kaina:</span>
          <span className="font-bold text-xl text-forest-700">{price.toFixed(2)} €</span>
        </div>
        
        <div className="text-sm text-gray-600 mt-2">
          <p>Kaina apskaičiuota pagal tarifą: 1.5€ už 1 cm²</p>
          <p className="mt-1 text-xs italic">Pastaba: Galutinė kaina gali skirtis priklausomai nuo kelmo būklės ir vietos.</p>
        </div>
      </div>
    </div>
  );
};

export default StumpCalculator;
