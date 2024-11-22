// #region 1. DEFINIÇÃO DA INTERFACE ESTADO
interface Estado {
  inserirCartao(): void;
  removerCartao(): void;
  inserirSenha(senha: string): void;
  sacarDinheiro(valor: number): void;
}
// #endregion



// #region 2. ESTADOS CONCRETOS
// Estado: SemCartao
class SemCartao implements Estado {
  private atm: ATM;

  constructor(atm: ATM) {
    this.atm = atm;
  }

  inserirCartao(): void {
    console.log("Cartão inserido. Por favor, insira sua senha.");
    this.atm.definirEstado(this.atm.getEstadoComCartao());
  }

  removerCartao(): void {
    console.log("Nenhum cartão para remover.");
  }

  inserirSenha(senha: string): void {
    console.log("Por favor, insira o cartão primeiro.");
  }

  sacarDinheiro(valor: number): void {
    console.log("Por favor, insira o cartão primeiro.");
  }
}


// Estado: ComCartao
class ComCartao implements Estado {
  private atm: ATM;

  constructor(atm: ATM) {
    this.atm = atm;
  }

  inserirCartao(): void {
    console.log("Já existe um cartão inserido.");
  }

  removerCartao(): void {
    console.log("Cartão removido.");
    this.atm.definirEstado(this.atm.getEstadoSemCartao());
  }

  inserirSenha(senha: string): void {
    if (senha === "1234") {
      console.log("Senha correta. Você pode sacar dinheiro.");
      this.atm.definirEstado(this.atm.getEstadoProntoParaSacar());
    } else {
      console.log("Senha incorreta. Tente novamente.");
    }
  }

  sacarDinheiro(valor: number): void {
    console.log("Insira a senha antes de sacar dinheiro.");
  }
}


// Estado: ProntoParaSacar
class ProntoParaSacar implements Estado {
  private atm: ATM;

  constructor(atm: ATM) {
    this.atm = atm;
  }

  inserirCartao(): void {
    console.log("Já existe um cartão inserido.");
  }

  removerCartao(): void {
    console.log("Cartão removido.");
    this.atm.definirEstado(this.atm.getEstadoSemCartao());
  }

  inserirSenha(senha: string): void {
    console.log("Senha já foi validada.");
  }

  sacarDinheiro(valor: number): void {
    console.log(`Saque de R$${valor} realizado com sucesso.`);
    console.log("Cartão removido. Obrigado por usar o ATM.");
    this.atm.definirEstado(this.atm.getEstadoSemCartao());
  }
}
// #endregion



// #region 3. CLASSE CONTEXTO
class ATM {
  private estadoSemCartao: Estado;
  private estadoComCartao: Estado;
  private estadoProntoParaSacar: Estado;

  private estadoAtual: Estado;

  constructor() {
    this.estadoSemCartao = new SemCartao(this);
    this.estadoComCartao = new ComCartao(this);
    this.estadoProntoParaSacar = new ProntoParaSacar(this);

    this.estadoAtual = this.estadoSemCartao; // Estado inicial
  }

  definirEstado(novoEstado: Estado): void {
    this.estadoAtual = novoEstado;
  }

  getEstadoSemCartao(): Estado {
    return this.estadoSemCartao;
  }

  getEstadoComCartao(): Estado {
    return this.estadoComCartao;
  }

  getEstadoProntoParaSacar(): Estado {
    return this.estadoProntoParaSacar;
  }

  inserirCartao(): void {
    this.estadoAtual.inserirCartao();
  }

  removerCartao(): void {
    this.estadoAtual.removerCartao();
  }

  inserirSenha(senha: string): void {
    debugger;
    this.estadoAtual.inserirSenha(senha);
  }

  sacarDinheiro(valor: number): void {
    this.estadoAtual.sacarDinheiro(valor);
  }
}
// #endregion



// #region 4. EXEMPLO DE USO
const atm = new ATM();

console.log("=== CENÁRIO: SEM CARTÃO ===");
atm.inserirSenha("1234"); // Por favor, insira o cartão primeiro.
atm.sacarDinheiro(50);    // Por favor, insira o cartão primeiro.

console.log("\n=== CENÁRIO: INSERINDO CARTÃO ===");
atm.inserirCartao();      // Cartão inserido. Por favor, insira sua senha.

console.log("\n=== CENÁRIO: INSERINDO SENHA ===");
atm.inserirSenha("1234"); // Senha correta. Você pode sacar dinheiro.

console.log("\n=== CENÁRIO: SACANDO DINHEIRO ===");
atm.sacarDinheiro(500);   // Saque realizado com sucesso.

console.log("\n=== CENÁRIO: REMOVENDO CARTÃO ===");
atm.removerCartao();      // Nenhum cartão para remover.
// #endregion
