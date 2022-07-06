import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FoodType } from '../../utils/types';
import { useRef } from 'react';

type Food = Omit<FoodType, "id">

interface ModalEditFoodProps {
  isOpen: boolean;
  editingFood: FoodType | undefined;
  setIsOpen: (value: boolean) => void
  handleUpdateFood: (food: Food) => Promise<void>
}

export const ModalEditFood = ({
  isOpen,
  editingFood,
  setIsOpen,
  handleUpdateFood,
}: ModalEditFoodProps) => {
  const formRef = useRef(null)

  const handleSubmit = async (data: FoodType) => {
    const food = {
      name: data.name,
      description: data.description,
      price: data.price,
      available: true,
      image: data.image
    }
    
    handleUpdateFood(food);
    setIsOpen(!isOpen);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={(Event) => handleSubmit(Event)} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};