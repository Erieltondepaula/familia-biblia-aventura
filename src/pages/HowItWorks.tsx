import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Trophy, Users, Star, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  useEffect(() => {
    document.title = "Como Funciona - Jornada Bíblica";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              ← Voltar
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Como Funciona</h1>
          <p className="text-lg text-muted-foreground">
            Entenda como a Jornada Bíblica em Família funciona
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Book className="w-12 h-12 text-primary mb-2" />
              <CardTitle>Plano de Leitura Completo</CardTitle>
              <CardDescription>
                Leia a Bíblia inteira em 1 ano com sua família
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Um plano estruturado que guia você através dos 1.189 capítulos da Bíblia.
                Cada dia inclui capítulos específicos, devocional e reflexão prática.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="w-12 h-12 text-primary mb-2" />
              <CardTitle>Sistema de Experiência (XP)</CardTitle>
              <CardDescription>
                Ganhe XP e suba de nível conforme progride
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✨ <strong>84 XP</strong> por capítulo lido</li>
                <li>📖 <strong>100 XP</strong> por versículo memorizado</li>
                <li>📚 <strong>250 XP</strong> por livro completo</li>
                <li>🎓 <strong>500 XP</strong> por tema doutrinário</li>
                <li>⭐ <strong>1.000 XP</strong> por testamento completo</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-primary mb-2" />
              <CardTitle>100 Níveis Espirituais</CardTitle>
              <CardDescription>
                Progrida através de títulos espirituais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nível 1-10:</span>
                  <span className="font-semibold">Aprendiz da Palavra</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nível 11-30:</span>
                  <span className="font-semibold">Discípulo Fiel</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nível 31-60:</span>
                  <span className="font-semibold">Servo Experiente</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nível 61-90:</span>
                  <span className="font-semibold">Mestre da Escritura</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nível 91-100:</span>
                  <span className="font-semibold text-primary">Doutor da Fé</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-12 h-12 text-primary mb-2" />
              <CardTitle>Perfis Personalizados</CardTitle>
              <CardDescription>
                Crie perfis para cada membro da família
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cada pessoa tem seu próprio progresso, XP, nível e preferências.
                Escolha entre versões bíblicas (ACF, NVI, NAA) e níveis de dificuldade
                adequados para cada idade.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="w-12 h-12 text-primary mb-2" />
              <CardTitle>Conquistas e Desafios</CardTitle>
              <CardDescription>
                Desbloqueie conquistas especiais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ganhe medalhas por sequências de leitura, livros completos e marcos
                importantes na sua jornada. Compete com sua família de forma saudável!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Star className="w-12 h-12 text-primary mb-2" />
              <CardTitle>Quiz e Reflexões</CardTitle>
              <CardDescription>
                Teste seu conhecimento diariamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Responda quizzes baseados na leitura do dia e escreva reflexões pessoais.
                Memorize versículos-chave e ganhe XP extra!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How to Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Como Começar?</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <strong className="text-foreground">Crie seu perfil</strong>
                  <p className="text-sm">Defina seu nome, idade, versão bíblica preferida e nível de dificuldade</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <strong className="text-foreground">Acesse a leitura do dia</strong>
                  <p className="text-sm">Veja os capítulos programados para hoje e o devocional</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <strong className="text-foreground">Leia e marque como concluído</strong>
                  <p className="text-sm">Marque cada capítulo como lido e ganhe 84 XP por capítulo</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  4
                </span>
                <div>
                  <strong className="text-foreground">Faça o quiz e reflita</strong>
                  <p className="text-sm">Teste seu conhecimento e escreva suas reflexões pessoais</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  5
                </span>
                <div>
                  <strong className="text-foreground">Acompanhe seu progresso</strong>
                  <p className="text-sm">Veja seu XP, nível, conquistas e progresso na Bíblia</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8">
              Começar Jornada
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
