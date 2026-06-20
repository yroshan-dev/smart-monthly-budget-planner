import React from 'react';
import { 
  Home, 
  Utensils, 
  Car, 
  Tv, 
  AlertTriangle, 
  PiggyBank, 
  HelpCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function BudgetInput({ 
  income, 
  setIncome, 
  expenses, 
  setExpenses, 
  applyPreset 
}) {
  const expenseCategories = [
    { key: 'rent', label: 'Rent / Housing', icon: Home, color: 'text-indigo-500', max: Math.max(50000, income) },
    { key: 'food', label: 'Food & Groceries', icon: Utensils, color: 'text-amber-500', max: Math.max(30000, income) },
    { key: 'transport', label: 'Transport / Fuel', icon: Car, color: 'text-sky-500', max: Math.max(20000, income) },
    { key: 'subscriptions', label: 'Subscriptions / Entertainment', icon: Tv, color: 'text-purple-500', max: Math.max(10000, income) },
    { key: 'debt', label: 'Debt / EMI payments', icon: AlertTriangle, color: 'text-rose-500', max: Math.max(50000, income) },
    { key: 'savings', label: 'Savings & Investments', icon: PiggyBank, color: 'text-emerald-500', max: Math.max(100000, income) },
    { key: 'miscellaneous', label: 'Miscellaneous / Other', icon: HelpCircle, color: 'text-zinc-500', max: Math.max(30000, income) }
  ];

  const handleExpenseChange = (key, val) => {
    const numericValue = val === '' ? 0 : Math.max(0, parseFloat(val) || 0);
    setExpenses(prev => ({
      ...prev,
      [key]: numericValue
    }));
  };

  const handleIncomeChange = (val) => {
    const numericValue = val === '' ? 0 : Math.max(0, parseFloat(val) || 0);
    setIncome(numericValue);
  };

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 tracking-tight flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
            Budget Configuration
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Configure your income and monthly expenses</p>
        </div>
        <button 
          onClick={() => applyPreset('reset')}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400 transition-colors p-1 px-2 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
        >
          <RefreshCw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Preset Rules */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
          Quick Budget Presets
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => applyPreset('50-30-20')}
            className="text-xs font-medium py-2 px-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all hover:scale-[1.02]"
          >
            🍕 50/30/20 Rule
          </button>
          <button 
            onClick={() => applyPreset('high-saver')}
            className="text-xs font-medium py-2 px-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all hover:scale-[1.02]"
          >
            🐖 High Saver
          </button>
          <button 
            onClick={() => applyPreset('debt-heavy')}
            className="text-xs font-medium py-2 px-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all hover:scale-[1.02]"
          >
            💸 Debt Heavy
          </button>
        </div>
      </div>

      {/* Monthly Income Input */}
      <div className="mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-5">
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="monthly-income-input" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Monthly Income
          </label>
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">INR (₹)</span>
        </div>
        <div className="relative rounded-lg shadow-sm mb-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-zinc-500 dark:text-zinc-400 sm:text-sm font-medium">₹</span>
          </div>
          <input
            id="monthly-income-input"
            type="number"
            value={income || ''}
            onChange={(e) => handleIncomeChange(e.target.value)}
            className="w-full bg-[#ffffff] dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg pl-8 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-zinc-950 dark:text-zinc-50 transition-all font-semibold"
            placeholder="Enter monthly income"
          />
        </div>
        <input
          aria-label="Monthly income slider"
          type="range"
          min="0"
          max="300000"
          step="5000"
          value={income || 0}
          onChange={(e) => handleIncomeChange(e.target.value)}
          className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
        />
        <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
          <span>₹0</span>
          <span>₹1.5L</span>
          <span>₹3L+</span>
        </div>
      </div>

      {/* Expenses Inputs */}
      <div>
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wider text-[11px] font-mono">
          Monthly Expenses
        </h3>
        <div className="space-y-4">
          {expenseCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor={`${cat.key}-input`} className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                    <Icon className={`h-4 w-4 ${cat.color}`} />
                    {cat.label}
                  </label>
                  <div className="relative rounded-md shadow-sm w-36">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <span className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold">₹</span>
                    </div>
                    <input
                      id={`${cat.key}-input`}
                      type="number"
                      value={expenses[cat.key] || ''}
                      onChange={(e) => handleExpenseChange(cat.key, e.target.value)}
                      className="w-full text-right bg-[#ffffff] dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-md pl-6 pr-2.5 py-1 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-zinc-950 dark:text-zinc-50 font-semibold"
                      placeholder="0"
                    />
                  </div>
                </div>
                <input
                  aria-label={`${cat.label} slider`}
                  type="range"
                  min="0"
                  max={cat.max || 50000}
                  step="500"
                  value={expenses[cat.key] || 0}
                  onChange={(e) => handleExpenseChange(cat.key, e.target.value)}
                  className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
