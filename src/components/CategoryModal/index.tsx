import { FormEvent, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import { toast } from "react-toastify";
import * as S from "./styles";
import { PencilSimple } from "phosphor-react";

interface CategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CategoryModal({ isOpen, onRequestClose }: CategoryModalProps) {
  const { categories, createCategory, updateCategory } = useCategories();
  
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState<any>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name) {
      toast.error("Insira um nome para a categoria");
      return;
    }

    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, name });
      } else {
        await createCategory({ name });
      }
    } catch (error) {
      toast.error("Erro ao salvar categoria.");
      console.error("Erro ao salvar categoria: ", error);
    }

    setName("");
    setEditingCategory(null);
  }

  function handleEditClick(category: any) {
    setEditingCategory(category);
    setName(category.name);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <S.Container onSubmit={handleSubmit}>
        <h2>{editingCategory ? "Editar Categoria" : "Criar Categoria"}</h2>
        <input
          type="text"
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">{editingCategory ? "Atualizar" : "Criar"}</button>
      </S.Container>

      <S.TableContainer>
        <h2>Lista de categorias</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.length ? categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <div className="options">
                    <PencilSimple
                      size={20}
                      weight="fill"
                      color="#969cb3"
                      onClick={() => handleEditClick(category)}
                    />
                  </div>
                </td>
              </tr>
            )) : <tr><td colSpan={2}>Não há categorias cadastradas</td></tr>}
          </tbody>
        </table>
      </S.TableContainer>
    </Modal>
  );
}
