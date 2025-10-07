import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProfile, RoleType, Difficulty, BibleVersion } from "@/contexts/ProfileContext";
import { useProgress } from "@/contexts/ProgressContext";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const Settings = () => {
  const { currentProfile, updateProfile } = useProfile();
  const { resetProgress } = useProgress();

  useEffect(() => {
    document.title = "Configurações | Jornada Bíblica";
  }, []);

  const handleReset = () => {
    resetProgress();
    toast.success("Plano reiniciado!", { description: "Seu XP e leituras foram zerados para este perfil." });
  };

  if (!currentProfile) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Configurações</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl grid lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Perfil</h2>
          <div>
            <Label>Nome</Label>
            <Input value={currentProfile.name} onChange={(e) => updateProfile(currentProfile.id, { name: e.target.value })} />
          </div>
          <div>
            <Label>Idade</Label>
            <Input type="number" value={currentProfile.age} onChange={(e) => updateProfile(currentProfile.id, { age: Number(e.target.value) })} />
          </div>
          <div>
            <Label>Função</Label>
            <RadioGroup value={currentProfile.role} onValueChange={(v) => updateProfile(currentProfile.id, { role: v as RoleType })} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pai" id="role-pai" />
                <Label htmlFor="role-pai">Pai</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mae" id="role-mae" />
                <Label htmlFor="role-mae">Mãe</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="filho" id="role-filho" />
                <Label htmlFor="role-filho">Filho(a)</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Dificuldade</Label>
            <RadioGroup value={currentProfile.difficulty} onValueChange={(v) => updateProfile(currentProfile.id, { difficulty: v as Difficulty })} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="crianca" id="dif-crianca" />
                <Label htmlFor="dif-crianca">Criança</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="adolescente" id="dif-adolescente" />
                <Label htmlFor="dif-adolescente">Adolescente</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="adulto" id="dif-adulto" />
                <Label htmlFor="dif-adulto">Adulto</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Versão da Bíblia</Label>
            <RadioGroup value={currentProfile.bibleVersion} onValueChange={(v) => updateProfile(currentProfile.id, { bibleVersion: v as BibleVersion })} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ACF" id="ver-acf" />
                <Label htmlFor="ver-acf">ACF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="NVI" id="ver-nvi" />
                <Label htmlFor="ver-nvi">NVI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="NTLH" id="ver-ntlh" />
                <Label htmlFor="ver-ntlh">NTLH</Label>
              </div>
            </RadioGroup>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Plano de Leitura</h2>
          <p className="text-sm text-muted-foreground">Recomece sua jornada do zero para este perfil.</p>
          <Button variant="destructive" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2"/>
            Reiniciar Plano do Zero
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
