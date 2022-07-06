import { useRef } from 'react';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FoodType } from '../../utils/types';



import { FiCheckSquare } from 'react-icons/fi';
import { Form } from './styles';
import api from '../../services/api';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleAddFood: (data: FoodType) => Promise<void>;
}



export const ModalAddFood = ({isOpen, setIsOpen, handleAddFood}: ModalAddFoodProps) => {
  const formRef = useRef(null)

  const handleSubmit = async (data: FoodType) => {
    const foodId: number = await api.get('foods').then(res => res.data.lenght)
    
    const food = {
      id: foodId,
      name: data.name,
      description: data.description,
      price: data.price,
      available: true,
      image: data.image
    }
    
    handleAddFood(food);
    setIsOpen(!isOpen);
  };


    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={Event => handleSubmit(Event)}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};