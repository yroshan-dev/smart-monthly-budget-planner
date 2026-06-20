import React, { useState, useEffect } from 'react';
import { Sun, Moon, PiggyBank, Sparkles, ReceiptText } from 'lucide-react';
import MetricCards from './components/MetricCards';
import BudgetInput from './components/BudgetInput';
import HealthStatus from './components/HealthStatus';
import AISuggestions from './components/AISuggestions';
import BudgetCharts from './components/BudgetCharts';

export default function App() {
  // 1. Dark Mode State & Side-Effects
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // 2. Budget Calculator State
  // Initialize with sensible defaults so the app displays mock data on first load.
  const [income, setIncome] = useState(100000);
  const [expenses, setExpenses] = useState({
    rent: 25000,
    food: 12000,
    transport: 6000,
    subscriptions: 3000,
    debt: 10000,
    savings: 20000,
    miscellaneous: 9000
  });

  // 3. Calculation Logic
  const totalExpenses = Object.values(expenses).reduce((sum, current) => sum + current, 0);
  const balance = income - totalExpenses;
  
  // Savings Rate = (Savings/Investments + max(0, Remaining Balance)) / Income * 100
  // capped at 100% and bounded by 0%
  const computedSavings = expenses.savings + Math.max(0, balance);
  const savingsRate = income > 0 ? Math.min(100, Math.max(0, (computedSavings / income) * 100)) : 0;

  // 4. Presets Handlers
  const applyPreset = (type) => {
    const targetIncome = income > 0 ? income : 100000;
    setIncome(targetIncome);

    switch (type) {
      case '50-30-20':
        // Needs (50%): Rent (25%), Food (15%), Transport (10%)
        // Wants (30%): Subscriptions (5%), Misc (25%)
        // Savings (20%): Savings & Investments (20%)
        // Debt: 0%
        setExpenses({
          rent: Math.round(targetIncome * 0.25),
          food: Math.round(targetIncome * 0.15),
          transport: Math.round(targetIncome * 0.10),
          subscriptions: Math.round(targetIncome * 0.05),
          debt: 0,
          savings: Math.round(targetIncome * 0.20),
          miscellaneous: Math.round(targetIncome * 0.25)
        });
        break;
      case 'high-saver':
        // Needs/Wants (50%): Rent (20%), Food (10%), Transport (5%), Subscriptions (2%), Misc (13%)
        // Savings (50%): Savings & Investments (50%)
        // Debt: 0%
        setExpenses({
          rent: Math.round(targetIncome * 0.20),
          food: Math.round(targetIncome * 0.10),
          transport: Math.round(targetIncome * 0.05),
          subscriptions: Math.round(targetIncome * 0.02),
          debt: 0,
          savings: Math.round(targetIncome * 0.50),
          miscellaneous: Math.round(targetIncome * 0.13)
        });
        break;
      case 'debt-heavy':
        // Needs/Wants (60%): Rent (20%), Food (12%), Transport (8%), Subscriptions (3%), Misc (12%)
        // Savings (5%): Savings & Investments (5%)
        // Debt (40%): Debt/EMI (40%)
        setExpenses({
          rent: Math.round(targetIncome * 0.20),
          food: Math.round(targetIncome * 0.12),
          transport: Math.round(targetIncome * 0.08),
          subscriptions: Math.round(targetIncome * 0.03),
          debt: Math.round(targetIncome * 0.40),
          savings: Math.round(targetIncome * 0.05),
          miscellaneous: Math.round(targetIncome * 0.12)
        });
        break;
      case 'reset':
      default:
        setIncome(0);
        setExpenses({
          rent: 0,
          food: 0,
          transport: 0,
          subscriptions: 0,
          debt: 0,
          savings: 0,
          miscellaneous: 0
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors duration-300">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 dark:bg-blue-500 p-2 rounded-lg text-white shadow-md shadow-blue-500/20">
              <PiggyBank className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-1.5">
                Smart Budget Planner
                <span className="text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30 px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wider">
                  INR Only
                </span>
              </h1>
              <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                Interactive Personal Finance Calculator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 transition-all shadow-sm"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Metric Overview Cards */}
        <MetricCards 
          income={income}
          totalExpenses={totalExpenses}
          balance={balance}
          savingsRate={savingsRate}
        />

        {/* Dashboard Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form Configuration Inputs (Span 5) */}
          <section className="lg:col-span-5">
            <BudgetInput 
              income={income}
              setIncome={setIncome}
              expenses={expenses}
              setExpenses={setExpenses}
              applyPreset={applyPreset}
            />
          </section>

          {/* Right Column: Analytics & Suggestions Panel (Span 7) */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* Health Alert Status */}
            <HealthStatus 
              income={income}
              totalExpenses={totalExpenses}
              savingsRate={savingsRate}
              balance={balance}
            />

            {/* ECharts Visualization */}
            <BudgetCharts 
              income={income}
              expenses={expenses}
              totalExpenses={totalExpenses}
              isDark={isDark}
            />

            {/* Personalized Recommendations */}
            <AISuggestions 
              income={income}
              expenses={expenses}
              totalExpenses={totalExpenses}
              savingsRate={savingsRate}
              balance={balance}
            />

          </section>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-12 py-6 bg-white dark:bg-[#0c0c0f] text-center transition-colors">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center justify-center gap-1.5">
          <ReceiptText className="h-3.5 w-3.5" />
          Designed with SaaS aesthetics for smart budgeting. No private bank login required. All data remains in local state.
        </p>
      </footer>
    </div>
  );
}
