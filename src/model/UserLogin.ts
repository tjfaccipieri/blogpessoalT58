import Postagem from "./Postagem";

interface UserLogin {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  token: string ;
}

export default UserLogin;
