import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Link as LinkIcon } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import qrCodePix from "@/assets/pix-qr-code.png"; 

const Contribute = () => {
  // Informações do PIX
  const pixCopiaECola =
    "00020126580014BR.GOV.BCB.PIX0136b3e9657b-3a74-4b91-9e58-4fa433fd5f975204000053039865802BR5922Erielton de Paula Melo6009SAO PAULO62140510Rv9wS8HXIz6304EEDA";
  const pixChaveAleatoria = "b3e9657b-3a74-4b91-9e58-4fa433fd5f97";
  const nomeCompleto = "Erielton de Paula Melo";
  const banco = "Nu Pagamentos S.A.";
  const linkPagamento =
    "https://nubank.com.br/cobrar/1jufjo/68e825e6-673d-4f0b-b164-6944f6b62f64";

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(message))
      .catch(() => toast.error("Falha ao copiar!"));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Botão Voltar */}
        <div className="mb-8">
          <RouterLink to="/dashboard">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar ao Dashboard
            </Button>
          </RouterLink>
        </div>

        {/* Layout em duas colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Coluna Esquerda - Informações de Pagamento */}
          <div className="space-y-8">
            {/* Card QR Code */}
            <Card className="shadow-lg bg-primary text-primary-foreground">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Use o QR Code do Pix</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Abra o app do seu banco e escaneie a imagem abaixo.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src={qrCodePix}
                    alt="QR Code PIX para doação"
                    className="w-48 h-48"
                  />
                </div>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() =>
                    copyToClipboard(
                      pixCopiaECola,
                      "Código 'Copia e Cola' copiado!"
                    )
                  }
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar código do QR Code
                </Button>
              </CardContent>
            </Card>

            {/* Chave Pix */}
            <div className="text-center">
              <p className="text-muted-foreground">Ou use a chave Pix</p>
              <Separator className="my-4" />
            </div>

            <Card className="p-6 shadow-lg">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Nome</span>
                  <span className="font-semibold">{nomeCompleto}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Banco</span>
                  <span className="font-semibold">{banco}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Chave Pix</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary truncate max-w-[150px]">
                      Chave Aleatória
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        copyToClipboard(pixChaveAleatoria, "Chave PIX copiada!")
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Link de pagamento */}
            <a
              href={linkPagamento}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full">
                <LinkIcon className="mr-2 h-4 w-4" />
                Pagar com Link (App Nubank)
              </Button>
            </a>
          </div>

          {/* Coluna Direita - Texto Explicativo */}
          <div className="flex flex-col justify-center text-center md:text-left space-y-6">
            <h2 className="text-3xl font-bold text-primary">
              Por que contribuir?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              <strong>Gostou do nosso projeto?</strong> Você pode colaborar para
              mantê-lo no ar! Nossa aplicação é{" "}
              <strong>totalmente gratuita</strong>, feita com muito carinho e
              dedicação para abençoar e ajudar pessoas como você.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Porém, os custos de <strong>servidor, hospedagem e manutenção</strong>{" "}
              não são gratuitos. Com uma{" "}
              <strong>pequena contribuição</strong>, de qualquer valor, você nos
              ajuda a continuar melhorando o sistema e mantendo-o acessível a
              todos.
            </p>
            <p className="text-lg text-primary font-semibold">
              💛 Sua colaboração faz toda a diferença! <br />
              Seja parte desse propósito e ajude-nos a continuar levando a Palavra
              de Deus através da tecnologia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
