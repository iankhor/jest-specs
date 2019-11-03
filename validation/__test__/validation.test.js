import validate from './../validation';

describe('validating email', () => {
  test.each`
    email              | expectedErrors
    ${'abc@email.com'} | ${[]}
    ${'abc'}           | ${['invalid_email', 'too_short']}
    ${''}              | ${['invalid_email', 'too_short', 'blank']}
    ${null}            | ${['invalid_email', 'too_short', 'blank']}
    ${undefined}       | ${['invalid_email', 'too_short', 'blank']}
  `('returns an error array of $expectedErrors when validating $email as email', ({ email, expectedErrors }) => {
    const errorMessages = validate({ value: email }).errors;

    expect(errorMessages).toEqual(expect.arrayContaining(expectedErrors));
  });
});
