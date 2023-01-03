import { Content } from './content';

it('should be able to create a notification content', () => {
  const content = new Content('voce recebeu uma solicitacao de amizade');

  expect(content).toBeTruthy();
});

it('should not be able to create a notification content with less than 5 characters', () => {
  expect(() => new Content('aa')).toThrow();
});

it('should not be able to create a notification content with more than 249 characters', () => {
  expect(() => new Content('a'.repeat(250))).toThrow();
});
