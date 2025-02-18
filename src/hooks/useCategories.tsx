/* eslint-disable react-hooks/exhaustive-deps */
import { onValue, ref, push, remove, update } from "firebase/database";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { realTimeDatabase } from "../services/firebaseconfig";

interface Category {
  id: string;
  name: string;
}

type CategoryInput = Omit<Category, "id">;

interface CategoriesProviderProps {
  children: ReactNode;
}

interface CategoriesContextData {
  categories: Category[];
  createCategory: (category: CategoryInput) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextData>(
  {} as CategoriesContextData
);

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const categoriesRef = ref(realTimeDatabase, "categories");

  useEffect(() => {
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const keys = data && Object.keys(data);
      const treatData = keys?.map((key: any) => {
        return { ...data[key], id: key };
      });
      setCategories(treatData);
    });
  }, []);

  async function createCategory(category: CategoryInput) {
    await push(categoriesRef, category)
      .then(() => {
        toast.success("Categoria criada com sucesso");
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Erro ao criar categoria: ", error);
      });
  }

  async function updateCategory(category: Category) {
    await update(ref(realTimeDatabase, category.id), category)
      .then(() => {
        toast.success("Categoria atualizada com sucesso");
      })
      .catch((err) => {
        toast.error("Ocorreu um erro ao atualizar");
        console.log(err);
      });
  }

  async function removeCategory(id: string) {
    await remove(ref(realTimeDatabase, `categories/${id}`))
      .then(() => {
        toast.success("Categoria removida com sucesso");
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Erro ao remover categoria: ", error);
      });
  }

  return (
    <CategoriesContext.Provider value={{ categories, createCategory, updateCategory, removeCategory }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  return context;
}