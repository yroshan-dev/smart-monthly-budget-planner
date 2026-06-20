import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon, Activity } from 'lucide-react';

export default function HealthStatus({ income, totalExpenses, savingsRate, balance }) {
  // Determine health state
  let status = 'Good';
  let title = 'Financial Health: Good';
  let message = 'Outstanding job! You are saving 20% or more of your income, and your remaining balance is positive. You are on track to meet your long-term goals.';
  let colorClass = 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400';
  let progressColor = 'bg-emerald-500';
  let Icon = CheckCircle2;
  let score = 90; // financial health score representation out of 100

  if (income === 0) {
    status = 'Neutral';
    title = 'Configure Your Income';
    message = 'Please enter your monthly income and expenses to evaluate your financial health score.';
    colorClass = 'bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-900/20 dark:border-zinc-800/30 dark:text-zinc-400';
    progressColor = 'bg-zinc-400';
    Icon = Activity;
    score = 0;
  } else if (totalExpenses > income) {
    status = 'Risky';
    title = 'Financial Health: Risky';
    message = 'Critical Warning! Your expenses exceed your monthly income. You are drawing from savings or accumulating debt. Immediate action is recommended to trim your budget.';
    colorClass = 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-400';
    progressColor = 'bg-rose-500';
    Icon = AlertOctagon;
    score = Math.max(10, Math.round((income / totalExpenses) * 50));
  } else if (savingsRate < 20) {
    status = 'Warning';
    title = 'Financial Health: Warning';
    message = 'Your cash flow is positive, but your savings rate is below the recommended 20% benchmark. Look for minor cuts in subscriptions or miscellaneous spending to boost savings.';
    colorClass = 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/20 dark:border-amber-900/30 dark:text-amber-400';
    progressColor = 'bg-amber-500';
    Icon = AlertTriangle;
    score = Math.round(50 + (savingsRate / 20) * 30);
  }

  return (
    <div className={`border rounded-xl p-5 shadow-sm transition-all duration-300 ${colorClass}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold tracking-tight uppercase font-mono">
              {title}
            </h3>
            {income > 0 && (
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-white/50 dark:bg-zinc-900/40 border border-current">
                Score: {score}/100
              </span>
            )}
          </div>
          <p className="text-xs leading-relaxed opacity-90">
            {message}
          </p>

          {/* Health Gauge Bar */}
          {income > 0 && (
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-[10px] font-semibold opacity-70">
                <span>Critical (0-50)</span>
                <span>Warning (50-80)</span>
                <span>Healthy (80-100)</span>
              </div>
              <div className="w-full bg-zinc-200/50 dark:bg-zinc-800/50 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${progressColor} transition-all duration-500 ease-out rounded-full`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
