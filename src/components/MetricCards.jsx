import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

export default function MetricCards({ income, totalExpenses, balance, savingsRate }) {
  // Helper to format currency in INR
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const cards = [
    {
      title: 'Monthly Income',
      value: formatINR(income),
      icon: Wallet,
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-100 dark:border-blue-900/20',
      description: 'Your monthly cash inflow'
    },
    {
      title: 'Total Expenses',
      value: formatINR(totalExpenses),
      icon: TrendingUp,
      color: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/30',
      borderColor: 'border-rose-100 dark:border-rose-900/20',
      description: 'Sum of all monthly spendings'
    },
    {
      title: 'Remaining Balance',
      value: formatINR(balance),
      icon: balance >= 0 ? ArrowUpRight : ArrowDownRight,
      color: balance >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-500',
      bgColor: balance >= 0 ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-rose-100/50 dark:bg-rose-950/40',
      borderColor: balance >= 0 ? 'border-emerald-100 dark:border-emerald-900/20' : 'border-rose-200 dark:border-rose-900/30',
      description: balance >= 0 ? 'Leftover unallocated cash' : 'Budget deficit'
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      color: savingsRate >= 20 ? 'text-emerald-500 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400',
      bgColor: savingsRate >= 20 ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-amber-50 dark:bg-amber-950/30',
      borderColor: savingsRate >= 20 ? 'border-emerald-100 dark:border-emerald-900/20' : 'border-amber-100 dark:border-amber-900/20',
      description: 'Total savings / monthly income'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div 
            key={index} 
            className={`p-5 rounded-xl border bg-white dark:bg-[#0c0c0f] border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {card.title}
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
                  {card.value}
                </h3>
              </div>
              <div className={`p-2.5 rounded-lg ${card.bgColor} ${card.color} border ${card.borderColor}`}>
                <IconComponent className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2.5">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
