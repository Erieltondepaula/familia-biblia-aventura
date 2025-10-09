import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProfile, RoleType, Difficulty, BibleVersion } from "@/contexts/ProfileContext";
import { useProgress } from "@/contexts/ProgressContext";
import { ArrowLeft, RotateCcw, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getPlanStartDate, setPlanStartDate, getCurrentDayNumber } from "@/lib/readingPlanData";
import { getLocalDateForInput, dateFromInputString } from "@/lib/dateUtils";
import { exportReadingPlanToPDF, exportReadingPlanToExcel } from "@/lib/exportService";

const Settings = () => {
  const { currentProfile, updateProfile } = useProfile();
  const { resetProgress } = useProgress();
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    document.title = "Configurações | Jornada Bíblica";
    const currentStartDate = getPlanStartDate();
    const year = currentStartDate.getFullYear();
    const month = String(currentStartDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentStartDate.getDate()).padStart(2, '0');
    setStartDate(`${year}-${month}-${day}`);
  }, []);

  const handleReset = () => {
    resetProgress();
    toast.success("Plano reiniciado!", { description: "Seu XP e leituras foram zerados para este perfil." });
  };

  const handleStartDateChange = (newDate: string) => {
    setStartDate(newDate);
    const date = dateFromInputString(newDate);
    setPlanStartDate(date);
    const currentDay = getCurrentDayNumber();
    toast.success(`Data de início atualizada!`, { 
      description: `Você está no dia ${currentDay} do plano.` 
    });
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
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Plano de Leitura
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Data de Início do Plano</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                O sistema calculará automaticamente o dia atual baseado nesta data
              </p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-semibold mb-2">Dia Atual do Plano:</p>
              <Badge variant="default" className="text-lg">
                Dia {getCurrentDayNumber()} de 365
              </Badge>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Recomece sua jornada do zero para este perfil.
              </p>
              <Button variant="destructive" onClick={handleReset} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2"/>
                Reiniciar Plano do Zero
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Plano de Leitura
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Data de Início do Plano</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                O sistema calculará automaticamente o dia atual baseado nesta data
              </p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-semibold mb-2">Dia Atual do Plano:</p>
              <Badge variant="default" className="text-lg">
                Dia {getCurrentDayNumber()} de 365
              </Badge>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Recomece sua jornada do zero para este perfil.
              </p>
              <Button variant="destructive" onClick={handleReset} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2"/>
                Reiniciar Plano do Zero
              </Button>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 space-y-4">
          <h2 className="text-xl font-bold">Exportar Plano de Leitura</h2>
          <p className="text-muted-foreground">
            Baixe o plano completo de leitura M'Cheyne (365 dias) nos formatos PDF ou Excel.
          </p>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={exportReadingPlanToPDF}
              className="flex-1"
            >
              Exportar para PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={exportReadingPlanToExcel}
              className="flex-1"
            >
              Exportar para Excel
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
