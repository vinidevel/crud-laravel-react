import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import ProductController from '@/actions/App/Http/Controllers/ProductController';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';



interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface Props {
    product: Product;
}

export default function Edit({product}: Props) {


    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        put(ProductController.update.url(product.id));

    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit Product', href: `/products/${product.id}/edit` }]}>
            <Head title="Create a New Product" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleUpdate} className='space-y-4'>

                    {/* Display errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className='h-4 w-4' />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className='gap-1.5'>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Product Name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>

                    <div className='gap-1.5'>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            placeholder="Product price"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                        />
                        {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                    </div>

                    <div className='gap-1.5'>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder='Description'
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>

                    <Button className='mt-4' type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Edit Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
