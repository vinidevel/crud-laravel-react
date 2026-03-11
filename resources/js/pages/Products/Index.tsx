import ProductController from '@/actions/App/Http/Controllers/ProductController';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}


// Notificação de sucesso ao criar um produto
interface PageProps {
    flash: {
        message?: string;
    },
    products: Product[]

}



export default function Index({flash, products}: PageProps)  {

    const {processing, delete:destroy} = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm('Are you sure you want to delete this product? ' + name)) {
            destroy(ProductController.destroy.url(id));
        }
        return;
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={ProductController.create.url()}><Button>Create a Product</Button></Link>
            </div>
            <div className='m-4'>
                <div>
                    {flash.message && (
                        <Alert>
                            <Megaphone />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {products.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent Products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={ProductController.edit.url(product.id)}><Button variant="outline" size="sm" className='mr-2'>Edit</Button></Link>
                                      <Button disabled={processing} onClick={() => handleDelete(product.id, product.name)} variant="destructive" className='bg-red-500 hover:bg-red-700' size="sm">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </div>
            )}

        </AppLayout>
    );
}
