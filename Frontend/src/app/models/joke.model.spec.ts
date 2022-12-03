import { JokeModel } from './joke.model';

describe('Joke', () => {
  it('should create an instance', () => {
    expect(new JokeModel()).toBeTruthy();
  });
});
