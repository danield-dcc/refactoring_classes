import { useEffect, useState } from 'react';
import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import api from '../../services/api';

import { FoodsContainer } from './styles';

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}


export function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    loadFoods();
  }, []);

  async function handleAddFood(food: FoodProps){
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
        id: foods.length + 1,
      });

      setFoods([...foods, { ...food, available: true, id: foods.length + 1 }]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodProps): Promise<void> {
    try{
      const updatedFood = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });
      
      const foodsUpdated = foods.map(f => 
        f.id !== updatedFood.data.id ? f : updatedFood.data);

      setFoods([...foodsUpdated]);
    }catch(err){
      console.log(err);
    }

  }

  async function handleDeleteFood(id: number): Promise<void> {
    try{
      await api.delete(`/foods/${id}`);

      const foodsFiltered = foods.filter(food => food.id !== id);

      setFoods([...foodsFiltered]);
    }catch(err){
      console.log(err);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  };

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  };

  function handleEditFood(food: FoodProps): void {
    setEditingFood(food);
    setEditModalOpen(!editModalOpen);
  }

  return (
    <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

         <FoodsContainer data-testid="foods-list">
           {foods &&
             foods.map(food => (
               <Food
                 key={food.id}
                 food={food}
                 handleDelete={handleDeleteFood}
                 handleEditFood={handleEditFood}
               />
             ))}
         </FoodsContainer>
       </>
  );
}
