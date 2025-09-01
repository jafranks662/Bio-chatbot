import React, { useState } from 'react';
import { IconBook, IconHelpCircle, IconSend, IconSettings, IconChevronDown, IconSparkles } from '@tabler/icons-react';
import { standards } from '@/lib/standards';

export default function PolishedBioChatbot() {
  const [mode, setMode] = useState<'study' | 'quiz'>('study');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [message, setMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const topics = [
    'Cell Biology',
    'Genetics',
    'Evolution',
    'Ecology',
    'Human Anatomy',
    'Molecular Biology',
    'Biochemistry',
    'Photosynthesis',
  ];

  const quickActionCodes = ['1C1', '3C2', '2.2', '4.5'];

  const handleModeSwitch = (newMode: 'study' | 'quiz') => {
    setMode(newMode);
  };

  const handleSendMessage = (text?: string) => {
    const content = text ?? message;
    if (content.trim()) {
      // Handle message sending
      setMessage('');
    }
  };

  const getStandardLabel = (code: string) => {
    for (const options of Object.values(standards)) {
      const match = options.find((opt) => opt.code === code);
      if (match) return match.label;
    }
    return '';
  };

  const handleQuickAction = (code: string) => {
    const label = getStandardLabel(code) || code;
    handleSendMessage(`Explain ${label} (${code})`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-cyan-900 to-emerald-950 flex flex-col">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <IconBook className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Bio Assistant</h1>
              <p className="text-sm text-gray-400">AI-Powered Biology Learning</p>
            </div>
          </div>
          <IconSettings className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Mode Selection */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleModeSwitch('study')}
              className={`relative p-6 rounded-xl transition-all duration-300 ${
                mode === 'study'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-2 border-cyan-400/50'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <IconBook className={`w-8 h-8 ${mode === 'study' ? 'text-cyan-400' : 'text-gray-400'}`} />
                <h3 className="text-lg font-semibold text-white">Study Mode</h3>
              </div>
              <p className="text-gray-300 text-sm text-left">
                Interactive learning with detailed explanations and examples
              </p>
              {mode === 'study' && (
                <div className="absolute -top-2 -right-2">
                  <IconSparkles className="w-6 h-6 text-cyan-400" />
                </div>
              )}
            </button>

            <button
              onClick={() => handleModeSwitch('quiz')}
              className={`relative p-6 rounded-xl transition-all duration-300 ${
                mode === 'quiz'
                  ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20 border-2 border-green-400/50'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <IconHelpCircle className={`w-8 h-8 ${mode === 'quiz' ? 'text-green-400' : 'text-gray-400'}`} />
                <h3 className="text-lg font-semibold text-white">Quiz Mode</h3>
              </div>
              <p className="text-gray-300 text-sm text-left">
                Test your knowledge with interactive questions and feedback
              </p>
              {mode === 'quiz' && (
                <div className="absolute -top-2 -right-2">
                  <IconSparkles className="w-6 h-6 text-green-400" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Select Topic</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-left text-white hover:bg-white/15 transition-colors flex items-center justify-between"
            >
              <span className={selectedTopic ? 'text-white' : 'text-gray-400'}>
                {selectedTopic || 'Choose a biology topic...'}
              </span>
              <IconChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-slate-800/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl z-10">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 pb-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 h-full flex flex-col">
          {/* Chat Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconBook className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ready to learn biology!
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {mode === 'study'
                  ? "Ask me anything about biology and I'll provide detailed explanations with examples."
                  : "I'll quiz you on biology topics to test and improve your knowledge."}
              </p>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-white/10 p-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={
                    mode === 'study'
                      ? 'Ask me about biology concepts...'
                      : 'Type "start quiz" to begin...'
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all"
                />
              </div>
              <button
                onClick={() => handleSendMessage()}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 disabled:cursor-not-allowed"
              >
                <IconSend className="w-5 h-5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>

            {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-4">
                {quickActionCodes.map((code) => (
                  <button
                    key={code}
                    onClick={() => handleQuickAction(code)}
                    className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-colors"
                  >
                    {getStandardLabel(code) || code}
                  </button>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

