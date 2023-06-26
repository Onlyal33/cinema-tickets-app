
import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { cartActions } from '@/redux/features/cart';

const useModalState = (id: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const setModal = useCallback((state: boolean) => {
    setIsModalOpen(state);
  }, []);

  const onClose = useCallback(() => {
    setModal(false);
    document.body.style.overflow = 'auto';
  }, [setModal]);

  const onSubmit = useCallback(() => {
    dispatch(cartActions.reset(id));
    setModal(false);
    document.body.style.overflow = 'auto';
  }, [dispatch, id, setModal]);

  return { isModalOpen, setModal, onClose, onSubmit };
};

export default useModalState;
