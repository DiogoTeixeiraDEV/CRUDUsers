import { useState } from "react";
import { Box, Button, Input, VStack, Text, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { loginUser } from "../api/users";
import { useApp } from "../context/App.context";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        setError("");
        const response = await loginUser(email, password);
        console.log ("token received:", response.access_token);
        setUser ({token: response.access_token});
        navigate("/products");
    } catch (err) {
        setError("Erro ao logar. Verifique suas credenciais.");
        console.error("Login error: ", err);
    }

  };

  return (
    <Box p={8} maxW="md" mx="auto">
        <VStack spacing={4}>
            <Text fontSize="2xl">Login</Text>
            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
                        <Input
                            placeholder="Senha"
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
            {error && <Text color="red.500">{error}</Text>}
            <Button colorScheme="brand" onClick={handleLogin} w="full">
                Entrar
            </Button>
            <HStack>
          <Text>Não tem uma conta?</Text>
          <ChakraLink as={RouterLink as any} to="/register" color="blue.500" fontWeight="bold">
            Cadastre-se
          </ChakraLink>
        </HStack>

        </VStack>
    </Box>
    );
}
