import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Target, Brain, Zap, Globe, ArrowUpRight, ArrowDownRight, Calendar, Clock, DollarSign, Percent, BarChart3, PieChart, Settings, Bell, Search, Filter, Download, Share2, Star, AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp, Play, Pause, RefreshCw, Eye, EyeOff } from 'lucide-react';

// Sophisticated color palette for professional look
const colors = {
  primary: '#8ab4f8',        // Chrome blue
  secondary: '#5f6368',      // Chrome secondary gray
  accent: '#4285f4',         // Google blue
  success: '#34a853',        // Google green
  warning: '#fbbc04',        // Google yellow
  danger: '#ea4335',         // Google red
  dark: '#202124',           // Chrome dark background
  darker: '#17191c',         // Chrome darker background
  light: '#f8f9fa',          // Chrome light text
  gray: '#9aa0a6',           // Chrome medium gray
  text: '#e8eaed',           // Chrome primary text
  textSecondary: '#9aa0a6',  // Chrome secondary text
  surface: '#303134',        // Chrome surface
  border: '#5f6368',         // Chrome border
  gradient: {
    primary: 'from-gray-900 via-gray-800 to-gray-900',
    success: 'from-green-600 to-green-700',
    warning: 'from-yellow-600 to-yellow-700',
    danger: 'from-red-600 to-red-700'
  }
};

// Mock data generators for realistic stock behavior
const generateHistoricalData = (symbol, days = 90) => {
  const data = [];
  let price = Math.random() * 200 + 50;
  const volatility = Math.random() * 0.05 + 0.02;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.5) * price * volatility;
    price = Math.max(price + change, 1);
    
    const volume = Math.floor(Math.random() * 10000000 + 1000000);
    const high = price * (1 + Math.random() * 0.03);
    const low = price * (1 - Math.random() * 0.03);
    
    data.push({
      date: date.toISOString().split('T')[0],
      timestamp: date.getTime(),
      open: +(price * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +price.toFixed(2),
      volume,
      sma20: +(price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
      sma50: +(price * (1 + (Math.random() - 0.5) * 0.03)).toFixed(2),
      rsi: Math.random() * 100,
      macd: (Math.random() - 0.5) * 5
    });
  }
  return data;
};

// Advanced prediction algorithms simulation
const generatePredictions = (historicalData, symbol) => {
  const lastPrice = historicalData[historicalData.length - 1].close;
  const predictions = [];
  
  const models = [
    { name: 'LSTM Neural Network', weight: 0.35, accuracy: 0.78 },
    { name: 'Random Forest', weight: 0.25, accuracy: 0.72 },
    { name: 'Technical Analysis', weight: 0.20, accuracy: 0.68 },
    { name: 'Sentiment Analysis', weight: 0.20, accuracy: 0.65 }
  ];
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    let price = lastPrice;
    models.forEach(model => {
      const prediction = lastPrice * (1 + (Math.random() - 0.5) * 0.1 * Math.sqrt(i));
      price += (prediction - lastPrice) * model.weight;
    });
    
    const confidence = Math.max(0.3, 0.9 - (i * 0.02));
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      price: +price.toFixed(2),
      confidence: +confidence.toFixed(2),
      upper: +(price * (1 + confidence * 0.1)).toFixed(2),
      lower: +(price * (1 - confidence * 0.1)).toFixed(2)
    });
  }
  
  return { predictions, models, consensus: predictions[6]?.price };
};

// Market sentiment indicators
const generateMarketSentiment = () => ({
  overall: Math.random() > 0.5 ? 'bullish' : 'bearish',
  fear_greed: Math.floor(Math.random() * 100),
  vix: +(Math.random() * 40 + 10).toFixed(2),
  news_sentiment: Math.random(),
  social_sentiment: Math.random(),
  institutional_flow: (Math.random() - 0.5) * 1000000000
});

