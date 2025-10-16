import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Trophy, Target, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-family.jpg";
import bibleIcon from "@/assets/bible-icon.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 text-center lg:text-left">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                ✨ Leitura Bíblica Gamificada
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Jornada Bíblica em Família
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0">
                Leia a Bíblia completa em 1 ano com sua família através de um sistema gamificado, 
                divertido e teologicamente fiel. Ganhe XP, conquiste níveis e cresça espiritualmente juntos!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link to="/dashboard">
                  <Button variant="hero" size="xl">
                    Começar Jornada
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" size="xl" className="bg-transparent border-white/50 text-white hover:bg-white/20">
                    Como Funciona
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img 
                src={heroImage} 
                alt="Família lendo a Bíblia juntos" 
                className="rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Recursos Incríveis</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tudo que você precisa para tornar a leitura bíblica uma experiência memorável para toda a família.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-8 shadow-card hover:shadow-elevated transition-smooth border">
            <div className="w-14 h-14 bg-gradient-faith rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Plano de Leitura</h3>
            <p className="text-muted-foreground">
              365 dias de leitura estruturada com devocionais diários, reflexões e versículos para memorização.
            </p>
          </Card>

          <Card className="p-8 shadow-card hover:shadow-elevated transition-smooth border">
            <div className="w-14 h-14 bg-gradient-growth rounded-xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Perfis Familiares</h3>
            <p className="text-muted-foreground">
              Crie perfis para cada membro da família com conteúdo adaptado para crianças, jovens e adultos.
            </p>
          </Card>

          <Card className="p-8 shadow-card hover:shadow-elevated transition-smooth border">
            <div className="w-14 h-14 bg-gradient-glory rounded-xl flex items-center justify-center mb-4">
              <Trophy className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Gamificação</h3>
            <p className="text-muted-foreground">
              Sistema de XP, níveis e recompensas (loots) que tornam a leitura divertida e motivadora.
            </p>
          </Card>

          <Card className="p-8 shadow-card hover:shadow-elevated transition-smooth border">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Quizzes Diários</h3>
            <p className="text-muted-foreground">
              Perguntas sobre a leitura do dia para testar conhecimento e ganhar XP extra.
            </p>
          </Card>

          <Card className="p-8 shadow-card hover:shadow-elevated transition-smooth border">
            <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Progresso Visual</h3>
            <p className="text-muted-foreground">
              Acompanhe seu progresso com barras animadas, checkboxes e estatísticas detalhadas.
            </p>
          </Card>

          <Card className="p-8 shadow-card hover:shadow-elevated transition-smooth border">
            <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Múltiplas Versões</h3>
            <p className="text-muted-foreground">
              Escolha entre ACF, NVI, NTLH e BKJ para sua leitura e compare versões facilmente.
            </p>
          </Card>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Sistema de Níveis</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Evolua espiritualmente através dos níveis de conhecimento bíblico.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { level: "Nível 0", name: "Iniciante", desc: "Começando a jornada espiritual" },
              { level: "Níveis 1-10", name: "Aprendiz da Palavra", desc: "Aprendendo os fundamentos da Palavra" },
              { level: "Níveis 11-30", name: "Discípulo Fiel", desc: "Desenvolvendo constância e disciplina" },
              { level: "Níveis 31-60", name: "Servo Experiente", desc: "Conhecimento profundo das Escrituras" },
              { level: "Níveis 61-90", name: "Mestre da Escritura", desc: "Capaz de ensinar e discipular" },
              { level: "Níveis 91-100", name: "Doutor da Fé", desc: "Domínio completo da Palavra de Deus" },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 shadow-card hover:shadow-elevated transition-smooth">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-primary">{idx}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-muted-foreground">{item.level}</span>
                      <span className="text-xl font-bold">{item.name}</span>
                    </div>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-hero text-white shadow-elevated text-center">
            <img src={bibleIcon} alt="Bíblia" className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Junte-se a milhares de famílias que estão crescendo espiritualmente através da leitura bíblica gamificada.
            </p>
            <Link to="/dashboard">
              <Button variant="hero" size="xl">
                Iniciar Agora - É Gratuito
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-lg">
            "A tua palavra é lâmpada para os meus pés e luz para o meu caminho." - Salmos 119:105
          </p>
          <p className="mt-4 text-sm">© 2025 Jornada Bíblica em Família. Feito com ❤️ para a glória de Deus.</p>
          <p className="mt-2 text-xs">® Todos os direitos reservados à Erielton de Paula Melo.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;