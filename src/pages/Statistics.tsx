import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { useProgress } from '@/contexts/ProgressContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { ArrowLeft, TrendingUp, BookOpen, Award, Flame } from 'lucide-react';
import { 
  calculateLevel, 
  xpForNextLevel, 
  getLevelName,
  calculateBibleProgress 
} from '@/lib/progressCalculations';

const Statistics = () => {
  const navigate = useNavigate();
  const { currentProfile } = useProfile();
  const { xp, completedReadings, currentStreak, totalChaptersRead } = useProgress();

  const level = calculateLevel(xp);
  const nextLevelXP = xpForNextLevel(xp);
  const currentLevelXP = level * 1000;
  const progressToNextLevel = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  const bibleProgress = calculateBibleProgress(totalChaptersRead());

  useEffect(() => {
    document.title = 'Estatísticas - Bíblia 365';
  }, []);

  // Data for last 7 days readings
  const last7Days = completedReadings.slice(-7).map((reading, index) => ({
    day: `Dia ${reading.day}`,
    chapters: reading.chapters.length,
  }));

  // Data for testament progress
  const testamentData = [
    { name: 'Antigo Testamento', value: 929, color: '#8b5cf6' },
    { name: 'Novo Testamento', value: 260, color: '#3b82f6' }
  ];

  // Monthly progress (last 6 months)
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - (5 - i));
    const monthName = monthAgo.toLocaleDateString('pt-BR', { month: 'short' });
    
    const readingsInMonth = completedReadings.filter(r => {
      const readingDate = new Date(r.completedAt);
      return readingDate.getMonth() === monthAgo.getMonth() && 
             readingDate.getFullYear() === monthAgo.getFullYear();
    });
    
    return {
      month: monthName,
      readings: readingsInMonth.length,
      chapters: readingsInMonth.reduce((sum, r) => sum + r.chapters.length, 0)
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar ao Dashboard
        </Button>
        <h1 className="text-4xl font-bold mt-4">Estatísticas Detalhadas</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe seu progresso e conquistas
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Nível Atual</p>
              <p className="text-3xl font-bold">{level}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {getLevelName(level)}
              </p>
            </div>
            <Award className="w-12 h-12 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sequência</p>
              <p className="text-3xl font-bold">{currentStreak}</p>
              <p className="text-xs text-muted-foreground mt-1">dias seguidos</p>
            </div>
            <Flame className="w-12 h-12 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Capítulos Lidos</p>
              <p className="text-3xl font-bold">{totalChaptersRead()}</p>
              <p className="text-xs text-muted-foreground mt-1">de 1.189</p>
            </div>
            <BookOpen className="w-12 h-12 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Experiência</p>
              <p className="text-3xl font-bold">{xp.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">XP total</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Progresso para Próximo Nível</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nível {level}</span>
              <span>Nível {level + 1}</span>
            </div>
            <Progress value={progressToNextLevel} className="h-3" />
            <p className="text-xs text-muted-foreground text-center">
              {xp - currentLevelXP} / {nextLevelXP - currentLevelXP} XP
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Progresso na Bíblia</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completo</span>
              <span>{bibleProgress}%</span>
            </div>
            <Progress value={bibleProgress} className="h-3" />
            <p className="text-xs text-muted-foreground text-center">
              {totalChaptersRead()} de 1.189 capítulos
            </p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Last 7 Days */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Últimos 7 Dias</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="chapters" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Progress */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Progresso Mensal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="readings" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Leituras"
              />
              <Line 
                type="monotone" 
                dataKey="chapters" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Capítulos"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Testament Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Distribuição dos Testamentos</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={testamentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {testamentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Total de 1.189 capítulos na Bíblia
        </p>
      </Card>
    </div>
  );
};

export default Statistics;