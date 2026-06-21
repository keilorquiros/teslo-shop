import { AdminTitle } from "@/admin/components/AdminTitle";
import { ProductsTable } from "@/admin/components/ProductsTable";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/shop/hooks/useProducts";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {
  const { data } = useProducts();
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subTitle="Aquí puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>
      <ProductsTable products={data?.products || []} />
      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
