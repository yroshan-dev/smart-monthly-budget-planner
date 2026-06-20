import React from 'react';
import ReactECharts from 'echarts-for-react';
import { 
  Home, 
  Utensils, 
  Car, 
  Tv, 
  AlertTriangle, 
  PiggyBank, 
  HelpCircle,
  PieChart
} from 'lucide-react';

export default function BudgetCharts({ income, expenses, totalExpenses, isDark }) {
  const categories = [
    { key: 'rent', label: 'Rent / Housing', icon: Home, color: 'bg-indigo-500', textColor: 'text-indigo-500', hexColor: '#6366f1' },
    { key: 'food', label: 'Food & Groceries', icon: Utensils, color: 'bg-amber-500', textColor: 'text-amber-500', hexColor: '#f59e0b' },
    { key: 'transport', label: 'Transport / Fuel', icon: cat => Car, color: 'bg-sky-500', textColor: 'text-sky-500', hexColor: '#0ea5e9' },
    { key: 'subscriptions', label: 'Subscriptions', icon: Tv, color: 'bg-purple-500', textColor: 'text-purple-500', hexColor: '#a855f7' },
    { key: 'debt', label: 'Debt / EMI', icon: AlertTriangle, color: 'bg-rose-500', textColor: 'text-rose-500', hexColor: '#f43f5e' },
    { key: 'savings', label: 'Savings & Investments', icon: PiggyBank, color: 'bg-emerald-500', textColor: 'text-emerald-500', hexColor: '#10b981' },
    { key: 'miscellaneous', label: 'Miscellaneous', icon: HelpCircle, color: 'bg-zinc-500', textColor: 'text-zinc-500', hexColor: '#71717a' }
  ];

  // Helper to format currency in INR
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Compile data for ECharts
  const chartData = categories
    .map(cat => ({
      value: expenses[cat.key] || 0,
      name: cat.label,
      itemStyle: { color: cat.hexColor }
    }))
    .filter(item => item.value > 0);

  // ECharts Option
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const valueFormatted = formatINR(params.value);
        return `${params.marker} <b>${params.name}</b><br/>Amount: <b>${valueFormatted}</b> (${params.percent}%)`;
      },
      backgroundColor: isDark ? '#1f1f23' : '#ffffff',
      borderColor: isDark ? '#2d2d34' : '#e4e4e7',
      borderWidth: 1,
      textStyle: {
        color: isDark ? '#fafafa' : '#09090b',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 12
      },
      className: 'shadow-lg rounded-lg border'
    },
    legend: {
      show: false // We will render a custom, cleaner breakdown on the side
    },
    series: [
      {
        name: 'Expense Breakdown',
        type: 'pie',
        radius: ['55%', '80%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: isDark ? '#0c0c0f' : '#ffffff',
          borderWidth: 3
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: 'DM Sans, sans-serif',
            color: isDark ? '#fafafa' : '#09090b',
            formatter: (params) => {
              return `${params.name}\n${params.percent.toFixed(1)}%`;
            }
          }
        },
        labelLine: {
          show: false
        },
        data: chartData
      }
    ]
  };

  const hasData = chartData.length > 0;

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <PieChart className="h-5 w-5 text-indigo-500" />
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight text-sm">
          Expense Breakdown & Category Analysis
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Chart Column */}
        <div className="md:col-span-5 flex justify-center">
          {hasData ? (
            <div className="w-full max-w-[240px] h-[240px]">
              <ReactECharts 
                option={option} 
                style={{ height: '100%', width: '100%' }}
                settings={{ notMerge: true }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[240px] w-full border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10 p-4 text-center">
              <span className="text-3xl mb-2">📊</span>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">No Expenses Recorded</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 max-w-[180px] mt-1">
                Enter expense values in the form to populate the visualization.
              </p>
            </div>
          )}
        </div>

        {/* Breakdown Progress Bars Column */}
        <div className="md:col-span-7 space-y-3.5">
          <h4 className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
            Category Breakdown (% of Income)
          </h4>
          <div className="space-y-3">
            {categories.map((cat) => {
              const amount = expenses[cat.key] || 0;
              const pctOfIncome = income > 0 ? (amount / income) * 100 : 0;
              const pctOfExpenses = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
              const displayPct = income > 0 ? pctOfIncome : pctOfExpenses;

              return (
                <div key={cat.key} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                      {cat.label}
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-semibold font-mono">
                      {formatINR(amount)}{' '}
                      <span className="text-zinc-400 dark:text-zinc-500 text-[10px] font-normal">
                        ({displayPct.toFixed(1)}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-850 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cat.color} transition-all duration-500 ease-out rounded-full`}
                      style={{ width: `${Math.min(100, displayPct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
