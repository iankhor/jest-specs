import validate from './../validation';

describe('validate', () => {
  it('returns empty error array', () => {
    expect(validate({ value: 'abc@email.com', errors: [] })).toEqual({
      value: 'abc@email.com',
      errors: []
    });
  });

  it('an array with an error objects', () => {
    expect(validate({ value: 'abc', errors: [] })).toEqual({
      value: 'abc',
      errors: ['invalid_email', 'too_short']
    });
  });
});
