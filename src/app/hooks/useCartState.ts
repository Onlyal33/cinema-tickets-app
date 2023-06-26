import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectIsAmountEqual1 } from '@/redux/features/cart/selector';
import { cartActions } from '@/redux/features/cart';


const useCartState = (id: string, setIsModalOpen: (state: boolean) => void) => {
  const isAmountEqual1 = useAppSelector((state) =>
    selectIsAmountEqual1(state, id)
  );
  const dispatch = useAppDispatch();
  const onDecrement = useCallback(() => {
    if (isAmountEqual1) {
      setIsModalOpen(true);
    } else {
      dispatch(cartActions.decrement(id));
    }
  }, [isAmountEqual1, id, dispatch, setIsModalOpen]);

  const onIncrement = useCallback(
    () => dispatch(cartActions.increment(id)),
    [id, dispatch]
  );

  return { onDecrement, onIncrement };
};

export default useCartState;
