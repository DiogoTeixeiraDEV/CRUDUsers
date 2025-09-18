import { useEffect, useState } from 'react';
import { getProducts } from '../api/product';
import type { Product } from '../api/product';
import { Box, Text, Spinner, SimpleGrid, VStack} from '@chakra-ui/react';
import { useApp } from '../context/App.context';

export default function ProductPage() {
    const { user } = useApp();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user || !user.token) {
            setError("Você precisa estar logado para ver os produtos.");
            setLoading(false);
            return;
        }

        async function load(){
            try {
                const data = await getProducts(user!.token);   
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products: ", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [user]);

    if (loading) {
        return <Spinner size="xl" />;
    }
    if (error) {
        return <Text color="red.500">{error}</Text>;
    }
    return (
        <Box p={8}>
            <Text fontSize="3xl" mb={6}>Produtos</Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {products.map((p) => (
                    <Box key={p.id} p={4} boxShadow="md" borderWidth="1px" borderRadius="md" bg = "white">
                        <VStack spacing={2} align="start">
                            <Text fontSize="sm">{p.name}</Text>
                            <Text fontWeight="bold">{p.category}</Text>
                            <Text color=" brand.500">R$ {p.price}</Text>
                            <Text color="sm">R$ {p.category}</Text>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}