// Technical indicators calculator
const calculateTechnicalIndicators = (data) => {
  const latest = data[data.length - 1];
  const prev = data[data.length - 2];
  
  return {
    rsi: {
      value: latest.rsi,
      signal: latest.rsi > 70 ? 'overbought' : latest.rsi < 30 ? 'oversold' : 'neutral'
    },
    macd: {
      value: latest.macd,
      signal: latest.macd > 0 ? 'bullish' : 'bearish'
    },
    sma: {
      sma20: latest.sma20,
      sma50: latest.sma50,
      signal: latest.sma20 > latest.sma50 ? 'bullish' : 'bearish'
    },
    volume: {
      current: latest.volume,
      average: data.slice(-20).reduce((sum, d) => sum + d.volume, 0) / 20,
      signal: latest.volume > data.slice(-20).reduce((sum, d) => sum + d.volume, 0) / 20 ? 'high' : 'low'
    }
  };
};

// Risk assessment
const calculateRiskMetrics = (data, predictions) => {
  const returns = data.slice(1).map((d, i) => (d.close - data[i].close) / data[i].close);
  const volatility = Math.sqrt(returns.reduce((sum, r) => sum + r * r, 0) / returns.length) * Math.sqrt(252);
  
  const predictedReturn = (predictions.consensus - data[data.length - 1].close) / data[data.length - 1].close;
  const sharpeRatio = predictedReturn / volatility;
  
  return {
    volatility: +(volatility * 100).toFixed(2),
    sharpeRatio: +sharpeRatio.toFixed(2),
    maxDrawdown: +(Math.random() * 20 + 5).toFixed(2),
    beta: +(Math.random() * 2 + 0.5).toFixed(2),
    valueAtRisk: +(data[data.length - 1].close * volatility * 1.65).toFixed(2)
  };
};

