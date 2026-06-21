import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    // enabled: !!id
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product) => {
      console.log("Todo salio bien ", product);

      // TODO:
      // Invalidar caché
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Actualizar queryData
      queryClient.setQueryData(["product", { id: product.id }], product);
    },
  });

  return {
    ...query,
    mutation,
  };
};
