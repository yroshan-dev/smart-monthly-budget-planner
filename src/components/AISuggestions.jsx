import React from 'react';
import { Lightbulb, CheckCircle, Info, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AISuggestions({ income, expenses, totalExpenses, savingsRate, balance }) {
  // Helper to format currency in INR
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  if (income <= 0) {
    return (
      <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-zinc-500 dark:text-zinc-400">
          <Lightbulb className="h-5 w-5" />
          <h3 className="font-semibold text-sm">AI Insights</h3>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Awaiting budget data. Configure your income and expenses to receive personalized AI recommendations.
        </p>
      </div>
    );
  }

  const suggestions = [];

  // Calculate percentages
  const rentPct = (expenses.rent / income) * 100;
  const foodPct = (expenses.food / income) * 100;
  const transportPct = (expenses.transport / income) * 100;
  const subPct = (expenses.subscriptions / income) * 100;
  const debtPct = (expenses.debt / income) * 100;
  const directSavingsPct = (expenses.savings / income) * 100;
  const miscPct = (expenses.miscellaneous / income) * 100;

  // 1. Deficit Check
  if (totalExpenses > income) {
    suggestions.push({
      type: 'critical',
      tag: 'Budget Deficit',
      icon: AlertTriangle,
      message: `You are spending ${formatINR(totalExpenses - income)} more than your income. Immediately review your non-essential categories like 'Miscellaneous' (${formatINR(expenses.miscellaneous)}) or 'Subscriptions' (${formatINR(expenses.subscriptions)}) to bridge this gap.`
    });
  }

  // 2. Housing Rule (30% Rule)
  if (rentPct > 30) {
    suggestions.push({
      type: 'warning',
      tag: 'High Housing Cost',
      icon: AlertTriangle,
      message: `Your rent consumes ${rentPct.toFixed(1)}% of your income, exceeding the recommended 30% guideline. Consider sharing space, downsizing, or renegotiating to free up around ${formatINR(expenses.rent - (income * 0.3))}.`
    });
  } else if (rentPct > 0 && rentPct <= 30) {
    suggestions.push({
      type: 'success',
      tag: 'Optimal Rent',
      icon: CheckCircle,
      message: `Great job! Your rent accounts for ${rentPct.toFixed(1)}% of your income, which complies with the recommended 30% threshold.`
    });
  }

  // 3. Debt EMI Check (15% Guideline)
  if (debtPct > 15) {
    suggestions.push({
      type: 'warning',
      tag: 'Debt Exposure',
      icon: AlertTriangle,
      message: `Debt EMIs make up ${debtPct.toFixed(1)}% of your monthly cash flow. Consider using the Debt Avalanche method (focusing on high-interest debt first) or negotiating lower interest rates to reduce interest drag.`
    });
  }

  // 4. Savings Rate Check
  if (savingsRate >= 20) {
    suggestions.push({
      type: 'success',
      tag: 'Wealth Builder',
      icon: TrendingUp,
      message: `Your overall savings rate is ${savingsRate.toFixed(1)}%! Consider channeling a portion of this into systematic investment plans (SIPs), low-cost index funds, or equity-linked savings schemes (ELSS) to leverage compounding.`
    });
  } else {
    suggestions.push({
      type: 'info',
      tag: 'Savings Growth',
      icon: Info,
      message: `Your savings rate is ${savingsRate.toFixed(1)}%. Aim to reach the 20% mark. Try setting up an automated transfer of just 2-3% of your income directly to a separate savings account on payday.`
    });
  }

  // 5. Subscription Check (5% Rule)
  if (subPct > 5) {
    suggestions.push({
      type: 'warning',
      tag: 'Subscription Bleed',
      icon: AlertTriangle,
      message: `Subscriptions take up ${subPct.toFixed(1)}% of your income. Conduct an audit of your active services (e.g. OTT, music, memberships) and cancel at least one service you haven't used this month to save around ${formatINR(expenses.subscriptions * 0.2)}.`
    });
  }

  // 6. Idle Leftover Cash Check
  if (balance > (income * 0.1)) {
    suggestions.push({
      type: 'info',
      tag: 'Idle Cash Flow',
      icon: Info,
      message: `You have an unallocated surplus of ${formatINR(balance)} (leftover balance). Avoid leaving this cash idle in your main account where it might be spent on impulse; move it to emergency deposits or investments.`
    });
  }

  return (
    <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <Sparkles className="h-5 w-5 text-indigo-500" />
        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight text-sm">
          AI Budget Insights & Recommendations
        </h3>
      </div>
      <div className="space-y-3.5">
        {suggestions.map((s, index) => {
          const IconComponent = s.icon;
          let badgeColors = '';
          if (s.type === 'critical') badgeColors = 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/30';
          else if (s.type === 'warning') badgeColors = 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30';
          else if (s.type === 'success') badgeColors = 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30';
          else badgeColors = 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30';

          return (
            <div key={index} className="flex gap-3 items-start text-xs text-zinc-600 dark:text-zinc-300">
              <span className={`flex-shrink-0 flex items-center gap-1 font-mono font-bold px-2 py-0.5 rounded border text-[10px] uppercase ${badgeColors}`}>
                <IconComponent className="h-3 w-3" />
                {s.tag}
              </span>
              <p className="leading-relaxed mt-0.5">{s.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
