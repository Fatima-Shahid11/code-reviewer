'use client';
import { useState, useEffect } from 'react';
import { Moon, Sun, Code2, AlertTriangle, CheckCircle2, Lightbulb, Sparkles, Copy, Check } from 'lucide-react';
import { PLACEHOLDER_CODE } from '@/constants/placeholder';
import { TABS } from '@/constants/tabs';
import { getSeverityColor, getScoreColor, getThemeClasses, getTabButtonClasses, getDisplayCode } from '@/utils/utils';

export default function CodeReviewerPage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('renewed');
  const [copied, setCopied] = useState(false);
  const MAX_LINES = 300;
  const isOverLimit = code.split('\n').length > MAX_LINES;
  const isReviewDisabled = loading || !code.trim() || isOverLimit;
  const theme = getThemeClasses(darkMode);
  const displayCode = getDisplayCode(activeTab, result, code);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  const reviewCode = async (code) => {
    const res = await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (!res.ok || data.isValidCode === false) {
      throw new Error(data.error || data.errorMessage || 'Review failed');
    }

    return { ...data, originalCode: code };
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const handleReview = async () => {
    if (!code.trim()) return setError('Please paste some code first!');

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await reviewCode(code);
      setResult(data);
    } catch (err) {
      console.error('Review error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text = "") => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textPrimary} transition-all duration-500`}>
      {/* Header */}
      <header className={`border-b ${theme.borderColor} backdrop-blur-md sticky top-0 z-50`}>
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-rose-950/40 border border-rose-900/30' : 'bg-gradient-to-br from-red-100 to-orange-100'}`}>
                <Code2 className={theme.accentColor} size={32} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'bg-gradient-to-r from-rose-100 via-rose-400 to-stone-500 bg-clip-text text-transparent' : 'text-red-800'}`}>
                  Code Smarter with Comaa
                </h1>
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${theme.darkModeButtonBg}`}
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* How it works - Full Width */}
        <div className="mb-6">
          <h3 className={`font-bold mb-3 flex items-center gap-2 ${theme.accentColor} text-lg`}>
            <Lightbulb size={20} />
            How it works
          </h3>
          <div className="grid grid-rows-1 md:grid-rows-4 gap-4">
            <div className={`text-sm ${theme.textSecondary} flex items-start gap-2`}>
              <span className={theme.accentColor}>▸</span>
              <span>Paste code in ANY programming language</span>
            </div>
            <div className={`text-sm ${theme.textSecondary} flex items-start gap-2`}>
              <span className={theme.accentColor}>▸</span>
              <span>AI auto-detects language & analyzes instantly</span>
            </div>
            <div className={`text-sm ${theme.textSecondary} flex items-start gap-2`}>
              <span className={theme.accentColor}>▸</span>
              <span>Get security, performance & quality insights</span>
            </div>
            <div className={`text-sm ${theme.textSecondary} flex items-start gap-2`}>
              <span className={theme.accentColor}>▸</span>
              <span>Receive improved code with all fixes applied</span>
            </div>
          </div>
        </div>

        {/* Paste Your Code + Original/Renewed Code - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* LEFT: Code Input */}
          <div className={`${theme.cardBg} rounded-2xl p-6 border backdrop-blur-sm shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold flex items-center gap-2 ${theme.accentColor}`}>
                <Sparkles size={22} />
                Paste Your Code
              </h2>
              <button
                onClick={() => setCode('')}
                className={`text-sm cursor-pointer transition px-3 py-1 rounded-lg ${darkMode ? 'text-stone-400 hover:bg-rose-950/30 hover:text-rose-200' : 'text-stone-600 hover:bg-orange-100 hover:text-stone-900'}`}
              >
                Clear
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={PLACEHOLDER_CODE}
              className={`w-full h-[420px] p-4 ${theme.inputBg} rounded-xl font-mono text-sm border focus:border-rose-500/50 focus:outline-none transition-all resize-none shadow-inner`}
              spellCheck={false}
            />

            <div className="mt-4 flex items-center justify-between">
              <div className={`text-sm ${theme.textSecondary} flex items-center gap-3`}>
                <span>{code.length} chars</span>
                <span>•</span>
                <span>{code.split('\n').length} lines</span>
              </div>
              <button onClick={handleReview} disabled={isReviewDisabled} className={`px-6 py-3 rounded-xl font-bold transition-all ${isReviewDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} flex items-center gap-2 ${darkMode ? 'bg-gradient-to-r from-[#4A2C2C] to-[#63383D]' : 'bg-gradient-to-r from-red-600 to-orange-700 text-white'} disabled:opacity-30`}>
                {loading ? "Analyzing..." : isOverLimit ? "Limit Exceeded" : "Review Code"}
              </button>
            </div>
          </div>

          {/* RIGHT: Original/Renewed Code */}
          {result && result.isValidCode && result.renewedCode ? (
            <div className={`${theme.cardBg} rounded-2xl px-6 py-4 border backdrop-blur-sm shadow-xl`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-2 rounded-xl font-semibold transition text-sm cursor-pointer ${getTabButtonClasses(activeTab === tab.id, darkMode)}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copyToClipboard(displayCode)}
                  className={`p-2.5 rounded-lg transition-all cursor-pointer ${darkMode ? 'bg-stone-900 hover:bg-stone-800' : 'bg-orange-100 hover:bg-orange-200'}`}
                  title="Copy code"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className={theme.textSecondary} />}
                </button>
              </div>

              <div className={`${theme.inputBg} border rounded-xl overflow-auto h-[420px] ${darkMode ? 'border-stone-800' : 'border-orange-100'}`}>
                <pre className="p-4 text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
                  <code className={theme.textPrimary}>{displayCode}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className={`${theme.cardBg} rounded-2xl p-16 border border-dashed backdrop-blur-sm text-center shadow-xl flex items-center justify-center`}>
              <div>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${darkMode ? 'bg-rose-950/40 border border-rose-900/30' : 'bg-gradient-to-br from-red-100 to-orange-100'} flex items-center justify-center`}>
                  <Code2 className={theme.accentColor} size={48} strokeWidth={2} />
                </div>
                <h3 className={`text-2xl font-bold ${theme.textSecondary} mb-2`}>Ready to Analyze</h3>
                <p className={`${theme.textSecondary} text-sm`}>Results will appear here</p>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className={`${darkMode ? 'bg-rose-950/20 border-rose-800' : 'bg-red-50 border-red-300'} border rounded-2xl p-4 backdrop-blur-sm mb-6`}>
            <p className={`${darkMode ? 'text-rose-400' : 'text-red-800'} font-semibold flex items-center gap-2`}>
              <AlertTriangle size={20} />
              {error}
            </p>
          </div>
        )}

        {/* Review Complete - Full Width */}
        {result && result.isValidCode && (
          <div className={`${theme.cardBg} rounded-2xl p-6 border backdrop-blur-sm shadow-xl mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Review Complete</h2>
                <p className={`${theme.textSecondary} text-sm mt-1`}>
                  Language: <span className={`${theme.accentColor} font-bold`}>{result.detectedLanguage}</span>
                </p>
              </div>
              <div className="text-right">
                <div className={`text-xs ${theme.textSecondary} uppercase tracking-wide mb-1`}>Score</div>
                <div className={`text-5xl font-black ${getScoreColor(result.overallScore, darkMode)}`}>
                  {result.overallScore}
                  <span className="text-2xl">/10</span>
                </div>
              </div>
            </div>

            <p className={`${theme.textSecondary} leading-relaxed border-t ${darkMode ? 'border-rose-900/20' : 'border-orange-200'} pt-4`}>
              {result.summary}
            </p>
          </div>
        )}

        {/* Issues - Full Width Horizontal */}
        {result && result.isValidCode && result.issues && result.issues.length > 0 && (
          <div className={`${theme.cardBg} rounded-2xl p-6 border backdrop-blur-sm shadow-xl mb-6`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className={theme.accentColor} size={22} />
              Issues Found
              <span className={`ml-2 px-2.5 py-1 rounded-full text-sm ${darkMode ? 'bg-rose-950 text-rose-300' : 'bg-red-100 text-red-800'}`}>
                {result.issues.length}
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.issues.map((issue, i) => (
                <div key={i} className={`${theme.inputBg} border rounded-xl p-4`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getSeverityColor(issue.severity, darkMode)}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <h4 className="font-bold text-base mb-1">{issue.title}</h4>
                  <p className={`text-xs ${theme.textSecondary} mb-2 uppercase tracking-wide`}>{issue.type}</p>
                  <p className={`${theme.textSecondary} text-sm mb-3 leading-relaxed`}>{issue.description}</p>
                  {issue.suggestion && (
                    <div className={`${darkMode ? 'bg-gradient-to-r from-[#2D1B1E]/60 to-black/40 border-rose-900/30' : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300'} border rounded-lg p-3`}>
                      <p className={`text-xs ${darkMode ? 'text-rose-300' : 'text-amber-900'}`}>
                        <span className="font-bold">💡</span> {issue.suggestion}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strengths - Tips - Two Columns */}
        {result && result.isValidCode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            {result.strengths && result.strengths.length > 0 && (
              <div className={`${theme.cardBg} rounded-2xl p-6 border backdrop-blur-sm shadow-xl`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-rose-400' : 'text-amber-700'}`}>
                  <CheckCircle2 size={22} />
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((strength, i) => (
                    <li key={i} className={`${theme.textSecondary} text-sm flex items-start gap-2`}>
                      <span className={darkMode ? 'text-rose-500' : 'text-amber-600'}>✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className={`${theme.cardBg} rounded-2xl p-6 border backdrop-blur-sm shadow-xl`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${theme.accentColor}`}>
                  <Lightbulb size={22} />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className={`${theme.textSecondary} text-sm flex items-start gap-2`}>
                      <span className={theme.accentColor}>▸</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
             