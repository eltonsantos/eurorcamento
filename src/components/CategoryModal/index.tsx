import { FormEvent, useEffect, useState } from "react";

import { useCategories } from "../../hooks/useCategories";

import Modal from "react-modal";

import closeImg from "../../assets/close.svg";

import { toast } from "react-toastify";
import * as S from "./styles";
import { PencilSimple, TrashSimple } from "phosphor-react";

interface CategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CategoryModal({ isOpen, onRequestClose }: CategoryModalProps) {

  const { createCategory, updateCategory, removeCategory } = useCategories();

  const [name, setName] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <S.Container>
        <h2>Categorias</h2>
        <input
          type="text"
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Criar</button>
      </S.Container>

      <S.TableContainer>
        <h2>Lista de categorias</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alimentação</td>
              <td>
                <div className="options">
                  <PencilSimple
                    size={20}
                    weight="fill"
                    color="#969cb3"
                  />
                  <TrashSimple
                    size={20}
                    weight="fill"
                    color="#E52E40"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Alimentação</td>
              <td>
                <div className="options">
                  <PencilSimple
                    size={20}
                    weight="fill"
                    color="#969cb3"
                  />
                  <TrashSimple
                    size={20}
                    weight="fill"
                    color="#E52E40"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Alimentação</td>
              <td>
                <div className="options">
                  <PencilSimple
                    size={20}
                    weight="fill"
                    color="#969cb3"
                  />
                  <TrashSimple
                    size={20}
                    weight="fill"
                    color="#E52E40"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </S.TableContainer>
    </Modal>
  );
}