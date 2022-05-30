/**
 * HomePage component
 */
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { withReducerSaga } from '../../utils/withReducerSaga';
import reducer, { someAction } from './redux/reducer';
import saga from './redux/saga';
import { StyledHomePage } from './styled.components';
function HomePage() {
  const dispatch = useDispatch();
  return (
    <StyledHomePage>
      <span>Increment</span>
      <button
        type="button"
        aria-label="Increment value"
        onClick={() => dispatch(someAction())}
      >
        Increment
      </button>
    </StyledHomePage>
  );
}

export default withReducerSaga(reducer, saga, memo)(HomePage);
