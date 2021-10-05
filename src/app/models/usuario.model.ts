export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
}

export enum TipoUsuario {
  ALUNO = "A",
  FACULDADE = "F",
  PROFESSOR = "P",
}
