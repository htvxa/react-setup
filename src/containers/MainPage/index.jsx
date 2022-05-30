/**
 * MainPage component
 */
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import reducer, { someAction3 } from './redux/reducer';
import saga from './redux/saga';
import { StyledMainPage } from './styled.components';
import { withReducerSaga } from '../../utils/withReducerSaga';
function MainPage() {
  const dispatch = useDispatch();
  return (
    <StyledMainPage>
      <span>Increment</span>
      <button
        type="button"
        aria-label="Increment value"
        onClick={() => dispatch(someAction3())}
      >
        Increment
      </button>
    </StyledMainPage>
  );
}

export default withReducerSaga(reducer, saga, memo)(MainPage);
