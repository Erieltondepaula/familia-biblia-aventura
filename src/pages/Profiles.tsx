import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { RoleType, Difficulty, BibleVersion } from "@/contexts/ProfileContext";
import { ArrowLeft, UserPlus, CheckCircle2, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Profiles = () => {
  const { profiles, currentProfile, setCurrentProfile, addProfile, updateProfile, deleteProfile } = useProfile();
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    age: 10,
    role: "filho" as RoleType,
    difficulty: "crianca" as Difficulty,
    bible_version: "NTLH" as BibleVersion,
  });

  useEffect(() => {
    document.title = "Perfis | Jornada Bíblica";
  }, []);

  const handleCreate = () => {
    if (!form.name.trim() || form.age === null) {
        toast.error("O nome e a idade do perfil não podem estar em branco.");
        return;
    };
    addProfile(form);
    setForm({ name: "", age: 10, role: "filho", difficulty: "crianca", bible_version: "NTLH" });
    toast.success("Novo perfil criado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Perfis da Família</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Selecionar Perfil Ativo</h2>
          <div className="space-y-3">
            {profiles.map(p => (
              <div key={p.id} className={`flex items-center justify-between p-4 rounded-lg border ${currentProfile?.id === p.id ? 'border-success/50 bg-success/5' : 'border-border'}`}>
                <div>
                  <p className="font-semibold">{p.name} <Badge className="ml-2">{p.role}</Badge></p>
                  <p className="text-sm text-muted-foreground">{p.age} anos • {p.difficulty} • {p.bible_version}</p>
                </div>
                <div className="flex items-center gap-2">
                  {currentProfile?.id === p.id ? (
                    <Badge className="bg-success text-white flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Ativo</Badge>
                  ) : (
                    <Button variant="outline" onClick={() => setCurrentProfile(p.id)}>Ativar</Button>
                  )}
                  {profiles.length > 1 && (
                    <Button variant="destructive" onClick={() => setProfileToDelete(p.id)}>
                      <Trash2 className="w-4 h-4 mr-1"/> Remover
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Criar Novo Perfil</h2>
          <div className="grid gap-4">
            <div>
              <Label>Nome</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Idade</Label>
              <Input 
                type="number" 
                value={form.age === null ? '' : form.age} 
                onChange={(e) => setForm({ ...form, age: e.target.value === '' ? null : Number(e.target.value) })} 
              />
            </div>
            <div>
              <Label>Função</Label>
              <RadioGroup value={form.role} onValueChange={(v) => setForm({ ...form, role: v as RoleType })} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="pai" id="role-pai" /><Label htmlFor="role-pai">Pai</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="mae" id="role-mae" /><Label htmlFor="role-mae">Mãe</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="filho" id="role-filho" /><Label htmlFor="role-filho">Filho(a)</Label></div>
              </RadioGroup>
            </div>
            <div>
              <Label>Dificuldade</Label>
              <RadioGroup value={form.difficulty} onValueChange={(v) => setForm({ ...form, difficulty: v as Difficulty })} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="crianca" id="dif-crianca" /><Label htmlFor="dif-crianca">Criança</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="adolescente" id="dif-adolescente" /><Label htmlFor="dif-adolescente">Adolescente</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="adulto" id="dif-adulto" /><Label htmlFor="dif-adulto">Adulto</Label></div>
              </RadioGroup>
            </div>
            <div>
              <Label>Versão da Bíblia</Label>
              <RadioGroup value={form.bible_version} onValueChange={(v) => setForm({ ...form, bible_version: v as BibleVersion })} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="ACF" id="ver-acf" /><Label htmlFor="ver-acf">ACF</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="NVI" id="ver-nvi" /><Label htmlFor="ver-nvi">NVI</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="NTLH" id="ver-ntlh" /><Label htmlFor="ver-ntlh">NTLH</Label></div>
              </RadioGroup>
            </div>
            <Button onClick={handleCreate}>
              <UserPlus className="w-4 h-4 mr-2"/>
              Criar Perfil
            </Button>
          </div>
        </Card>

        {currentProfile && (
          <div className="lg:col-span-2">
            <Separator className="my-6" />
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Editar Perfil Ativo: {currentProfile.name}</h2>
              <div className="grid md:grid-cols-2 gap-4">
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
                    <div className="flex items-center space-x-2"><RadioGroupItem value="pai" id="edit-role-pai" /><Label htmlFor="edit-role-pai">Pai</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="mae" id="edit-role-mae" /><Label htmlFor="edit-role-mae">Mãe</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="filho" id="edit-role-filho" /><Label htmlFor="edit-role-filho">Filho(a)</Label></div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>Versão da Bíblia</Label>
                  <RadioGroup value={currentProfile.bible_version} onValueChange={(v) => updateProfile(currentProfile.id, { bible_version: v as BibleVersion })} className="flex gap-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="ACF" id="edit-ver-acf" /><Label htmlFor="edit-ver-acf">ACF</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="NVI" id="edit-ver-nvi" /><Label htmlFor="edit-ver-nvi">NVI</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="NTLH" id="edit-ver-ntlh" /><Label htmlFor="edit-ver-ntlh">NTLH</Label></div>
                  </RadioGroup>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <AlertDialog open={profileToDelete !== null} onOpenChange={() => setProfileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O perfil e todos os seus dados serão removidos permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (profileToDelete) {
                  deleteProfile(profileToDelete);
                  setProfileToDelete(null);
                  toast.success("Perfil removido.");
                }
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profiles;