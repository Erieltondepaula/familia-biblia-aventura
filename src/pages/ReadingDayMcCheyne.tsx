import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import CircularProgress from "@/components/CircularProgress";
import { RichTextEditor } from "@/components/RichTextEditor";
import {
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  CalendarDays,
  Home,
  Users,
  FileText,
  X,
  Save,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { useProfile } from "@/hooks/useProfile";
import { BibleVersion } from "@/contexts/profileContextDef";
import {
  getReadingByDay,
  getAllChapters,
  getCurrentDayNumber,
  mcCheyneReadingPlan,
  calculateReadingProgress,
} from "@/lib/mccheyneReadingPlan";
import { parseChapterReference } from "@/lib/bibleData";
import { generateBibleUrl } from "@/lib/bibleVersions";
import { saveChapterNote, getChapterNote } from "@/lib/reflectionsStorage";
import {
  markVerseAsMemorized,
  isVerseMemorized,
} from "@/lib/memorizationStorage";
import { calculateLevel } from "@/lib/progressCalculations";
import LevelUpModal from "@/components/LevelUpModal";
import { toast } from "sonner";
import { bibleAbbreviations } from "@/lib/bibleAbbreviations";
import { logger } from "@/lib/logger";

// Hook para detectar a largura da janela
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

interface ChapterRowProps {
  chapter: string;
  testament: "AT" | "NT";
  isChecked: boolean;
  onToggle: (chapter: string) => void;
  note: string;
  onNoteChange: (chapter: string, value: string) => void;
  profileId: string | undefined;
  bibleVersion: BibleVersion;
}

const ChapterRow = ({
  chapter,
  testament,
  isChecked,
  onToggle,
  note,
  onNoteChange,
  profileId,
  bibleVersion,
}: ChapterRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note || "");
  const windowWidth = useWindowWidth();

  const getChapterDisplay = (fullChapter: string) => {
    if (windowWidth <= 800) {
      const parts = fullChapter.match(/^(\d?\s?[a-zA-Z\u00C0-\u017F]+)\s(\d+.*)$/);
      if (parts) {
        const bookName = parts[1].trim();
        const chapterAndVerse = parts[2];
        const abbreviation = bibleAbbreviations[bookName] || bookName;
        return `${abbreviation} ${chapterAndVerse}`;
      }
    }
    return fullChapter;
  };

  const chapterDisplay = getChapterDisplay(chapter);

  const chapterLink = useMemo(() => {
    if (!bibleVersion) return null;
    try {
      const parsed = parseChapterReference(chapter);
      if (!parsed) return null;
      return generateBibleUrl(bibleVersion, parsed.book, parsed.chapter);
    } catch (error) {
      logger.error("Erro ao gerar URL da Bíblia:", error);
      return null;
    }
  }, [bibleVersion, chapter]);

  const handleSave = async () => {
    if (!profileId) return;
    onNoteChange(chapter, editText);
    try {
      await saveChapterNote(profileId, chapter, editText);
      setIsEditing(false);
      toast.success("Anotação salva!");
    } catch (error) {
      logger.error("Erro ao salvar anotação:", error);
      toast.error("Erro ao salvar anotação. Tente novamente.");
    }
  };

  const handleCancel = () => {
    setEditText(note || "");
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditText(note || "");
    setIsEditing(true);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => onToggle(chapter)}
          className="w-6 h-6"
        />
        <span className="flex-1 font-semibold text-base min-w-[120px]">
          {chapterDisplay}
        </span>
        <div className="flex items-center gap-1 ml-auto">
            {chapterLink ? (
              <a href={chapterLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9"
                  title="Ler no Bíblia Online"
                >
                  <BookOpen className="w-5 h-5" />
                </Button>
              </a>
            ) : (
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 opacity-30"
                disabled
                title="Link não disponível"
              >
                <BookOpen className="w-5 h-5" />
              </Button>
            )}
            <Badge
              variant="outline"
              className={`text-sm ${
                testament === "AT"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              }`}
            >
              {testament}
            </Badge>
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9"
              title="Reflexão"
              onClick={handleEdit}
              disabled={isEditing}
            >
              <FileText className="w-5 h-5" />
            </Button>
        </div>
      </div>

      {isEditing && (
        <div className="pl-4">
          <RichTextEditor
            value={editText}
            onChange={(value) => setEditText(value)}
            placeholder={`Suas anotações sobre ${chapter}...`}
            minHeight="120px"
          />
          <div className="flex gap-2 justify-end mt-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4 mr-1" />
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              Salvar Reflexão
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const ReadingDayMcCheyne = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { currentProfile } = useProfile();
  const {
    markChapterAsRead,
    isChapterCompleted,
    addXP,
    xp,
    level,
    totalChaptersRead,
  } = useProgress();

  const dayNumber = parseInt(day || "1");
  const reading = getReadingByDay(dayNumber);

  const [checkedChapters, setCheckedChapters] = useState<Set<string>>(
    new Set()
  );
  const [memorizedVerse, setMemorizedVerse] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);

  const [chapterNotes, setChapterNotes] = useState<Record<string, string>>({});

  const isCompleted = reading ? isChapterCompleted(reading.day) : false;

  useEffect(() => {
    const loadData = async () => {
      if (currentProfile && reading) {
        const alreadyMemorized = await isVerseMemorized(
          currentProfile.id,
          dayNumber
        );
        setMemorizedVerse(alreadyMemorized);

        if (isCompleted) {
          const allChaps = getAllChapters(reading);
          setCheckedChapters(new Set(allChaps));
        }

        const chapters = [
          reading.familyOT,
          reading.familyNT,
          reading.personalOT,
          reading.personalNT,
        ];
        const loadedNotes: Record<string, string> = {};
        for (const chapter of chapters) {
          loadedNotes[chapter] = await getChapterNote(
            currentProfile.id,
            chapter
          );
        }
        setChapterNotes(loadedNotes);
      }
    };
    loadData();
  }, [currentProfile, dayNumber, reading, isCompleted]);

  if (!reading || !currentProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {reading ? "Carregando perfil..." : "Dia não encontrado"}
          </h2>
          <Link to="/dashboard">
            <Button>Voltar ao Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const currentDay = getCurrentDayNumber();
  const isFutureDay = dayNumber > currentDay;
  const allChapters = getAllChapters(reading);
  const allChaptersChecked = allChapters.every((ch) => checkedChapters.has(ch));
  const progress = calculateReadingProgress(
    Array.from(checkedChapters),
    allChapters
  );
  const totalBibleProgress = Math.round(
    (totalChaptersRead() / (365 * 4)) * 100
  );

  const readingDate = new Date(
    new Date().getFullYear(),
    reading.month - 1,
    reading.dayOfMonth
  );
  const pad = (n: number) => String(n).padStart(2, "0");
  const readingDateStr = `${pad(readingDate.getDate())}/${pad(
    readingDate.getMonth() + 1
  )}/${readingDate.getFullYear()}`;

  const handleChapterToggle = (chapter: string) => {
    const newChecked = new Set(checkedChapters);
    if (newChecked.has(chapter)) {
      newChecked.delete(chapter);
    } else {
      newChecked.add(chapter);
    }
    setCheckedChapters(newChecked);
  };

  const handleMemorizeVerse = async () => {
    if (!currentProfile || memorizedVerse) return;

    try {
      setMemorizedVerse(true);
      await markVerseAsMemorized(currentProfile.id, dayNumber);
      await addXP(100);
      toast.success("Versículo memorizado! +100 XP");
    } catch (error) {
      logger.error("Erro ao memorizar versículo:", error);
      setMemorizedVerse(false);
      toast.error("Erro ao salvar. Tente novamente.");
    }
  };

  const handleCompleteReading = () => {
    if (!allChaptersChecked) {
      toast.error("Complete todos os capítulos primeiro!");
      return;
    }

    if (isCompleted) {
      toast.info("Você já completou esta leitura!");
      return;
    }

    const currentLevel = level;
    markChapterAsRead(dayNumber, allChapters);

    const totalXP = allChapters.length * 84;

    const levelAfter = calculateLevel(xp + totalXP);
    if (levelAfter > currentLevel) {
      setNewLevel(levelAfter);
      setShowLevelUp(true);
    }

    toast.success(`Leitura concluída! +${totalXP} XP`);
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const goToPreviousDay = () => {
    if (dayNumber > 1) navigate(`/reading/${dayNumber - 1}`);
  };

  const goToNextDay = () => {
    if (dayNumber < mcCheyneReadingPlan.length) {
      navigate(`/reading/${dayNumber + 1}`);
    }
  };

  const handleChapterNoteChange = (chapter: string, value: string) => {
    setChapterNotes((prev) => ({
      ...prev,
      [chapter]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <LevelUpModal
        level={newLevel}
        show={showLevelUp}
        onClose={() => setShowLevelUp(false)}
      />

      {isFutureDay && (
        <div className="bg-primary/10 border-b-2 border-primary/20 py-3">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-semibold">
              Você está visualizando um dia futuro do plano. Navegação liberada.
            </p>
          </div>
        </div>
      )}

      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <CalendarDays className="w-6 h-6" />
                  Dia {reading.day} - Plano M'Cheyne
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  {readingDateStr}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={goToPreviousDay}
                disabled={dayNumber <= 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={goToNextDay}
                disabled={dayNumber >= mcCheyneReadingPlan.length}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {isFutureDay && !reading ? (
          <Card className="p-12 text-center">
            <CalendarDays className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Dia Bloqueado</h2>
            <p className="text-lg text-muted-foreground mb-6">
              O sistema libera um novo dia automaticamente à meia-noite (00:00).
            </p>
            <Link to="/dashboard">
              <Button size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            <Card className="p-6 mb-6 shadow-card">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <CircularProgress value={progress} size={100} />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-semibold text-lg flex items-center justify-center md:justify-start gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Progresso do Dia
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {checkedChapters.size} de {allChapters.length} capítulos
                    lidos
                  </p>
                  <div className="space-y-1">
                    <Badge
                      variant={isCompleted ? "default" : "outline"}
                      className={`${isCompleted ? "bg-success" : ""}`}
                    >
                      {isCompleted ? "✓ Dia Completo" : "Em Progresso"}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Progresso Total da Bíblia: {totalBibleProgress}%
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-6 shadow-card border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">
                  Leitura Familiar
                </h2>
                <Badge variant="secondary" className="ml-auto">
                  2 capítulos
                </Badge>
              </div>
              <div className="space-y-3">
                <ChapterRow
                  chapter={reading.familyOT}
                  testament="AT"
                  isChecked={checkedChapters.has(reading.familyOT)}
                  onToggle={handleChapterToggle}
                  note={chapterNotes[reading.familyOT]}
                  onNoteChange={handleChapterNoteChange}
                  profileId={currentProfile?.id}
                  bibleVersion={currentProfile.bible_version}
                />
                <ChapterRow
                  chapter={reading.familyNT}
                  testament="NT"
                  isChecked={checkedChapters.has(reading.familyNT)}
                  onToggle={handleChapterToggle}
                  note={chapterNotes[reading.familyNT]}
                  onNoteChange={handleChapterNoteChange}
                  profileId={currentProfile?.id}
                  bibleVersion={currentProfile.bible_version}
                />
              </div>
            </Card>

            <Card className="p-6 mb-6 shadow-card border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400">
                  Leitura Pessoal
                </h2>
                <Badge variant="secondary" className="ml-auto">
                  2 capítulos
                </Badge>
              </div>
              <div className="space-y-3">
                <ChapterRow
                  chapter={reading.personalOT}
                  testament="AT"
                  isChecked={checkedChapters.has(reading.personalOT)}
                  onToggle={handleChapterToggle}
                  note={chapterNotes[reading.personalOT]}
                  onNoteChange={handleChapterNoteChange}
                  profileId={currentProfile?.id}
                  bibleVersion={currentProfile.bible_version}
                />
                <ChapterRow
                  chapter={reading.personalNT}
                  testament="NT"
                  isChecked={checkedChapters.has(reading.personalNT)}
                  onToggle={handleChapterToggle}
                  note={chapterNotes[reading.personalNT]}
                  onNoteChange={handleChapterNoteChange}
                  profileId={currentProfile?.id}
                  bibleVersion={currentProfile.bible_version}
                />
              </div>
            </Card>

            <Card className="p-8 mb-6 shadow-card bg-gradient-glory">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-accent-foreground">
                <Star className="w-6 h-6" />
                Versículo do Dia para Memorizar
              </h2>
              <p className="text-xl font-semibold leading-relaxed text-accent-foreground mb-6 italic">
                "{reading.verseOfDay}"
              </p>
              <Button
                variant={memorizedVerse ? "success" : "default"}
                size="lg"
                onClick={handleMemorizeVerse}
                disabled={memorizedVerse}
                className="w-full"
              >
                {memorizedVerse ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Memorizado! (+100 XP)
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Marcar como Memorizado
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-6 shadow-elevated border-2 border-primary/20">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-2">
                  {isCompleted ? "Leitura já concluída!" : "Pronto para finalizar?"}
                </h3>
                <p className="text-muted-foreground">
                  {isCompleted
                    ? "Você já completou esta leitura."
                    : allChaptersChecked
                    ? "Todos os capítulos foram lidos. Clique para finalizar!"
                    : "Complete todos os 4 capítulos antes de finalizar"}
                </p>
              </div>
              <Button
                size="xl"
                className="w-full"
                onClick={handleCompleteReading}
                disabled={!allChaptersChecked || isCompleted}
                variant={
                  allChaptersChecked && !isCompleted ? "success" : "default"
                }
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {isCompleted ? "Concluído" : "Finalizar Leitura"}
              </Button>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadingDayMcCheyne;

