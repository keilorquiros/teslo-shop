import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { Product } from "@/interfaces/product.interface";
import { currencyFormatter } from "@/lib/currency-formatter";
import { PencilIcon } from "lucide-react";
import { Link } from "react-router";

interface Props {
  products: Product[];
}

export const ProductsTable = ({ products }: Props) => {
  return (
    <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Genero</TableHead>
          <TableHead>Inventario</TableHead>
          <TableHead>Tallas</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Link to={`/admin/products/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`/admin/products/${product.id}`}>{product.title}</Link>
            </TableCell>
            <TableCell>{currencyFormatter(product.price)}</TableCell>
            <TableCell>{product.gender}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.sizes.join(", ")}</TableCell>
            <TableCell className="text-right">
              <Link to={`/admin/products/${product.id}`}>
                <PencilIcon className="w-5 h-5 text-blue-500" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
