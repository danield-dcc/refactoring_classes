import { createRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Input from '../Input';
import { Modal } from '../Modal';

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: FoodProps) => void;
}

export function ModalAddFood({setIsOpen, isOpen, handleAddFood}: ModalAddFoodProps) {
  const [ formRef ] = useState(createRef());


  // function handleOpen() {
  //   setIsOpen(true);
  // }

  // function handleClose() {
  //   setIsOpen(false);
  // }

  // function handleAddFood(data) {
  //   setFood(data);
  //}

  async function handleSubmit(data: FoodProps) {
    //handleAddFood(data);
    handleAddFood(data);
    setIsOpen();
  }
    

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
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
}