const StockPredictor = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [historicalData, setHistoricalData] = useState([]);
  const [predictions, setPredictions] = useState({ predictions: [], models: [], consensus: 0 });
  const [sentiment, setSentiment] = useState({});
  const [technicals, setTechnicals] = useState({});
  const [riskMetrics, setRiskMetrics] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('1D');
  const [showPredictions, setShowPredictions] = useState(true);
  const [watchlist, setWatchlist] = useState(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN']);
  const [alerts, setAlerts] = useState([]);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology' },
    { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'E-commerce' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Semiconductors' },
    { symbol: 'META', name: 'Meta Platforms', sector: 'Social Media' },
    { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment' }
  ];

  // Data fetching simulation
  const fetchStockData = async (symbol) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const historical = generateHistoricalData(symbol);
    const predictionData = generatePredictions(historical, symbol);
    const sentimentData = generateMarketSentiment();
    const technicalData = calculateTechnicalIndicators(historical);
    const riskData = calculateRiskMetrics(historical, predictionData);
    
    setHistoricalData(historical);
    setPredictions(predictionData);
    setSentiment(sentimentData);
    setTechnicals(technicalData);
    setRiskMetrics(riskData);
    setLoading(false);
  };

  useEffect(() => {
    fetchStockData(selectedStock);
  }, [selectedStock]);

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (isAutoRefresh) {
      interval = setInterval(() => {
        fetchStockData(selectedStock);
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [isAutoRefresh, selectedStock]);

  const currentStock = stocks.find(s => s.symbol === selectedStock);
  const currentPrice = historicalData[historicalData.length - 1]?.close || 0;
  const previousPrice = historicalData[historicalData.length - 2]?.close || 0;
  const priceChange = currentPrice - previousPrice;
  const percentChange = (priceChange / previousPrice) * 100;

  const formatCurrency = (value) => `$${value?.toFixed(2) || '0.00'}`;
  const formatPercent = (value) => `${value?.toFixed(2) || '0.00'}%`;

  const GlassCard = ({ children, className = "", ...props }) => (
    <div className={`backdrop-blur-lg bg-black/10 border border-black/20 rounded-2xl shadow-xl ${className}`} {...props}>
      {children}
    </div>
  );

  const MetricCard = ({ title, value, change, icon: Icon, trend }) => (
    <GlassCard className="p-6 hover:bg-black/15 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${trend === 'up' ? 'bg-green-500/20 text-green-400' : trend === 'down' ? 'bg-red-500/20 text-red-400' : 'bg-blue-400/20 text-blue-400'}`}>
            <Icon size={20} />
          </div>
          <span className="text-white/70 font-medium">{title}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change && (
          <span className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {Math.abs(change).toFixed(2)}%
          </span>
        )}
      </div>
    </GlassCard>
  );

  const PredictionChart = () => {
    const combinedData = [
      ...historicalData.map(d => ({ ...d, type: 'historical' })),
      ...predictions.predictions.map(p => ({ ...p, close: p.price, type: 'prediction' }))
    ];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={combinedData}>
          <defs>
            <linearGradient id="historicalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.accent} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors.accent} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.5)"
            fontSize={12}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            fontSize={12}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: '1px solid rgba(255,255,255,0.2)', 
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }}
            labelStyle={{ color: 'black' }}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke={colors.primary}
            fill="url(#historicalGradient)"
            strokeWidth={2}
            dot={false}
          />
          {showPredictions && (
            <>
              <Area
                type="monotone"
                dataKey="upper"
                stroke="transparent"
                fill="rgba(6, 182, 212, 0.1)"
                strokeWidth={0}
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="transparent"
                fill="rgba(6, 182, 212, 0.1)"
                strokeWidth={0}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke={colors.accent}
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const SentimentGauge = ({ value, label, color }) => {
    const angle = (value / 100) * 180 - 90;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-12 mb-2">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path
              d="M 10 40 A 30 30 0 0 1 90 40"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              fill="none"
            />
            <path
              d="M 10 40 A 30 30 0 0 1 90 40"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${value * 1.26} 126`}
              strokeLinecap="round"
            />
            <line
              x1="50"
              y1="40"
              x2={50 + 25 * Math.cos(angle * Math.PI / 180)}
              y2={40 + 25 * Math.sin(angle * Math.PI / 180)}
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-black">{value}%</div>
          <div className="text-sm text-black/70">{label}</div>
        </div>
      </div>
    );
  };

  const ModelCard = ({ model, index }) => (
    <div className="flex items-center justify-between p-4 bg-black/5 rounded-lg border border-black/10">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
          index === 0 ? 'from-blue-400 to-blue-600' :
          index === 1 ? 'from-green-400 to-green-600' :
          index === 2 ? 'from-yellow-400 to-yellow-600' :
          'from-black-400 to-black-600'
        }`} />
        <span className="text-black font-medium">{model.name}</span>
      </div>
      <div className="text-right">
        <div className="text-black font-semibold">{formatPercent(model.accuracy * 100)}</div>
        <div className="text-black/60 text-sm">Weight: {formatPercent(model.weight * 100)}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-black/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
          </div>
          <div className="text-black text-xl font-semibold">Analyzing Market Data</div>
          <div className="text-black/60 mt-2">Processing {selectedStock} predictions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-black/10 backdrop-blur-lg bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="text-indigo-400" size={32} />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-black to-blue-200 bg-clip-text text-transparent">
                  PredictIt
                </h1>
              </div>
              <div className="hidden md:flex items-center space-x-2 bg-black/5 rounded-lg px-3 py-1">
                <Globe size={16} className="text-green-400" />
                <span className="text-green-400 text-sm font-medium">Live Market Data</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  isAutoRefresh ? 'bg-green-500/20 text-green-400' : 'bg-black/5 text-black/70'
                }`}
              >
                {isAutoRefresh ? <Pause size={16} /> : <Play size={16} />}
                <span className="hidden sm:inline">Auto-refresh</span>
              </button>
              
              <button
                onClick={() => fetchStockData(selectedStock)}
                className="flex items-center space-x-2 px-3 py-2 bg-black/5 hover:bg-black/10 rounded-lg transition-all text-black/70 hover:text-black"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <button className="p-2 bg-black/5 hover:bg-black/10 rounded-lg transition-all text-black/70 hover:text-black">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stock Selection & Overview */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="lg:w-1/3">
            <GlassCard className="p-6">
              <div className="mb-4">
                <label className="block text-white/70 text-sm font-medium mb-2">Search Stocks</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by symbol or name..."
                    className="w-full pl-10 pr-4 py-3 bg-black/5 border border-black/20 rounded-lg text-black placeholder-black/40 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {stocks
                  .filter(stock => 
                    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(0, 6)
                  .map(stock => (
                    <button
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock.symbol)}
                      className={`w-full p-3 rounded-lg transition-all text-left ${
                        selectedStock === stock.symbol 
                          ? 'bg-indigo-500/20 border-indigo-400/50 border' 
                          : 'bg-black/5 hover:bg-black/10 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-black">{stock.symbol}</div>
                          <div className="text-sm text-black/60">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-black font-medium">{formatCurrency(currentPrice)}</div>
                          <div className={`text-sm ${percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {percentChange >= 0 ? '+' : ''}{formatPercent(percentChange)}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                }
              </div>
            </GlassCard>
          </div>

          <div className="lg:w-2/3">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-2">
                    {currentStock?.symbol} - {currentStock?.name}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-black">{formatCurrency(currentPrice)}</span>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                      percentChange >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {percentChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span className="font-semibold">
                        {percentChange >= 0 ? '+' : ''}{formatCurrency(priceChange)} ({formatPercent(percentChange)})
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-black/70 text-sm mb-1">7-Day Prediction</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {formatCurrency(predictions.consensus)}
                  </div>
                  <div className="text-black/60 text-sm">
                    {formatPercent(((predictions.consensus - currentPrice) / currentPrice) * 100)} expected
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-black/5 rounded-lg">
                  <div className="text-black/60 text-sm">Market Cap</div>
                  <div className="text-black font-semibold">$2.8T</div>
                </div>
                <div className="text-center p-3 bg-black/5 rounded-lg">
                  <div className="text-black/60 text-sm">Volume</div>
                  <div className="text-black font-semibold">{(historicalData[historicalData.length - 1]?.volume / 1000000).toFixed(1)}M</div>
                </div>
                <div className="text-center p-3 bg-black/5 rounded-lg">
                  <div className="text-black/60 text-sm">P/E Ratio</div>
                  <div className="text-black font-semibold">28.5</div>
                </div>
                <div className="text-center p-3 bg-black/5 rounded-lg">
                  <div className="text-black/60 text-sm">Sector</div>
                  <div className="text-black font-semibold">{currentStock?.sector}</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-black/5 rounded-lg p-1 text-black">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'predictions', label: 'AI Predictions', icon: Brain },
              { id: 'technical', label: 'Technical Analysis', icon: Activity },
              { id: 'risk', label: 'Risk Analysis', icon: AlertTriangle },
              { id: 'sentiment', label: 'Market Sentiment', icon: Target }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-400 text-black shadow-lg' 
                    : 'text-black/70 hover:text-black hover:bg-grey/10'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Chart */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Price Chart & Predictions</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowPredictions(!showPredictions)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all ${
                      showPredictions ? 'bg-cyan-500/20 text-cyan-400' : 'bg-black/5 text-black/60'
                    }`}
                  >
                    {showPredictions ? <Eye size={16} /> : <EyeOff size={16} />}
                    <span>Predictions</span>
                  </button>
                  <div className="flex space-x-1 bg-black/5 rounded-lg p-1">
                    {['1D', '1W', '1M', '3M', '1Y'].map(tf => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          timeframe === tf ? 'bg-black/20 text-black' : 'text-black/60 hover:text-black'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <PredictionChart />
            </GlassCard>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Current Price"
                value={formatCurrency(currentPrice)}
                change={percentChange}
                icon={DollarSign}
                trend={percentChange >= 0 ? 'up' : 'down'}
              />
              <MetricCard
                title="7-Day Target"
                value={formatCurrency(predictions.consensus)}
                change={((predictions.consensus - currentPrice) / currentPrice) * 100}
                icon={Target}
                trend={predictions.consensus > currentPrice ? 'up' : 'down'}
              />
              <MetricCard
                title="Volatility"
                value={formatPercent(riskMetrics.volatility)}
                icon={Activity}
                trend="neutral"
              />
              <MetricCard
                title="Volume"
                value={`${(historicalData[historicalData.length - 1]?.volume / 1000000).toFixed(1)}M`}
                icon={BarChart3}
                trend={technicals.volume?.signal === 'high' ? 'up' : 'down'}
              />
            </div>

            {/* Recent Activity */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-black mb-4">Recent Market Activity</h3>
              <div className="space-y-3">
                {[
                  { time: '2 minutes ago', event: 'Large volume spike detected', type: 'info' },
                  { time: '15 minutes ago', event: 'RSI entered oversold territory', type: 'warning' },
                  { time: '1 hour ago', event: 'Positive earnings sentiment', type: 'success' },
                  { time: '3 hours ago', event: 'Institutional buying activity', type: 'info' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-black/5 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-400' :
                      activity.type === 'warning' ? 'bg-yellow-400' :
                      'bg-blue-400'
                    }`} />
                    <div className="flex-1">
                      <div className="text-black font-medium">{activity.event}</div>
                      <div className="text-black/60 text-sm">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6">
            {/* AI Models Performance */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-black mb-6">AI Prediction Models</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {predictions.models.map((model, index) => (
                  <ModelCard key={model.name} model={model} index={index} />
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-lg p-6 border border-indigo-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Brain className="text-indigo-400" size={24} />
                    <div>
                      <h4 className="text-lg font-semibold text-black">Consensus Prediction</h4>
                      <p className="text-black/60 text-sm">7-day price target</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-400">{formatCurrency(predictions.consensus)}</div>
                    <div className="text-black/60 text-sm">
                      {formatPercent(((predictions.consensus - currentPrice) / currentPrice) * 100)} change
                    </div>
                  </div>
                </div>
                <div className="w-full bg-black/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((predictions.models.reduce((sum, m) => sum + m.accuracy, 0) / predictions.models.length) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-black/60 text-sm mt-2">
                  Average Model Accuracy: {formatPercent((predictions.models.reduce((sum, m) => sum + m.accuracy, 0) / predictions.models.length) * 100)}
                </div>
              </div>
            </GlassCard>

            {/* Prediction Timeline */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-black mb-6">30-Day Prediction Timeline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={predictions.predictions}>
                  <defs>
                    <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.accent} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={colors.accent} stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.5)"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      borderRadius: '8px' 
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stackId="1"
                    stroke="transparent"
                    fill="rgba(6, 182, 212, 0.2)"
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stackId="1"
                    stroke="transparent"
                    fill="rgba(6, 182, 212, 0.2)"
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={colors.accent}
                    strokeWidth={3}
                    dot={{ fill: colors.accent, strokeWidth: 2, r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-6">
            {/* Technical Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <GlassCard className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-black/70 font-medium">RSI (14)</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    technicals.rsi?.signal === 'overbought' ? 'bg-red-500/20 text-red-400' :
                    technicals.rsi?.signal === 'oversold' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {technicals.rsi?.signal}
                  </div>
                </div>
                <div className="text-2xl font-bold text-black mb-2">{technicals.rsi?.value?.toFixed(1)}</div>
                <div className="w-full bg-black/10 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      technicals.rsi?.signal === 'overbought' ? 'bg-red-500' :
                      technicals.rsi?.signal === 'oversold' ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${technicals.rsi?.value || 0}%` }}
                  />
                </div>
              </GlassCard>

              <GlassCard className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-black/70 font-medium">MACD</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    technicals.macd?.signal === 'bullish' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {technicals.macd?.signal}
                  </div>
                </div>
                <div className="text-2xl font-bold text-black mb-2">{technicals.macd?.value?.toFixed(2)}</div>
                <div className="text-black/60 text-sm">Signal line convergence</div>
              </GlassCard>

              <GlassCard className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-black/70 font-medium">Moving Avg</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    technicals.sma?.signal === 'bullish' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {technicals.sma?.signal}
                  </div>
                </div>
                <div className="text-sm text-black/70 mb-1">SMA 20: {formatCurrency(technicals.sma?.sma20)}</div>
                <div className="text-sm text-black/70">SMA 50: {formatCurrency(technicals.sma?.sma50)}</div>
              </GlassCard>

              <GlassCard className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-black/70 font-medium">Volume</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    technicals.volume?.signal === 'high' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {technicals.volume?.signal}
                  </div>
                </div>
                <div className="text-2xl font-bold text-black mb-2">
                  {(technicals.volume?.current / 1000000).toFixed(1)}M
                </div>
                <div className="text-black/60 text-sm">
                  Avg: {(technicals.volume?.average / 1000000).toFixed(1)}M
                </div>
              </GlassCard>
            </div>

            {/* Technical Chart */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-black mb-6">Technical Analysis Chart</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.5)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      borderRadius: '8px' 
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke={colors.primary}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="sma20"
                    stroke={colors.success}
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="sma50"
                    stroke={colors.warning}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                  />
                  <Bar
                    dataKey="volume"
                    fill={colors.accent}
                    opacity={0.3}
                    yAxisId="volume"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-6">
            {/* Risk Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                title="Volatility"
                value={formatPercent(riskMetrics.volatility)}
                icon={Activity}
                trend="neutral"
              />
              <MetricCard
                title="Sharpe Ratio"
                value={riskMetrics.sharpeRatio?.toFixed(2)}
                icon={Target}
                trend={riskMetrics.sharpeRatio > 1 ? 'up' : 'down'}
              />
              <MetricCard
                title="Beta"
                value={riskMetrics.beta?.toFixed(2)}
                icon={TrendingUp}
                trend="neutral"
              />
              <MetricCard
                title="Max Drawdown"
                value={formatPercent(riskMetrics.maxDrawdown)}
                icon={TrendingDown}
                trend="down"
              />
              <MetricCard
                title="Value at Risk"
                value={formatCurrency(riskMetrics.valueAtRisk)}
                icon={AlertTriangle}
                trend="neutral"
              />
              <MetricCard
                title="Risk Score"
                value={`${Math.floor(Math.random() * 40 + 30)}/100`}
                icon={Zap}
                trend="neutral"
              />
            </div>

            {/* Risk Assessment */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-black mb-6">Risk Assessment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-black mb-4">Risk Factors</h4>
                  <div className="space-y-3">
                    {[
                      { factor: 'Market Volatility', level: 'Medium', color: 'yellow' },
                      { factor: 'Sector Risk', level: 'Low', color: 'green' },
                      { factor: 'Liquidity Risk', level: 'Low', color: 'green' },
                      { factor: 'Credit Risk', level: 'Very Low', color: 'green' }
                    ].map((risk, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-black/5 rounded-lg">
                        <span className="text-black font-medium">{risk.factor}</span>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          risk.color === 'green' ? 'bg-green-500/20 text-green-400' :
                          risk.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {risk.level}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-black mb-4">Portfolio Impact</h4>
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {Math.floor(Math.random() * 20 + 65)}%
                      </div>
                      <div className="text-black/70">Portfolio Correlation</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-black/70">Diversification Benefit</span>
                        <span className="text-green-400">High</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-black/70">Risk Contribution</span>
                        <span className="text-yellow-400">12.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === 'sentiment' && (
          <div className="space-y-6">
            {/* Sentiment Gauges */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-black mb-6">Market Sentiment Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <SentimentGauge 
                  value={sentiment.fear_greed} 
                  label="Fear & Greed" 
                  color={colors.primary}
                />
                <SentimentGauge 
                  value={Math.floor(sentiment.news_sentiment * 100)} 
                  label="News Sentiment" 
                  color={colors.success}
                />
                <SentimentGauge 
                  value={Math.floor(sentiment.social_sentiment * 100)} 
                  label="Social Media" 
                  color={colors.accent}
                />
                <SentimentGauge 
                  value={Math.floor(Math.random() * 100)} 
                  label="Analyst Rating" 
                  color={colors.warning}
                />
              </div>
            </GlassCard>

            {/* Sentiment Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h4 className="text-lg font-semibold text-black mb-4">Recent News Impact</h4>
                <div className="space-y-3">
                  {[
                    { title: 'Q4 Earnings Beat Expectations', impact: 'positive', time: '2h ago' },
                    { title: 'New Product Launch Announced', impact: 'positive', time: '1d ago' },
                    { title: 'Regulatory Concerns Raised', impact: 'negative', time: '2d ago' },
                    { title: 'Partnership Deal Signed', impact: 'positive', time: '3d ago' }
                  ].map((news, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-black/5 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        news.impact === 'positive' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <div className="flex-1">
                        <div className="text-black font-medium text-sm">{news.title}</div>
                        <div className="text-black/60 text-xs">{news.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="text-lg font-semibold text-black mb-4">Institutional Flow</h4>
                <div className="text-center mb-4">
                  <div className={`text-3xl font-bold mb-2 ${
                    sentiment.institutional_flow > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {sentiment.institutional_flow > 0 ? '+' : ''}${(sentiment.institutional_flow / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-black/70 text-sm">Net institutional flow (7d)</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-black/70">Buying Pressure</span>
                    <span className="text-green-400">Strong</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-black/70">Options Flow</span>
                    <span className="text-cyan-400">Bullish</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-black/70">Dark Pool Activity</span>
                    <span className="text-yellow-400">Elevated</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPredictor;