"use strict";
// #endregion
// #region 2. ESTADOS CONCRETOS
// Estado: SemCartao
class SemCartao {
    constructor(atm) {
        this.atm = atm;
    }
    inserirCartao() {
        console.log("Cartão inserido. Por favor, insira sua senha.");
        this.atm.definirEstado(this.atm.getEstadoComCartao());
    }
    removerCartao() {
        console.log("Nenhum cartão para remover.");
    }
    inserirSenha(senha) {
        console.log("Por favor, insira o cartão primeiro.");
    }
    sacarDinheiro(valor) {
        console.log("Por favor, insira o cartão primeiro.");
    }
}
// Estado: ComCartao
class ComCartao {
    constructor(atm) {
        this.atm = atm;
    }
    inserirCartao() {
        console.log("Já existe um cartão inserido.");
    }
    removerCartao() {
        console.log("Cartão removido.");
        this.atm.definirEstado(this.atm.getEstadoSemCartao());
    }
    inserirSenha(senha) {
        if (senha === "1234") {
            console.log("Senha correta. Você pode sacar dinheiro.");
            this.atm.definirEstado(this.atm.getEstadoProntoParaSacar());
        }
        else {
            console.log("Senha incorreta. Tente novamente.");
        }
    }
    sacarDinheiro(valor) {
        console.log("Insira a senha antes de sacar dinheiro.");
    }
}
// Estado: ProntoParaSacar
class ProntoParaSacar {
    constructor(atm) {
        this.atm = atm;
    }
    inserirCartao() {
        console.log("Já existe um cartão inserido.");
    }
    removerCartao() {
        console.log("Cartão removido.");
        this.atm.definirEstado(this.atm.getEstadoSemCartao());
    }
    inserirSenha(senha) {
        console.log("Senha já foi validada.");
    }
    sacarDinheiro(valor) {
        console.log(`Saque de R$${valor} realizado com sucesso.`);
        console.log("Cartão removido. Obrigado por usar o ATM.");
        this.atm.definirEstado(this.atm.getEstadoSemCartao());
    }
}
// #endregion
// #region 3. CLASSE CONTEXTO
class ATM {
    constructor() {
        this.estadoSemCartao = new SemCartao(this);
        this.estadoComCartao = new ComCartao(this);
        this.estadoProntoParaSacar = new ProntoParaSacar(this);
        this.estadoAtual = this.estadoSemCartao; // Estado inicial
    }
    definirEstado(novoEstado) {
        this.estadoAtual = novoEstado;
    }
    getEstadoSemCartao() {
        return this.estadoSemCartao;
    }
    getEstadoComCartao() {
        return this.estadoComCartao;
    }
    getEstadoProntoParaSacar() {
        return this.estadoProntoParaSacar;
    }
    inserirCartao() {
        this.estadoAtual.inserirCartao();
    }
    removerCartao() {
        this.estadoAtual.removerCartao();
    }
    inserirSenha(senha) {
        debugger;
        this.estadoAtual.inserirSenha(senha);
    }
    sacarDinheiro(valor) {
        this.estadoAtual.sacarDinheiro(valor);
    }
}
// #endregion
// #region 4. EXEMPLO DE USO
const atm = new ATM();
console.log("=== CENÁRIO: SEM CARTÃO ===");
atm.inserirSenha("1234"); // Por favor, insira o cartão primeiro.
atm.sacarDinheiro(50); // Por favor, insira o cartão primeiro.
console.log("\n=== CENÁRIO: INSERINDO CARTÃO ===");
atm.inserirCartao(); // Cartão inserido. Por favor, insira sua senha.
console.log("\n=== CENÁRIO: INSERINDO SENHA ===");
atm.inserirSenha("1234"); // Senha correta. Você pode sacar dinheiro.
console.log("\n=== CENÁRIO: SACANDO DINHEIRO ===");
atm.sacarDinheiro(500); // Saque realizado com sucesso.
console.log("\n=== CENÁRIO: REMOVENDO CARTÃO ===");
atm.removerCartao(); // Nenhum cartão para remover.
// #endregion
