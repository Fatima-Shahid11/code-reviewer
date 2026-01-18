
export const formatCode = (text = "") => {
  return text.replace(/\\n/g, '\n').replace(/\\t/g, '  ');
};

export const getDisplayCode = (activeTab, result, code) => {
  return activeTab === 'renewed' && result?.renewedCode
    ? formatCode(result.renewedCode)
    : result?.originalCode || code;
};

export const getSeverityColor = (severity = "", darkMode = true) => {
  if (darkMode) {
    switch (severity) {
      case 'high':
        return 'bg-rose-950 text-rose-300 border-rose-800';
      case 'medium':
        return 'bg-stone-900 text-stone-300 border-stone-700';
      case 'low':
        return 'bg-[#2D1B1E] text-rose-200 border-rose-900/50';
      default:
        return 'bg-stone-900 text-stone-300 border-stone-800';
    }
  } else {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-900 border-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'low':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-stone-100 text-stone-900 border-stone-300';
    }
  }
};

export const getScoreColor = (score = 0, darkMode = true) => {
  if (darkMode) {
    if (score >= 8) return 'text-rose-400';
    if (score >= 5) return 'text-stone-400';
    return 'text-rose-700';
  } else {
    if (score >= 8) return 'text-amber-700';
    if (score >= 5) return 'text-orange-700';
    return 'text-red-700';
  }
};

export const getThemeClasses = (darkMode = true) => {
  return {
    bgClass: darkMode
      ? 'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-stone-950 via-black to-[#2D1B1E]'
      : 'bg-gradient-to-br from-orange-50 via-red-50 to-amber-100',
    cardBg: darkMode ? 'bg-[#1A1616]/90 border-rose-900/10 shadow-black/40' : 'bg-white/90 border-orange-200/50',
    textPrimary: darkMode ? 'text-rose-50' : 'text-stone-900',
    textSecondary: darkMode ? 'text-stone-400' : 'text-stone-600',
    inputBg: darkMode ? 'bg-black/60 border-stone-800' : 'bg-white border-orange-200',
    accentColor: darkMode ? 'text-rose-400' : 'text-red-700',
    borderColor: darkMode ? 'border-rose-900/20 bg-black/40' : 'border-orange-200 bg-white/60',
    darkModeButtonBg: darkMode ? 'bg-stone-900 hover:bg-stone-800 text-rose-400' : 'bg-orange-100 hover:bg-orange-200 text-red-700',
  };
};

export const getTabButtonClasses = (isActive, darkMode = true) => {
  if (isActive) {
    return darkMode
      ? 'bg-rose-900 text-rose-50 shadow-lg'
      : 'bg-red-600 text-white shadow-lg';
  }
  return darkMode
    ? 'bg-stone-900 text-stone-500 hover:bg-stone-800'
    : 'bg-orange-100 text-stone-600 hover:bg-orange-200';
};


