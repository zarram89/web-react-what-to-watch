import { appProcess } from './app-process';
import { changeGenre } from '../action';

describe('appProcess reducer', () => {
  it('should return initial state when called with undefined state', () => {
    const expectedState = { genre: 'All genres' };
    const result = appProcess(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(expectedState);
  });

  it('should change genre on changeGenre action', () => {
    const initialState = { genre: 'All genres' };
    const expectedState = { genre: 'Drama' };
    const result = appProcess(initialState, changeGenre('Drama'));

    expect(result).toEqual(expectedState);
  });

  it('should handle multiple genre changes', () => {
    let state = { genre: 'All genres' };

    state = appProcess(state, changeGenre('Comedy'));
    expect(state.genre).toBe('Comedy');

    state = appProcess(state, changeGenre('Horror'));
    expect(state.genre).toBe('Horror');

    state = appProcess(state, changeGenre('All genres'));
    expect(state.genre).toBe('All genres');
  });
});
