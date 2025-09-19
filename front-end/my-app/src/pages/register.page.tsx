import { useState } from 'react';
import { registerUser } from '../api/users';
import type { RegisterData } from '../api/users';
import { Box, Button, Input, VStack, Text} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await registerUser({ username, email, password } as RegisterData);
            setSuccess("Registro bem-sucedido! Você pode fazer login agora.");
            setTimeout(() => navigate("/login"), 1500 )

        } catch (err) {
            setError("Erro ao registrar. Tente novamente.");
            console.error("Registration error: ", err);
        }
    };

    return (
        <Box p = {8} maxW = "md" mx = "auto">
            <VStack spacing = {4}>
                <Text fontSize = "2xl" > Cadastro </Text>
                <Input
                    placeholder = "Nome de usuário"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                />
                <Input
                    placeholder = "Email"
                    type = "email@exemplo.com"  
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder = "Senha"
                    type = "password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button colorScheme = "blue" onClick = {handleRegister} w = "full">
                     Cadastrar
                </Button>
                {error && <Text color = "red.500">{error}</Text>}
                {success && <Text color = "green.500">{success}</Text>}
            </VStack>
        
        </Box>
    );
}